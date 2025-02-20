package com.mwsx.model;

import java.util.List;

// generated by CodeGeneration.java @ MR (tm)

public class OntologyVersion {
	// fields
	String ontologyID;
	String versionID;
	List<Label> versionDescription;
	long versionDate;
	int numClasses;
	int numObjectProperties;
	int numDataProperties;
	int numAxioms;
	User versionOwner;
	// getters
	public String getOntologyID(){return this.ontologyID;}
	public String getVersionID(){return this.versionID;}
	public List<Label> getVersionDescription(){return this.versionDescription;}
	public long getVersionDate(){return this.versionDate;}
	public int getNumClasses(){return this.numClasses;}
	public int getNumObjectProperties(){return this.numObjectProperties;}
	public int getNumDataProperties(){return this.numDataProperties;}
	public int getNumAxioms(){return this.numAxioms;}
	public User getVersionOwner(){return this.versionOwner;}
	// setters
	public void setOntologyID(String _ontologyID){this.ontologyID = _ontologyID;}
	public void setVersionID(String _versionID){this.versionID = _versionID;}
	public void setVersionDescription(List<Label> _versionDescription){this.versionDescription = _versionDescription;}
	public void setVersionDate(long _versionDate){this.versionDate = _versionDate;}
	public void setNumClasses(int _numClasses){this.numClasses = _numClasses;}
	public void setNumObjectProperties(int _numObjectProperties){this.numObjectProperties = _numObjectProperties;}
	public void setNumDataProperties(int _numDataProperties){this.numDataProperties = _numDataProperties;}
	public void setNumAxioms(int _numAxioms){this.numAxioms = _numAxioms;}
	public void setVersionOwner(User _versionOwner){this.versionOwner = _versionOwner;}
}