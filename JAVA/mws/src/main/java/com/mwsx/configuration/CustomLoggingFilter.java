package com.mwsx.configuration;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
 
import javax.ws.rs.container.ContainerRequestContext;
import javax.ws.rs.container.ContainerRequestFilter;
import javax.ws.rs.container.ContainerResponseContext;
import javax.ws.rs.container.ContainerResponseFilter;
import javax.ws.rs.core.MultivaluedMap;

import org.glassfish.jersey.filter.LoggingFilter;
import org.glassfish.jersey.message.internal.ReaderWriter;
 
public class CustomLoggingFilter extends LoggingFilter implements ContainerRequestFilter, ContainerResponseFilter 
{
	
	public static boolean LOG_HEADERS = false;
	
    @Override
    public void filter(ContainerRequestContext requestContext)  throws IOException 
    {
        StringBuilder sb = new StringBuilder();
        sb.append("User: ").append(requestContext.getSecurityContext().getUserPrincipal() == null ? "unknown"
                        : requestContext.getSecurityContext().getUserPrincipal());
        sb.append(" - Path: ").append(requestContext.getUriInfo().getPath());
        MultivaluedMap<String, String> m = requestContext.getHeaders();
        for (String k : m.keySet()) {
        	sb.append(" HEADER " + k + ": ").append(m.get(k)).append("\n");
        }
//        sb.append(" - Entity: \n").append(getEntityBody(requestContext));
        if (LOG_HEADERS) System.out.println("HTTP REQUEST : " + sb.toString());
    }
 
    private String getEntityBody(ContainerRequestContext requestContext) 
    {
        ByteArrayOutputStream out = new ByteArrayOutputStream();
        InputStream in = requestContext.getEntityStream();
         
        final StringBuilder b = new StringBuilder();
        try
        {
            ReaderWriter.writeTo(in, out);
 
            byte[] requestEntity = out.toByteArray();
            if (requestEntity.length == 0)
            {
                b.append("").append("\n");
            }
            else
            {
                b.append(new String(requestEntity)).append("\n");
            }
            requestContext.setEntityStream( new ByteArrayInputStream(requestEntity) );
 
        } catch (IOException ex) {
            //Handle logging error
        }
        return b.toString();
    }
 
    @Override
    public void filter(ContainerRequestContext requestContext, ContainerResponseContext responseContext) throws IOException 
    {
        StringBuilder sb = new StringBuilder();
        MultivaluedMap<String, Object> m = responseContext.getHeaders();
        for (String k : m.keySet())
        	sb.append(" HEADER: " + k + ": ").append(m.get(k) + "\n");
        sb.append(" - Entity: ").append(responseContext.getEntity());
        if (LOG_HEADERS) System.out.println("HTTP RESPONSE : " + sb.toString());
    }
}