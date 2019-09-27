package com.mwsx.engine;

import java.io.File;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Collection;
import java.util.HashMap;
import java.util.HashSet;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Properties;
import java.util.UUID;

import javax.xml.parsers.ParserConfigurationException;

import org.apache.jena.query.Dataset;
import org.apache.jena.rdf.model.Model;
import org.apache.jena.tdb.TDBFactory;
import org.semanticweb.owlapi.model.OWLOntology;
import org.w3c.dom.DOMException;
import org.xml.sax.SAXException;

import com.mwsx.model.MastroConfigurationParam;
import com.mwsx.model.MastroID;
import com.mwsx.model.MastroProperties;
import com.mwsx.model.User;
import com.ruzzi.unfold.mastro.MappingManager;
import com.ruzzi.unfold.model.MappingAssertion;
import com.ruzzi.unfold.model.ViewDefinition;

import it.uniroma1.dis.mastro.api.exceptions.ParsingException;
import it.uniroma1.dis.mastro.api.generalInterfaces.PropertiesConstants;
import it.uniroma1.dis.mastro.api.impl.MastroAPI;
import it.uniroma1.dis.quonto.core.datasourcemanager.exceptions.UnrecognizedTypeException;
import it.uniroma1.dis.quonto.core.domain.ITBox;
import it.uniroma1.dis.quonto.core.exceptions.OntologyAlphabetException;
import it.uniroma1.dis.quonto.core.exceptions.PrefixManagerException;
import it.uniroma1.dis.quonto.core.exceptions.UnsupportedLanguageException;
import it.uniroma1.dis.quonto.core.mapping.exceptions.MappingMalformedException;
import it.uniroma1.dis.quonto.core.mapping.exceptions.TermMappingMalformedException;
import it.uniroma1.dis.quonto.mapping.exceptions.MappingRewriterStructureException;
import it.uniroma1.dis.quonto.mapping.exceptions.OntologyPredicateMappingMalformedException;
import it.uniroma1.dis.quonto.mapping.exceptions.PrimitiveViewMalformedException;

public class MwsxSession {

	public static final long MAX_SESSION_TIME = 3600000;
	public static final long DEFAULT_SESSION_TIME = 300000;

	private UUID sessionId = UUID.randomUUID();
	private long sessionStart = System.currentTimeMillis();
	private long sessionLastUpdate = sessionStart;
	private User user;
	private Map<MastroID, MastroAPI> instances = new HashMap<MastroID, MastroAPI>();
	private Map<String, Dataset> datasets = new HashMap<String, Dataset>();
	private Map<String, KGQueryRunner> queries = new HashMap<String, KGQueryRunner>();
	private long expirationTime = sessionStart + MwsxSession.DEFAULT_SESSION_TIME;
	private boolean closed;
	private int opCount = 1;

	MwsxSession(User user) {
		this.user = user;
	}

	public UUID getSessionId() {
		return sessionId;
	}
	
	public int getOperationsCount() {
		return opCount;
	}

	public long getSessionStart() {
		return sessionStart;
	}

	public long getSessionLastUpdate() {
		return sessionLastUpdate;
	}

	public User getUser() {
		return user;
	}

	public MastroAPI getMastroInstance(MastroID mastroID) {
		if (instances.containsKey(mastroID))
			return instances.get(mastroID);
		throw new RuntimeException("Cannot find Mastro instance " + mastroID + " in session " + this.sessionId
				+ " of user " + this.user.getName());
	}

	public void refresh() {
		this.sessionLastUpdate = System.currentTimeMillis();
		this.expirationTime = this.sessionLastUpdate + MwsxSession.DEFAULT_SESSION_TIME;
		this.opCount++;
	}

	public boolean isExpired() {
		if (this.getTTL() < 1)
			return true;
		else
			return false;
	}
	
	public long getTTL() {
		return (expirationTime - (System.currentTimeMillis()))/1000;
	}

	public boolean isActive() {
		return !this.isExpired();
	}

	public void releaseInstances() {
		for (MastroID mastroID : this.instances.keySet()) {
			MastroAPI mastro = this.getMastroInstance(mastroID);
			mastro.shutdown();
			this.instances.remove(mastroID);
		}
	}
	
	public void releaseDatasets() {
		for (String kgIri : this.datasets.keySet()) {
			Dataset dataset = this.getDataset(kgIri);
			dataset.close();
			this.datasets.remove(kgIri);
		}
	}
	
	public int releaseInstance(MastroID id) {
		System.out.println("Releasing instance " + id);
		if (!this.instances.containsKey(id)) {
			System.out.println("     ....  not found!");
			return 0;
		}
		MastroAPI mastro = this.instances.get(id);
//		mastro.getOBDAQueryRunner().exit();
		mastro.shutdown();
		this.instances.remove(id);
		return 0;
	}
	
	public boolean checkMappings(MastroID id, Map<String, List<String>> messagesByMapId) throws DOMException, ParsingException, ParserConfigurationException, SAXException, IOException, OntologyPredicateMappingMalformedException, MappingRewriterStructureException, PrimitiveViewMalformedException, MappingMalformedException, TermMappingMalformedException, UnrecognizedTypeException, OntologyAlphabetException, UnsupportedLanguageException, PrefixManagerException {
		boolean res = true;
		try {
			MappingManager mapMan = MwsxCacheManager.getCacheManager().getMappingManager(id);
			ITBox tbox = MwsxCacheManager.getCacheManager().getTBox(id.getOntologyID());
			for (MappingAssertion map : mapMan.getMappings()) {
				boolean actRes = MappingManager.checkMappingAssertion(map, tbox, mapMan.getViews(), messagesByMapId);
				res = res && actRes;
			}
		}
		catch(Throwable t) {
			res = false;
			addMessage("generic", t.getMessage(), messagesByMapId);
		}
		return res;
	}
	
	private static void addMessage(String id, String mes, Map<String, List<String>> messages) {
		if (messages.containsKey(id))
			messages.get(id).add(mes);
		else {
			List<String> m = new LinkedList<String>();
			m.add(mes);
			messages.put(id,  m);
		}
	}
	
	public int loadInstance(MastroID id, MastroProperties props) {
		if (this.instances.containsKey(id))
			return 0;
		try {
			MappingManager mapMan = MwsxCacheManager.getCacheManager().getMappingManager(id);
			ITBox tbox = MwsxCacheManager.getCacheManager().getTBox(id.getOntologyID());
			OWLOntology ontology = MwsxCacheManager.getCacheManager().getOwlOntology(id.getOntologyID());
			Properties prop = PropertiesConstants.cloneDefaultProperties();
			prop.setProperty(PropertiesConstants.OBDA_STREAM_QUERY_MONITOR_AUTOSTART, "true");
			prop.setProperty(PropertiesConstants.CONSTRUCT_QUERIES_RESULT_FOLDER, MwsxRepositoryManager.getRepositoryManager().getMastroHomeTemp());
			if (props != null) {
				for (MastroConfigurationParam mcp : props.getMastroProperties()) {
					String n = mcp.getName();
					String v = mcp.getValue();
					if (n != null && v != null && n.trim().length() > 0 && v.trim().length() > 0) {
						prop.setProperty(n, v);
					}
				}
			}
			MwsxMastroInstanceLoader loader = new MwsxMastroInstanceLoader(prop, mapMan, tbox, ontology);
			new Thread(loader).start();
			this.instances.put(id, loader.getMastroInstance());
			return 0;
		} catch (IllegalArgumentException | IllegalAccessException e) {
			throw new RuntimeException(e);
		}
	}

	public void close() {
		this.closed = true;
		this.releaseInstances();
		this.releaseDatasets();
	}

	public boolean isClosed() {
		return this.closed;
	}
	
	public Collection<? extends MastroID> getMastroIDs() {
		if (this.instances != null)
			return this.instances.keySet();
		return new HashSet<MastroID>();
	}

	public static Model getModel(String kgIri) {
		// TODO Auto-generated method stub
		return null;
	}

	public Dataset getDataset(String kgIri) {
		if (this.datasets.containsKey(kgIri))
			return this.datasets.get(kgIri);
		else {
			Dataset d = null;
			String kgSubPath = MwsxRepositoryManager.generateKGFolder(kgIri);
			Path path = Paths.get(MwsxRepositoryManager.getRepositoryManager().getKgHome() + File.separator 
					+ kgSubPath + File.separator + MwsxOntologyManager.KG_TDB_FOLDER_NAME);
			d = TDBFactory.createDataset(path.toString());
			this.datasets.put(kgIri,  d);
			return d;
		}
	}

	public void addKGQueryThread(String queryID, KGQueryRunner runner) {
		this.queries.remove(queryID);
		this.queries.put(queryID, runner);
	}
	
	public KGQueryRunner getKGQueryThread(String queryID) {
		return this.queries.get(queryID);
	}

}
