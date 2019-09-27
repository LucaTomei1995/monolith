package com.mwsx.model;

import java.util.List;

public class Entities {

	List<Entity> classEntities;
	List<Entity> objectPropertyEntities;
	List<Entity> dataPropertyEntities;
	
	public List<Entity> getClassEntities() {
		return classEntities;
	}
	public void setClassEntities(List<Entity> classEntities) {
		this.classEntities = classEntities;
	}
	public List<Entity> getObjectPropertyEntities() {
		return objectPropertyEntities;
	}
	public void setObjectPropertyEntities(List<Entity> objectPropertyEntities) {
		this.objectPropertyEntities = objectPropertyEntities;
	}
	public List<Entity> getDataPropertyEntities() {
		return dataPropertyEntities;
	}
	public void setDataPropertyEntities(List<Entity> dataPropertyEntities) {
		this.dataPropertyEntities = dataPropertyEntities;
	}
	
}
