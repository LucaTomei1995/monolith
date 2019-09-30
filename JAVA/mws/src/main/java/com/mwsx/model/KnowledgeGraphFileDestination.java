package com.mwsx.model;

import java.util.List;

public class KnowledgeGraphFileDestination {

	KnowledgeGraphDestination kgDestination;
	List<String> fileNames;
	
	public KnowledgeGraphDestination getKgDestination() {
		return kgDestination;
	}
	public void setKgDestination(KnowledgeGraphDestination kgDestination) {
		this.kgDestination = kgDestination;
	}
	public List<String> getFileNames() {
		return fileNames;
	}
	public void setFileNames(List<String> fileNames) {
		this.fileNames = fileNames;
	}
	
}
