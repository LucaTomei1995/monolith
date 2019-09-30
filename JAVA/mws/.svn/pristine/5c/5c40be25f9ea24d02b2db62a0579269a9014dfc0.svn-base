package com.mwsx.unit;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
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
import com.mwsx.model.FileInfo;
import com.mwsx.model.KGStoreFileInfoEntry;
import com.mwsx.model.User;

import it.uniroma1.dis.quonto.mapping.exceptions.MappingFileMalformedException;

public class TestKGStoreLoader {

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
		
		FileInfo info1 = getFileInfo("./src/test/resources/triples/Regione_01.triples","Regione_01.triples","triples");
		manager.postKGStoreFile(session, info1);
		FileInfo info2 = getFileInfo("./src/test/resources/triples/Regione_10.triples","Regione_10.triples","triples");
		manager.postKGStoreFile(session, info2);
		FileInfo info3 = getFileInfo("./src/test/resources/triples/Regione_11.triples","Regione_11.triples","triples");
		manager.postKGStoreFile(session, info3);
			
		ObjectMapper om = new ObjectMapper();
		om.enable(SerializationFeature.INDENT_OUTPUT);
		List<KGStoreFileInfoEntry> a = manager.getKGStoreFileEntries(session);
		int count = 0;
		String remove = null;
		for (KGStoreFileInfoEntry entry : a) {
			count++;
//			String value = om.writeValueAsString(entry);
//			System.out.println(value);
			if (count == a.size()) {
				remove = entry.getFileName();
				System.out.println(" -> removing " + remove);
			}
		}
		
		System.out.println(a.size());
		
		if (remove != null) {
			manager.deleteKGStoreFile(session, remove);
		}
		
		a = manager.getKGStoreFileEntries(session);
		System.out.println(a.size());
		
		session.close();
		RuntimeListener.exit();
	}
	
}
