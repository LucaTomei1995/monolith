package com.mwsx.model;

// generated by CodeGeneration.java @ MR (tm)

public class SPARQLQuery {
	// fields
	String queryID;
	String queryDescription;
	String queryCode;
	boolean isConstruct;
	String constructResultsRDFSyntax = "TURTLE";
	// getters
	public String getQueryID(){return this.queryID;}
	public String getQueryDescription(){return this.queryDescription;}
	public String getQueryCode(){return this.queryCode;}
	// setters
	public void setQueryID(String _queryID){this.queryID = _queryID;}
	public void setQueryDescription(String _queryDescription){this.queryDescription = _queryDescription;}
	public void setQueryCode(String _queryCode){this.queryCode = _queryCode;}
	
	public boolean isConstruct() {
		return isConstruct;
	}
	public void setConstruct(boolean isConstruct) {
		this.isConstruct = isConstruct;
	}
	public String getConstructResultsRDFSyntax() {
		return constructResultsRDFSyntax;
	}
	public void setConstructResultsRDFSyntax(String constructResultsRDFSyntax) {
		this.constructResultsRDFSyntax = constructResultsRDFSyntax;
	}
}