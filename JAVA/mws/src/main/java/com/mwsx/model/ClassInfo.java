package com.mwsx.model;

import java.util.List;
// generated by CodeGeneration.java @ MR (tm)

public class ClassInfo {
	// fields
	Entity currentEntity;
	IRI iri;
	List<DiagramNode> entityDiagrams;
	List<Label> classDescriptions;
	List<Entity> equivalentClasses;
	List<Entity> subClasses;
	List<Entity> superClasses;
	List<Entity> disjointClasses;
	List<Participation> objectPropertiesParticipations;
	public List<Participation> getObjectPropertiesParticipations() {
		return objectPropertiesParticipations;
	}
	public List<Participation> getDataPropertiesParticipations() {
		return dataPropertiesParticipations;
	}
	public void setDataPropertiesParticipations(List<Participation> dataPropertiesParticipations) {
		this.dataPropertiesParticipations = dataPropertiesParticipations;
	}
	public void setObjectPropertiesParticipations(List<Participation> objectPropertiesParticipations) {
		this.objectPropertiesParticipations = objectPropertiesParticipations;
	}
	List<Entity> classIndividuals;
	List<Participation> dataPropertiesParticipations;
	List<List<Entity>> disjointUnions;
	// getters
	public Entity getCurrentEntity(){return this.currentEntity;}
	public IRI getIri(){return this.iri;}
	public List<DiagramNode> getEntityDiagrams(){return this.entityDiagrams;}
	public List<Label> getClassDescriptions(){return this.classDescriptions;}
	public List<Entity> getEquivalentClasses(){return this.equivalentClasses;}
	public List<Entity> getSubClasses(){return this.subClasses;}
	public List<Entity> getSuperClasses(){return this.superClasses;}
	public List<Entity> getDisjointClasses(){return this.disjointClasses;}
	public List<Entity> getClassIndividuals(){return this.classIndividuals;}
	public List<List<Entity>> getDisjointUnions(){return this.disjointUnions;}
	// setters
	public void setCurrentEntity(Entity _currentEntity){this.currentEntity = _currentEntity;}
	public void setIri(IRI _iri){this.iri = _iri;}
	public void setEntityDiagrams(List<DiagramNode> _entityDiagrams){this.entityDiagrams = _entityDiagrams;}
	public void setClassDescriptions(List<Label> _classDescriptions){this.classDescriptions = _classDescriptions;}
	public void setEquivalentClasses(List<Entity> _equivalentClasses){this.equivalentClasses = _equivalentClasses;}
	public void setSubClasses(List<Entity> _subClasses){this.subClasses = _subClasses;}
	public void setSuperClasses(List<Entity> _superClasses){this.superClasses = _superClasses;}
	public void setDisjointClasses(List<Entity> _disjointClasses){this.disjointClasses = _disjointClasses;}
	public void setClassIndividuals(List<Entity> _classIndividuals){this.classIndividuals = _classIndividuals;}
	public void setDisjointUnions(List<List<Entity>> _disjointUnions){this.disjointUnions = _disjointUnions;}
	
	
}