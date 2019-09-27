package com.mws.model;

import java.util.LinkedList;
import java.util.List;

public class OntologyInfo {

	String id;
	String iri;
	String description;
	List<OntologyVersionInfo> versions;
	int classesNumber;
	int objectPropertiesNumber;
	int dataPropertiesNumber;
	int axiomsNumber;
	
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getIri() {
		return iri;
	}
	public void setIri(String iri) {
		this.iri = iri;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public List<OntologyVersionInfo> getVersions() {
		return versions;
	}
	public void setVersions(List<OntologyVersionInfo> version) {
		this.versions = version;
	}
	public int getClassesNumber() {
		return classesNumber;
	}
	public void setClassesNumber(int classesNumber) {
		this.classesNumber = classesNumber;
	}
	public int getObjectPropertiesNumber() {
		return objectPropertiesNumber;
	}
	public void setObjectPropertiesNumber(int objectPropertiesNumber) {
		this.objectPropertiesNumber = objectPropertiesNumber;
	}
	public int getDataPropertiesNumber() {
		return dataPropertiesNumber;
	}
	public void setDataPropertiesNumber(int dataPropertiesNumber) {
		this.dataPropertiesNumber = dataPropertiesNumber;
	}
	public int getAxiomsNumber() {
		return axiomsNumber;
	}
	public void setAxiomsNumber(int axiomsNumber) {
		this.axiomsNumber = axiomsNumber;
	}	
	
	public void addVersionInfo(String version, String description, String date) {
		if (this.versions == null)
			this.versions = new LinkedList<OntologyVersionInfo>();
		OntologyVersionInfo v = new OntologyVersionInfo();
		v.setDate(date);
		v.setDescription(description);
		v.setVersion(version);
		this.versions.add(v);
	}
	
	public boolean equals(Object o) {
		if (o == null) return false;
		if (this.getClass().equals(o.getClass())) {
			return this.getId().equals(((OntologyInfo)o).getId());
		}
		return false;
	}
	
	public String toString() {
		return this.getId() + ", " + this.getIri();
	}
	
}
