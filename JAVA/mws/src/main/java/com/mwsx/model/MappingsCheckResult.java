package com.mwsx.model;

import java.util.List;
import java.util.Map;

public class MappingsCheckResult {

	boolean success;
	Map<String, List<String>> messagesByMappingId;
	MappingInfo mappingInfo;
	
	public boolean isSuccess() {
		return success;
	}
	public void setSuccess(boolean success) {
		this.success = success;
	}
	public Map<String, List<String>> getMessagesByMappingId() {
		return messagesByMappingId;
	}
	public void setMessagesByMappingId(Map<String, List<String>> messagesByMappingId) {
		this.messagesByMappingId = messagesByMappingId;
	}
	public MappingInfo getMappingInfo() {
		return mappingInfo;
	}
	public void setMappingInfo(MappingInfo mappingInfo) {
		this.mappingInfo = mappingInfo;
	}
	
	
	
	
}
