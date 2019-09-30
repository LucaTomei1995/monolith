package com.mwsx.model;

public class Permission {

	String domain;
	String action;
	String id;
	// getters
	public String getDomain(){return this.domain;}
	public String getAction(){return this.action;}
	public String getId(){return this.id;}
	// setters
	public void setDomain(String _domain){this.domain = _domain;}
	public void setAction(String _action){this.action = _action;}
	public void setId(String _id){this.id = _id;}
	
	public String toString() {
		String desc = domain + ":" + action + ":" + id;
		if (desc.equals("*:*:*"))
			return "*";
		else if (desc.endsWith(":*:*"))
			return desc.replace(":*:*", ":*");
		else
			return desc;
	}
	
	public int hashCode() {
		return this.toString().hashCode();
	}

	public boolean equals(Object o) {
		if (o == null)
			return false;
		if (o == this)
			return true;
		if (this.getClass().equals(o.getClass())) {
			Permission oo = (Permission)o;
			return this.toString().equals(oo.toString());
		}
		return false;
	}
	
}
