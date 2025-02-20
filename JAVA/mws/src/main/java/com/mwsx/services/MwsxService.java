package com.mwsx.services;

import java.io.UnsupportedEncodingException;
import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.net.URLDecoder;
import java.util.Enumeration;
import java.util.List;
import java.util.NoSuchElementException;

import javax.annotation.security.RolesAllowed;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.Response;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.mwsx.configuration.AuthenticationFilter;
import com.mwsx.configuration.CustomLoggingFilter;
import com.mwsx.configuration.RuntimeListener;
import com.mwsx.engine.MwsxOntologyManager;
import com.mwsx.engine.MwsxPermissionManager;
import com.mwsx.engine.MwsxSession;
import com.mwsx.engine.MwsxSessionManager;
import com.mwsx.engine.ReasoningServices;
import com.mwsx.model.ClassInfo;
import com.mwsx.model.NewMappingData;
import com.mwsx.model.DataPropertyInfo;
import com.mwsx.model.Entities;
import com.mwsx.model.Entity;
import com.mwsx.model.FileInfo;
import com.mwsx.model.Mapping;
import com.mwsx.model.MappingAssertion;
import com.mwsx.model.MappingInfo;
import com.mwsx.model.MappingRewritings;
import com.mwsx.model.Mappings;
import com.mwsx.model.MappingsCheckResult;
import com.mwsx.model.MastroID;
import com.mwsx.model.MastroProperties;
import com.mwsx.model.OBDACatalog;
import com.mwsx.model.OBDARunQueryInstance;
import com.mwsx.model.OBDAStatus;
import com.mwsx.model.ObjectPropertyInfo;
import com.mwsx.model.Ontologies;
import com.mwsx.model.Ontology;
import com.mwsx.model.OntologyHierarchy;
import com.mwsx.model.OntologyInfo;
import com.mwsx.model.OntologyOpeningEvent;
import com.mwsx.model.OntologyRewritings;
import com.mwsx.model.SPARQLQuery;
import com.mwsx.model.SPARQLResults;
import com.mwsx.model.SPARQLStatus;
import com.mwsx.model.SQLQuery;
import com.mwsx.model.SQLView;
import com.mwsx.model.SQLViews;
import com.mwsx.model.User;
import com.mwsx.model.ViewMappings;
import com.mwsx.model.ViewRewritings;
import com.ruzzi.mastro.stream.queries.monitor.OBDAMainMemoryQueryMonitor;

import ch.qos.logback.classic.Level;
import ch.qos.logback.classic.LoggerContext;
import it.uniroma1.dis.mastro.api.impl.MastroAPI;
import it.uniroma1.dis.quonto.core.datasourcemanager.DataSourceInfoEntry;

@Path("/mwsx")
public class MwsxService {

	public static boolean LOG_METHODS = true;
	
	static Logger logger = LoggerFactory.getLogger(MwsxService.class);
	
	static StringBuffer logMethodInfo(Object...args) {
		StringBuffer sb = new StringBuffer();
		try {
			throw new Throwable();
		}
		catch(Throwable t) {
			sb.append("####################################################################################");
			StackTraceElement[] st = t.getStackTrace();
			sb.append("\n >> [METHOD] " + st[1].getMethodName());
			sb.append("\n------------------------------------------------------------------------------------");
			Method[] methods = MwsxService.class.getDeclaredMethods();
			int methodCount = 0;
			for (Method method : methods) {
				if (method.getName().equals(st[1].getMethodName())) {
					methodCount++;
					Path pathAnnotation = method.getAnnotation(Path.class);
					if (pathAnnotation != null) {
						sb.append("\n >> [PATH]   " + pathAnnotation.value());
					}
				}
			}
			if (methodCount > 1) {
				sb.append("\n <<< attention! overloaded method name >>> ");
			}
			sb.append("\n------------------------------------------------------------------------------------");
			for (int i=0; i < args.length; i++)
				sb.append("\n  [par] " + String.valueOf(args[i]));
			logger.debug(sb.toString());
		}
		return sb;
	}
	
	private static MwsxOntologyManager ontologyManager = RuntimeListener.getOntologyManager();
		
	public MwsxService() {
	}
	
    @GET
    public String getMsg()
    {
         return "MwsxService message";
    }
    
    @Path("/log/{env}/{mode}")
    @GET
    @MwsxAvailable
	public String setLogger(@PathParam("env") String env, @PathParam("mode") String mode)
    {
         if (env != null) {
        	 if (env.toLowerCase().equals("headers")) {
        		 if (mode != null && mode.toLowerCase().equals("on")) {
        			 logger.debug("===========================================");
        			 logger.debug("==         HEADER LOGGING ENABLED         =");
        			 logger.debug("===========================================");
        			 CustomLoggingFilter.LOG_HEADERS = true;
        			 return "log HEADERS enabled";
        		 }
        		 if (mode != null && mode.toLowerCase().equals("off")) {
        			 logger.debug("===========================================");
        			 logger.debug("==         HEADER LOGGING DISABLED        =");
        			 logger.debug("===========================================");
        			 CustomLoggingFilter.LOG_HEADERS = false;
        			 return "log HEADERS disabled";
        		 }
        		 return "W.T.F. DO YOU MEAN BY SETTING mode = '" + mode + "'? (only 'on' or 'off' allowed)";
        	 }
        	 if (env.toLowerCase().equals("methods")) {
        		 if (mode != null && mode.toLowerCase().equals("on")) {
        			 logger.debug("===========================================");
        			 logger.debug("==        METHODS LOGGING ENABLED         =");
        			 logger.debug("===========================================");
        			 MwsxService.LOG_METHODS = true;
        			 return "log METHODS enabled";
        		 }
        		 if (mode != null && mode.toLowerCase().equals("off")) {
        			 logger.debug("===========================================");
        			 logger.debug("==        METHODS LOGGING DISABLED        =");
        			 logger.debug("===========================================");
        			 MwsxService.LOG_METHODS = false;
        			 return "log METHODS disabled";
        		 }
        		 return "W.T.F. DO YOU MEAN BY SETTING mode = '" + mode + "'? (only 'on' or 'off' allowed)";
        	 }
         }
         return "/log/{env}/{mode} -&gt; null {env} param";
    }
    
    @Path("/login")
	@GET
	@Produces("application/json")
	@Consumes("application/json")
	@MwsxAvailable
	public Response get__login(@Context HttpServletRequest request,
			@Context HttpServletResponse response

	) throws UnsupportedEncodingException {
		if (LOG_METHODS) logMethodInfo();
		String auth = request.getHeader("Authorization");
		auth = auth.replace("Basic ", "");
		String decode = new String(java.util.Base64.getDecoder().decode(auth), "UTF-8");
		String user = decode.substring(0, decode.indexOf(":"));
		User u = MwsxPermissionManager.getPermissionManager().getUser(user);
		String sessionId = MwsxSessionManager.getSessionManager().getUserSessionId(u);
		if (sessionId != null)
			response.setHeader(AuthenticationFilter.X_MONOLITH_SESSION_ID, sessionId);
		return Response.ok().entity(u).build();
	}
    
	@Path("/owlOntology")
	@GET
	@Produces("application/json")
	@Consumes("application/json")
	@MwsxAvailable
	public Response get__owlOntology(@Context HttpServletRequest request,
			@Context HttpServletResponse response

	) {
		if (LOG_METHODS) logMethodInfo();
		Ontologies os = null;
		try {
			os = ontologyManager.getOntologies();
		}
		catch(Throwable t) {
			return manageError(t, response);
		}
		response.setHeader("MASTRO-MESSAGE", "OK");
		response.setStatus(HttpServletResponse.SC_OK);
		return Response.ok().entity(os.getOntologyList()).build();
	}

	@Path("/owlOntology")
	@POST
	@Produces("application/json")
	@Consumes("application/json")
	@MwsxAvailable
	public Response post__owlOntology_name(@Context HttpServletRequest request,
			@Context HttpServletResponse response,
			Ontology post
	) {
		if (LOG_METHODS) logMethodInfo(o2j(post));
		try {
			if (post != null) {
				if (post.getOntologyDate() == 0)
					post.setOntologyDate(System.currentTimeMillis());
			}
			MwsxService.ontologyManager.addOntology(post);
		}
		catch(Throwable t) {
			return manageError(t, response);
		}
		response.setHeader("MASTRO-MESSAGE", "OK");
		response.setStatus(HttpServletResponse.SC_OK);
		return Response.ok().entity(post).build();
	}
	
	@Path("/owlOntology/{name}")
	@GET
	@Produces("application/json")
	@Consumes("application/json")
	@MwsxAvailable
	public Response get__owlOntology_name(@Context HttpServletRequest request,
			@Context HttpServletResponse response, @PathParam("name") String name

	) {
		if (LOG_METHODS) logMethodInfo(name);
		Ontology os = null;
		try {
			for (Ontology o : ontologyManager.getOntologies().getOntologyList()) {
				if (o.getOntologyID().equals(name)) {
					os = o;
					break;
				}
			}
		}
		catch(Throwable t) {
			return manageError(t, response);
		}
		if (os != null) {
			response.setHeader("MASTRO-MESSAGE", "OK");
			response.setStatus(HttpServletResponse.SC_OK);
			return Response.ok().entity(os).build();
		}
		else {
			response.setHeader("MASTRO-MESSAGE", "ONTOLOGY " + name + " NOT FOUND");
			response.setStatus(HttpServletResponse.SC_NOT_FOUND);
			return Response.ok().entity(os).build();
		}
	}

	@Path("/owlOntology")
	@DELETE
	@Produces("application/json")
	@Consumes("application/json")
	@RolesAllowed("ADMIN")
	@MwsxAvailable
	public Response delete__all_owlOntologies(@Context HttpServletRequest request,
			@Context HttpServletResponse response

	) {
		if (LOG_METHODS) logMethodInfo();
		Ontologies o = new Ontologies();
		try {
			MwsxService.ontologyManager.deleteAllOntologies();
		}
		catch(Throwable t) {
			return manageError(t, response);
		}
		response.setHeader("MASTRO-MESSAGE", "Method not implemented yet");
		response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
		return Response.ok().entity(o).build();
	}

	@Path("/owlOntology/{name}/version")
	@GET
	@Produces("application/json")
	@MwsxAvailable
	public Response get__owlOntology_name_version(@Context HttpServletRequest request,
			@Context HttpServletResponse response, @PathParam("name") String name, @QueryParam("version") String version
			, @QueryParam("format") String format, @QueryParam("approximated") boolean approximated

	) {
		if (version != null) version = version.replace("\"", ""); 
		if (LOG_METHODS) logMethodInfo(name, version);
		FileInfo f = null;
		try {
			f = MwsxService.ontologyManager.getApproximatedOntology(name, version, format, approximated);
		}
		catch(Throwable t) {
			return manageError(t, response);
		}
		response.setHeader("MASTRO-MESSAGE", "OK");
		response.setStatus(HttpServletResponse.SC_OK);
		return Response.ok().entity(f).build();
	}

//	) {
//		version = decode(request, response, version);
//		if (LOG_METHODS) logMethodInfo(name, version);
//		FileInfo f = null;
//		try {
//			f = MwsxService.ontologyManager.getOntologyVersionOwlFile(name, version);
//		}
//		catch(Throwable t) {
//			return manageError(t, response);
//		}
//		response.setHeader("MASTRO-MESSAGE", "OK");
//		response.setStatus(HttpServletResponse.SC_OK);
//		return Response.ok().entity(f).build();
//	}

	@Path("/owlOntology/{name}")
	@POST
	@Produces("application/json")
	@Consumes("application/json")
	@MwsxAvailable
	public Response post__owlOntology_name_version(@Context HttpServletRequest request,
			@Context HttpServletResponse response, @PathParam("name") String name, @QueryParam("syntax") String syntax,
			com.mwsx.model.FileInfo put
	) {
		if (LOG_METHODS) logMethodInfo(name, put.getFileName(), put.getFileType());
		try {
			Ontology o = MwsxService.ontologyManager.getOntology(name);			
			MwsxService.ontologyManager.addOntologyVersion(o, put, syntax == null || syntax.trim().length() == 0 ? ReasoningServices.MANCHESTER_SYNTAX : syntax);
		}
		catch(Throwable t) {
			return manageError(t, response);
		}
		response.setHeader("MASTRO-MESSAGE", "OK");
		response.setStatus(HttpServletResponse.SC_OK);
		return Response.ok().entity(put).build();
	}

	@Path("/owlOntology/{name}")
	@DELETE
	@Produces("application/json")
	@Consumes("application/json")
	@RolesAllowed("ADMIN")
	@MwsxAvailable
	public Response delete__owlOntology(@Context HttpServletRequest request,
			@Context HttpServletResponse response, @PathParam("name") String name
	) {
		if (LOG_METHODS) logMethodInfo(name);
		FileInfo f = new FileInfo();
		try {
			MwsxService.ontologyManager.deleteOntology(name);
		}
		catch(Throwable t) {
			return manageError(t, response);
		}
		response.setHeader("MASTRO-MESSAGE", "OK");
		response.setStatus(HttpServletResponse.SC_OK);
		return Response.ok().entity(f).build();
	}
	
	@Path("/owlOntology/{name}/version")
	@DELETE
	@Produces("application/json")
	@RolesAllowed("ADMIN")
	@MwsxAvailable
	public Response delete__owlOntology_name_version(@Context HttpServletRequest request,
			@Context HttpServletResponse response, @PathParam("name") String name, @QueryParam("version") String version

	) {
		if (version != null) version = version.replace("\"", ""); 
		if (LOG_METHODS) logMethodInfo(name, version);
		FileInfo f = null;
		try {
			f = MwsxService.ontologyManager.deleteOntologyVersion(name, version);
		}
		catch(Throwable t) {
			return manageError(t, response);
		}
		response.setHeader("MASTRO-MESSAGE", "OK");
		response.setStatus(HttpServletResponse.SC_OK);
		return Response.ok().entity(f).build();
	}
	
//	@Path("/owlOntology/{name}/version")
//	@GET
//	@Produces("application/json")
//	@RolesAllowed("ADMIN")
//	@MwsxAvailable
//	public Response get_approximated_ontology(@Context HttpServletRequest request,
//			@Context HttpServletResponse response, @PathParam("name") String name, 
//			@QueryParam("version") String version, @QueryParam("format") String format, @QueryParam("approximated") boolean approximated
//
//	) {
//		if (version != null) version = version.replace("\"", ""); 
//		if (LOG_METHODS) logMethodInfo(name, version);
//		FileInfo f = null;
//		try {
//			f = MwsxService.ontologyManager.getApproximatedOntology(name, version, format, approximated);
//		}
//		catch(Throwable t) {
//			return manageError(t, response);
//		}
//		response.setHeader("MASTRO-MESSAGE", "OK");
//		response.setStatus(HttpServletResponse.SC_OK);
//		return Response.ok().entity(f).build();
//	}

	@Path("/owlOntology/{name}/version/hierarchy")
	@GET
	@Produces("application/json")
	@Consumes("application/json")
	@MwsxAvailable
	public Response get__owlOntology_name_version_hierarchy(@Context HttpServletRequest request,
			@Context HttpServletResponse response, @PathParam("name") String name, @QueryParam("version") String version

	) {
		version = decode(request, response, version);
		if (LOG_METHODS) logMethodInfo(name, version);
		OntologyHierarchy hierarchy = null;
		try {
			hierarchy = MwsxService.ontologyManager.getOntologyHierarchy(name, version);
		}
		catch(Throwable t) {
			return manageError(t, response);
		}
		response.setHeader("MASTRO-MESSAGE", "OK");
		response.setStatus(HttpServletResponse.SC_OK);
		return Response.ok().entity(hierarchy).build();
	}

	@Path("/owlOntology/{name}/version/info")
	@GET
	@Produces("application/json")
	@Consumes("application/json")
	@MwsxAvailable
	public Response get__owlOntology_name_version_info(@Context HttpServletRequest request,
			@Context HttpServletResponse response, @PathParam("name") String name, @QueryParam("version") String version

	) {
		MwsxSession session = getMwsxSession(request);
		version = decode(request, response, version);
		if (LOG_METHODS) logMethodInfo(name, version);
		OntologyInfo info = null;
		try {
			info = MwsxService.ontologyManager.getOntologyinfo(session, name, version);
		}
		catch(Throwable t) {
			return manageError(t, response);
		}
		response.setHeader("MASTRO-MESSAGE", "OK");
		response.setStatus(HttpServletResponse.SC_OK);
		return Response.ok().entity(info).build();
	}
	
	@Path("/owlOntology/{name}/version/entities")
	@GET
	@Produces("application/json")
	@Consumes("application/json")
	@MwsxAvailable
	public Response get__owlOntology_name_version_entities(@Context HttpServletRequest request,
			@Context HttpServletResponse response, @PathParam("name") String name, @QueryParam("version") String version

	) {
		version = decode(request, response, version);
		if (LOG_METHODS) logMethodInfo(name, version);
		Entities info = null;
		try {
			info = MwsxService.ontologyManager.getOntologyEntities(name, version);
		}
		catch(Throwable t) {
			return manageError(t, response);
		}
		response.setHeader("MASTRO-MESSAGE", "OK");
		response.setStatus(HttpServletResponse.SC_OK);
		return Response.ok().entity(info).build();
	}
	
	@Path("/owlOntology/{name}/version/entity/{id}")
	@GET
	@Produces("application/json")
	@Consumes("application/json")
	@MwsxAvailable
	public Response get__owlOntology_name_version_entity(@Context HttpServletRequest request,
			@Context HttpServletResponse response, @PathParam("name") String name, @QueryParam("version") String version,
			@PathParam("id") String id
	) {
		version = decode(request, response, version);
		if (LOG_METHODS) logMethodInfo(name, version);
		Entity info = null;
		try {
			info = MwsxService.ontologyManager.getOntologyEntity(name, version, id);
		}
		catch(Throwable t) {
			return manageError(t, response);
		}
		response.setHeader("MASTRO-MESSAGE", "OK");
		response.setStatus(HttpServletResponse.SC_OK);
		return Response.ok().entity(info).build();
	}

	@Path("/owlOntology/{name}/version/alphabet/class/{ID}/logical")
	@GET
	@Produces("application/json")
	@Consumes("application/json")
	@MwsxAvailable
	public Response get__owlOntology_name_version_alphabet_class_ID_logical(
			@Context HttpServletRequest request, @Context HttpServletResponse response, @PathParam("name") String name,
			@PathParam("ID") String ID, @QueryParam("version") String version

	) {
		version = decode(request, response, version);
		if (LOG_METHODS) logMethodInfo(name, version, ID);
		ClassInfo info = null;
		try {
			info = MwsxService.ontologyManager.getOntologyVersionClassInfo(name, version, ID);
		}
		catch(Throwable t) {
			return manageError(t, response);
		}
		response.setHeader("MASTRO-MESSAGE", "OK");
		response.setStatus(HttpServletResponse.SC_OK);
		return Response.ok().entity(info).build();
	}

	@Path("/owlOntology/{name}/version/alphabet/objectProperty/{ID}/logical")
	@GET
	@Produces("application/json")
	@Consumes("application/json")
	@MwsxAvailable
	public Response get__owlOntology_name_version_alphabet_objectProperty_ID_logical(
			@Context HttpServletRequest request, @Context HttpServletResponse response, @PathParam("name") String name,
			@PathParam("ID") String ID, @QueryParam("version") String version

	) {
		version = decode(request, response, version);
		if (LOG_METHODS) logMethodInfo(name, version, ID);
		ObjectPropertyInfo info = null;
		try {
			info = MwsxService.ontologyManager.getOntologyVersionOPInfo(name, version, ID);
		}
		catch(Throwable t) {
			return manageError(t, response);
		}
		response.setHeader("MASTRO-MESSAGE", "OK");
		response.setStatus(HttpServletResponse.SC_OK);
		return Response.ok().entity(info).build();
	}

	@Path("/owlOntology/{name}/version/alphabet/dataProperty/{ID}/logical")
	@GET
	@Produces("application/json")
	@Consumes("application/json")
	@MwsxAvailable
	public Response get__owlOntology_name_version_alphabet_dataProperty_ID_logical(
			@Context HttpServletRequest request, @Context HttpServletResponse response, @PathParam("name") String name,
			@PathParam("ID") String ID, @QueryParam("version") String version

	) {
		version = decode(request, response, version);
		if (LOG_METHODS) logMethodInfo(name, version, ID);
		DataPropertyInfo info = null;
		try {
			info = MwsxService.ontologyManager.getOntologyVersionDPInfo(name, version, ID);
		}
		catch(Throwable t) {
			return manageError(t, response);
		}
		response.setHeader("MASTRO-MESSAGE", "OK");
		response.setStatus(HttpServletResponse.SC_OK);
		return Response.ok().entity(info).build();
	}

	@Path("/owlOntology/{name}/version/graphol")
	@GET
	@Produces("application/json")
	@Consumes("application/json")
	@MwsxAvailable
	public Response get__owlOntology_name_version_graphol(@Context HttpServletRequest request,
			@Context HttpServletResponse response, @PathParam("name") String name, @QueryParam("version") String version

	) {
		version = decode(request, response, version);
		if (LOG_METHODS) logMethodInfo(name, version);
		FileInfo info = null;
		try {
			info = MwsxService.ontologyManager.getGrapholFileInfo(name, version);
		}
		catch(Throwable t) {
			return manageError(t, response);
		}
		response.setHeader("MASTRO-MESSAGE", "OK");
		response.setStatus(HttpServletResponse.SC_OK);
		return Response.ok().entity(info).build();
	}
	
	@Path("/owlOntology/{name}/version/graphol/check")
	@GET
	@Produces("application/json")
	@Consumes("application/json")
	@MwsxAvailable
	public Response get__owlOntology_name_version_graphol_check(@Context HttpServletRequest request,
			@Context HttpServletResponse response, @PathParam("name") String name, @QueryParam("version") String version

	) {
		version = decode(request, response, version);
		if (LOG_METHODS) logMethodInfo(name, version);
		boolean isPresent = false;
		try {
			isPresent = MwsxService.ontologyManager.isGrapholFilePresent(name, version);
		}
		catch(Throwable t) {
			return manageError(t, response);
		}
		response.setHeader("MASTRO-MESSAGE", "OK");
		response.setStatus(HttpServletResponse.SC_OK);
		return Response.ok().entity(isPresent).build();
	}
	
	@Path("/owlOntology/{name}/version/owl")
	@GET
	@Produces("application/json")
	@MwsxAvailable
	public Response get__owlOntology_name_version_owl(@Context HttpServletRequest request,
			@Context HttpServletResponse response, @PathParam("name") String name, @QueryParam("version") String version

	) {
		return this.get__owlOntology_name_version(request, response, name, version, "fss", false);
	}
	
	@Path("/owlOntology/{name}/version/graphol")
	@DELETE
	@Produces("application/json")
	@Consumes("application/json")
	@RolesAllowed("ADMIN")
	@MwsxAvailable
	public Response delete__owlOntology_name_version_graphol(@Context HttpServletRequest request,
			@Context HttpServletResponse response, @PathParam("name") String name, @QueryParam("version") String version

	) {
		version = decode(request, response, version);
		if (LOG_METHODS) logMethodInfo(name, version);
		FileInfo info = null;
		try {
			info = MwsxService.ontologyManager.deleteGrapholFileInfo(name, version);
		}
		catch(Throwable t) {
			return manageError(t, response);
		}
		response.setHeader("MASTRO-MESSAGE", "OK");
		response.setStatus(HttpServletResponse.SC_OK);
		return Response.ok().entity(info).build();
	}

	@Path("/owlOntology/{name}/version/mapping")
	@GET
	@Produces("application/json")
	@Consumes("application/json")
	@MwsxAvailable
	public Response get__owlOntology_name_version_mapping(@Context HttpServletRequest request,
			@Context HttpServletResponse response, @PathParam("name") String name, @QueryParam("version") String version

	) { 
		version = decode(request, response, version);
		if (LOG_METHODS) logMethodInfo(name, version);
		Mappings mappings = null;
		try {
			mappings = MwsxService.ontologyManager.getMappings(name, version);
		}
		catch(Throwable t) {
			return manageError(t, response);
		}
		return Response.ok().entity(mappings).build();
	}

	@Path("/owlOntology/{name}/version/mapping/{ID}")
	@GET
	@Produces("application/json")
	@Consumes("application/json")
	@MwsxAvailable
	public Response get__owlOntology_name_version_mapping_ID(@Context HttpServletRequest request,
			@Context HttpServletResponse response, @PathParam("name") String name, @QueryParam("version") String version,
			@PathParam("ID") String ID

	) { 
		version = decode(request, response, version);
		if (LOG_METHODS) logMethodInfo(name, version, ID);
		FileInfo info = null;
		try {
			info = MwsxService.ontologyManager.getMappingFile(name, version, ID);
		}
		catch(Throwable t) {
			return manageError(t, response);
		}
		return Response.ok().entity(info).build();
	}
	
	@Path("/owlOntology/{name}/version/mapping/{ID}/prefixes")
	@GET
	@Produces("application/json")
	@Consumes("application/json")
	@MwsxAvailable
	public Response get__owlOntology_name_version_mapping_ID_prefixes(@Context HttpServletRequest request,
			@Context HttpServletResponse response, @PathParam("name") String name, @QueryParam("version") String version,
			@PathParam("ID") String ID

	) { 
		version = decode(request, response, version);
		if (LOG_METHODS) logMethodInfo(name, version, ID);
		Mapping info = null;
		try {
			info = MwsxService.ontologyManager.getMapping(name, version, ID);
		}
		catch(Throwable t) {
			return manageError(t, response);
		}
		return Response.ok().entity(info.getPrefixes()).build();
	}

	@Path("/owlOntology/{name}/version/mapping")
	@POST
	@Produces("application/json")
	@Consumes("application/json")
	@MwsxAvailable
	public Response post__owlOntology_name_version_mapping_ID(@Context HttpServletRequest request,
			@Context HttpServletResponse response, @PathParam("name") String name, @QueryParam("version") String version,
			@QueryParam("create") String create, @QueryParam("check") String check, FileInfo put
	) { 
		version = decode(request, response, version);
		if (LOG_METHODS) logMethodInfo(name, version, (put != null) ? put.getFileName() : "--", put != null ? put.getFileType() : "--", create, check);
		if (create != null && !create.trim().toLowerCase().equals("")) {
			try {
				MwsxSession session = this.getMwsxSession(request);
				MappingInfo mappingInfo = MwsxService.ontologyManager.createMapping(session, name, version, create);
				return Response.ok().entity(mappingInfo).build();
			}
			catch(Throwable t) {
				return manageError(t, response);
			}			
		}
		else
			try {
				if (check != null && check.toLowerCase().trim().equals("true")) {
					MappingsCheckResult mcr = null;
					try {
						Mapping mapping = MwsxService.ontologyManager.postMapping(name, version, put);
						String mappingID = mapping.getMappingID();
						MastroID mid = MastroID.getMastroID(name, version, mappingID);
						MappingInfo info = MwsxService.ontologyManager.getMappingInfo(name, version, mappingID);
						MwsxSession session = this.getMwsxSession(request);
						mcr = MwsxService.ontologyManager.checkMappings(session, mid);
						mcr.setMappingInfo(info);
						if (!mcr.isSuccess()) {
							MwsxService.ontologyManager.deleteMapping(name, version, mapping.getMappingID());
						}
					}
					catch(Throwable t) {
						return manageError(t, response);
					}
					return Response.ok().entity(mcr).build();
				}
				else {
					Mapping mapping = null;
					try {
						mapping = MwsxService.ontologyManager.postMapping(name, version, put);
						String mappingID = mapping.getMappingID();
						MastroID mid = MastroID.getMastroID(name, version, mappingID);
						MappingInfo info = MwsxService.ontologyManager.getMappingInfo(name, version, mappingID);
						MwsxSession session = this.getMwsxSession(request);
						MappingsCheckResult mcr = MwsxService.ontologyManager.checkMappings(session, mid);
						mcr.setMappingInfo(info);
						if (!mcr.isSuccess()) {
							MwsxService.ontologyManager.deleteMapping(name, version, mapping.getMappingID());
							return Response.serverError().entity(mcr).build();
						}
					}
					catch(Throwable t) {
						return manageError(t, response);
					}
					return Response.ok().entity(mapping).build();
				}
			}
			catch(Throwable t) {
				return manageError(t, response);
			}		
	}
	
	@Path("/owlOntology/{name}/version/mapping/check")
	@POST
	@Produces("application/json")
	@Consumes("application/json")
	@MwsxAvailable
	public Response post__owlOntology_name_version_mapping_ID_check(@Context HttpServletRequest request,
			@Context HttpServletResponse response, @PathParam("name") String name, @QueryParam("version") String version,
			@QueryParam("check") String check, FileInfo put
	) { 
		version = decode(request, response, version);
		if (LOG_METHODS) logMethodInfo(name, version, put.getFileName(), put.getFileType());
		MappingsCheckResult mcr = null;
		try {
			Mapping mapping = MwsxService.ontologyManager.postMapping(name, version, put);
			MastroID mid = MastroID.getMastroID(name, version, mapping.getMappingID());
			MwsxSession session = this.getMwsxSession(request);
			mcr = MwsxService.ontologyManager.checkMappings(session, mid);
			if (check != null && check.toLowerCase().trim().contentEquals("true")) {
				MwsxService.ontologyManager.deleteMapping(name, version, mapping.getMappingID());
			}
		}
		catch(Throwable t) {
			return manageError(t, response);
		}
		return Response.ok().entity(mcr).build();
	}

	@Path("/owlOntology/{name}/version/mapping/{ID}")
	@DELETE
	@Produces("application/json")
	@Consumes("application/json")
	@RolesAllowed("ADMIN")
	@MwsxAvailable
	public Response delete__owlOntology_name_version_mapping_ID(@Context HttpServletRequest request,
			@Context HttpServletResponse response, @PathParam("name") String name, @QueryParam("version") String version,
			@PathParam("ID") String ID

	) { 
		version = decode(request, response, version);
		if (LOG_METHODS) logMethodInfo(name, version, ID);
		FileInfo info = null;
		try {
			info = MwsxService.ontologyManager.deleteMapping(name, version, ID);
		}
		catch(Throwable t) {
			return manageError(t, response);
		}
		return Response.ok().entity(info).build();
	}

	@Path("/owlOntology/{name}/version/mapping/{ID}/info")
	@GET
	@Produces("application/json")
	@Consumes("application/json")
	@MwsxAvailable
	public Response get__owlOntology_name_version_mapping_ID_info(@Context HttpServletRequest request,
			@Context HttpServletResponse response, @PathParam("name") String name, @QueryParam("version") String version,
			@PathParam("ID") String ID

	) { 
		version = decode(request, response, version);
		if (LOG_METHODS) logMethodInfo(name, version, ID);
		MappingInfo info = null;
		try {
			info = MwsxService.ontologyManager.getMappingInfo(name, version, ID);
		}
		catch(Throwable t) {
			return manageError(t, response);
		}
		return Response.ok().entity(info).build();
	}

	@Path("/owlOntology/{name}/version/mapping/{ID}/assertions/{entityID}")
	@GET
	@Produces("application/json")
	@Consumes("application/json")
	@MwsxAvailable
	public Response get__owlOntology_name_version_mapping_ID_assertions_entityID(
			@Context HttpServletRequest request, @Context HttpServletResponse response, @PathParam("name") String name,
			@QueryParam("version") String version, @PathParam("ID") String ID, @PathParam("entityID") String entityID

	) { 
		version = decode(request, response, version);
		if (LOG_METHODS) logMethodInfo(name, version, ID, entityID);
		List<MappingAssertion> info = null;
		try {
			info = MwsxService.ontologyManager.getMappingAssertionsByEntity(name, version, ID, entityID);
			logger.debug("" + info.size());
		}
		catch(Throwable t) {
			return Response.status(500).entity(t.getMessage()).build();
		}
		return Response.ok().entity(info).build();
	}
	
	@Path("/owlOntology/{name}/version/mapping/{ID}/assertions")
	@GET
	@Produces("application/json")
	@Consumes("application/json")
	@MwsxAvailable
	public Response get__owlOntology_name_version_mapping_ID_assertions(
			@Context HttpServletRequest request, @Context HttpServletResponse response, @PathParam("name") String name,
			@QueryParam("version") String version, @PathParam("ID") String ID

	) { 
		version = decode(request, response, version);
		if (LOG_METHODS) logMethodInfo(name, version, ID);
		List<MappingAssertion> info = null;
		try {
			info = MwsxService.ontologyManager.getAllMappingAssertions(name, version, ID);
			logger.debug("" + info.size());
		}
		catch(Throwable t) {
			return Response.status(500).entity(t.getMessage()).build();
		}
		return Response.ok().entity(info).build();
	}
	
	@Path("/owlOntology/{name}/version/mapping/{ID}/assertions")
	@POST
	@Produces("application/json")
	@Consumes("application/json")
	@MwsxAvailable
	public Response post__owlOntology_name_version_mapping_ID_assertions(
			@Context HttpServletRequest request, @Context HttpServletResponse response, @PathParam("name") String name,
			@QueryParam("version") String version, @PathParam("ID") String ID, NewMappingData data

	) { 
		version = decode(request, response, version);
		if (LOG_METHODS) logMethodInfo(name, version, ID);
		MappingAssertion info = null;
		try {
			info = MwsxService.ontologyManager.postMappingAssertion(name, version, ID, data);
		}
		catch(Throwable t) {
			return Response.status(500).entity(t.getMessage()).build();
		}
		return Response.ok().entity(info).build();
	}
	
	@Path("/owlOntology/{name}/version/mapping/{ID}/assertion/{mapID}")
	@DELETE
	@Produces("application/json")
	@Consumes("application/json")
	@MwsxAvailable
	public Response post__owlOntology_name_version_mapping_ID_assertions(
			@Context HttpServletRequest request, @Context HttpServletResponse response, @PathParam("name") String name,
			@QueryParam("version") String version, @PathParam("ID") String ID, @PathParam("mapID") String mapID

	) { 
		version = decode(request, response, version);
		if (LOG_METHODS) logMethodInfo(name, version, ID);
		MappingAssertion info = null;
		try {
			info = MwsxService.ontologyManager.deleteMappingAssertion(name, version, ID, mapID);
		}
		catch(Throwable t) {
			return Response.status(500).entity(t.getMessage()).build();
		}
		return Response.ok().entity(info).build();
	}
	
	@Path("/owlOntology/{name}/version/mapping/{ID}/assertion/{mapID}")
	@PUT
	@Produces("application/json")
	@Consumes("application/json")
	@MwsxAvailable
	public Response put__owlOntology_name_version_mapping_ID_assertions(
			@Context HttpServletRequest request, @Context HttpServletResponse response, @PathParam("name") String name,
			@QueryParam("version") String version, @PathParam("ID") String ID, @PathParam("mapID") String mapID, NewMappingData data 

	) { 
		version = decode(request, response, version);
		if (LOG_METHODS) logMethodInfo(name, version, ID);
		MappingAssertion info = null;
		try {
			info = MwsxService.ontologyManager.editMappingAssertion(name, version, ID, mapID, data);
		}
		catch(Throwable t) {
			return Response.status(500).entity(t.getMessage()).build();
		}
		return Response.ok().entity(info).build();
	}
	
//	
//	
//	TEST
//	
//	
//	
	
	
//	
//	
//	FINE TEST
//	
//	
	
	
	@Path("/owlOntology/{name}/version/mapping/{ID}/views")
	@GET
	@Produces("application/json")
	@Consumes("application/json")
	@MwsxAvailable
	public Response get__owlOntology_name_version_mapping_ID_views(@Context HttpServletRequest request,
			@Context HttpServletResponse response, @PathParam("name") String name, @QueryParam("version") String version,
			@PathParam("ID") String ID

	) { 
		version = decode(request, response, version);
		if (LOG_METHODS) logMethodInfo(name, version, ID);
		SQLViews info = null;
		try {
			info = MwsxService.ontologyManager.getViewDefinitions(name, version, ID);
		}
		catch(Throwable t) {
			return manageError(t, response);
		}
		return Response.ok().entity(info).build();
	}
	
	@Path("/owlOntology/{name}/version/mapping/{ID}/views")
	@POST
	@Produces("application/json")
	@Consumes("application/json")
	@MwsxAvailable
	public Response post__owlOntology_name_version_mapping_ID_views(@Context HttpServletRequest request,
			@Context HttpServletResponse response, @PathParam("name") String name, @QueryParam("version") String version,
			@PathParam("ID") String ID, SQLView view

	) { 
		version = decode(request, response, version);
		if (LOG_METHODS) logMethodInfo(name, version, ID);
		SQLView info = null;
		try {
			info = MwsxService.ontologyManager.postViewDefinitions(name, version, ID, view);
		}
		catch(Throwable t) {
			return manageError(t, response);
		}
		return Response.ok().entity(info).build();
	}
	
	@Path("/owlOntology/{name}/version/mapping/{ID}/view/{view_name}")
	@PUT
	@Produces("application/json")
	@Consumes("application/json")
	@MwsxAvailable
	public Response put__owlOntology_name_version_mapping_ID_views(@Context HttpServletRequest request,
			@Context HttpServletResponse response, @PathParam("name") String name, @QueryParam("version") String version,
			@PathParam("ID") String ID, @PathParam("view_name") String view_name, SQLView view

	) { 
		version = decode(request, response, version);
		if (LOG_METHODS) logMethodInfo(name, version, ID);
		SQLView info = null;
		try {
			info = MwsxService.ontologyManager.putViewDefinitions(name, version, ID, view_name, view);
		}
		catch(Throwable t) {
			return manageError(t, response);
		}
		return Response.ok().entity(info).build();
	}
	
	@Path("/owlOntology/{name}/version/mapping/{ID}/view/{view_name}")
	@DELETE
	@Produces("application/json")
	@Consumes("application/json")
	@MwsxAvailable
	public Response delete__owlOntology_name_version_mapping_ID_views(@Context HttpServletRequest request,
			@Context HttpServletResponse response, @PathParam("name") String name, @QueryParam("version") String version,
			@PathParam("ID") String ID, @PathParam("view_name") String view_name

	) { 
		version = decode(request, response, version);
		if (LOG_METHODS) logMethodInfo(name, version, ID);
		SQLView info = null;
		try {
			info = MwsxService.ontologyManager.deleteViewDefinitions(name, version, ID, view_name);
		}
		catch(Throwable t) {
			return manageError(t, response);
		}
		return Response.ok().entity(info).build();
	}
	
	
	@Path("/owlOntology/version/mapping/{ID}/views/tableView")
	@POST
	@Produces("application/json")
	@Consumes("application/json")
	@MwsxAvailable
	public Response postSQLEx(
			@Context HttpServletRequest request,
			@Context HttpServletResponse response, @PathParam("ID") String ID,
			SQLQuery query) { 
		
		String q = query.getQueryCode();
		String dbName = query.getDbName().toLowerCase();
		String queryStr = query.getQueryCode().toLowerCase();
		DataSourceInfoEntry info = MwsxService.ontologyManager.getDataSourceInfoEntry(query.getDbName());
		JDBCTestQuery t = new JDBCTestQuery(query, info.getJdbcDriver(), info.getJdbcUrl(), info.getJdbcUsername(), info.getJdbcPassword());

		String queryRes = t.getResults(queryStr);
		if(queryRes == null)	System.err.println("Nessun Risultato dalla query");

		return Response.ok().entity(queryRes).build();
	}
	
	@Path("/owlOntology/version/mapping/{ID}/views/tables")
	@POST
	@Produces("application/json")
	@Consumes("application/json")
	@MwsxAvailable
	public Response getTables(
			@Context HttpServletRequest request,
			@Context HttpServletResponse response, @PathParam("ID") String ID,
			SQLQuery query) {
		DataSourceInfoEntry info = MwsxService.ontologyManager.getDataSourceInfoEntry(query.getDbName());
		JDBCTestQuery t = new JDBCTestQuery(query, info.getJdbcDriver(), info.getJdbcUrl(), info.getJdbcUsername(), info.getJdbcPassword());
		String tableRes = t.getTables();
		if(tableRes == null)	System.err.println("Nessun Risultato dalla getTables");
		return Response.ok().entity(tableRes).build();
	}
	
	
	
	@Path("/owlOntology/{name}/version/mapping/{ID}/views/{viewID}")
	@GET
	@Produces("application/json")
	@Consumes("application/json")
	@MwsxAvailable
	public Response get__owlOntology_name_version_mapping_ID_views_viewID(
			@Context HttpServletRequest request, @Context HttpServletResponse response, @PathParam("name") String name,
			@QueryParam("version") String version, @PathParam("ID") String ID, @PathParam("viewID") String viewID

	) { 
		version = decode(request, response, version);
		if (LOG_METHODS) logMethodInfo(name, version, ID, viewID); 
		ViewMappings info = null;
		try {
			info = MwsxService.ontologyManager.getViewMappings(name, version, ID, viewID);
		}
		catch(Throwable t) {
			return manageError(t, response);
		}
		return Response.ok().entity(info).build();
	}

	@Path("/owlOntology/{name}/version/mapping/{ID}/dependencies")
	@GET
	@Produces("application/json")
	@Consumes("application/json")
	@MwsxAvailable
	public Response get__owlOntology_name_version_mapping_ID_dependencies(
			@Context HttpServletRequest request, @Context HttpServletResponse response, @PathParam("name") String name,
			@QueryParam("version") String version, @PathParam("ID") String ID

	) { 
		version = decode(request, response, version);
		if (LOG_METHODS) logMethodInfo(name, version, ID);
		com.mwsx.model.MappingDependencies dep = null;
		try {
			dep = MwsxService.ontologyManager.getMappingDependencies(name, version, ID);
		}
		catch(Throwable t) {
			return manageError(t, response);
		}
		return Response.ok().entity(dep).build();
	}

	@Path("/owlOntology/{name}/version/querycatalog")
	@GET
	@Produces("application/json")
	@Consumes("application/json")
	@MwsxAvailable
	public Response get__owlOntology_name_version_querycatalog(@Context HttpServletRequest request,
			@Context HttpServletResponse response, @PathParam("name") String name, @QueryParam("version") String version

	) { 
		version = decode(request, response, version);
		if (LOG_METHODS) logMethodInfo(name, version);
		OBDACatalog catalog = null;
		try {
			catalog = MwsxService.ontologyManager.getQueryCatalog(this.getMwsxSession(request), name, version);
			logger.debug(o2j(catalog));
		}
		catch(Throwable t) {
			return manageError(t, response);
		}
		return Response.ok().entity(catalog).build();
	}
	
	@Path("/owlOntology/{name}/version/querycatalog/export")
	@GET
	@Produces("application/json")
	@Consumes("application/json")
	@MwsxAvailable
	public Response get__owlOntology_name_version_querycatalog_export(@Context HttpServletRequest request,
			@Context HttpServletResponse response, @PathParam("name") String name, @QueryParam("version") String version

	) { 
		version = decode(request, response, version);
		if (LOG_METHODS) logMethodInfo(name, version);
		OBDACatalog catalog = null;
		FileInfo info = null;
		try {
			catalog = MwsxService.ontologyManager.getQueryCatalog(this.getMwsxSession(request), name, version);
			ObjectMapper m = new ObjectMapper();
			String catalogContent = m.writeValueAsString(catalog);
			info = new FileInfo();
			info.setFileName("query_catalog.json");
			info.setFileType(".json");
			info.setContent(java.util.Base64.getEncoder().encodeToString(catalogContent.getBytes()));
			logger.debug(o2j(catalog));
		}
		catch(Throwable t) {
			return manageError(t, response);
		}
		return Response.ok().entity(info).build();
	}
	
	@Path("/owlOntology/{name}/version/querycatalog/import")
	@POST
	@Produces("application/json")
	@Consumes("application/json")
	@MwsxAvailable
	public Response get__owlOntology_name_version_querycatalog_import(@Context HttpServletRequest request,
			@Context HttpServletResponse response, @PathParam("name") String name, @QueryParam("version") String version,
			@QueryParam("additive") String additive,
			FileInfo info

	) { 
		version = decode(request, response, version);
		if (LOG_METHODS) logMethodInfo(name, version);
		OBDACatalog catalog = null;
		try {			
			boolean add = false;
			if (additive == null) {
				throw new RuntimeException("Query param 'additive' is mandatory for catalog import functionality");	
			}
			else {
				if (additive.trim().toLowerCase().equals("true")) 
					add = true;
				else if (additive.trim().toLowerCase().equals("false"))
					add = false;
				else
					throw new RuntimeException("Wrong value for query param 'additive': 'true' or 'false' values are admitted");
			}
			ObjectMapper om = new ObjectMapper();
			catalog = om.readValue(java.util.Base64.getDecoder().decode(info.getContent()), OBDACatalog.class);
			if (!add) {
				OBDACatalog oldCatalog = MwsxService.ontologyManager.getQueryCatalog(this.getMwsxSession(request), name, version);
				for (SPARQLQuery query : oldCatalog.getQueryCatalog()) {
					MwsxService.ontologyManager.deleteSPARQLQuery(this.getMwsxSession(request), name, version, query.getQueryID());
				}
			}
			for (SPARQLQuery query : catalog.getQueryCatalog()) {
				MwsxService.ontologyManager.postSPARQLQuery(this.getMwsxSession(request), name, version, query);
			}
			catalog = MwsxService.ontologyManager.getQueryCatalog(this.getMwsxSession(request), name, version);
		}
		catch(Throwable t) {
			return manageError(t, response);
		}
		return Response.ok().entity(catalog).build();
	}

	@Path("/owlOntology/{name}/version/query/{ID}")
	@GET
	@Produces("application/json")
	@Consumes("application/json")
	@MwsxAvailable
	public Response get__owlOntology_name_version_query_ID(@Context HttpServletRequest request,
			@Context HttpServletResponse response, @PathParam("name") String name, @QueryParam("version") String version,
			@PathParam("ID") String ID

	) { 
		version = decode(request, response, version);
		if (LOG_METHODS) logMethodInfo(name, version, ID);
		SPARQLQuery query = null;
		try {
			query = MwsxService.ontologyManager.getSPARQLQuery(this.getMwsxSession(request), name, version, ID);
		}
		catch(Throwable t) {
			return manageError(t, response);
		}
		return Response.ok().entity(query).build();
	}

	@Path("/owlOntology/{name}/version/query")
	@POST
	@Produces("application/json")
	@Consumes("application/json")
	@MwsxAvailable
	public Response post__owlOntology_name_version_query_ID(@Context HttpServletRequest request,
			@Context HttpServletResponse response, @PathParam("name") String name, @QueryParam("version") String version,
			SPARQLQuery query

	) { 
		if (version != null) version = version.replace("\"", "");
		if (LOG_METHODS) logMethodInfo(name, version, o2j(query));
		try {
			query = MwsxService.ontologyManager.postSPARQLQuery(this.getMwsxSession(request), name, version, query);
		}
		catch(Throwable t) {
			return manageError(t, response);
		}
		return Response.ok().entity(query).build();
	}
	
	@Path("/owlOntology/{name}/version/query/{ID}")
	@PUT
	@Produces("application/json")
	@Consumes("application/json")
	@MwsxAvailable
	public Response put__owlOntology_name_version_query_ID(@Context HttpServletRequest request,
			@Context HttpServletResponse response, @PathParam("name") String name, @QueryParam("version") String version,
			@PathParam("ID") String ID, SPARQLQuery query

	) { 
		if (version != null) version = version.replace("\"", "");
		if (LOG_METHODS) logMethodInfo(name, version, query, ID, o2j(query));
		try {
			query = MwsxService.ontologyManager.putSPARQLQuery(this.getMwsxSession(request), name, version, query, ID);
		}
		catch(Throwable t) {
			return manageError(t, response);
		}
		return Response.ok().entity(query).build();
	}

	@Path("/owlOntology/{name}/version/query/{ID}")
	@DELETE
	@Produces("application/json")
	@MwsxAvailable
	public Response delete__owlOntology_name_version_query_ID(@Context HttpServletRequest request,
			@Context HttpServletResponse response, @PathParam("name") String name, @QueryParam("version") String version,
			@PathParam("ID") String ID) 
	{ 
		if (version != null) version = version.replace("\"", "");
		if (LOG_METHODS) logMethodInfo();
		SPARQLQuery queryRet = null;
		try {
			queryRet = MwsxService.ontologyManager.deleteSPARQLQuery(this.getMwsxSession(request), name, version, ID);
		}
		catch(Throwable t) {
			return manageError(t, response);
		}
		return Response.ok().entity(queryRet).build();
	}

	@Path("/owlOntology/{name}/version/mapping/{mapID}/instance")
	@POST
	@Produces("application/json")
	@MwsxAvailable
	public Response post__startMastroInstance(@Context HttpServletRequest request,
			@Context HttpServletResponse response, @PathParam("name") String name, @QueryParam("version") String version,
			@PathParam("mapID") String mapID, MastroProperties props) { 
		if (version != null) version = version.replace("\"", "");
		if (LOG_METHODS) logMethodInfo(name, version, mapID);
		MastroID id = MastroID.getMastroID(name, version, mapID);
		try {
			MwsxSession session = getMwsxSession(request);
			int r = MwsxService.ontologyManager.startMastroInstance(session, id, props);
			return Response.ok().entity(r).build();
		}
		catch(Throwable t) {
			return manageError(t, response);
		}
	}
	
	private MwsxSession getMwsxSession(HttpServletRequest request) {
		logger.debug(request.getClass().getName());
		logger.debug(request.getHeaderNames().toString());
		Enumeration<String> e = request.getHeaderNames();
		while(e.hasMoreElements()) {
			String headerName = e.nextElement();
			logger.debug("   -> " + headerName);
			if (headerName.equalsIgnoreCase(AuthenticationFilter.X_MONOLITH_SESSION_ID)) {
				String id = request.getHeader(headerName);
				logger.debug("     -> " + id);
				return MwsxSessionManager.getSessionManager().getSessionByID(id);
			}
		}
		throw new RuntimeException("Cannot retrieve session");
	}
	
	@Path("/owlOntology/{name}/version/mapping/{mapID}/instance")
	@DELETE
	@Produces("application/json")
	@MwsxAvailable
	public Response delete__stopMastroInstance(@Context HttpServletRequest request,
			@Context HttpServletResponse response, @PathParam("name") String name, @QueryParam("version") String version,
			@PathParam("mapID") String mapID) { 
		if (version != null) version = version.replace("\"", "");
		if (LOG_METHODS) logMethodInfo(name, version, mapID);
		MastroID id = MastroID.getMastroID(name, version, mapID);
		try {
			MwsxSession session = getMwsxSession(request);
			int r = MwsxService.ontologyManager.stopMastroInstance(session, id);
			return Response.ok().entity(r).build();
		}
		catch(Throwable t) {
			return manageError(t, response);
		}
	}
	
	@Path("/owlOntology/{name}/version/mapping/{mapID}/instance")
	@GET
	@Produces("application/json")
	@Consumes("application/json")
	@MwsxAvailable
	public Response get__stopMastroInstance(@Context HttpServletRequest request,
			@Context HttpServletResponse response, @PathParam("name") String name, @QueryParam("version") String version,
			@PathParam("mapID") String mapID) { 
		if (version != null) version = version.replace("\"", "");
		if (LOG_METHODS) logMethodInfo(name, version, mapID);
		MastroID id = MastroID.getMastroID(name, version, mapID);
		try {
			MwsxSession session = getMwsxSession(request);
			OBDAStatus status = MwsxService.ontologyManager.getMastroInstanceStatus(session, id);
			return Response.ok().entity(status).build();
		}
		catch(Throwable t) {
			return manageError(t, response);
		}
	}
	
	@Path("/owlOntology/{name}/version/mapping/{mapID}/query/start")
	@POST
	@Produces("application/json")
	@Consumes("application/json")
	@MwsxAvailable
	public Response post__owlOntology_name_version_query_start(@Context HttpServletRequest request,
			@Context HttpServletResponse response, @PathParam("name") String name, @QueryParam("version") String version,
			@PathParam("mapID") String mapID, @QueryParam("reasoning") boolean reasoning,
			SPARQLQuery sparql) { 
		if (version != null) version = version.replace("\"", "");
		if (LOG_METHODS) logMethodInfo(name, version, mapID, reasoning, o2j(sparql));
		OBDARunQueryInstance rqi = null;
		try {
			if (sparql.isConstruct())
				throw new RuntimeException("The query identified by ID " + sparql.getQueryID() + " is a construct query: use the suitable method");
			rqi = MwsxService.ontologyManager.startNewQuery(this.getMwsxSession(request), name, version, mapID, reasoning, sparql);
		}
		catch(Throwable t) {
			return manageError(t, response);
		}
		return Response.ok().entity(rqi).build();
	}
	
	@Path("/owlOntology/{name}/version/mapping/{mapID}/cquery/start")
	@POST
	@Produces("application/json")
	@Consumes("application/json")
	@MwsxAvailable
	public Response post__owlOntology_name_version_construct_query_start(@Context HttpServletRequest request,
			@Context HttpServletResponse response, @PathParam("name") String name, @QueryParam("version") String version,
			@PathParam("mapID") String mapID, @QueryParam("reasoning") boolean reasoning,
			SPARQLQuery sparql) { 
		if (version != null) version = version.replace("\"", "");
		if (LOG_METHODS) logMethodInfo(name, version, mapID, reasoning, o2j(sparql));
		OBDARunQueryInstance rqi = null;
		try {
			if (sparql.isConstruct())
				rqi = MwsxService.ontologyManager.startNewConstructQuery(this.getMwsxSession(request), name, version, mapID, reasoning, sparql);
			else
				return Response.status(404).entity("Provided SPARQL query is not a construct query").build();
		}
		catch(Throwable t) {
			return manageError(t, response);
		}
		return Response.ok().entity(rqi).build();
	}
	
	@Path("/owlOntology/{name}/version/mapping/{mapID}/query/{queryID}/start")
	@POST
	@Produces("application/json")
	@MwsxAvailable
	public Response post__owlOntology_name_version_query_ID_start(@Context HttpServletRequest request,
			@Context HttpServletResponse response, @PathParam("name") String name, @QueryParam("version") String version,
			@PathParam("mapID") String mapID, @PathParam("queryID") String queryID, @QueryParam("reasoning") boolean reasoning) { 
		if (version != null) version = version.replace("\"", "");
		if (LOG_METHODS) logMethodInfo(name, version, mapID, queryID, reasoning);
		OBDARunQueryInstance rqi = null;
		try {
			rqi = MwsxService.ontologyManager.startQueryFromCatalog(this.getMwsxSession(request), name, version, mapID, queryID, reasoning);
		}
		catch(Throwable t) {
			return manageError(t, response);
		}
		return Response.ok().entity(rqi).build();
	}
	
	@Path("/owlOntology/{name}/version/mapping/{mapID}/cquery/{queryID}/start")
	@POST
	@Produces("application/json")
	@MwsxAvailable
	public Response post__owlOntology_name_version_construct_query_ID_start(@Context HttpServletRequest request,
			@Context HttpServletResponse response, @PathParam("name") String name, @QueryParam("version") String version,
			@PathParam("mapID") String mapID, @PathParam("queryID") String queryID, @QueryParam("reasoning") boolean reasoning) { 
		if (version != null) version = version.replace("\"", "");
		if (LOG_METHODS) logMethodInfo(name, version, mapID, queryID, reasoning);
		OBDARunQueryInstance rqi = null;
		try {
			rqi = MwsxService.ontologyManager.startConstructQueryFromCatalog(this.getMwsxSession(request), name, version, mapID, queryID, reasoning);
		}
		catch(Throwable t) {
			return manageError(t, response);
		}
		return Response.ok().entity(rqi).build();
	}

	@Path("/owlOntology/{name}/version/mapping/{mapID}/query/{queryID}/stop")
	@PUT
	@Produces("application/json")
	@Consumes("application/json")
	@MwsxAvailable
	public Response put__owlOntology_name_version_query_ID_stop(@Context HttpServletRequest request,
			@Context HttpServletResponse response, @PathParam("name") String name, @QueryParam("version") String version,
			@PathParam("mapID") String mapID, @PathParam("queryID") String queryID 

	) { 
		version = decode(request, response, version);
		if (LOG_METHODS) logMethodInfo(name, version, mapID, queryID);
		try {
			return Response.ok().entity(MwsxService.ontologyManager.stopQuery(this.getMwsxSession(request), name, version, mapID, queryID)).build();
		}
		catch(Throwable t) {
			return manageError(t, response);
		}
	}

	@Path("/owlOntology/{name}/version/mapping/{mapID}/query/{queryID}/exportFile")
	@GET
	@Produces("application/json")
	@Consumes("application/json")
	@MwsxAvailable
	public Response get__owlOntology_name_version_query_ID_exportFile(
			@Context HttpServletRequest request, @Context HttpServletResponse response, @PathParam("name") String name,
			@QueryParam("version") String version, @PathParam("mapID") String mapID, 
			@PathParam("queryID") String queryID

	) { 
		version = decode(request, response, version);
		if (LOG_METHODS) logMethodInfo(name, version, mapID, queryID);
		FileInfo export = null;
		try {
			export = MwsxService.ontologyManager
					.exportQuery(this.getMwsxSession(request), name, version, mapID, queryID);
		}
		catch(Throwable t) {
			return manageError(t, response);
		}
		return Response.ok().entity(export).build();
	}

	@Path("/owlOntology/{name}/version/mapping/{mapID}/query/{queryID}/exportQueryReport")
	@GET
	@Produces("application/json")
	@Consumes("application/json")
	@MwsxAvailable
	public Response get__owlOntology_name_version_query_ID_exportQueryReport(
			@Context HttpServletRequest request, @Context HttpServletResponse response, @PathParam("name") String name,
			@QueryParam("version") String version, @PathParam("mapID") String mapID, @PathParam("queryID") String queryID

	) { 
		version = decode(request, response, version);
		if (LOG_METHODS) logMethodInfo(name, version, mapID, queryID);
		FileInfo export = null;
		try {
			export = MwsxService.ontologyManager.exportQueryReport(this.getMwsxSession(request), name, version, mapID, queryID);
		}
		catch(Throwable t) {
			return manageError(t, response);
		}
		return Response.ok().entity(export).build();
	}

	@Path("/owlOntology/{name}/version/mapping/{mapID}/query/{queryID}/status")
	@GET
	@Produces("application/json")
	@Consumes("application/json")
	@MwsxAvailable
	public Response get__owlOntology_name_version_query_ID_status(
			@Context HttpServletRequest request, @Context HttpServletResponse response, @PathParam("name") String name,
			@QueryParam("version") String version, @PathParam("mapID") String mapID, @PathParam("queryID") String queryID

	) { 
		version = decode(request, response, version);
		if (LOG_METHODS) logMethodInfo(name, version, mapID, queryID);
		SPARQLStatus status = null;
		try {
			status = MwsxService.ontologyManager.getQueryStatus(this.getMwsxSession(request), name, version, mapID, queryID);
		}
		catch(Throwable t) {
			return manageError(t, response);
		}
		return Response.ok().entity(status).build();
	}
	
	@Path("/owlOntology/{name}/version/mapping/{mapID}/cquery/{queryID}/status")
	@GET
	@Produces("application/json")
	@Consumes("application/json")
	@MwsxAvailable
	public Response get__owlOntology_name_version_construct_query_ID_status(
			@Context HttpServletRequest request, @Context HttpServletResponse response, @PathParam("name") String name,
			@QueryParam("version") String version, @PathParam("mapID") String mapID, @PathParam("queryID") String queryID

	) { 
		version = decode(request, response, version);
		if (LOG_METHODS) logMethodInfo(name, version, mapID, queryID);
		SPARQLStatus status = null;
		try {
			status = MwsxService.ontologyManager.getConstructQueryStatus(this.getMwsxSession(request), name, version, mapID, queryID);
		}
		catch(Throwable t) {
			return manageError(t, response);
		}
		return Response.ok().entity(status).build();
	}
	
	@Path("/owlOntology/{name}/version/mapping/{mapID}/cquery/{queryID}/export")
	@GET
	@Produces("application/json")
	@Consumes("application/json")
	@MwsxAvailable
	public Response get__owlOntology_name_version_construct_query_ID_export(
			@Context HttpServletRequest request, @Context HttpServletResponse response, @PathParam("name") String name,
			@QueryParam("version") String version, @PathParam("mapID") String mapID, @PathParam("queryID") String queryID

	) { 
		version = decode(request, response, version);
		if (LOG_METHODS) logMethodInfo(name, version, mapID, queryID);
		FileInfo info = null;
		try {
			SPARQLStatus status = MwsxService.ontologyManager.getConstructQueryStatus(this.getMwsxSession(request), name, version, mapID, queryID);
			if (!status.getStatus().contentEquals("FINISHED"))
				throw new RuntimeException("Query running, cannot export result file");
			info = MwsxService.ontologyManager.exportConstructQueryResult(this.getMwsxSession(request), name, version, mapID, queryID);
		}
		catch(Throwable t) {
			return manageError(t, response);
		}
		return Response.ok().entity(info).build();
	}

	@Path("/owlOntology/{name}/version/mapping/{mapID}/query/{queryID}/results")
	@GET
	@Produces("application/json")
	@Consumes("application/json")
	@MwsxAvailable
	public Response get__owlOntology_name_version_query_ID_results(
			@Context HttpServletRequest request, @Context HttpServletResponse response, @PathParam("name") String name,
			@QueryParam("version") String version, @PathParam("mapID") String mapID, @PathParam("queryID") String queryID,
			@QueryParam("pagesize") int pagesize, @QueryParam("pagenumber") int pagenumber) { 
		version = decode(request, response, version);
		
		if (LOG_METHODS) logMethodInfo(name, version, mapID, queryID, pagesize, pagenumber);
		SPARQLResults result = null;
		try {
			result = MwsxService.ontologyManager.getQueryResult(this.getMwsxSession(request), name, version, mapID, queryID, pagesize, pagenumber);
		}
		catch(Throwable t) {
			return manageError(t, response);
		}
		return Response.ok().entity(result).build();
	}
	
	@Path("/owlOntology/{name}/version/mapping/{mapID}/cquery/{queryID}/results")
	@GET
	@Produces("application/json")
	@Consumes("application/json")
	@MwsxAvailable
	public Response get__owlOntology_name_version_construct_query_ID_results(
			@Context HttpServletRequest request, @Context HttpServletResponse response, @PathParam("name") String name,
			@QueryParam("version") String version, @PathParam("mapID") String mapID, @PathParam("queryID") String queryID,
			@QueryParam("pagesize") int pagesize, @QueryParam("pagenumber") int pagenumber) { 
		version = decode(request, response, version);
		if (LOG_METHODS) logMethodInfo(name, version, mapID, queryID, pagesize, pagenumber);
		SPARQLResults result = null;
		try {
			result = MwsxService.ontologyManager.getConstructQueryResult(this.getMwsxSession(request), name, version, mapID, queryID, pagesize, pagenumber);
		}
		catch(Throwable t) {
			return manageError(t, response);
		}
		return Response.ok().entity(result).build();
	}

	@Path("/owlOntology/{name}/version/mapping/{mapID}/query/{queryID}/ontologyRewritings")
	@GET
	@Produces("application/json")
	@Consumes("application/json")
	@MwsxAvailable
	public Response get__owlOntology_name_version_query_ID_ontologyRewritings(
			@Context HttpServletRequest request, @Context HttpServletResponse response, @PathParam("name") String name,
			@QueryParam("version") String version, @PathParam("mapID") String mapID, @PathParam("queryID") String queryID, @QueryParam("pagesize") int pagesize,
			@QueryParam("pagenumber") int pagenumber) { 
		version = decode(request, response, version);
		if (LOG_METHODS) logMethodInfo(name, version, mapID, queryID, pagesize, pagenumber);
		OntologyRewritings result = null;
		try {
			result = MwsxService.ontologyManager.getOntologyRewritings(this.getMwsxSession(request), name, version, mapID, queryID, pagesize, pagenumber);
		}
		catch(Throwable t) {
			return manageError(t, response);
		}
		return Response.ok().entity(result).build();
	}

	@Path("/owlOntology/{name}/version/mapping/{mapID}/query/{queryID}/mappingRewritings")
	@GET
	@Produces("application/json")
	@Consumes("application/json")
	@MwsxAvailable
	public Response get__owlOntology_name_version_query_ID_mappingRewritings(
			@Context HttpServletRequest request, @Context HttpServletResponse response, @PathParam("name") String name,
			@QueryParam("version") String version, @PathParam("mapID") String mapID, @PathParam("queryID") String queryID, 
			@QueryParam("pagesize") int pagesize, @QueryParam("pagenumber") int pagenumber) { 
		version = decode(request, response, version);
		if (LOG_METHODS) logMethodInfo(name, version, mapID, queryID, pagesize, pagenumber);
		MappingRewritings result = null;
		try {
			result = MwsxService.ontologyManager.getMappingRewritings(this.getMwsxSession(request), name, version, mapID, queryID, pagesize, pagenumber);
		}
		catch(Throwable t) {
			return manageError(t, response);
		}
		return Response.ok().entity(result).build();
	}

	@Path("/owlOntology/{name}/version/mapping/{mapID}/query/{queryID}/viewRewritings")
	@GET
	@Produces("application/json")
	@Consumes("application/json") 
	@MwsxAvailable
	public Response get__owlOntology_name_version_query_ID_viewRewritings(
			@Context HttpServletRequest request, @Context HttpServletResponse response, @PathParam("name") String name,
			@QueryParam("version") String version, @PathParam("mapID") String mapID, @PathParam("queryID") String queryID, 
			@QueryParam("pagesize") int pagesize, @QueryParam("pagenumber") int pagenumber) { 
		version = decode(request, response, version);
		if (LOG_METHODS) logMethodInfo(name, version, mapID, queryID, pagesize, pagenumber);
		ViewRewritings result = null;
		try {
			result = MwsxService.ontologyManager.getViewRewritings(this.getMwsxSession(request), name, version, mapID, queryID, pagesize, pagenumber);
		}
		catch(Throwable t) {
			return manageError(t, response);
		}
		return Response.ok().entity(result).build();
	}
	
	@Path("/datasource/{name}")
	@GET
	@Produces("application/json")
	@Consumes("application/json") 
	@MwsxAvailable
	public Response get__datasource(
			@Context HttpServletRequest request, @Context HttpServletResponse response, @PathParam("name") String name) { 
		if (LOG_METHODS) logMethodInfo(name);
		DataSourceInfoEntry result = null;
		try {
			result = MwsxService.ontologyManager.getDataSourceInfoEntry(name);
		}
		catch(Throwable t) {
			return manageError(t, response);
		}
		return Response.ok().entity(result).build();
	}
	
	@Path("/datasource/{name}")
	@PUT
	@Produces("application/json")
	@Consumes("application/json") 
	@MwsxAvailable
	public Response put__datasource(
			@Context HttpServletRequest request, @Context HttpServletResponse response, @PathParam("name") String name, DataSourceInfoEntry info) { 
		if (LOG_METHODS) logMethodInfo(name);
		DataSourceInfoEntry result = null;
		try {
			if (!info.getId().equals(name))
				throw new RuntimeException("Data source info entry in the payload does not match the path 'name' provided in the URL");
			result = MwsxService.ontologyManager.putDataSourceInfoEntry(name, info);
		}
		catch(Throwable t) {
			return manageError(t, response);
		}
		return Response.ok().entity(result).build();
	}
	
	@Path("/datasource")
	@POST
	@Produces("application/json")
	@Consumes("application/json") 
	public Response post__datasource(
			@Context HttpServletRequest request, @Context HttpServletResponse response, DataSourceInfoEntry info) { 
		if (LOG_METHODS) logMethodInfo();
		DataSourceInfoEntry result = null;
		try {
			result = MwsxService.ontologyManager.postDataSourceInfoEntry(info);
		}
		catch(Throwable t) {
			return manageError(t, response);
		}
		return Response.ok().entity(result).build();
	}
	
	@Path("/datasource")
	@GET
	@Produces("application/json")
	@Consumes("application/json") 
	@MwsxAvailable
	public Response get__datasource_list(
			@Context HttpServletRequest request, @Context HttpServletResponse response) { 
		if (LOG_METHODS) logMethodInfo();
		List<DataSourceInfoEntry> result = null;
		try {
			result = MwsxService.ontologyManager.getDataSourceInfoEntries(this.getMwsxSession(request).getUser());
		}
		catch(Throwable t) {
			return manageError(t, response);
		}
		return Response.ok().entity(result).build();
	}
	
	@Path("/datasource/drivers")
	@GET
	@Produces("application/json")
	@Consumes("application/json") 
	@MwsxAvailable
	public Response get__datasource_driver(
			@Context HttpServletRequest request, @Context HttpServletResponse response) { 
		if (LOG_METHODS) logMethodInfo();
		List<String> result = null;
		try {
			result = MwsxService.ontologyManager.getDataSourceDrivers();
		}
		catch(Throwable t) {
			return manageError(t, response);
		}
		return Response.ok().entity(result).build();
	}
	
	@Path("/datasource/{name}")
	@DELETE
	@Produces("application/json")
	@Consumes("application/json") 
	@MwsxAvailable
	public Response delete__datasource(
			@Context HttpServletRequest request, @Context HttpServletResponse response, @PathParam("name") String name) { 
		if (LOG_METHODS) logMethodInfo(name);
		DataSourceInfoEntry result = null;
		try {
			result = MwsxService.ontologyManager.deleteDataSourceInfoEntry(name);
		}
		catch(Throwable t) {
			return manageError(t, response);
		}
		return Response.ok().entity(result).build();
	}
	
	@Path("/lastLoaded/ontology")
	@GET
	@Produces("application/json")
	@Consumes("application/json") 
	@MwsxAvailable
	public Response get_lastLoaded_ontology(
			@Context HttpServletRequest request, @Context HttpServletResponse response) { 
		if (LOG_METHODS) logMethodInfo();
		List<OntologyOpeningEvent> result = null;
		try {
			result = MwsxService.ontologyManager.getLastLoadedOntologies(this.getMwsxSession(request).getUser());
		}
		catch(Throwable t) {
			return manageError(t, response);
		}
		return Response.ok().entity(result).build();
	}
	
	@Path("/logger/mastroapi")
	@GET
	@MwsxAvailable
	public int get_set_mastroapi_logger(@QueryParam("mode") String mode) {
		System.out.println("Changing mastro log: " + mode);
		try {
			if (mode!= null && mode.toLowerCase().trim().equals("on")) {
				LoggerContext lc = (LoggerContext) LoggerFactory.getILoggerFactory();
				ch.qos.logback.classic.Logger l = lc.getLogger(MastroAPI.class);
				l.setLevel(Level.DEBUG);
			}
			if (mode!= null && mode.toLowerCase().trim().equals("off")) {
				LoggerContext lc = (LoggerContext) LoggerFactory.getILoggerFactory();
				ch.qos.logback.classic.Logger l = lc.getLogger(MastroAPI.class);
				l.setLevel(Level.OFF);
			}
			return 0;
		}
		catch(Throwable t) {
			t.printStackTrace();
			return 1;
		}
	}
	
	@Path("/logger/service")
	@GET
	@MwsxAvailable
	public int get_set_service_logger(@QueryParam("mode") String mode) {
		System.out.println("Changing service log: " + mode);
		try {
			if (mode!= null && mode.toLowerCase().trim().equals("on")) {
				LoggerContext lc = (LoggerContext) LoggerFactory.getILoggerFactory();
				ch.qos.logback.classic.Logger l = lc.getLogger(MwsxService.class);
				l.setLevel(Level.DEBUG);
			}
			if (mode!= null && mode.toLowerCase().trim().equals("off")) {
				LoggerContext lc = (LoggerContext) LoggerFactory.getILoggerFactory();
				ch.qos.logback.classic.Logger l = lc.getLogger(MwsxService.class);
				l.setLevel(Level.OFF);
			}
			return 0;
		}
		catch(Throwable t) {
			t.printStackTrace();
			return 1;
		}
	}
	
	@Path("/logger/monitor")
	@GET
	@MwsxAvailable
	public int get_set_monitor_logger(@QueryParam("mode") String mode) {
		System.out.println("Changing monitor log: " + mode);
		try {
			if (mode!= null && mode.toLowerCase().trim().equals("on")) {
				LoggerContext lc = (LoggerContext) LoggerFactory.getILoggerFactory();
				ch.qos.logback.classic.Logger l = lc.getLogger(OBDAMainMemoryQueryMonitor.class);
				l.setLevel(Level.DEBUG);
			}
			if (mode!= null && mode.toLowerCase().trim().equals("off")) {
				LoggerContext lc = (LoggerContext) LoggerFactory.getILoggerFactory();
				ch.qos.logback.classic.Logger l = lc.getLogger(OBDAMainMemoryQueryMonitor.class);
				l.setLevel(Level.OFF);
			}
			return 0;
		}
		catch(Throwable t) {
			t.printStackTrace();
			return 1;
		}
	}
	
	@Path("/error")
	@GET
	@MwsxAvailable
	public Response simulate_error() {
		return Response.serverError().entity("Ciao Giacomerio").build();
	}
	
	/************************************************************/
	/**    S T A T I C 	     F A C I L I T I E S               **/
	/************************************************************/
	
	public static String o2j(Object o) {
		try {
			ObjectMapper om = new ObjectMapper();
			om.enable(SerializationFeature.INDENT_OUTPUT);
			return om.writeValueAsString(o);
		}
		catch(Exception ex) {
			System.err.println("Cannot serialize object " + o.getClass() + ": " + ex.getMessage());
			return o2s(o);
		}
	}
	
	public static String o2s(Object o) {
		try  {
			String d = o.getClass().getName() + " {";
			for (Field field : o.getClass().getDeclaredFields()) {
				d += "\n" + field.getName() + " -> " + field.get(o);
			}
			return d.concat("\n}");
		}catch(IllegalAccessException ex) {
			System.err.println("Cannot create string representation of object via reflection " + o.getClass());
			return "gnaafaccio";
		}
	}

	private String decode(HttpServletRequest request, HttpServletResponse response, String version) {
		if (version != null) {
			try {
				version = URLDecoder.decode(version, "UTF-8");
			} catch (UnsupportedEncodingException e) {
				response.setHeader("MASTRO-MESSAGE", "Error decoding 'version' query parameter: " + e.getMessage());
				response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
				e.printStackTrace();
			}
		}
		return version;
	}
	
	static Response manageError(Throwable t, @Context HttpServletResponse response) {
		logger.error("-------------------  E R R O R      S T A R T  -------------------------");
		System.out.println("-------------------  E R R O R      S T A R T  -------------------------");
		response.setHeader("X-MASTRO-MESSAGE", "Error: [" + t.getClass().getName() + "] " + t.getMessage());
		if (t instanceof NoSuchElementException)
			response.setStatus(HttpServletResponse.SC_NOT_FOUND);
		response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
		t.printStackTrace();
		logger.error(t.getMessage(), t);
		logger.error("-------------------  E R R O R        E N D  -------------------------");
		return Response.serverError().entity(t).build();
	}

}