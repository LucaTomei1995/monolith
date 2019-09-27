package com.mwsx.engine;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Properties;

import org.semanticweb.owlapi.apibinding.OWLManager;
import org.semanticweb.owlapi.model.OWLOntology;
import org.semanticweb.owlapi.model.OWLOntologyCreationException;
import org.w3c.dom.DOMException;
import org.xml.sax.SAXException;

import com.mwsx.model.KGOpeningEvent;
import com.mwsx.model.MastroID;
import com.mwsx.model.OntologyID;
import com.mwsx.model.OntologyOpeningEvent;
import com.mwsx.model.User;
import com.ruzzi.unfold.mastro.MappingManager;
import com.ruzzi.unfold.model.IRITemplateFormatException;
import com.ruzzi.unfold.model.SymbolManager;

import it.uniroma1.dis.mastro.api.exceptions.ParsingException;
import it.uniroma1.dis.mastro.api.generalInterfaces.PropertiesConstants;
import it.uniroma1.dis.mastro.api.impl.MastroAPI;
import it.uniroma1.dis.mastro.parsers.MastroOWLParser;
import it.uniroma1.dis.mastro.parsers.SparqlUCQLanguageException;
import it.uniroma1.dis.quonto.core.datasourcemanager.exceptions.DataLevelConfigurationException;
import it.uniroma1.dis.quonto.core.datasourcemanager.exceptions.UnrecognizedTypeException;
import it.uniroma1.dis.quonto.core.domain.ITBox;
import it.uniroma1.dis.quonto.core.domain.impl.DomainFactory;
import it.uniroma1.dis.quonto.core.exceptions.ConstraintMalformedException;
import it.uniroma1.dis.quonto.core.exceptions.InclusionAssertionException;
import it.uniroma1.dis.quonto.core.exceptions.OntologyAlphabetException;
import it.uniroma1.dis.quonto.core.exceptions.PrefixManagerException;
import it.uniroma1.dis.quonto.core.exceptions.UnsupportedLanguageException;

public class MwsxCacheManager {

	private static MwsxCacheManager cacheManager;
	private MwsxRepositoryManager repositoryManager;
	private Map<OntologyID, ITBox> tboxCache;
	private Map<OntologyID, OWLOntology> owlOntologyCache;
	private Map<MastroID, MappingManager> mappinCache;
	private Map<MastroID, MastroAPI> mastroCache;
	private Map<OntologyID, Long> lastTBoxAccess;
	private Map<OntologyID, Long> lastOwlOntologyAccess;
	private Map<MastroID, Long> lastMastroAccess;
	private Map<MastroID, Long> lastMappingAccess;
	private Map<User, List<OntologyOpeningEvent>> lastLoadedOntologies;
	private Map<User, List<KGOpeningEvent>> lastLoadedKGs;
	
	static {
		MwsxCacheManager.cacheManager = new MwsxCacheManager();
	}
	
	private MwsxCacheManager() {
		this.repositoryManager = MwsxRepositoryManager.getRepositoryManager();
		this.tboxCache = new HashMap<>();
		this.owlOntologyCache = new HashMap<>();
		this.mastroCache = new HashMap<>();
		this.lastOwlOntologyAccess = new HashMap<>();
		this.lastTBoxAccess = new HashMap<>();
		this.lastMastroAccess = new HashMap<>();
		this.mappinCache = new HashMap<>();
		this.lastMappingAccess = new HashMap<>();
		this.lastLoadedOntologies = new HashMap<>();
		this.lastLoadedKGs = new HashMap<>();
	}
	
	public static MwsxCacheManager getCacheManager() {
		if (MwsxCacheManager.cacheManager == null)
			MwsxCacheManager.cacheManager = new MwsxCacheManager();
		return MwsxCacheManager.cacheManager;
	}
	
	public List<OntologyOpeningEvent> getLastLoadedOntologies(User user) {
		if (this.lastLoadedOntologies.containsKey(user))
			return this.lastLoadedOntologies.get(user);
		else
			return new LinkedList<OntologyOpeningEvent>();
	}
	
	public List<KGOpeningEvent> getLastLoadedKGs(User user) {
		if (this.lastLoadedKGs.containsKey(user))
			return this.lastLoadedKGs.get(user);
		else
			return new LinkedList<KGOpeningEvent>();
	}
	
	public void addLastLoadedOntology(User user, OntologyID id) {
		if (id == null)
			return;
		if (id.getOntologyName() == null)
			return;
		if (id.getOntologyVersion() == null)
			return;
		OntologyOpeningEvent event = new OntologyOpeningEvent();
		event.setOnto(id);
		event.setTimestamp(System.currentTimeMillis());
		if (this.lastLoadedOntologies.containsKey(user)) {
			List<OntologyOpeningEvent> events = this.lastLoadedOntologies.get(user);
			int idx = -1;
			for (int i = 0; i < events.size(); i++) {
				OntologyOpeningEvent actEvent = events.get(i);
				if (actEvent.getOnto().equals(id)) {
					idx = i;
				}
			}
			if (idx != -1) {
				events.remove(idx);
				events.add(event);
			}
			else {
				if (events.size() == 10)
					events.remove(9);
				events.add(event);
			}
			this.lastLoadedOntologies.put(user, events);
		}
		else {
			List<OntologyOpeningEvent> ontos = new LinkedList<>();			
			ontos.add(event);
			this.lastLoadedOntologies.put(user, ontos);
		}
	}
	
	public void addLastLoadedKGs(User user, String iri) {
		if (iri == null)
			return;
		KGOpeningEvent event = new KGOpeningEvent();
		event.setIri(iri);
		event.setTimestamp(System.currentTimeMillis());
		if (this.lastLoadedKGs.containsKey(user)) {
			List<KGOpeningEvent> events = this.lastLoadedKGs.get(user);
			int idx = -1;
			for (int i = 0; i < events.size(); i++) {
				KGOpeningEvent actEvent = events.get(i);
				if (actEvent.getIri().equals(iri)) {
					idx = i;
				}
			}
			if (idx != -1) {
				events.remove(idx);
				events.add(event);
			}
			else {
				if (events.size() == 10)
					events.remove(9);
				events.add(event);
			}
			this.lastLoadedKGs.put(user, events);
		}
		else {
			List<KGOpeningEvent> ontos = new LinkedList<>();			
			ontos.add(event);
			this.lastLoadedKGs.put(user, ontos);
		}
	}
	
	public ITBox getTBox(OntologyID id) {
		if (this.tboxCache.containsKey(id)) {
			this.lastTBoxAccess.put(id,  new Long(System.currentTimeMillis()));
			return this.tboxCache.get(id);
		}
		else {
			List<String> translated = new LinkedList<>();
			List<String> approximated = new LinkedList<>();
			List<String> rejected = new LinkedList<>();
			String fileUri = this.repositoryManager.getOntologyFilePath(id);
			try {
				ITBox tbox = MastroOWLParser.getTBox(DomainFactory.getFactory(), fileUri, rejected, approximated, translated);
				this.tboxCache.put(id, tbox);
				this.lastTBoxAccess.put(id,  new Long(System.currentTimeMillis()));
				return tbox;
			} catch (ParsingException | PrefixManagerException | SparqlUCQLanguageException
					| ConstraintMalformedException | InclusionAssertionException | UnsupportedLanguageException
					| OntologyAlphabetException | UnrecognizedTypeException | OWLOntologyCreationException | IOException e) {
				throw new RuntimeException(e);
			}
		}
	}
	
	public OWLOntology getOwlOntology(OntologyID id) {
		Long ts = new Long(System.currentTimeMillis());
		if (this.owlOntologyCache.containsKey(id)) {
			this.lastOwlOntologyAccess.put(id, ts);
			return this.owlOntologyCache.get(id);
		}
		else {
			String fileUri = this.repositoryManager.getOntologyFilePath(id);
			try {
				OWLOntology onto = OWLManager.createOWLOntologyManager().loadOntologyFromOntologyDocument(Files.newInputStream(Paths.get(fileUri)));
				this.owlOntologyCache.put(id, onto);
				this.lastOwlOntologyAccess.put(id, ts);
				return onto;
			} catch (OWLOntologyCreationException | IOException e) {
				throw new RuntimeException(e);
			}			
		}
	}
	
	public MappingManager getMappingManager(MastroID id) {
		Long ts = new Long(System.currentTimeMillis());
		if (this.mappinCache.containsKey(id)) {
			this.lastMappingAccess.put(id, ts);
			return this.mappinCache.get(id);
		}
		else {
			String fileUri = this.repositoryManager.getMappingFilePath(id);
			ITBox tbox = this.getTBox(id.getOntologyID());
			try {
				MappingManager manager = new MappingManager(fileUri, tbox, null, SymbolManager.getSymbolManager(id.toString()));
				this.mappinCache.put(id, manager);
				this.lastMappingAccess.put(id, ts);
				return manager;
			} catch (ClassNotFoundException | DOMException | SAXException | IOException | SQLException
					| DataLevelConfigurationException | IRITemplateFormatException e) {
				throw new RuntimeException(e);
			}
		}
	}
	
	public void refreshMappingManager(MastroID mid) {
		this.mappinCache.remove(mid);
	}
	
	public MastroAPI getMastroAPI(MastroID id) {
		Long ts = new Long(System.currentTimeMillis());
		if (this.mastroCache.containsKey(id)) {
			this.lastMastroAccess.put(id, ts);
			return this.mastroCache.get(id);
		}
		else {
			ITBox tbox = this.getTBox(id.getOntologyID());
			MappingManager mapping = this.getMappingManager(id);
			OWLOntology ontology = this.getOwlOntology(id.getOntologyID());
			try {
				Properties prop = PropertiesConstants.cloneDefaultProperties();
				MastroAPI mastro = new MastroAPI(prop, tbox, mapping, ontology, false); 
				this.mastroCache.put(id, mastro);
				this.lastMastroAccess.put(id, ts);
				return mastro;
			} catch (DOMException | IllegalArgumentException | IllegalAccessException e) {
				throw new RuntimeException(e);
			}
		}
	}
	
}


