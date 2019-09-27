package com.mwsx.model;

public class OntologyID {
	
	String ontologyName;
	String ontologyVersion;
	
	public static OntologyID getOntologyID(String n, String v) {
		OntologyID oid = new OntologyID();
		oid.setOntologyName(n);
		oid.setOntologyVersion(v);
		return oid;
	}
	
	public String getOntologyName() {
		return ontologyName;
	}
	public void setOntologyName(String ontologyName) {
		this.ontologyName = ontologyName;
	}
	public String getOntologyVersion() {
		return ontologyVersion;
	}
	public void setOntologyVersion(String ontologyVersion) {
		this.ontologyVersion = ontologyVersion;
	}
	
	public int hashCode() {
		return 3 * this.ontologyName.hashCode() + 5 * this.ontologyVersion.hashCode();
	}
	
	public boolean equals(Object o) {
		if (o==null)
			return false;
		else  {
			if (o == this ) {
				return true;
			}
			else {
				if (this.getClass().equals(o.getClass())) {
					OntologyID id = (OntologyID) o;
					if (id.ontologyName.equals(this.ontologyName) && id.ontologyVersion.equals(this.ontologyVersion))
						return true;
					else
						return false;
				}
				else
					return false;
			}
		}
	}
	
	public String toString() {
		return "(" + this.ontologyName + ", " + this.ontologyVersion + ")";
	}
}
