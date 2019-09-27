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
import com.mwsx.model.KnowledgeGraphFileDestination;
import com.mwsx.model.KnowledgeGraphFileInfo;
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

public class TestKGLoader2 {

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
		String namedGraph = "http://kg/iris/com/ui/graph/10";
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
		
		FileInfo n1 = Utils.getFileInfo("./src/test/resources/triples/Regione_01.ntriples", "Regione_01.ntriples", "N3");		
		FileInfo n2 = Utils.getFileInfo("./src/test/resources/triples/Regione_10.ntriples", "Regione_10.ntriples", "N3");		
		FileInfo n3 = Utils.getFileInfo("./src/test/resources/triples/Regione_18.ntriples", "Regione_18.ntriples", "N3");
		
		
		
		// cleaning the repository
		ObjectMapper om = new ObjectMapper();
		manager.deleteKnowledgeGraph(kgIri);
		manager.addKnowledgeGraph(kg);
		
		manager.postKGUploadFile(session, n1, kgIri);
		manager.postKGUploadFile(session, n2, kgIri);
		manager.postKGUploadFile(session, n3, kgIri);
		
		List<KnowledgeGraphFileInfo> upl = manager.getKGUploadedFiles(session, kgIri);
		for (KnowledgeGraphFileInfo i : upl) {
			System.out.println(om.writeValueAsString(i));
		}
		
		List<String> fileNames = new LinkedList<String>();
		fileNames.add("Regione_01.ntriples");
		fileNames.add("Regione_18.ntriples");
		fileNames.add("Regione_10.ntriples");

		KnowledgeGraphDestination kgDestination = new KnowledgeGraphDestination();
		kgDestination.setDestination(kgIri);
		kgDestination.setNamedGraph(namedGraph);

		KnowledgeGraphFileDestination fileDestination1 = new KnowledgeGraphFileDestination();
		fileDestination1.setFileNames(fileNames);
		fileDestination1.setKgDestination(kgDestination);
		manager.putKGUploadImport(session, fileDestination1);
		
		KGStatus state = manager.getKnowledgeGraphState(kg);
		while(!state.getStatus().equals("READY")) {
			om.enable(SerializationFeature.INDENT_OUTPUT);
			System.out.println(om.writeValueAsString(state));
			Thread.sleep(2000);
			state = manager.getKnowledgeGraphState(kg);
		}
		System.out.println(om.writeValueAsString(state));
			
		upl = manager.getKGUploadedFiles(session, kgIri);
		for (KnowledgeGraphFileInfo i : upl) {
			System.out.println(om.writeValueAsString(i));
		}
		
		session.close();
		RuntimeListener.exit();
	}
	
}
