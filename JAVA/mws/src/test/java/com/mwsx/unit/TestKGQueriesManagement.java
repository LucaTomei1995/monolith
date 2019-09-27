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

public class TestKGQueriesManagement {

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
		String kgIri = "http://kg/iris/com/ui";
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
		
		ObjectMapper om = new ObjectMapper();
		om.enable(SerializationFeature.INDENT_OUTPUT);
		
		// cleaning the repository
		manager.deleteKnowledgeGraph(kgIri);
		manager.addKnowledgeGraph(kg);
		
		SPARQLQuery q1 = getSampleQuery("Q1","descr 1","code 1");
		SPARQLQuery q2 = getSampleQuery("Q2","descr 2","code 2");
		SPARQLQuery q3 = getSampleQuery("Q3","descr 3","code 3");
		
		manager.addKnowledgeGraphQuery(kg, q1);
		manager.addKnowledgeGraphQuery(kg, q2);
		manager.addKnowledgeGraphQuery(kg, q3);
		
		manager.deleteKnowledgeGraphQuery(kg, "Q2");
		
		SPARQLQuery q = manager.getKnowledgeGraphQuery(kg, "Q1");
		System.out.println(om.writeValueAsString(q));
		
		SPARQLStatus st = manager.getKnowledgeGraphQueryStatus(kg, "Q1");
		System.out.println(om.writeValueAsString(st));
				
		session.close();
		RuntimeListener.exit();
	}

	private static SPARQLQuery getSampleQuery(String id, String descr, String code) {
		SPARQLQuery q = new SPARQLQuery();
		q.setQueryID(id);
		q.setQueryCode(code);
		q.setQueryDescription(descr);
		return q;
	}
	
}
