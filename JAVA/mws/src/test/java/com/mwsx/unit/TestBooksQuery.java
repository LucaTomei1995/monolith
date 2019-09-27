package com.mwsx.unit;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;

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
import com.mwsx.model.FileInfo;
import com.mwsx.model.MastroID;
import com.mwsx.model.OBDARunQueryInstance;
import com.mwsx.model.OBDAStatus;
import com.mwsx.model.Ontology;
import com.mwsx.model.OntologyID;
import com.mwsx.model.OntologyVersion;
import com.mwsx.model.SPARQLQuery;
import com.mwsx.model.SPARQLStatus;
import com.mwsx.model.User;

import it.uniroma1.dis.mastro.api.impl.MastroAPI;
import it.uniroma1.dis.quonto.mapping.exceptions.MappingFileMalformedException;

public class TestBooksQuery {

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
		
		// cleaning the repository
		manager.deleteAllOntologies();
		
		// creating ontology
		Ontology o = new Ontology();
		o.setOntologyDate(System.currentTimeMillis());
		o.setOntologyOwner(u);
		o.setOntologyDescription("UNIT1 TEST ONTOLOGY");
		o.setOntologyID("BOOKS");
		manager.addOntology(o);
		
		// adding ontology version
		FileInfo info = getFileInfo("./src/test/resources/specs/books/books_ontology.owl", "onto", "owl");
		manager.addOntologyVersion(o, info, ReasoningServices.MANCHESTER_SYNTAX);
		
		// adding mappings to ontology version
		FileInfo mapinfo = getFileInfo("./src/test/resources/specs/books/mappings.xml", "mappings", "xml");
		manager.postMapping("BOOKS", "http://www.obdasystems.com/books/1.0", mapinfo);
		
		// creating query
		SPARQLQuery query = new SPARQLQuery();
		String qid = "q01";
		query.setQueryID(qid);
		query.setQueryDescription("The description of query " + qid);
		String code = new String(Files.readAllBytes(Paths.get("./src/test/resources/specs/books/queries/q10.sparql")));
		query.setQueryCode(code);
		manager.postSPARQLQuery(session, "BOOKS", "http://www.obdasystems.com/books/1.0", query);
		
		// starting mastro instance
		MastroID id = new MastroID();
		OntologyID oid = new OntologyID();
		oid.setOntologyName("BOOKS");
		oid.setOntologyVersion("http://www.obdasystems.com/books/1.0");
		id.setMappingID("MAP_04");
		id.setOntologyID(oid);
		int res = manager.startMastroInstance(session, id, null);
		System.out.println(res);
		
		Thread.sleep(1000);
		
		// checking Mastro instance status
		MastroAPI api = session.getMastroInstance(id);
		if (api != null) {
			boolean ready = api.isReady();
			while (!ready) {
				Thread.sleep(100);
				ready = api.isReady();
			}
			System.out.println("Status: " + ready);
		}
		ObjectMapper om = new ObjectMapper();
		om.enable(SerializationFeature.INDENT_OUTPUT);
		
		OBDAStatus mstatus = manager.getMastroInstanceStatus(session, id);
		System.out.println(om.writeValueAsString(mstatus));
		
		Thread.sleep(1000);
		
		OBDARunQueryInstance oqri = manager.startQueryFromCatalog(session, "BOOKS", "http://www.obdasystems.com/books/1.0", "MAP_04", "q01", true);
		System.out.println(om.writeValueAsString(oqri));
		
		Thread.sleep(3000);
		
		SPARQLStatus qstatus = manager.getQueryStatus(session, "BOOKS", "http://www.obdasystems.com/books/1.0", "MAP_04", oqri.getExecutionId());
		System.out.println(om.writeValueAsString(qstatus));
		
		
		Thread.sleep(3000);
		
		qstatus = manager.getQueryStatus(session, "BOOKS", "http://www.obdasystems.com/books/1.0", "MAP_04", oqri.getExecutionId());
		System.out.println(om.writeValueAsString(qstatus));
		
		session.close();
		RuntimeListener.exit();
	}
	
}
