package com.mwsx.test;

import java.io.IOException;
import java.util.LinkedList;
import java.util.List;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationConfig;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.mwsx.model.Agent;
import com.mwsx.model.KnowledgeGraph;
import com.mwsx.model.KnowledgeGraphDestination;
import com.mwsx.model.KnowledgeGraphFile;
import com.mwsx.model.Label;
import com.mwsx.model.User;

public class KGSampleCode2 {

	public static String BASE_URL = "http://localhost:8080/mws/rest/mwsx";//"https://obdatest.dis.uniroma1.it:8080/mws-dev/rest/mwsx";
	public static String USER = "santaroni";
	public static String PASSWORD = "ronconelli";
	
	public static void main(String[] args) throws IOException {
		ObjectMapper om = new ObjectMapper();
		om.enable(SerializationFeature.INDENT_OUTPUT);
		
		
		KnowledgeGraphFile kgf = new KnowledgeGraphFile();
		KnowledgeGraphDestination destination = new KnowledgeGraphDestination();
		destination.setDestination("http://kg/iris/com/ui");
		destination.setNamedGraph("http://kg/iris/com/ui/q1");
		kgf.setDestination(destination);
		kgf.setFile(Utils.getFileInfo("./src/test/resources/triples/Regione_01.ntriples", "Regione_01.ntriples", "ntriples"));
		String o = om.writeValueAsString(kgf);
		System.out.println(o);
		
		if (true) return;
		User u = new User();
		u.setName("pippo");
		KnowledgeGraph kg = getKG(u, "http://kg/iris/com/ui", new Agent());
		
		o = om.writeValueAsString(kg);
		System.out.println(o);
	}
	
	public static KnowledgeGraph getKG(User user, String kgIri, Agent agent) {
		KnowledgeGraph kg = new KnowledgeGraph();
		kg.setKgCreationTs(System.currentTimeMillis());
		List<User> contr = new LinkedList<>();
		contr.add(user);
		kg.setKgContributors(contr);
		kg.setKgCreator(user);
		Label l = new Label();
		l.setContent("TITLE AND DESCRIPTION OF KG");
		l.setLang("IT");
		List<Label> kgDescriptions = new LinkedList<>();
		kgDescriptions.add(l);
		kg.setKgDescriptions(kgDescriptions );
		kg.setKgIri(kgIri);
		kg.setKgLastModifiedTs(System.currentTimeMillis());
		kg.setKgPublisher(agent);
		kg.setKgRightsHolder(agent);
		kg.setKgTitle(kgDescriptions);
		kg.setKgTriples(0);
		return kg;
	}
	
}
