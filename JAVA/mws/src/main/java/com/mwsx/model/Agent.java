package com.mwsx.model;

import java.util.List;

public class Agent {

	private String agentIri;
	private List<Label> agentLabels;
	private String agentWebsite;
	private String agentEmail;
	private String agentAddress;
	public String getAgentIri() {
		return agentIri;
	}
	public void setAgentIri(String agentIri) {
		this.agentIri = agentIri;
	}
	public List<Label> getAgentLabels() {
		return agentLabels;
	}
	public void setAgentLabels(List<Label> agentLabels) {
		this.agentLabels = agentLabels;
	}
	public String getAgentWebsite() {
		return agentWebsite;
	}
	public void setAgentWebsite(String agentWebsite) {
		this.agentWebsite = agentWebsite;
	}
	public String getAgentEmail() {
		return agentEmail;
	}
	public void setAgentEmail(String agentEmail) {
		this.agentEmail = agentEmail;
	}
	public String getAgentAddress() {
		return agentAddress;
	}
	public void setAgentAddress(String agentAddress) {
		this.agentAddress = agentAddress;
	}
	
	
}
