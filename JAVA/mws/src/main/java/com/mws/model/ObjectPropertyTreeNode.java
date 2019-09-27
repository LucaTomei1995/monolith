package com.mws.model;

import java.util.LinkedList;
import java.util.List;

public class ObjectPropertyTreeNode {

	ObjectPropertyInfo info;
	List<ObjectPropertyTreeNode> children;
	
	public ObjectPropertyInfo getInfo() {
		return info;
	}
	public void setInfo(ObjectPropertyInfo info) {
		this.info = info;
	}
	public List<ObjectPropertyTreeNode> getChildren() {
		return children;
	}
	public void setChildren(List<ObjectPropertyTreeNode> children) {
		this.children = children;
	}
	
	public void addChildren(ObjectPropertyTreeNode node) {
		if (this.children == null)
			this.children = new LinkedList<ObjectPropertyTreeNode>();
		this.children.add(node);
	}
	
}
