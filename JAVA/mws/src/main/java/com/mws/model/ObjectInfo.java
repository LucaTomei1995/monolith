package com.mws.model;

import java.util.LinkedList;
import java.util.List;

public class ObjectInfo {

	String name;
	List<FieldInfo> fields;
	
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public List<FieldInfo> getFields() {
		return fields;
	}
	public void setFields(List<FieldInfo> fields) {
		this.fields = fields;
	}
	
	public void addFieldInfo(String name, String type) {
		if (this.fields == null)
			this.fields = new LinkedList<FieldInfo>();
		FieldInfo info = new FieldInfo();
		info.setName(name);
		info.setType(type);
		this.fields.add(info);
	}
	
	public void addFieldInfo(FieldInfo info) {
		if (this.fields == null)
			this.fields = new LinkedList<FieldInfo>();
		this.fields.add(info);
	}
	
}
