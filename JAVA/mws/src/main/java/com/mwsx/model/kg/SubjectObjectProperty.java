package com.mwsx.model.kg;

import java.util.List;

public class SubjectObjectProperty {
	
	String predicate;
	List<ObjectType> objects_types;
	String predicate_short;
	int instance_count;
    int page_count;
    
	public String getPredicate() {
		return predicate;
	}
	public void setPredicate(String predicate) {
		this.predicate = predicate;
	}
	public List<ObjectType> getObjects_types() {
		return objects_types;
	}
	public void setObjects_types(List<ObjectType> objects_types) {
		this.objects_types = objects_types;
	}
	public String getPredicate_short() {
		return predicate_short;
	}
	public void setPredicate_short(String predicate_short) {
		this.predicate_short = predicate_short;
	}
	public int getInstance_count() {
		return instance_count;
	}
	public void setInstance_count(int instance_count) {
		this.instance_count = instance_count;
	}
	public int getPage_count() {
		return page_count;
	}
	public void setPage_count(int page_count) {
		this.page_count = page_count;
	}
    
    
}
