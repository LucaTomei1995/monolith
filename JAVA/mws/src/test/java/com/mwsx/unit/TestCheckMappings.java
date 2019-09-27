package com.mwsx.unit;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;

import javax.xml.parsers.ParserConfigurationException;

import org.semanticweb.owlapi.model.OWLOntologyCreationException;
import org.semanticweb.owlapi.model.OWLOntologyStorageException;
import org.w3c.dom.DOMException;
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
import com.mwsx.model.MappingsCheckResult;
import com.mwsx.model.MastroID;
import com.mwsx.model.OBDARunQueryInstance;
import com.mwsx.model.OBDAStatus;
import com.mwsx.model.Ontology;
import com.mwsx.model.OntologyID;
import com.mwsx.model.OntologyVersion;
import com.mwsx.model.SPARQLQuery;
import com.mwsx.model.SPARQLStatus;
import com.mwsx.model.User;

import it.uniroma1.dis.mastro.api.exceptions.ParsingException;
import it.uniroma1.dis.mastro.api.impl.MastroAPI;
import it.uniroma1.dis.quonto.core.datasourcemanager.exceptions.UnrecognizedTypeException;
import it.uniroma1.dis.quonto.core.exceptions.OntologyAlphabetException;
import it.uniroma1.dis.quonto.core.exceptions.PrefixManagerException;
import it.uniroma1.dis.quonto.core.exceptions.UnsupportedLanguageException;
import it.uniroma1.dis.quonto.core.mapping.exceptions.MappingMalformedException;
import it.uniroma1.dis.quonto.core.mapping.exceptions.TermMappingMalformedException;
import it.uniroma1.dis.quonto.mapping.exceptions.MappingFileMalformedException;
import it.uniroma1.dis.quonto.mapping.exceptions.MappingRewriterStructureException;
import it.uniroma1.dis.quonto.mapping.exceptions.OntologyPredicateMappingMalformedException;
import it.uniroma1.dis.quonto.mapping.exceptions.PrimitiveViewMalformedException;

public class TestCheckMappings {

	public static FileInfo getFileInfo(String path, String name, String type) throws IOException {
		FileInfo f = new FileInfo();
		byte[] content = Files.readAllBytes(Paths.get(path));
		f.setContent(java.util.Base64.getEncoder().encodeToString(content));
		f.setFileName(name);
		f.setFileType(type);
		return f;
	}

	public static void main(String[] args) throws IOException, InterruptedException, OWLOntologyCreationException,
			OWLOntologyStorageException, MappingFileMalformedException, SAXException, DOMException, ParsingException,
			ParserConfigurationException, OntologyPredicateMappingMalformedException, MappingRewriterStructureException,
			PrimitiveViewMalformedException, MappingMalformedException, TermMappingMalformedException,
			UnrecognizedTypeException, OntologyAlphabetException, UnsupportedLanguageException, PrefixManagerException {
		MwsxSessionManager.SESSIONS_MANAGER_CUSTOM_REFRESH_INTERVAL = 1000;
		RuntimeListener.init();
		MwsxSession session = null;
		try {
			MwsxOntologyManager manager = RuntimeListener.getOntologyManager();
			User u = MwsxPermissionManager.getPermissionManager().getUser("santaroni");
			session = MwsxSessionManager.getSessionManager().createSession(u);
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
			FileInfo mapinfo = getFileInfo("./src/test/resources/specs/unit1/unit1-errors2.xml", "mappings", "xml");
			Object res = manager.postMapping("UNIT1", "http://www.obdasystems.com/unit1/1.0", mapinfo);
			System.out.println(res.getClass());
			
		} catch (Throwable t) {
			t.printStackTrace();
		}
		if (session != null)
			session.close();
		RuntimeListener.exit();
	}

}
