package com.mws.model;

import java.util.LinkedList;
import java.util.List;

public class ClassTreeNode {

	ClassInfo info;
	List<ClassTreeNode> children;
	
	public ClassInfo getInfo() {
		return info;
	}
	public void setInfo(ClassInfo info) {
		this.info = info;
	}
	public List<ClassTreeNode> getChildren() {
		return children;
	}
	public void setChildren(List<ClassTreeNode> children) {
		this.children = children;
	}
	
	public void addChildren(ClassTreeNode node) {
		if (this.children == null)
			this.children = new LinkedList<ClassTreeNode>();
		this.children.add(node);
	}
	
}
