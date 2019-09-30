package com.mws.model;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Base64;
import java.util.LinkedList;
import java.util.List;

public class OntologyStore {

	private List<OntologyInfo> ontologyList;
	private String name;
	private String basePath = "/home/mr/ontology_store/";

	public OntologyStore(String id) {
		this.name = id;
		this.ontologyList = new LinkedList<OntologyInfo>();
		File f = new File(basePath + name);
		if (f.exists()) {
			if (!f.isDirectory())
				throw new RuntimeException("Ontology store base path already exists!");
		} else
			f.mkdirs();
	}

	public List<OntologyInfo> getOntologyList() {
		return this.ontologyList;
	}

	public boolean uploadFile(FileInfo info, String ontoName, boolean replace) throws IOException {
		byte[] content = Base64.getDecoder().decode(info.getContent());
		String filePath = basePath + name + "/" + ontoName + "/" + info.getFileName();
		File f = new File(filePath);
		if (!replace && f.exists())
			throw new RuntimeException("Ontology store base path already exists!");
		f.createNewFile();
		try (FileOutputStream fos = new FileOutputStream(filePath)) {
			fos.write(content);
		}
		System.out.println("WRITTEN!");
		return true;
	}

	public void setOntologyList(List<OntologyInfo> ontologyList) {
		this.ontologyList = ontologyList;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getBasePath() {
		return basePath;
	}

	public void setBasePath(String basePath) {
		this.basePath = basePath;
	}

}
