package com.mws.model;

import java.util.LinkedList;
import java.util.List;

public class OntologyAlphabet {

	List<ClassInfo> classes;
	List<ObjectPropertyInfo> objectProperties;
	List<DataPropertyInfo> dataProperties;
	public List<ClassInfo> getClasses() {
		return classes;
	}
	public void setClasses(List<ClassInfo> classes) {
		this.classes = classes;
	}
	public List<ObjectPropertyInfo> getObjectProperties() {
		return objectProperties;
	}
	public void setObjectProperties(List<ObjectPropertyInfo> objectProperties) {
		this.objectProperties = objectProperties;
	}
	public List<DataPropertyInfo> getDataProperties() {
		return dataProperties;
	}
	public void setDataProperties(List<DataPropertyInfo> dataProperties) {
		this.dataProperties = dataProperties;
	}
	
	public void addClassInfo(ClassInfo info) {
		if (this.classes == null)
			this.classes = new LinkedList<ClassInfo>();
		this.classes.add(info);
	}
	
	public void addObjectpropertyInfo(ObjectPropertyInfo info) {
		if (this.objectProperties == null)
			this.objectProperties = new LinkedList<ObjectPropertyInfo>();
		this.objectProperties.add(info);
	}
	
	public void addDatapropertyInfo(DataPropertyInfo info) {
		if (this.dataProperties == null)
			this.dataProperties = new LinkedList<DataPropertyInfo>();
		this.dataProperties.add(info);
	}
	
}
