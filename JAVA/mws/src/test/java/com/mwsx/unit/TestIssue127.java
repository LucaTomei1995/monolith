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
import com.mwsx.model.ClassInfo;
import com.mwsx.model.Entities;
import com.mwsx.model.Entity;
import com.mwsx.model.FileInfo;
import com.mwsx.model.MappingRewritings;
import com.mwsx.model.MastroID;
import com.mwsx.model.OBDARunQueryInstance;
import com.mwsx.model.OBDAStatus;
import com.mwsx.model.Ontology;
import com.mwsx.model.OntologyID;
import com.mwsx.model.OntologyRewritings;
import com.mwsx.model.OntologyVersion;
import com.mwsx.model.Participation;
import com.mwsx.model.SPARQLQuery;
import com.mwsx.model.SPARQLStatus;
import com.mwsx.model.User;
import com.mwsx.model.ViewRewritings;

import it.uniroma1.dis.mastro.api.impl.MastroAPI;
import it.uniroma1.dis.quonto.mapping.exceptions.MappingFileMalformedException;

public class TestIssue127 {

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
		
		String name = "DBPEDIA";
		String version = "http://dbpedia.org/ontology/01.10.2016";
		
		// creating ontology
		Ontology o = new Ontology();
		o.setOntologyDate(System.currentTimeMillis());
		o.setOntologyOwner(u);
		o.setOntologyDescription("TEST DBPEDIA ONTOLOGY FOR ISSUE #127");
		o.setOntologyID(name);
		manager.addOntology(o);
		
		// adding ontology version
		FileInfo info = getFileInfo("./src/test/resources/specs/dbpedia/dbpedia_20161001.owl", "onto", "owl");
		manager.addOntologyVersion(o, info, ReasoningServices.MANCHESTER_SYNTAX);
		
		Entities entities = manager.getOntologyEntities(name, version);
		
		for (Entity cl : entities.getClassEntities()) {
			System.out.println(cl.getEntityIRI() + ", " + cl.getEntityID() + ", " + cl.getEntityType());
		}
						
		session.close();
		RuntimeListener.exit();
	}
	
}
