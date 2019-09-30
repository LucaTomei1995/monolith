package com.mwsx.model.kg;

public class InstancePage {
	
	InstanceLabelType title;
	InstanceSubjectTripsGroup subjects;
    InstanceObjectTripsGroup objects;
    
	public InstanceLabelType getTitle() {
		return title;
	}
	public void setTitle(InstanceLabelType title) {
		this.title = title;
	}
	public InstanceSubjectTripsGroup getSubjects() {
		return subjects;
	}
	public void setSubjects(InstanceSubjectTripsGroup subjects) {
		this.subjects = subjects;
	}
	public InstanceObjectTripsGroup getObjects() {
		return objects;
	}
	public void setObjects(InstanceObjectTripsGroup objects) {
		this.objects = objects;
	}
    
    
}
