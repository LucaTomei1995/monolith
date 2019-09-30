package com.mws.model;

import java.util.LinkedList;
import java.util.List;

public class MethodInfo {

	String name;
	String method;
	String path;
	List<String> pathParams;
	List<String> queryParams;
	List<String> headerParams;
	List<String> bodyParams;
	List<String> bodyParamTypes;
	String returnType;
	boolean isReturnTypeList;
	String innerReturnType;
	boolean isReturnTypeListOfList;
	String innerListReturnType;
	boolean isAvailable;
	
	public boolean isReturnTypeList() {
		return isReturnTypeList;
	}
	public void setReturnTypeList(boolean isReturnTypeList) {
		this.isReturnTypeList = isReturnTypeList;
	}
	public String getInnerReturnType() {
		return innerReturnType;
	}
	public void setInnerReturnType(String innerReturnType) {
		this.innerReturnType = innerReturnType;
	}
	public String getReturnType() {
		return returnType;
	}
	public void setReturnType(String returnType) {
		this.returnType = returnType;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public List<String> getPathParams() {
		return pathParams;
	}
	public void setPathParams(List<String> params) {
		this.pathParams = params;
	}
	public List<String> getQueryParams() {
		return queryParams;
	}
	public void setQueryParams(List<String> params) {
		this.queryParams = params;
	}
	public String getMethod() {
		return method;
	}
	public void setMethod(String method) {
		this.method = method;
	}
	public String getPath() {
		return path;
	}
	public void setPath(String path) {
		this.path = path;
	}
	public boolean isReturnTypeListOfList() {
		return isReturnTypeListOfList;
	}
	public void setReturnTypeListOfList(boolean isReturnTypeListOfList) {
		this.isReturnTypeListOfList = isReturnTypeListOfList;
	}
	public String getInnerListReturnType() {
		return innerListReturnType;
	}
	public void setInnerListReturnType(String innerListReturnType) {
		this.innerListReturnType = innerListReturnType;
	}
	public boolean isAvailable() {
		return isAvailable;
	}
	public void setAvailable(boolean avail) {
		this.isAvailable = avail;
	}
	
	public List<String> getBodyParams() {
		return bodyParams;
	}
	public List<String> getBodyParamTypes() {
		return bodyParamTypes;
	}

	public List<String> getHeaderParams() {
		return headerParams;
	}

	
	// service methods
	public void addPathParam(String value) {
		if (this.pathParams == null) {
			this.pathParams = new LinkedList<String>();
		}
		this.pathParams.add(value);
	}
	
	public void addQueryParam(String value) {
		if (this.queryParams == null) {
			this.queryParams = new LinkedList<String>();
		}
		this.queryParams.add(value);
	}
	
	public void addBodyParam(String name, String type) {
		if (this.bodyParams == null) {
			this.bodyParams = new LinkedList<String>();
		}
		if (this.bodyParamTypes == null) {
			this.bodyParamTypes = new LinkedList<String>();
		}
		this.bodyParams.add(name);
		this.bodyParamTypes.add(type);
	}
	
	public boolean equals(Object o) {
		if (o == null) return false;
		if (o.getClass().equals(o.getClass())) {
			return ((MethodInfo)o).getName().equals(this.getName());
		}
		return false;
	}
	
	public void addHeaderParam(String value) {
		if (this.headerParams == null) {
			this.headerParams = new LinkedList<String>();
		}
		this.headerParams.add(value);
		
	}
	
}
