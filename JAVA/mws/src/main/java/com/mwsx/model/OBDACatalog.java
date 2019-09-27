package com.mwsx.model;

import java.util.LinkedList;
import java.util.List;

public class OBDACatalog {
	// fields
	List<SPARQLQuery> queryCatalog = new LinkedList<SPARQLQuery>();
//	Mappings mappings;

	// getters
	public List<SPARQLQuery> getQueryCatalog() {
		return this.queryCatalog;
	}

//	public Mappings getMappings() {
//		if (true)
//			throw new ChristmasException();
//		return this.mappings;
//	}

	// setters
	public void setQueryCatalog(List<SPARQLQuery> _queryCatalog) {
		this.queryCatalog = _queryCatalog;
	}

//	public void setMappings(Mappings _mappings) {
//		this.mappings = _mappings;
//	}
}