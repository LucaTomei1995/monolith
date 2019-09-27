package com.mwsx.model;

public class MastroID {

	OntologyID ontologyID;
	String mappingID;
	
	public static MastroID getMastroID(String n, String v, String m) {
		OntologyID oid = OntologyID.getOntologyID(n, v);
		MastroID mid = new MastroID();
		mid.setOntologyID(oid);
		mid.setMappingID(m);
		return mid;
	}
	
	public OntologyID getOntologyID() {
		return ontologyID;
	}

	public void setOntologyID(OntologyID ontologyID) {
		this.ontologyID = ontologyID;
	}

	public String getMappingID() {
		return mappingID;
	}
	public void setMappingID(String mappingID) {
		this.mappingID = mappingID;
	}
	
	public int hashCode() {
		return 3 * this.ontologyID.hashCode() + 11 * this.mappingID.hashCode();
	}
	
	public boolean equals(Object o) {
		if (o == null) 
			return false;
		if (o == this)
			return true;
		if (this.getClass().equals(o.getClass())) {
			MastroID mid = (MastroID) o;
			if (this.ontologyID.equals(mid.getOntologyID()) && this.mappingID.equals(mid.getMappingID()))
				return true;
			else
				return false;
		}
		else
			return false;
	}
	
	public String toString() {
		return "(" + this.ontologyID.getOntologyName() + ", " + this.ontologyID.getOntologyVersion() + ", " + this.getMappingID() + ")";
	}
	
}
