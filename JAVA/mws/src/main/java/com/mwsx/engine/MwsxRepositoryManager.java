package com.mwsx.engine;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import com.mwsx.model.KnowledgeGraph;
import com.mwsx.model.Mapping;
import com.mwsx.model.Mappings;
import com.mwsx.model.MastroID;
import com.mwsx.model.Ontology;
import com.mwsx.model.OntologyID;

public class MwsxRepositoryManager {

	private static MwsxRepositoryManager repositoryManager;
	
	static {
		try {
			MwsxRepositoryManager.repositoryManager = new MwsxRepositoryManager();
		} catch (IOException e) {
			throw new RuntimeException(e);
		}
	}

	private static String MASTRO_HOME;
	private static String MASTRO_HOME_TEMP;
	private static String KG_HOME;
	private static String KG_STORE_HOME;
	
	public static MwsxRepositoryManager getRepositoryManager() {
		return MwsxRepositoryManager.repositoryManager;
	}
	
	public String getMastroHome() {
		return MwsxRepositoryManager.MASTRO_HOME;
	}
	
	public String getMastroHomeTemp() {
		return MwsxRepositoryManager.MASTRO_HOME_TEMP;
	}
	
	public String getKgHome() {
		return MwsxRepositoryManager.KG_HOME;
	}
	
	public String getKgStoreHome() {
		return MwsxRepositoryManager.KG_STORE_HOME;
	}
	
	private MwsxRepositoryManager() throws IOException {
		MwsxRepositoryManager.MASTRO_HOME = System.getenv("MASTRO_HOME");
		if (MwsxRepositoryManager.MASTRO_HOME == null || MwsxRepositoryManager.MASTRO_HOME.trim().equals(""))
			throw new RuntimeException("Cannot find MASTRO_HOME environment variable: cannot initialize the system");
		MwsxRepositoryManager.MASTRO_HOME_TEMP = MwsxRepositoryManager.MASTRO_HOME + File.separator + "temp";
		MwsxRepositoryManager.KG_HOME = MwsxRepositoryManager.MASTRO_HOME + File.separator + "kg";
		MwsxRepositoryManager.KG_STORE_HOME = MwsxRepositoryManager.MASTRO_HOME + File.separator + "kg" + File.separator + "store";
		init();
	}
	
	private void init() throws IOException {
		Path path = Paths.get(MwsxRepositoryManager.MASTRO_HOME);
		Path kgPath = Paths.get(MwsxRepositoryManager.KG_HOME);
		Path kgStorePath = Paths.get(MwsxRepositoryManager.KG_STORE_HOME);
		Path pathTemp = Paths.get(MwsxRepositoryManager.MASTRO_HOME_TEMP);
		if (Files.exists(path) ) {
			if (Files.isDirectory(path)) {
				if (!Files.exists(pathTemp)) {
					Files.createDirectories(pathTemp);
				}
				if (!Files.exists(kgPath)) {
					Files.createDirectories(kgPath);
					Files.createDirectories(kgStorePath);
				}
			}
			else {
				throw new RuntimeException("Error: MASTRO_HOME path " + MwsxRepositoryManager.MASTRO_HOME + " is not a directory!");
			}
		}
		else {
			throw new RuntimeException("Error: MASTRO_HOME path " + MwsxRepositoryManager.MASTRO_HOME + " does not exist!");
		}
	}

	public static String generateOntologyVersionFolder(String o) {
		return "VERSION_" + String.valueOf(o.hashCode()).replace("-", "n");
	}

	public static String generateOntologyFolder(String name) {
		return "ONTO_" + String.valueOf(name.hashCode()).replace("-", "n");
	}

	public static String generateOntologyFolder(Ontology o) {
		return "ONTO_" + String.valueOf(o.getOntologyID().hashCode()).replace("-", "n");
	}
	
	public static String generateKGFolder(KnowledgeGraph kg) {
		return "KG_" + String.valueOf(kg.getKgIri().hashCode()).replace("-", "n");
	}
	
	public static String generateKGFolder(String kgIri) {
		return "KG_" + String.valueOf(kgIri.hashCode()).replace("-", "n");
	}
	
	public String getOntologyFilePath(OntologyID id) {
		String pathName = MwsxRepositoryManager.generateOntologyFolder(id.getOntologyName());
		String versionPathName = MwsxRepositoryManager.generateOntologyVersionFolder(id.getOntologyVersion());
		Path owlFilePath = Paths.get(this.getMastroHome() + File.separator + pathName + File.separator + versionPathName + File.separator + MwsxOntologyManager.ONTOLOGY_VERSION_OWL_FILE_NAME);
		if (Files.exists(owlFilePath)) {
			return owlFilePath.toString();
		}
		throw new RuntimeException("Cannot find ontology owl file for ontology id : " + id);
	}

	public String getMappingFilePath(MastroID id) {
		try {
			Mappings maps = MwsxOntologyManager.getOntologyManager().getMappings(id.getOntologyID().getOntologyName(), id.getOntologyID().getOntologyVersion());
			for (Mapping map : maps.getMappingList()) {
				if (map.getMappingID().equals(id.getMappingID())) {
					String pathName = MwsxRepositoryManager.generateOntologyFolder(id.getOntologyID().getOntologyName());
					String versionPathName = MwsxRepositoryManager.generateOntologyVersionFolder(id.getOntologyID().getOntologyVersion());
					Path mapFilePath = Paths.get(this.getMastroHome() + File.separator + pathName + File.separator + versionPathName + File.separator + map.getFileName());
					if (Files.exists(mapFilePath)) {
						return mapFilePath.toString();
					}
				}
			}
			throw new RuntimeException("Cannot find mapping file for mapping ID " + id.getMappingID());
		} catch (IOException e) {
			throw new RuntimeException(e);
		}
	}
	
}
