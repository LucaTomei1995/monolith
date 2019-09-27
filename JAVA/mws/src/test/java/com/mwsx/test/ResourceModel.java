package com.mwsx.test;

import java.util.List;

public class ResourceModel {

	String path;
	String javaMethodName;
	List<String> templateParams;
	boolean isGetSupported;
	boolean isPostSupported;
	boolean isPutSupported;
	boolean isDeleteSupported;

	public String toString() {
		return String.valueOf(path) + templateParams;
	}
	
}

