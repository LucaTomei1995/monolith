package com.mwsx.unit;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.LinkedList;
import java.util.List;

import org.semanticweb.owlapi.model.OWLOntologyCreationException;
import org.semanticweb.owlapi.model.OWLOntologyStorageException;
import org.xml.sax.SAXException;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.mwsx.configuration.RuntimeListener;
import com.mwsx.engine.MwsxOntologyManager;
import com.mwsx.engine.MwsxPermissionManager;
import com.mwsx.engine.MwsxSession;
import com.mwsx.engine.MwsxSessionManager;
import com.mwsx.model.Agent;
import com.mwsx.model.FileInfo;
import com.mwsx.model.KGStatus;
import com.mwsx.model.KnowledgeGraph;
import com.mwsx.model.KnowledgeGraphDestination;
import com.mwsx.model.KnowledgeGraphFile;
import com.mwsx.model.Label;
import com.mwsx.model.MastroID;
import com.mwsx.model.OBDARunQueryInstance;
import com.mwsx.model.OBDAStatus;
import com.mwsx.model.Ontology;
import com.mwsx.model.OntologyID;
import com.mwsx.model.OntologyVersion;
import com.mwsx.model.SPARQLQuery;
import com.mwsx.model.SPARQLStatus;
import com.mwsx.model.User;
import com.mwsx.test.Utils;

import it.uniroma1.dis.mastro.api.impl.MastroAPI;
import it.uniroma1.dis.quonto.mapping.exceptions.MappingFileMalformedException;

public class TestMultiKGLoader {

	public static FileInfo getFileInfo(String path, String name, String type) throws IOException {
		FileInfo f = new FileInfo();
		byte[] content = Files.readAllBytes(Paths.get(path));
		f.setContent(java.util.Base64.getEncoder().encodeToString(content));
		f.setFileName(name);
		f.setFileType(type);
		return f;
	}
	
	public static void main(String[] args) throws IOException, InterruptedException, OWLOntologyCreationException, OWLOntologyStorageException, MappingFileMalformedException, SAXException {
		MwsxSessionManager.SESSIONS_MANAGER_CUSTOM_REFRESH_INTERVAL = 1000;
		RuntimeListener.init();
		MwsxOntologyManager manager = RuntimeListener.getOntologyManager();
		User u = MwsxPermissionManager.getPermissionManager().getUser("santaroni");
		MwsxSession session = MwsxSessionManager.getSessionManager().createSession(u);
		String sessionId = MwsxSessionManager.getSessionManager().getUserSessionId(u);
		
		User user = MwsxPermissionManager.getPermissionManager().getUser("santaroni");
		String kgIri = "http://kg/iris/com/ui0";
		String kgIri1 = "http://kg/iris/com/ui1";
		String kgIri2 = "http://kg/iris/com/ui2";
		Agent agent = new Agent();
		
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
		
		KnowledgeGraph kg1 = new KnowledgeGraph();
		kg1.setKgCreationTs(System.currentTimeMillis());
		List<User> contr1 = new LinkedList<>();
		contr1.add(user);
		kg1.setKgContributors(contr1);
		kg1.setKgCreator(user);
		Label l1 = new Label();
		l1.setContent("TITLE AND DESCRIPTION OF KG");
		l1.setLang("IT");
		List<Label> kgDescriptions1 = new LinkedList<>();
		kgDescriptions1.add(l1);
		kg1.setKgDescriptions(kgDescriptions1 );
		kg1.setKgIri(kgIri1);
		kg1.setKgLastModifiedTs(System.currentTimeMillis());
		kg1.setKgPublisher(agent);
		kg1.setKgRightsHolder(agent);
		kg1.setKgTitle(kgDescriptions1);
		kg1.setKgTriples(0);
		
		KnowledgeGraph kg2 = new KnowledgeGraph();
		kg2.setKgCreationTs(System.currentTimeMillis());
		List<User> contr2 = new LinkedList<>();
		contr2.add(user);
		kg2.setKgContributors(contr2);
		kg2.setKgCreator(user);
		Label l2 = new Label();
		l2.setContent("TITLE AND DESCRIPTION OF KG");
		l2.setLang("IT");
		List<Label> kgDescriptions2 = new LinkedList<>();
		kgDescriptions2.add(l2);
		kg2.setKgDescriptions(kgDescriptions2 );
		kg2.setKgIri(kgIri2);
		kg2.setKgLastModifiedTs(System.currentTimeMillis());
		kg2.setKgPublisher(agent);
		kg2.setKgRightsHolder(agent);
		kg2.setKgTitle(kgDescriptions2);
		kg2.setKgTriples(0);
		
		
		
		// cleaning the repository
		manager.deleteKnowledgeGraph(kgIri);
		manager.deleteKnowledgeGraph(kgIri1);
		manager.deleteKnowledgeGraph(kgIri2);
		manager.addKnowledgeGraph(kg);
		
		System.out.println(manager.getKnowledgeGraphs(user));
		
		manager.addKnowledgeGraph(kg1);
		System.out.println(manager.getKnowledgeGraphs(user));
		
		manager.addKnowledgeGraph(kg2);
		System.out.println(manager.getKnowledgeGraphs(user));
		
				
		session.close();
		RuntimeListener.exit();
	}
	
}
