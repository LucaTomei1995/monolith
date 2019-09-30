package com.mwsx.model.kg;

import java.util.List;

public class SubjectDataProperty {
	String predicate;
	List<ObjectLiteral> objects;
	String predicate_short;
	int instance_count;
    int page_count;
	public String getPredicate() {
		return predicate;
	}
	public void setPredicate(String predicate) {
		this.predicate = predicate;
	}
	public List<ObjectLiteral> getObjects() {
		return objects;
	}
	public void setObjects(List<ObjectLiteral> objects) {
		this.objects = objects;
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
