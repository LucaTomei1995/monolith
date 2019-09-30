package com.mwsx.services;

import java.lang.annotation.Annotation;
import java.lang.reflect.Method;
import java.lang.reflect.Parameter;
import java.lang.reflect.ParameterizedType;
import java.lang.reflect.Type;
import java.util.LinkedList;
import java.util.List;

import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.HeaderParam;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.QueryParam;

import com.mws.model.MethodInfo;

public class MwsxAvailabilityTools {

	public static List<MethodInfo> getProvidedMethodsList(Class<?> c) {
		List<MethodInfo> infos = new LinkedList<MethodInfo>();
		for (Method method : c.getMethods()) {
			Path path = method.getAnnotation(Path.class);
			if (path != null) {
				String pathValue = path.value();
				MethodInfo info = new MethodInfo();
				info.setName(method.getName());
				info.setPath(pathValue);
				if (!pathValue.startsWith("help")) {
					for (Annotation annotation : method.getAnnotations()) {
						if (annotation instanceof GET) {
							info.setMethod("GET");
						}
						if (annotation instanceof POST) {
							info.setMethod("POST");
						}
						if (annotation instanceof PUT) {
							info.setMethod("PUT");
						}
						if (annotation instanceof DELETE) {
							info.setMethod("DELETE");
						}
						if (annotation instanceof MwsxAvailable) {
							info.setAvailable(true);
						}
					}
					for (Parameter param : method.getParameters()) {
						PathParam pathParam = param.getAnnotation(PathParam.class);
						if (pathParam != null) {
							info.addPathParam(pathParam.value());
							continue;
						}
						QueryParam queryParam = param.getAnnotation(QueryParam.class);
						if (queryParam != null) {
							info.addQueryParam(queryParam.value());
							continue;
						}
						HeaderParam headerParam = param.getAnnotation(HeaderParam.class);
						if (headerParam != null) {
							info.addHeaderParam(headerParam.value());
							continue;
						}
						if (param.getAnnotations().length == 0) {
							String name = param.getName();
							String type = param.getType().getCanonicalName();
//							System.out.println(" --> " + method.getName() + " body param " + type + ", " + name);
							info.addBodyParam(name, type);
						}
					}
					Type returnType = method.getGenericReturnType();
					info.setReturnType(returnType.getTypeName());
					if (returnType instanceof ParameterizedType) {
						ParameterizedType pt = (ParameterizedType) returnType;
						info.setReturnTypeList(true);
						info.setInnerReturnType(pt.getActualTypeArguments()[0].getTypeName());
					}
					infos.add(info);					
				}
			}
		}
		return infos;
	}	

}