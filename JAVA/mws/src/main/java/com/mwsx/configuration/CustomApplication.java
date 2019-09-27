package com.mwsx.configuration;

import org.glassfish.jersey.jackson.JacksonFeature;
import org.glassfish.jersey.server.ResourceConfig;
 
public class CustomApplication extends ResourceConfig 
{
    public CustomApplication() 
    { 
        packages("com.mwsx.configuration");
        register(JacksonFeature.class);
        register(CustomLoggingFilter.class);
        register(AuthenticationFilter.class);
        register(CORSFilter.class);
        
    }
}