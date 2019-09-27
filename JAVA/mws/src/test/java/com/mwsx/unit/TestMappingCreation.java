package com.mwsx.unit;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.LinkedList;
import java.util.List;

import javax.xml.parsers.ParserConfigurationException;

import org.semanticweb.owlapi.model.OWLOntologyCreationException;
import org.semanticweb.owlapi.model.OWLOntologyStorageException;
import org.w3c.dom.DOMException;
import org.xml.sax.SAXException;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.mwsx.configuration.RuntimeListener;
import com.mwsx.engine.MwsxOntologyManager;
import com.mwsx.engine.MwsxPermissionManager;
import com.mwsx.engine.MwsxSession;
import com.mwsx.engine.MwsxSessionManager;
import com.mwsx.engine.ReasoningServices;
import com.mwsx.model.FileInfo;
import com.mwsx.model.NewMappingData;
import com.mwsx.model.NewMappingFileInfo;
import com.mwsx.model.Ontology;
import com.mwsx.model.Prefix;
import com.mwsx.model.SQLView;
import com.mwsx.model.User;

import it.uniroma1.dis.mastro.api.exceptions.ParsingException;
import it.uniroma1.dis.quonto.core.datasourcemanager.DataSourceInfoEntry;
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

public class TestMappingCreation {

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

			ObjectMapper om = new ObjectMapper();
			NewMappingFileInfo nmfi = new NewMappingFileInfo();
			nmfi.setDatabaseConnectionName("test");
			nmfi.setDescription("Descrition for mappin creation test file");
			nmfi.setId("MAP_01");
			nmfi.setVersion("1.0.0.1");
			List<String> mappingTemplates = new LinkedList<String>();
			mappingTemplates.add("http://template1/{P1}/{P2}");
			mappingTemplates.add("http://template2/{P1}/{P2}/{P3}");
			nmfi.setMappingTemplates(mappingTemplates);
			List<Prefix> prefixes = new LinkedList<Prefix>();
			Prefix p1 = new Prefix();
			p1.setName("p1");
			p1.setNamespace("http://template1/pref1#");
			Prefix p2 = new Prefix();
			p2.setName("p2");
			p2.setNamespace("http://template2/pref2#");
			Prefix p3 = new Prefix();
			p3.setName("p3");
			p3.setNamespace("http://template3/pref3#");
			prefixes.add(p1);
			prefixes.add(p2);
			prefixes.add(p3);
			nmfi.setPrefixes(prefixes);
			String create = java.util.Base64.getEncoder().encodeToString(om.writeValueAsString(nmfi).getBytes());
			// creating empty mappings file
			manager.createMapping(session, "UNIT1", "http://www.obdasystems.com/unit1/1.0", create );
			
			om.enable(SerializationFeature.INDENT_OUTPUT);
			System.out.println(om.writeValueAsString(nmfi));
			
			// adding primitive view
			SQLView view = new SQLView();
			view.setSqlViewCode("select P1,P2 from CazzoDeTabbella");
			view.setSqlViewID("Vista_001");
			view.setSqlViewDescription("Test SQL view description creation via code");
			manager.postViewDefinitions("UNIT1", "http://www.obdasystems.com/unit1/1.0", "MAP_01", view );

			SQLView view2 = new SQLView();
			view2.setSqlViewCode("select P1,P2,P3 from CazzoDeTabbella");
			view2.setSqlViewID("Vista_002");
			view2.setSqlViewDescription("Test SQL view description creation via code");
			manager.postViewDefinitions("UNIT1", "http://www.obdasystems.com/unit1/1.0", "MAP_01", view2 );
			
			// adding concept mapping
			NewMappingData data = new NewMappingData();
			data.setDescription("Description of mapping for C2 (id: CL_1)");
			data.setEntityID("CL_1");
			data.setTemplate("http://template1/{P1}/{P2}");
			data.setViewName("Vista_001");
			manager.postMappingAssertion("UNIT1", "http://www.obdasystems.com/unit1/1.0", "MAP_01", data);
			
			NewMappingData data1 = new NewMappingData();
			data1.setDescription("Description of mapping for R (id: OP_1)");
			data1.setEntityID("OP_1");
			data1.setTemplate("http://template1/{P1}/{P2}");
			data1.setRangeTemplate("http://template2/{P1}/{P2}/{P3}");
			data1.setViewName("Vista_002");
			manager.postMappingAssertion("UNIT1", "http://www.obdasystems.com/unit1/1.0", "MAP_01", data1);
			
			NewMappingData data2 = new NewMappingData();
			data2.setDescription("Description of mapping for A (id: DL_1)");
			data2.setEntityID("DL_1");
			data2.setTemplate("http://template1/{P1}/{P2}");
			data2.setRangeTemplate("{P3}");
			data2.setViewName("Vista_002");
			manager.postMappingAssertion("UNIT1", "http://www.obdasystems.com/unit1/1.0", "MAP_01", data2);
			
		} catch (Throwable t) {
			t.printStackTrace();
		}
		if (session != null)
			session.close();
		RuntimeListener.exit();
	}
	
}
