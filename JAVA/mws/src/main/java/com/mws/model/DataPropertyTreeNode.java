package com.mws.model;

import java.util.LinkedList;
import java.util.List;

public class DataPropertyTreeNode {

	DataPropertyInfo info;
	List<DataPropertyTreeNode> children;
	
	public DataPropertyInfo getInfo() {
		return info;
	}
	public void setInfo(DataPropertyInfo info) {
		this.info = info;
	}
	public List<DataPropertyTreeNode> getChildren() {
		return children;
	}
	public void setChildren(List<DataPropertyTreeNode> children) {
		this.children = children;
	}
	
	public void addChildren(DataPropertyTreeNode node) {
		if (this.children == null)
			this.children = new LinkedList<DataPropertyTreeNode>();
		this.children.add(node);
	}
	
}
