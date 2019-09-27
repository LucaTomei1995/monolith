package com.mwsx.model;

public class KnowledgeGraphFileInfo {

	String fileName;
	boolean imported;
	long uploadDate;
	long numberOfTriples;
	long importingTime;
	
	public String getFileName() {
		return fileName;
	}
	public void setFileName(String fileName) {
		this.fileName = fileName;
	}
	public boolean isImported() {
		return imported;
	}
	public void setImported(boolean imported) {
		this.imported = imported;
	}
	public long getUploadDate() {
		return uploadDate;
	}
	public void setUploadDate(long uploadDate) {
		this.uploadDate = uploadDate;
	}
	public long getNumberOfTriples() {
		return numberOfTriples;
	}
	public void setNumberOfTriples(long numberOfTriples) {
		this.numberOfTriples = numberOfTriples;
	}
	public long getImportingTime() {
		return importingTime;
	}
	public void setImportingTime(long importingTime) {
		this.importingTime = importingTime;
	}
	
}
