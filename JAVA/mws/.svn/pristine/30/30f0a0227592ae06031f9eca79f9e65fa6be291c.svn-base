package com.mwsx.model;

public class OBDAStatus {

	public static OBDAStatus getErrorStatus(MastroID id, String e) {
		OBDAStatus error = new OBDAStatus();
		error.setId(id);
		error.setStatus(ERROR);
		error.setLastError(e);
		return error;
	}
	
	public static OBDAStatus getUnavailableStatus(MastroID id) {
		OBDAStatus error = new OBDAStatus();
		error.setId(id);
		error.setStatus(UNAVAILABLE);
		return error;
	}
	
	public static OBDAStatus getRunningStatus(MastroID id) {
		OBDAStatus running = new OBDAStatus();
		running.setId(id);
		running.setStatus(RUNNING);
		return running;
	}
	
	public static OBDAStatus getLoadingStatus(MastroID id) {
		OBDAStatus loading = new OBDAStatus();
		loading.setId(id);
		loading.setStatus(LOADING);
		return loading;
	}
	
	public static final String RUNNING = "RUNNING";
	public static final String LOADING = "LOADING";
	public static final String ERROR = "ERROR";
	public static final String UNAVAILABLE = "UNAVAILABLE";
	
	MastroID id;
	String status;
	String lastError;
	
	public MastroID getId() {
		return id;
	}
	public void setId(MastroID id) {
		this.id = id;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getLastError() {
		return lastError;
	}
	public void setLastError(String lastError) {
		this.lastError = lastError;
	}
	
		
	
}
