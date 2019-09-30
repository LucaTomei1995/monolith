package com.mwsx.configuration;

import java.io.IOException;
import java.lang.reflect.Method;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Set;
import java.util.StringTokenizer;
 
import javax.annotation.security.RolesAllowed;
import javax.ws.rs.container.ContainerRequestContext;
import javax.ws.rs.container.ResourceInfo;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MultivaluedMap;
import javax.ws.rs.core.Response;
import javax.ws.rs.ext.Provider;

import com.mwsx.engine.MwsxPermissionManager;
import com.mwsx.engine.MwsxSession;
import com.mwsx.engine.MwsxSessionManager;
import com.mwsx.model.Role;
import com.mwsx.model.User;
 
/**
 * This filter verify the access permissions for a user
 * based on username and passowrd provided in request
 * */
@Provider
public class AuthenticationFilter implements javax.ws.rs.container.ContainerRequestFilter
{
     
    @Context
    private ResourceInfo resourceInfo;
     
    private static final String AUTHORIZATION_PROPERTY = "Authorization";
    private static final String AUTHENTICATION_SCHEME = "Basic";
    public static final String X_MONOLITH_SESSION_ID = "X-MONOLITH-SESSION-ID";

    @Override
    public void filter(ContainerRequestContext requestContext) {
    	if (requestContext.getMethod().equals("OPTIONS"))
    		return;
    	if (requestContext.getUriInfo().getAbsolutePath().toString().contains("/logger/"))
    		return;
    	final Response ACCESS_DENIED = Response.status(Response.Status.UNAUTHORIZED)
                .entity("User not recognized").build();
    	final Response ACCESS_FORBIDDEN = Response.status(Response.Status.FORBIDDEN)
                .entity("User not authorized").build();
    	final MultivaluedMap<String, String> headers = requestContext.getHeaders();
        final List<String> sessionId = headers.get(X_MONOLITH_SESSION_ID);
        if (sessionId != null && sessionId.size() > 0) {
        	MwsxSession session = MwsxSessionManager.getSessionManager().getSessionByID(sessionId.get(0));
        	if (session != null && session.isActive()) {
        		session.refresh();
        		return;
        	}
        	else {
	    		final Response INTERNAL_ERROR = Response.status(Response.Status.UNAUTHORIZED)
	    		            .entity("Session expired").build();
    			requestContext.abortWith(INTERNAL_ERROR);
    			return;
    		}
        }
        final List<String> authorization = headers.get(AUTHORIZATION_PROPERTY);
        if (authorization == null || authorization.size() == 0 || authorization.get(0) == null) {
        	requestContext.abortWith(ACCESS_DENIED);
        	return;
        }
        final String encodedUserPassword = authorization.get(0).replaceFirst(AUTHENTICATION_SCHEME + " ", "");
        String usernameAndPassword = new String(java.util.Base64.getDecoder().decode(encodedUserPassword.getBytes()));
        final StringTokenizer tokenizer = new StringTokenizer(usernameAndPassword, ":");
        final String username = tokenizer.nextToken();
        final String password = tokenizer.nextToken();
        System.out.println("AUTENTICATING " + username + ", " + password);
        User user = null;
        try {
        	user = MwsxPermissionManager.getPermissionManager().getUser(username);
        }
        catch(NoSuchElementException ex) {
        	System.out.println("User not found");
        	requestContext.abortWith(ACCESS_DENIED);
        	return;
        }
        if (!MwsxPermissionManager.getPermissionManager().isAuthenticated(user, password)) {
        	System.out.println("Password does not match");
        	requestContext.abortWith(ACCESS_DENIED);
        	return;
        }
        Method method = resourceInfo.getResourceMethod();
        if(method.isAnnotationPresent(RolesAllowed.class)) {
        	RolesAllowed rolesAnnotation = method.getAnnotation(RolesAllowed.class);
            Set<String> rolesSet = new HashSet<String>(Arrays.asList(rolesAnnotation.value()));
            boolean roleFound = false;
            for (String actRoleName : rolesSet) {
            	for (Role userRole : user.getRoles()) {
            		if (userRole.getName().toLowerCase().equals(actRoleName.toLowerCase())) {
            			roleFound = true;
            			break;
            		}
            	}
            	if (roleFound)
            		break;
            }
            if (!roleFound) {
            	System.out.println("Missing needed role on call");
            	requestContext.abortWith(ACCESS_FORBIDDEN);
            	return;
            }
        }
        try {
			MwsxSessionManager.getSessionManager().createSession(user);
		} catch (IOException e) {
			final Response INTERNAL_ERROR = Response.status(Response.Status.INTERNAL_SERVER_ERROR)
		            .entity(e.getClass() + ", " + e.getMessage()).build();
			requestContext.abortWith(INTERNAL_ERROR);
			throw new RuntimeException(e);
		}
    }
    
    
//    public void filter_old(ContainerRequestContext requestContext)
//    {
//    	if (requestContext.getMethod().equals("OPTIONS"))
//    		return;
//        Method method = resourceInfo.getResourceMethod();
//        //Access allowed for all
//        if( ! method.isAnnotationPresent(PermitAll.class))
//        {
//            //Access denied for all
//            if(method.isAnnotationPresent(DenyAll.class))
//            {
//                requestContext.abortWith(ACCESS_FORBIDDEN);
//                return;
//            }
//              
//            //Get request headers
//            final MultivaluedMap<String, String> headers = requestContext.getHeaders();
//              
//            //Fetch authorization header
//            final List<String> authorization = headers.get(AUTHORIZATION_PROPERTY);
//              
//            //If no authorization information present; block access
//            if(authorization == null || authorization.isEmpty())
//            {
//                requestContext.abortWith(ACCESS_DENIED);
//                return;
//            }
//              
//            //Get encoded username and password
//            final String encodedUserPassword = authorization.get(0).replaceFirst(AUTHENTICATION_SCHEME + " ", "");
//            //Decode username and password
//            String usernameAndPassword = new String(java.util.Base64.getDecoder().decode(encodedUserPassword.getBytes()));
//            //Split username and password tokens
//            final StringTokenizer tokenizer = new StringTokenizer(usernameAndPassword, ":");
//            final String username = tokenizer.nextToken();
//            final String password = tokenizer.nextToken();
//              
//            //Verifying Username and password
//            System.out.println(username);
//            System.out.println(password);
//              
//            //Verify user access
//            if(method.isAnnotationPresent(RolesAllowed.class))
//            {
//                RolesAllowed rolesAnnotation = method.getAnnotation(RolesAllowed.class);
//                Set<String> rolesSet = new HashSet<String>(Arrays.asList(rolesAnnotation.value()));
//                  
//                //Is user valid?
//                if( ! isUserAllowed(username, password, rolesSet))
//                {
//                    requestContext.abortWith(ACCESS_DENIED);
//                    return;
//                }
//            }
//        }
//    }
//    private boolean isUserAllowed(final String username, final String password, final Set<String> rolesSet)
//    {
//        boolean isAllowed = false;
//          
//        //Step 1. Fetch password from database and match with password in argument
//        //If both match then get the defined role for user from database and continue; else return isAllowed [false]
//        //Access the database and do this part yourself
//        //String userRole = userMgr.getUserRole(username);
//         
//        System.out.println("Username: " + username);
//        System.out.println("Password: " + password);
//        System.out.println("Roleset:  " + rolesSet);
//        
//        if(username.equals("mastro") && password.equals("dasilab"))
//        {
//            String userRole = "ADMIN";
//             
//            //Step 2. Verify user role
//            if(rolesSet.contains(userRole))
//            {
//                isAllowed = true;
//            }
//        }
//        return isAllowed;
//    }
   
}