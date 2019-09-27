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
import com.mwsx.model.SPARQLResults;
import com.mwsx.model.SPARQLStatus;
import com.mwsx.model.User;
import com.mwsx.test.Utils;

import it.uniroma1.dis.mastro.api.impl.MastroAPI;
import it.uniroma1.dis.quonto.mapping.exceptions.MappingFileMalformedException;

public class TestKGQueriesRunner {

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
		
		KnowledgeGraphFile kgf = new KnowledgeGraphFile();
		KnowledgeGraphDestination destination = new KnowledgeGraphDestination();
		destination.setDestination("http://kg/iris/com/ui");
		destination.setNamedGraph("http://kg/iris/com/ui/q1");
		kgf.setDestination(destination);
		kgf.setFile(Utils.getFileInfo("./src/test/resources/triples/Regione_01.ntriples", "Regione_01.ntriples", "N3"));
		
		ObjectMapper om = new ObjectMapper();
		om.enable(SerializationFeature.INDENT_OUTPUT);
		
		// cleaning the repository
		manager.deleteKnowledgeGraph(kgIri);
		manager.addKnowledgeGraph(kg);
		manager.addKnowledgeGraphModel(kg, kgf);
		
		KGStatus state = manager.getKnowledgeGraphState(kg);
		while(!state.getStatus().equals("READY")) {
			om.enable(SerializationFeature.INDENT_OUTPUT);
			System.out.println(om.writeValueAsString(state));
			Thread.sleep(2000);
			state = manager.getKnowledgeGraphState(kg);
		}
		System.out.println(om.writeValueAsString(state));
		
		SPARQLQuery q1 = getSampleQuery("Q1","descr 1",
				"SELECT $X $Y WHERE {$X <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> $Y}");
		
		SPARQLQuery q2 = getSampleQuery("Q2","descr 1",
				"SELECT $X $Y WHERE {$X $Y 'http://lod.aci.it/ontology/Regione'}");
//				"SELECT $X $Y $Z WHERE {$X $Y $Z}");
		
		manager.addKnowledgeGraphQuery(kg, q1);
		manager.addKnowledgeGraphQuery(kg, q2);
		
		manager.startKGQueryFromCatalog(session, kg, "http://kg/iris/com/ui/q1", "Q1");
		manager.startKGQueryFromCatalog(session, kg, "http://kg/iris/com/ui/q1", "Q2");
		
		Thread.sleep(5000);
		
		SPARQLStatus status = manager.getKnowledgeGraphQueryStatus(kg, "Q1");
		while (status.getStatus() != null && !status.getStatus().equals("FINISHED")) {
			Thread.sleep(1000);
			System.out.println(" ... " + status.getStatus() + ", " + status.getExecutionTime() + " ms, " + status.getNumResults());
			status = manager.getKnowledgeGraphQueryStatus(kg, "Q1");
		}
		System.out.println(status.getStatus() + "! " + status.getExecutionTime() + " ms, " + status.getNumResults());
		SPARQLResults res = manager.getKGQueryResult(session, kg, "Q1", 5, 0);
		System.out.println(om.writeValueAsString(res));
				
		Thread.sleep(5000);
		
		res = manager.getKGQueryResult(session, kg, "Q2", 5, 0);
		System.out.println(om.writeValueAsString(res));
		
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
