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
import com.mwsx.model.Mappings;
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

public class TestMapFIles {

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
		o.setOntologyID("UNIT1");
		manager.addOntology(o);
		
		// adding ontology version
		FileInfo info = getFileInfo("./src/test/resources/specs/unit1/unit1.owl", "onto", "owl");
		manager.addOntologyVersion(o, info, ReasoningServices.MANCHESTER_SYNTAX);
		
		// adding mappings to ontology version
		FileInfo mapinfo = getFileInfo("./src/test/resources/specs/unit1/unit1.xml", "mappings", "xml");
		manager.postMapping("UNIT1", "http://www.obdasystems.com/unit1/1.0", mapinfo);
		
		FileInfo mapinfo2 = getFileInfo("./src/test/resources/specs/unit1/unit1_2.xml", "mappings", "xml");
		manager.postMapping("UNIT1", "http://www.obdasystems.com/unit1/1.0", mapinfo2);
		
		FileInfo mapinfo3 = getFileInfo("./src/test/resources/specs/unit1/unit1_3.xml", "mappings", "xml");
		manager.postMapping("UNIT1", "http://www.obdasystems.com/unit1/1.0", mapinfo3);
		
		Mappings m = manager.getMappings("UNIT1", "http://www.obdasystems.com/unit1/1.0");
		System.out.println(m.getMappingList().size());
		
		manager.deleteMapping("UNIT1", "http://www.obdasystems.com/unit1/1.0", "UNIT1_02");
		
		session.close();
		RuntimeListener.exit();
	}
	
}
