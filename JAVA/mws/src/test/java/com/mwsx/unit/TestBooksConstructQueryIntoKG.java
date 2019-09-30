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
import com.mwsx.engine.ReasoningServices;
import com.mwsx.model.Agent;
import com.mwsx.model.FileInfo;
import com.mwsx.model.KGStatus;
import com.mwsx.model.KnowledgeGraph;
import com.mwsx.model.KnowledgeGraphDestination;
import com.mwsx.model.KnowledgeGraphDestinationQueryOBDA;
import com.mwsx.model.Label;
import com.mwsx.model.MappingRewritings;
import com.mwsx.model.MastroID;
import com.mwsx.model.OBDAConstructResults;
import com.mwsx.model.OBDARunQueryInstance;
import com.mwsx.model.OBDAStatus;
import com.mwsx.model.Ontology;
import com.mwsx.model.OntologyID;
import com.mwsx.model.OntologyRewritings;
import com.mwsx.model.OntologyVersion;
import com.mwsx.model.SPARQLQuery;
import com.mwsx.model.SPARQLQueryExecution;
import com.mwsx.model.SPARQLResult;
import com.mwsx.model.SPARQLResults;
import com.mwsx.model.SPARQLStatus;
import com.mwsx.model.User;
import com.mwsx.model.ViewRewritings;

import it.uniroma1.dis.mastro.api.impl.MastroAPI;
import it.uniroma1.dis.quonto.mapping.exceptions.MappingFileMalformedException;

public class TestBooksConstructQueryIntoKG {

	public static FileInfo getFileInfo(String path, String name, String type) throws IOException {
		FileInfo f = new FileInfo();
		byte[] content = Files.readAllBytes(Paths.get(path));
		f.setContent(java.util.Base64.getEncoder().encodeToString(content));
		f.setFileName(name);
		f.setFileType(type);
		return f;
	}
	
	public static final String MOVIES = "BOOKS";
	public static final String MOVIES_VERSION = "http://www.obdasystems.com/books/1.0";
	public static final String MOVIES_MAP_ID = "MAP_04";
	public static final String MOVIES_QUERY_ID = "Q1";
	
	
	public static void main(String[] args) throws IOException, InterruptedException, OWLOntologyCreationException, OWLOntologyStorageException, MappingFileMalformedException, SAXException {
		MwsxSessionManager.SESSIONS_MANAGER_CUSTOM_REFRESH_INTERVAL = 1000;
		RuntimeListener.init();
		MwsxOntologyManager manager = RuntimeListener.getOntologyManager();
		User u = MwsxPermissionManager.getPermissionManager().getUser("santaroni");
		MwsxSession session = MwsxSessionManager.getSessionManager().createSession(u);
		String sessionId = MwsxSessionManager.getSessionManager().getUserSessionId(u);
		
		// cleaning the repository
		manager.deleteAllOntologies();
		
		// creating ontology
		Ontology o = new Ontology();
		o.setOntologyDate(System.currentTimeMillis());
		o.setOntologyOwner(u);
		o.setOntologyDescription("MOVIE TEST ONTOLOGY");
		o.setOntologyID(MOVIES);
		manager.addOntology(o);
		
		// adding ontology version
		FileInfo info = getFileInfo("./src/test/resources/specs/books/books_ontology.owl", "onto", "owl");
		manager.addOntologyVersion(o, info, ReasoningServices.MANCHESTER_SYNTAX);
		
		// adding mappings to ontology version
		FileInfo mapinfo = getFileInfo("./src/test/resources/specs/books/mappings.xml", "mappings", "xml");
		manager.postMapping(MOVIES, MOVIES_VERSION, mapinfo);
		
		// creating query
		SPARQLQuery cquery = new SPARQLQuery();
		String qid = MOVIES_QUERY_ID;
		cquery.setConstruct(true);
		cquery.setQueryID(qid);
		cquery.setQueryDescription("The description of construct query " + qid);
		String code = new String(Files.readAllBytes(Paths.get("./src/test/resources/specs/books/queries/q9_construct.sparql")));
		cquery.setQueryCode(code);
		manager.postSPARQLQuery(session, MOVIES, MOVIES_VERSION, cquery);
		
		// starting mastro instance
		MastroID id = new MastroID();
		OntologyID oid = new OntologyID();
		oid.setOntologyName(MOVIES);
		oid.setOntologyVersion(MOVIES_VERSION);
		id.setMappingID(MOVIES_MAP_ID);
		id.setOntologyID(oid);
		int res = manager.startMastroInstance(session, id, null);
		System.out.println(res);
		
		Thread.sleep(1000);
		
		// checking Mastro instance status
		MastroAPI api = session.getMastroInstance(id);
		if (api != null) {
			boolean ready = api.isReady();
			while (!ready) {
				Thread.sleep(500);
				ready = api.isReady();
				System.out.print("->");
			}
			System.out.println("\nStatus: " + ready);
		}
		ObjectMapper om = new ObjectMapper();
		om.enable(SerializationFeature.INDENT_OUTPUT);
		
		OBDAStatus mstatus = manager.getMastroInstanceStatus(session, id);
		System.out.println(om.writeValueAsString(mstatus));
		
		Thread.sleep(1000);
		
		OBDARunQueryInstance oqri = manager.startConstructQueryFromCatalog(session, MOVIES, MOVIES_VERSION, MOVIES_MAP_ID, MOVIES_QUERY_ID, true);
		System.out.println(om.writeValueAsString(oqri));
		
		//Thread.sleep(1000);
		
		SPARQLStatus qstatus = manager.getConstructQueryStatus(session, MOVIES, MOVIES_VERSION, MOVIES_MAP_ID, oqri.getExecutionId());
		System.out.println("QUERY STARTED: " + om.writeValueAsString(qstatus));
		
		while(!qstatus.getStatus().equals("FINISHED")) {
			Thread.sleep(500);
			qstatus = manager.getConstructQueryStatus(session, MOVIES, MOVIES_VERSION, MOVIES_MAP_ID, oqri.getExecutionId());
			System.out.print("->");
		}
		
		System.out.println("QUERY FINISHED: " + om.writeValueAsString(qstatus));
		
		SPARQLResults rews = manager.getConstructQueryResult(session, MOVIES, MOVIES_VERSION, MOVIES_MAP_ID, oqri.getExecutionId(), 30, 1);
		for (List<SPARQLResult> rew : rews.getResults()) {
			for (SPARQLResult r : rew) {
				System.out.print(om.writeValueAsString(r) + " ");
			}
			System.out.println();
		}
		
		Thread.sleep(7000);
		
		FileInfo expinfo = manager.exportConstructQueryResult(session, MOVIES, MOVIES_VERSION, MOVIES_MAP_ID, oqri.getExecutionId());
		System.out.println(om.writeValueAsString(expinfo));
		System.out.println(java.util.Base64.getDecoder().decode(expinfo.getContent().getBytes()));
		
		// creating the KG
		
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
		
		manager.deleteKnowledgeGraph(kgIri);
		manager.addKnowledgeGraph(kg);
		
		// importing construct query result into KG
		
		KnowledgeGraphDestinationQueryOBDA queryOBDA = new KnowledgeGraphDestinationQueryOBDA();
		OBDAConstructResults source = new OBDAConstructResults();
		source.setSource(id);
		SPARQLQueryExecution execution = new SPARQLQueryExecution();
		execution.setQueryID(oqri.getExecutionId());
		source.setExecution(execution);
		queryOBDA.setSource(source);
		KnowledgeGraphDestination target = new KnowledgeGraphDestination();
		target.setDestination("http://kg/iris/com/ui");
		target.setNamedGraph("http://kg/iris/com/ui/q_construct");
		queryOBDA.setTarget(target);
		
		manager.putKGUnionQueryOBDA(session, queryOBDA , false);
		
		KGStatus state = manager.getKnowledgeGraphState(kg);
		while(!(state.getStatus().equals("READY")||state.getStatus().equals("ERROR"))) {
			om.enable(SerializationFeature.INDENT_OUTPUT);
			System.out.println(om.writeValueAsString(state));
			Thread.sleep(2000);
			state = manager.getKnowledgeGraphState(kg);
		}
		System.out.println(om.writeValueAsString(state));
		
		session.close();
		RuntimeListener.exit();
	}
	
}
