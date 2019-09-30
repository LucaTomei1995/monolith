package com.mwsx.engine;

import java.io.BufferedInputStream;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.FileWriter;
import java.io.IOException;
import java.io.StringWriter;
import java.nio.charset.Charset;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.sql.SQLException;
import java.util.Collection;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;
import java.util.Properties;
import java.util.Random;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import javax.servlet.http.HttpServletRequest;
import javax.xml.parsers.ParserConfigurationException;
import javax.xml.transform.OutputKeys;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerConfigurationException;
import javax.xml.transform.TransformerException;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;

import org.apache.jena.query.Dataset;
import org.apache.jena.query.Query;
import org.apache.jena.query.QueryExecution;
import org.apache.jena.query.QueryExecutionFactory;
import org.apache.jena.query.QueryFactory;
import org.apache.jena.query.QuerySolution;
import org.apache.jena.query.ResultSet;
import org.apache.jena.rdf.model.Model;
import org.apache.jena.rdf.model.RDFNode;
import org.apache.jena.tdb.TDBFactory;
import org.apache.xerces.parsers.DOMParser;
import org.json.JSONArray;
import org.json.JSONObject;
//import org.glassfish.jersey.internal.util.Base64;
import org.semanticweb.owlapi.apibinding.OWLManager;
import org.semanticweb.owlapi.formats.FunctionalSyntaxDocumentFormat;
import org.semanticweb.owlapi.formats.PrefixDocumentFormat;
import org.semanticweb.owlapi.formats.RDFXMLDocumentFormat;
import org.semanticweb.owlapi.formats.TurtleDocumentFormat;
import org.semanticweb.owlapi.model.IRI;
import org.semanticweb.owlapi.model.OWLAnnotation;
import org.semanticweb.owlapi.model.OWLAnnotationAssertionAxiom;
import org.semanticweb.owlapi.model.OWLAnnotationProperty;
import org.semanticweb.owlapi.model.OWLAxiom;
import org.semanticweb.owlapi.model.OWLClass;
import org.semanticweb.owlapi.model.OWLClassAssertionAxiom;
import org.semanticweb.owlapi.model.OWLDataProperty;
import org.semanticweb.owlapi.model.OWLDataPropertyAssertionAxiom;
import org.semanticweb.owlapi.model.OWLDisjointClassesAxiom;
import org.semanticweb.owlapi.model.OWLDisjointDataPropertiesAxiom;
import org.semanticweb.owlapi.model.OWLDisjointObjectPropertiesAxiom;
import org.semanticweb.owlapi.model.OWLEntity;
import org.semanticweb.owlapi.model.OWLImportsDeclaration;
import org.semanticweb.owlapi.model.OWLObjectProperty;
import org.semanticweb.owlapi.model.OWLObjectPropertyAssertionAxiom;
import org.semanticweb.owlapi.model.OWLOntology;
import org.semanticweb.owlapi.model.OWLOntologyCreationException;
import org.semanticweb.owlapi.model.OWLOntologyManager;
import org.semanticweb.owlapi.model.OWLOntologyStorageException;
import org.semanticweb.owlapi.model.OWLSignature;
import org.semanticweb.owlapi.model.OWLSubClassOfAxiom;
import org.semanticweb.owlapi.model.OWLSubDataPropertyOfAxiom;
import org.semanticweb.owlapi.model.OWLSubObjectPropertyOfAxiom;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.w3c.dom.DOMException;
import org.w3c.dom.Document;
import org.w3c.dom.NamedNodeMap;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import org.xml.sax.InputSource;
import org.xml.sax.SAXException;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.mwsx.model.ClassInfo;
import com.mwsx.model.DataPropertyInfo;
import com.mwsx.model.DatabaseConnection;
import com.mwsx.model.Entities;
import com.mwsx.model.Entity;
import com.mwsx.model.FileInfo;
import com.mwsx.model.InclusionDependency;
import com.mwsx.model.InclusionPair;
import com.mwsx.model.InclusionView;
import com.mwsx.model.KGOpeningEvent;
import com.mwsx.model.KGStatus;
import com.mwsx.model.KGStoreFileInfo;
import com.mwsx.model.KGStoreFileInfoEntry;
import com.mwsx.model.KeyDependency;
import com.mwsx.model.KnowledgeGraph;
import com.mwsx.model.KnowledgeGraphDestination;
import com.mwsx.model.KnowledgeGraphDestinationQueryOBDA;
import com.mwsx.model.KnowledgeGraphFile;
import com.mwsx.model.KnowledgeGraphFileDestination;
import com.mwsx.model.KnowledgeGraphFileInfo;
import com.mwsx.model.KnowledgeGraphFileInfos;
import com.mwsx.model.Label;
import com.mwsx.model.MapItem;
import com.mwsx.model.Mapping;
import com.mwsx.model.MappingAssertion;
import com.mwsx.model.MappingBody;
import com.mwsx.model.MappingDependencies;
import com.mwsx.model.MappingHead;
import com.mwsx.model.MappingInfo;
import com.mwsx.model.MappingRewritings;
import com.mwsx.model.Mappings;
import com.mwsx.model.MappingsCheckResult;
import com.mwsx.model.MastroID;
import com.mwsx.model.MastroProperties;
import com.mwsx.model.NewMappingData;
import com.mwsx.model.NewMappingFileInfo;
import com.mwsx.model.OBDACatalog;
import com.mwsx.model.OBDAConstructResults;
import com.mwsx.model.OBDARunQueryInstance;
import com.mwsx.model.ObjectPropertyInfo;
import com.mwsx.model.Ontologies;
import com.mwsx.model.Ontology;
import com.mwsx.model.OntologyClassesInfo;
import com.mwsx.model.OntologyDataPropertiesInfo;
import com.mwsx.model.OntologyHierarchy;
import com.mwsx.model.OntologyID;
import com.mwsx.model.OntologyInfo;
import com.mwsx.model.OntologyMetrics;
import com.mwsx.model.OntologyObjectPropertiesInfo;
import com.mwsx.model.OntologyOpeningEvent;
import com.mwsx.model.OntologyRewritings;
import com.mwsx.model.OntologyVersion;
import com.mwsx.model.Participation;
import com.mwsx.model.Prefix;
import com.mwsx.model.SPARQLQuery;
import com.mwsx.model.SPARQLQueryExecution;
import com.mwsx.model.SPARQLResult;
import com.mwsx.model.SPARQLResults;
import com.mwsx.model.SPARQLStatus;
import com.mwsx.model.SQLView;
import com.mwsx.model.SQLViews;
import com.mwsx.model.SqlQueryInfo;
import com.mwsx.model.User;
import com.mwsx.model.ViewMappings;
import com.mwsx.model.ViewRewriting;
import com.mwsx.model.ViewRewritings;
import com.mwsx.model.kg.InstancePage;
import com.mwsx.model.kg.ObjectPredicatePageType;
import com.mwsx.model.kg.SubjectPredicatePageType;
import com.mwsx.model.OBDAStatus;
import com.ruzzi.mastro.queries.catalog.QueryCatalog;
import com.ruzzi.mastro.queries.catalog.QueryCatalogEntry;
import com.ruzzi.mastro.stream.queries.monitor.IOBDAQueryMonitor;
import com.ruzzi.mastro.stream.queries.monitor.QueryRecord;
import com.ruzzi.unfold.mastro.MappingManager;
import com.ruzzi.unfold.mastro.MappingsMetadata;
import com.ruzzi.unfold.model.Atom;
import com.ruzzi.unfold.model.BuiltinPredicateManager;
import com.ruzzi.unfold.model.FunctionTerm;
import com.ruzzi.unfold.model.IRITemplate;
import com.ruzzi.unfold.model.IRITemplateFormatException;
import com.ruzzi.unfold.model.IRITemplateManager;
import com.ruzzi.unfold.model.IRITemplateManagerException;
import com.ruzzi.unfold.model.Term;
import com.ruzzi.unfold.model.json.JSONQueryCatalog;
import com.ruzzi.unfold.model.json.JSONQueryCatalogEntry;
import com.ruzzi.unfold.model.json.JSONStringValue;
import com.ruzzi.unfold.model.json.JSONTuple;
import com.ruzzi.unfold.model.json.JSONUserQueryCatalog;
import com.sun.xml.internal.messaging.saaj.util.ByteInputStream;

import it.uniroma1.dis.mastro.api.approximation.OWL2QLPlusApproximator;
import it.uniroma1.dis.mastro.api.exceptions.ParsingException;
import it.uniroma1.dis.mastro.api.impl.MastroAPI;
import it.uniroma1.dis.mastro.parsers.GraphOLParser;
import it.uniroma1.dis.mastro.parsers.SparqlUCQLanguageException;
import it.uniroma1.dis.quonto.core.datasourcemanager.AbstractDataSourceManager;
import it.uniroma1.dis.quonto.core.datasourcemanager.DataSourceInfo;
import it.uniroma1.dis.quonto.core.datasourcemanager.DataSourceInfoEntry;
import it.uniroma1.dis.quonto.core.datasourcemanager.exceptions.DataLevelConfigurationException;
import it.uniroma1.dis.quonto.core.datasourcemanager.exceptions.UnrecognizedTypeException;
import it.uniroma1.dis.quonto.core.domain.ITBox;
import it.uniroma1.dis.quonto.core.domain.impl.OntologyAlphabet;
import it.uniroma1.dis.quonto.core.exceptions.ConstraintMalformedException;
import it.uniroma1.dis.quonto.core.exceptions.InclusionAssertionException;
import it.uniroma1.dis.quonto.core.exceptions.OntologyAlphabetException;
import it.uniroma1.dis.quonto.core.exceptions.PrefixManagerException;
import it.uniroma1.dis.quonto.core.exceptions.UnsupportedLanguageException;
import it.uniroma1.dis.quonto.core.mapping.exceptions.MappingMalformedException;
import it.uniroma1.dis.quonto.core.mapping.exceptions.TermMappingMalformedException;
import it.uniroma1.dis.quonto.mapping.domain.impl.PrimitiveView;
import it.uniroma1.dis.quonto.mapping.domain.impl.ViewDenialConstraint;
import it.uniroma1.dis.quonto.mapping.domain.impl.ViewInclusionDependency;
import it.uniroma1.dis.quonto.mapping.domain.impl.ViewKeyDependency;
import it.uniroma1.dis.quonto.mapping.exceptions.MappingFileMalformedException;
import it.uniroma1.dis.quonto.mapping.exceptions.MappingRewriterStructureException;
import it.uniroma1.dis.quonto.mapping.exceptions.OntologyPredicateMappingMalformedException;
import it.uniroma1.dis.quonto.mapping.exceptions.PrimitiveDisjointnessMalformedException;
import it.uniroma1.dis.quonto.mapping.exceptions.PrimitiveInclusionMalformedException;
import it.uniroma1.dis.quonto.mapping.exceptions.PrimitiveViewMalformedException;
import it.uniroma1.dis.quonto.mapping.exceptions.ViewProjectionMalformedException;
import net.sf.jsqlparser.JSQLParserException;

public class MwsxOntologyManager {

	public static boolean LOG_METHODS;
	
	static Logger logger = LoggerFactory.getLogger(MwsxOntologyManager.class);

	public static final String ONTOLOGY_INFO_FILE_NAME = "info";
	public static final String ONTOLOGY_VERSION_INFO_FILE_NAME = "info";
	public static final String ONTOLOGY_VERSION_ONTO_INFO_FILE_NAME = "ontology-info";
	public static final String ONTOLOGY_VERSION_ONTO_CLASSES_INFO_FILE_NAME = "ontology-classes-info";
	public static final String ONTOLOGY_VERSION_ONTO_OP_INFO_FILE_NAME = "ontology-op-info";
	public static final String ONTOLOGY_VERSION_ONTO_DP_INFO_FILE_NAME = "ontology-dp-info";
	public static final String ONTOLOGY_VERSION_HIERARCHY_INFO_FILE_NAME = "ontology-hierarchy";
	public static final String ONTOLOGY_VERSION_OWL_FILE_NAME = "ontology.owl";
	public static final String ONTOLOGY_VERSION_ENTITIES_FILE_NAME = "entities";
	public static final String ONTOLOGY_VERSION_GRAPHOL_FILE_NAME = "diagram.graphol";
	public static final String ONTOLOGY_VERSION_MAPPINGS_FILE_NAME = "mappings-info";
	public static final String QUERY_CATALOG_FILE_NAME = "query_catalog.json";
	public static final String KG_INFO_FILE_NAME = "kg.info";
	public static final String KG_STORE_INFO_FILE_NAME = "store.info";
	public static final String KG_MODELS_FOLDER_NAME = "models";
	public static final String KG_MODELS_INFO_FILE_NAME = "models.info";
	public static final String KG_QUERIES_FOLDER_NAME = "queries";
	public static final String KG_TDB_FOLDER_NAME = "tdb";
	public static final String MAPPING_FILE_NAME_TEMPLATE = "mappings_[COUNT].[EXT]";

	public static final String ENTITY_CLASS_TYPE = "CLASS";
	public static final String ENTITY_OP_TYPE = "OBJECT_PROPERTY";
	public static final String ENTITY_DP_TYPE = "DATA_PROPERTY";
	public static final String ENTITY_DT_TYPE = "DATA_TYPE";
	public static final String ENTITY_EXPR_TYPE = "EXPRESSION";

//	private String status;
	private String mastroHome;
	private String kgHome;
	private String mastroHomeTemp;
	private List<Ontology> ontologies = new LinkedList<Ontology>();
	private List<KnowledgeGraph> kgs = new LinkedList<KnowledgeGraph>();
	private OWLOntologyManager owlOntologyManager;
	private MwsxRepositoryManager repositoryManager;
	private MwsxCacheManager cacheManager;

	private static MwsxOntologyManager ontologyManager;

	static {
		MwsxOntologyManager.ontologyManager = new MwsxOntologyManager();
	}

	public static MwsxOntologyManager getOntologyManager() {
		return MwsxOntologyManager.ontologyManager;
	}

	private MwsxOntologyManager() {
		this.repositoryManager = MwsxRepositoryManager.getRepositoryManager();
		this.cacheManager = MwsxCacheManager.getCacheManager();
		this.mastroHome = this.repositoryManager.getMastroHome();
		this.kgHome = this.repositoryManager.getKgHome();
		this.mastroHomeTemp = this.repositoryManager.getMastroHomeTemp();
		try {
			this.init();
		} catch (IOException e) {
			throw new RuntimeException(e);
		}
	}

	public Ontologies getOntologies() {
		Ontologies os = new Ontologies();
		os.setOntologyList(this.ontologies);
		return os;
	}

	public Ontology getOntology(String id) {
		for (Ontology o : this.ontologies) {
			if (o.getOntologyID().equals(id))
				return o;
		}
		return null;
	}
	
	public KnowledgeGraph getKnowledgeGraph(MwsxSession session, String iri) {
		this.manageLastLoadedKG(session.getUser(), iri);
		for (KnowledgeGraph kg : this.kgs) {
			if (kg.getKgIri().equals(iri))
				return kg;
		}
		return null;
	}
	
	public KnowledgeGraph getKnowledgeGraph(String iri) {
		for (KnowledgeGraph kg : this.kgs) {
			if (kg.getKgIri().equals(iri))
				return kg;
		}
		return null;
	}
	
	private void manageLastLoadedKG(User user, String iri) {
		this.cacheManager.addLastLoadedKGs(user, iri);
	}
	
	public List<KGOpeningEvent> getLastLoadedKG(User user) {
		return this.cacheManager.getLastLoadedKGs(user);
	}

	public OntologyVersion getOntologyVersion(String ontoId, String versionId) {
		Ontology onto = getOntology(ontoId);
		if (onto != null) {
			for (OntologyVersion v : onto.getOntologyVersions())
				if (v.getVersionID().equals(versionId))
					return v;
		}
		return null;
	}

	public void addOntology(Ontology o) throws IOException {
		if (o.getOntologyID() == null || o.getOntologyID().trim().equals(""))
			throw new RuntimeException("Cannot create an ontology with null or empty ID");
		if (o.getOntologyOwner() == null || o.getOntologyOwner().getName() == null
				|| o.getOntologyOwner().getName().trim().equals(""))
			throw new RuntimeException("Cannot create an ontology with null or empty user");
		User owner = MwsxPermissionManager.getPermissionManager().getUser(o.getOntologyOwner().getName());
		o.setOntologyOwner(owner);
		String pathName = MwsxRepositoryManager.generateOntologyFolder(o);
		Path p = Paths.get(mastroHome + File.separator + pathName);
		String description = o.getOntologyDescription() != null ? o.getOntologyDescription()
				: "No description provided";
		if (Files.exists(p))
			throw new RuntimeException("Directory " + p + " already exists!");
		Files.createDirectory(p);
		Path pInfo = Paths.get(mastroHome + File.separator + pathName + File.separator + ONTOLOGY_INFO_FILE_NAME);
		ObjectMapper om = new ObjectMapper();
		om.enable(SerializationFeature.INDENT_OUTPUT);
		om.writeValue(pInfo.toFile(), o);
		init();
	}
	
	public void addKnowledgeGraph(KnowledgeGraph kg) throws IOException {
		if (kg.getKgIri() == null || kg.getKgIri().trim().equals(""))
			throw new RuntimeException("Cannot create an knowledge graph with null or empty IRI");
		User owner = MwsxPermissionManager.getPermissionManager().getUser(kg.getKgCreator().getName());
		kg.setKgCreator(owner);
		String pathName = MwsxRepositoryManager.generateKGFolder(kg);
		Path p = Paths.get(kgHome + File.separator + pathName);
		if (Files.exists(p))
			throw new RuntimeException("Directory " + p + " already exists!");
		Files.createDirectory(p);
		Path pInfo = Paths.get(kgHome + File.separator + pathName + File.separator + KG_INFO_FILE_NAME);
		Path pModelDir = Paths.get(kgHome + File.separator + pathName + File.separator + KG_MODELS_FOLDER_NAME);
		Path pQueryDir = Paths.get(kgHome + File.separator + pathName + File.separator + KG_QUERIES_FOLDER_NAME);
		if (Files.exists(pModelDir))
			throw new RuntimeException("Directory " + pModelDir + " already exists!");
		Files.createDirectory(pModelDir);
		if (Files.exists(pQueryDir))
			throw new RuntimeException("Directory " + pQueryDir + " already exists!");
		Files.createDirectory(pQueryDir);
		ObjectMapper om = new ObjectMapper();
		om.enable(SerializationFeature.INDENT_OUTPUT);
		om.writeValue(pInfo.toFile(), kg);
		init();
	}

	public void addOntologyVersion(Ontology o, com.mwsx.model.FileInfo put, String RENDERING_SYNTAX)
			throws IOException, OWLOntologyCreationException, OWLOntologyStorageException {
		long t = System.currentTimeMillis();
		System.out.println("Start: " + t);
		OWLOntology ontology = null;
		if (!put.getFileType().toLowerCase().endsWith("owl") && !put.getFileType().toLowerCase().endsWith("graphol")) {
			throw new RuntimeException("Add ontology version allowed only with 'OWL' or 'GRAPHOL' file types");
		}
		Path tempOwlFilePath = null;
		Path tempGrapholFilePath = null;
		if (put.getFileType().toLowerCase().endsWith("owl")) {
			String tempOwlFileName = UUID.randomUUID().toString() + ".owl";
			tempOwlFilePath = Paths.get(mastroHomeTemp + File.separator + tempOwlFileName);
			Files.write(tempOwlFilePath, java.util.Base64.getDecoder().decode(put.getContent().getBytes()));
			ontology = this.owlOntologyManager
					.loadOntologyFromOntologyDocument(new ByteArrayInputStream(Files.readAllBytes(tempOwlFilePath)));
		}
		else if (put.getFileType().toLowerCase().endsWith("graphol")) {
			String tempGrapholFileName = UUID.randomUUID().toString() + ".graphol";
			tempGrapholFilePath = Paths.get(mastroHomeTemp + File.separator + tempGrapholFileName);
			Files.write(tempGrapholFilePath, java.util.Base64.getDecoder().decode(put.getContent().getBytes()));
			GraphOLParser parser = new GraphOLParser();
			ontology = parser.parseOWLOntology(tempGrapholFilePath.toString());
			String tempOwlFileName = UUID.randomUUID().toString() + ".owl";
			tempOwlFilePath = Paths.get(mastroHomeTemp + File.separator + tempOwlFileName);
			ontology.getOWLOntologyManager().saveOntology(ontology, new FileOutputStream(tempOwlFilePath.toFile()));
		}
		else {
			throw new RuntimeException("Error adding ontology version: cannot recognize file type " + put.getFileType());
		}
		System.out.println("Files loaded: " + (t = System.currentTimeMillis() - t));
		String pathName = MwsxRepositoryManager.generateOntologyFolder(o);
		Entities entities = MwsxOntologyManager.extractEntities(ontology);
		System.out.println("Entities extraction: " + (t = System.currentTimeMillis() - t));
		ReasoningServices rs = new ReasoningServices(ontology, entities);
		ReasoningServices.RENDERING_SYNTAX = RENDERING_SYNTAX;
		OntologyVersion v = extractOntologyVersionInfo(o, ontology);
		OntologyInfo info = this.extractOntologyInfo(o, v, ontology);
		OntologyClassesInfo classesInfo = extractOntologyClassesInfo(ontology, rs, entities);
		System.out.println("Classes info extraction: " + (t = System.currentTimeMillis() - t));
		OntologyDataPropertiesInfo dpInfo = extractOntologyDPInfo(ontology, rs, entities);
		System.out.println("Data property info extraction: " + (t = System.currentTimeMillis() - t));
		OntologyObjectPropertiesInfo opInfo = extractOntologyOPInfo(ontology, rs, entities);
		System.out.println("Object property info extraction: " + (t = System.currentTimeMillis() - t));
		OntologyHierarchy hierarchy = this.extractOntologyVersionHierarchy(o, v, ontology, rs, entities);
		System.out.println("Hierarchy extraction: " + (t = System.currentTimeMillis() - t));
		String versionPathName = MwsxRepositoryManager.generateOntologyVersionFolder(v.getVersionID());
		Path p = Paths.get(mastroHome + File.separator + pathName + File.separator + versionPathName);
		if (Files.exists(p))
			throw new RuntimeException("Directory " + p + " already exists!");
		Files.createDirectory(p);
		Path infoPath = Paths.get(mastroHome + File.separator + pathName + File.separator + versionPathName
				+ File.separator + ONTOLOGY_VERSION_INFO_FILE_NAME);
		Path ontoInfoPath = Paths.get(mastroHome + File.separator + pathName + File.separator + versionPathName
				+ File.separator + ONTOLOGY_VERSION_ONTO_INFO_FILE_NAME);
		Path ontoClassesInfoPath = Paths.get(mastroHome + File.separator + pathName + File.separator + versionPathName
				+ File.separator + ONTOLOGY_VERSION_ONTO_CLASSES_INFO_FILE_NAME);
		Path ontoOPInfoPath = Paths.get(mastroHome + File.separator + pathName + File.separator + versionPathName
				+ File.separator + ONTOLOGY_VERSION_ONTO_OP_INFO_FILE_NAME);
		Path ontoDPInfoPath = Paths.get(mastroHome + File.separator + pathName + File.separator + versionPathName
				+ File.separator + ONTOLOGY_VERSION_ONTO_DP_INFO_FILE_NAME);
		Path ontoHierarchyPath = Paths.get(mastroHome + File.separator + pathName + File.separator + versionPathName
				+ File.separator + ONTOLOGY_VERSION_HIERARCHY_INFO_FILE_NAME);
		Path owlFilePath = Paths.get(mastroHome + File.separator + pathName + File.separator + versionPathName
				+ File.separator + ONTOLOGY_VERSION_OWL_FILE_NAME);
		Path grapholFilePath = Paths.get(mastroHome + File.separator + pathName + File.separator + versionPathName
				+ File.separator + ONTOLOGY_VERSION_GRAPHOL_FILE_NAME);
		Path entitiesFilePath = Paths.get(mastroHome + File.separator + pathName + File.separator + versionPathName
				+ File.separator + ONTOLOGY_VERSION_ENTITIES_FILE_NAME);
		if (tempOwlFilePath != null) {
			Files.move(tempOwlFilePath, owlFilePath);
		}
		if (tempGrapholFilePath != null) {
			Files.move(tempGrapholFilePath, grapholFilePath);
		}
		ObjectMapper om = new ObjectMapper();
		om.enable(SerializationFeature.INDENT_OUTPUT);
		om.writeValue(infoPath.toFile(), v);
		om.writeValue(ontoInfoPath.toFile(), info);
		om.writeValue(ontoHierarchyPath.toFile(), hierarchy);
		om.writeValue(ontoClassesInfoPath.toFile(), classesInfo);
		om.writeValue(ontoOPInfoPath.toFile(), opInfo);
		om.writeValue(ontoDPInfoPath.toFile(), dpInfo);
		om.writeValue(entitiesFilePath.toFile(), entities);
		System.out.println("Writing files: " + (t = System.currentTimeMillis() - t));
		init();
	}

	public static Entities extractEntities(OWLOntology ontology) throws OWLOntologyCreationException {
		Entities entities = new Entities();
		int classesCount = 1;
		int objectPropertiesCount = 1;
		int dataPropertiesCount = 1;
		List<Entity> classEntities = new LinkedList<Entity>();
		List<Entity> opEntities = new LinkedList<Entity>();
		List<Entity> dpEntities = new LinkedList<Entity>();
		PrefixDocumentFormat pdf = (PrefixDocumentFormat) ontology.getOWLOntologyManager().getOntologyFormat(ontology);
		for (OWLClass clazz : ontology.getClassesInSignature()) {
			String id = "CL_" + classesCount++;
			classEntities.add(extractEntity(id, ontology, clazz, pdf));
		}
		for (OWLObjectProperty op : ontology.getObjectPropertiesInSignature()) {
			String id = "OP_" + objectPropertiesCount++;
			opEntities.add(extractEntity(id, ontology, op, pdf));
		}
		for (OWLDataProperty dp : ontology.getDataPropertiesInSignature()) {
			String id = "DL_" + dataPropertiesCount++;
			dpEntities.add(extractEntity(id, ontology, dp, pdf));
		}
		entities.setClassEntities(classEntities);
		entities.setDataPropertyEntities(dpEntities);
		entities.setObjectPropertyEntities(opEntities);
		return entities;
	}

	static Entity extractEntity(String id, OWLOntology ontology, OWLEntity owlEntity, PrefixDocumentFormat pdf)
			throws OWLOntologyCreationException {
		Entity entity = new Entity();
		OWLAnnotationProperty labelProp = ontology.getOWLOntologyManager().getOWLDataFactory()
				.getOWLAnnotationProperty(IRI.create("http://www.w3.org/2000/01/rdf-schema#label"));
		List<Label> labels = new LinkedList<Label>();
		for (OWLAnnotationAssertionAxiom annotation : ontology.getAnnotationAssertionAxioms(owlEntity.getIRI())) {
			if (!annotation.getValue().asLiteral().isPresent())
				continue;
			String value = annotation.getValue().asLiteral().get().getLiteral();
			String lang = annotation.getValue().asLiteral().get().getLang();
			if (annotation.getProperty().equals(labelProp)) {
				Label label = new Label();
				label.setLang(lang);
				label.setContent(value);
				labels.add(label);
			}
		}
		entity.setEntityLabels(labels);
		IRI iri = owlEntity.getIRI();
		entity.setEntityIRI(iri.toString());
		entity.setEntityRemainder(iri.getRemainder().isPresent() ? iri.getRemainder().get() : "");
		entity.setEntityPrefixIRI(pdf.getPrefixIRI(iri));
		entity.setEntityID(id);
		if (owlEntity instanceof OWLClass)
			entity.setEntityType(ENTITY_CLASS_TYPE);
		if (owlEntity instanceof OWLObjectProperty)
			entity.setEntityType(ENTITY_OP_TYPE);
		if (owlEntity instanceof OWLDataProperty)
			entity.setEntityType(ENTITY_DP_TYPE);
		return entity;
	}

	private OntologyClassesInfo extractOntologyClassesInfo(OWLOntology ontology, ReasoningServices rs,
			Entities entities) {
		List<ClassInfo> infos = new LinkedList<ClassInfo>();
		OntologyClassesInfo classesInfo = new OntologyClassesInfo();
		for (OWLClass clazz : ontology.getClassesInSignature()) {
			infos.add(extractClassInfo(clazz, ontology, rs, entities));
		}
		classesInfo.setClassesInfo(infos);
		return classesInfo;
	}

	private OntologyObjectPropertiesInfo extractOntologyOPInfo(OWLOntology ontology, ReasoningServices rs,
			Entities entities) {
		List<ObjectPropertyInfo> infos = new LinkedList<ObjectPropertyInfo>();
		OntologyObjectPropertiesInfo classesInfo = new OntologyObjectPropertiesInfo();
		for (OWLObjectProperty clazz : ontology.getObjectPropertiesInSignature()) {
			infos.add(extractObjectPropertyInfo(clazz, ontology, rs, entities));
		}
		classesInfo.setObjectPropertiesInfo(infos);
		return classesInfo;
	}

	private OntologyDataPropertiesInfo extractOntologyDPInfo(OWLOntology ontology, ReasoningServices rs,
			Entities entities) {
		List<DataPropertyInfo> infos = new LinkedList<DataPropertyInfo>();
		OntologyDataPropertiesInfo classesInfo = new OntologyDataPropertiesInfo();
		for (OWLDataProperty clazz : ontology.getDataPropertiesInSignature()) {
			infos.add(extractDataPropertyInfo(clazz, ontology, rs, entities));
		}
		classesInfo.setDataPropertiesInfo(infos);
		return classesInfo;
	}

	private ClassInfo extractClassInfo(OWLClass clazz, OWLOntology ontology, ReasoningServices rs, Entities entities) {
		ClassInfo info = new ClassInfo();
		info.setClassDescriptions(extractEntityAnnotations(clazz, ontology));
		info.setCurrentEntity(rs.entity(clazz));
		info.setSubClasses(rs.getSubEntities(clazz));
		info.setSuperClasses(rs.getSuperEntities(clazz));
		info.setDisjointClasses(new LinkedList<Entity>(rs.getDisjointEntities(clazz)));
		info.setEquivalentClasses(new LinkedList<Entity>(rs.getEquivalentEntities(clazz)));
		info.setClassIndividuals(new LinkedList<Entity>(rs.getIndividuals(clazz, ontology)));
		Set<Participation> opPart = new HashSet<Participation>();
		Set<Participation> dpPart = new HashSet<Participation>();
		rs.getClassParticipations(clazz, opPart, dpPart);
		info.setObjectPropertiesParticipations(new LinkedList<Participation>(opPart));
		info.setDataPropertiesParticipations(new LinkedList<Participation>(dpPart));
		long t = System.currentTimeMillis();
		System.out.println(" - Class " + clazz.getIRI() + " info extraction: " + (t = System.currentTimeMillis() - t));
		return info;
	}

	private ObjectPropertyInfo extractObjectPropertyInfo(OWLObjectProperty op, OWLOntology ontology,
			ReasoningServices rs, Entities entities) {
		ObjectPropertyInfo info = new ObjectPropertyInfo();
		info.setObjectPropertyDescriptions(extractEntityAnnotations(op, ontology));
		info.setCurrentEntity(rs.entity(op));
		info.setSubObjectProperties(rs.getSubEntities(op));
		info.setSuperObjectProperties(rs.getSuperEntities(op));
		info.setDisjointObjectProperties(new LinkedList<Entity>(rs.getDisjointEntities(op)));
		info.setEquivalentObjectProperties(new LinkedList<Entity>(rs.getEquivalentEntities(op)));
		info.setObjectPropertyDomain(rs.getPropertyDomain(op, ontology));
		info.setObjectPropertyRange(rs.getPropertyRange(op, ontology));
		info.setObjectPropertyFunctional(rs.getPropertyFunctional(op, ontology));
		info.setObjectPropertyInverseFunctional(rs.getPropertyInverseFunctional(op, ontology));
		long t = System.currentTimeMillis();
		System.out.println(" - Object property " + op.getIRI() + " info extraction: " + (t = System.currentTimeMillis() - t));
		return info;
	}

	private DataPropertyInfo extractDataPropertyInfo(OWLDataProperty dp, OWLOntology ontology, ReasoningServices rs,
			Entities entities) {
		DataPropertyInfo info = new DataPropertyInfo();
		info.setDataPropertyDescriptions(extractEntityAnnotations(dp, ontology));
		info.setCurrentEntity(rs.entity(dp));
		info.setSubDataProperties(rs.getSubEntities(dp));
		info.setSuperDataProperties(rs.getSuperEntities(dp));
		info.setDisjointDataProperties(new LinkedList<Entity>(rs.getDisjointEntities(dp)));
		info.setEquivalentDataProperties(new LinkedList<Entity>(rs.getEquivalentEntities(dp)));
		info.setDataPropertyDomain(rs.getPropertyDomain(dp, ontology));
		info.setDataPropertyRange(rs.getPropertyRange(dp, ontology));
		info.setDataPropertyFunctional(rs.getPropertyFunctional(dp, ontology));
		long t = System.currentTimeMillis();
		System.out.println(" - Data property " + dp.getIRI() + " info extraction: " + (t = System.currentTimeMillis() - t));
		return info;
	}

	private OntologyHierarchy extractOntologyVersionHierarchy(Ontology o, OntologyVersion v, OWLOntology ontology,
			ReasoningServices rs, Entities entities) {
		OntologyHierarchy hierarchy = new OntologyHierarchy();
		hierarchy.setHierarchyTree(rs.buildHierarchyTree(ontology));
		return hierarchy;
	}

	private List<Label> extractOntologyAnnotations(OWLOntology ontology) {
		List<Label> description = new LinkedList<Label>();
		OWLAnnotationProperty prop = ontology.getOWLOntologyManager().getOWLDataFactory()
				.getOWLAnnotationProperty(IRI.create("http://www.w3.org/2000/01/rdf-schema#comment"));
		for (OWLAnnotation annotation : ontology.getAnnotations()) {
			if (annotation.getProperty().equals(prop)) {
				String value = annotation.getValue().asLiteral().get().getLiteral();
				String lang = annotation.getValue().asLiteral().get().getLang();
				Label label = new Label();
				label.setLang(lang);
				label.setContent(value);
				description.add(label);
			}
		}
		return description;
	}

	private List<Label> extractEntityAnnotations(OWLEntity entity, OWLOntology ontology) {
		List<Label> description = new LinkedList<Label>();
		OWLAnnotationProperty prop = ontology.getOWLOntologyManager().getOWLDataFactory()
				.getOWLAnnotationProperty(IRI.create("http://www.w3.org/2000/01/rdf-schema#comment"));
		for (OWLAnnotationAssertionAxiom annotation : ontology.getAnnotationAssertionAxioms(entity.getIRI())) {
			if (annotation.getProperty().equals(prop)) {
				String value = annotation.getValue().asLiteral().get().getLiteral();
				String lang = annotation.getValue().asLiteral().get().getLang();
				Label label = new Label();
				label.setLang(lang);
				label.setContent(value);
				description.add(label);
			}
		}
		return description;
	}

	private OntologyVersion extractOntologyVersionInfo(Ontology o, OWLOntology ontology) {
		OntologyVersion v = new OntologyVersion();
		v.setOntologyID(o.getOntologyID());
		v.setVersionDescription(extractOntologyAnnotations(ontology));
		v.setVersionID(ontology.getOntologyID().getVersionIRI().isPresent()
				? ontology.getOntologyID().getVersionIRI().get().toString()
				: "NO_VERSION_PROVIDED");
		v.setVersionDate(System.currentTimeMillis());
		v.setNumAxioms(ontology.getAxiomCount());
		v.setNumClasses(((OWLSignature) ontology).getClassesInSignature().size());
		v.setNumDataProperties(((OWLSignature) ontology).getDataPropertiesInSignature().size());
		v.setNumObjectProperties(((OWLSignature) ontology).getObjectPropertiesInSignature().size());
		User u = new User();
		u.setName("root");
		v.setVersionOwner(u);
		return v;
	}

	private OntologyInfo extractOntologyInfo(Ontology o, OntologyVersion v, OWLOntology ontology) {
		OntologyInfo info = new OntologyInfo();

		// setting imports
		Set<OWLImportsDeclaration> imports = ontology.getImportsDeclarations();
		List<String> importsString = new LinkedList<String>();
		for (OWLImportsDeclaration _import : imports) {
			importsString.add(_import.getIRI().toString());
		}
		info.setOntologyImports(importsString);

		// setting IRI
		info.setOntologyIRI(ontology.getOntologyID().getOntologyIRI().get().toString());

		// setting descriptions
		info.setOntologyDescriptions(extractOntologyAnnotations(ontology));

		// setting prefixes
		List<Prefix> itemList = new LinkedList<Prefix>();
		Map<String, String> prefixMap = ((PrefixDocumentFormat) ontology.getOWLOntologyManager()
				.getOntologyFormat(ontology)).getPrefixName2PrefixMap();
		for (String k : prefixMap.keySet()) {
			Prefix item = new Prefix();
			item.setName(k);
			item.setNamespace(prefixMap.get(k));
			itemList.add(item);
		}
		info.setPrefixes(itemList);

		// setting metrics
		int[] classAxiomCount = new int[] { 0, 0 };
		String[] classAxiomLabel = new String[] { "Sub-class of", "Disjoint classes" };

		int[] dpAxiomCount = new int[] { 0, 0 };
		String[] dpAxiomLabel = new String[] { "Sub data property of", "Disjoint data properties" };

		int[] opAxiomCount = new int[] { 0, 0 };
		String[] opAxiomLabel = new String[] { "Sub object property of", "Disjoint object properties" };

		int[] indAxiomCount = new int[] { 0, 0, 0 };
		String[] indAxiomLabel = new String[] { "Class assertions", "Data property assertions",
				"Objecty property assertions" };

		int[] annAxiomCount = new int[] { 0 };
		String[] annAxiomLabel = new String[] { "Annotation assertions" };

		int[][] counters = new int[][] { classAxiomCount, dpAxiomCount, opAxiomCount, indAxiomCount, annAxiomCount };

		Set<OWLAxiom> axioms = ontology.getAxioms();
		for (OWLAxiom axiom : axioms) {
			if (axiom instanceof OWLSubClassOfAxiom) {
				classAxiomCount[0]++;
			}
			if (axiom instanceof OWLDisjointClassesAxiom) {
				classAxiomCount[1]++;
			}
			if (axiom instanceof OWLSubDataPropertyOfAxiom) {
				dpAxiomCount[0]++;
			}
			if (axiom instanceof OWLDisjointDataPropertiesAxiom) {
				dpAxiomCount[1]++;
			}
			if (axiom instanceof OWLSubObjectPropertyOfAxiom) {
				opAxiomCount[0]++;
			}
			if (axiom instanceof OWLDisjointObjectPropertiesAxiom) {
				opAxiomCount[1]++;
			}
			if (axiom instanceof OWLClassAssertionAxiom) {
				indAxiomCount[0]++;
			}
			if (axiom instanceof OWLDataPropertyAssertionAxiom) {
				indAxiomCount[1]++;
			}
			if (axiom instanceof OWLObjectPropertyAssertionAxiom) {
				indAxiomCount[2]++;
			}
			if (axiom instanceof OWLAnnotationAssertionAxiom) {
				annAxiomCount[0]++;
			}
		}

		String[][] labels = new String[][] { classAxiomLabel, dpAxiomLabel, opAxiomLabel, indAxiomLabel,
				annAxiomLabel };
		List<MapItem> classAxioms = new LinkedList<MapItem>();
		List<MapItem> objectPropertyAxioms = new LinkedList<MapItem>();
		List<MapItem> dataPropertyAxioms = new LinkedList<MapItem>();
		List<MapItem> individualAxioms = new LinkedList<MapItem>();
		List<MapItem> annotationAxioms = new LinkedList<MapItem>();
		List<List<MapItem>> metricsItems = new LinkedList<List<MapItem>>();
		metricsItems.add(classAxioms);
		metricsItems.add(dataPropertyAxioms);
		metricsItems.add(objectPropertyAxioms);
		metricsItems.add(individualAxioms);
		metricsItems.add(annotationAxioms);

		for (int i = 0; i < counters.length; i++) {
			for (int j = 0; j < counters[i].length; j++) {
				MapItem item = new MapItem();
				item.setMapKey(labels[i][j]);
				item.setMapValue(counters[i][j] + "");
				metricsItems.get(i).add(item);
			}
		}

		OntologyMetrics ontoMetrics = new OntologyMetrics();

		List<MapItem> metrics = new LinkedList<MapItem>();
		MapItem axCount = new MapItem();
		axCount.setMapKey("Axioms");
		axCount.setMapValue(v.getNumAxioms() + "");
		MapItem clCount = new MapItem();
		clCount.setMapKey("Classes");
		clCount.setMapValue(v.getNumClasses() + "");
		MapItem dpCount = new MapItem();
		dpCount.setMapKey("Data properties");
		dpCount.setMapValue(v.getNumDataProperties() + "");
		MapItem opCount = new MapItem();
		opCount.setMapKey("Object properties");
		opCount.setMapValue(v.getNumObjectProperties() + "");

		clCount.setMapKey("Classes");
		clCount.setMapValue(v.getNumClasses() + "");
		metrics.add(axCount);
		metrics.add(clCount);
		metrics.add(dpCount);
		metrics.add(opCount);

		ontoMetrics.setMetrics(metrics);
		ontoMetrics.setAnnotationAxioms(annotationAxioms);
		ontoMetrics.setClassAxioms(classAxioms);
		ontoMetrics.setDataPropertyAxioms(dataPropertyAxioms);
		ontoMetrics.setIndividualAxioms(individualAxioms);
		ontoMetrics.setObjectPropertyAxioms(objectPropertyAxioms);

		info.setOntologyMetrics(ontoMetrics);
		return info;
	}

	private User loadUser(Path path) throws IOException {
		List<String> ownerFileContent = Files.lines(path, Charset.defaultCharset()).collect(Collectors.toList());
		if (ownerFileContent.size() != 1)
			throw new RuntimeException(
					"Ontology OWNER file format error: file " + path.getFileName() + " must contain a single line");
		User owner = MwsxPermissionManager.getPermissionManager().getUser(ownerFileContent.get(0));
		return owner;
	}

	private void loadOntology(Path path) throws IOException {
		if (!Files.isDirectory(path))
			return;
		if (path.toFile().getName().equals("temp"))
			return;
		if (path.toFile().getName().startsWith("__"))
			return;
		List<Path> content = Files.list(path).collect(Collectors.toList());
		Ontology o = null;
		List<OntologyVersion> _ontologyVersions = new LinkedList<>();
		for (Path p : content) {
			if (!Files.isDirectory(p)) {
				File file = p.toFile();
				ObjectMapper om = new ObjectMapper();
				o = om.readValue(file, Ontology.class);
			}
		}
		for (Path p : content) {
			if (Files.isDirectory(p)) {
				_ontologyVersions.add(this.loadOntologyVersion(p, o));
			}
		}
		o.setOntologyVersions(_ontologyVersions);
		this.ontologies.add(o);
	}
	
	private void loadKnowledgeGraph(Path path) throws IOException {
		if (!Files.isDirectory(path))
			return;
		KnowledgeGraph o = null;
		String kgInfoFile = path.toString() + File.separator + KG_INFO_FILE_NAME;
		ObjectMapper om = new ObjectMapper();
		o = om.readValue(new File(kgInfoFile), KnowledgeGraph.class);
		this.kgs.add(o);
	}

	private OntologyVersion loadOntologyVersion(Path p, Ontology ontology)
			throws JsonParseException, JsonMappingException, IOException {
		String infoVersionFile = p.toFile() + File.separator + ONTOLOGY_VERSION_INFO_FILE_NAME;
		ObjectMapper o = new ObjectMapper();
		return o.readValue(new File(infoVersionFile), OntologyVersion.class);
	}

	private void init() throws IOException {
		this.owlOntologyManager = OWLManager.createOWLOntologyManager();
		Path path = Paths.get(this.mastroHome);
		this.ontologies = new LinkedList<Ontology>();
		if (Files.exists(path)) {
			if (Files.isDirectory(path)) {
				Stream<Path> content = Files.list(path);
				content.forEach(p -> {
					if (p.toFile().getName().toUpperCase().startsWith("ONTO_")) {
						try {
							this.loadOntology(p);
						} catch (IOException e) {
							e.printStackTrace();
						}
					}
				});
				content.close();
			} else {
				throw new RuntimeException("Error: MASTRO_HOME path " + this.mastroHome + " is not a directory!");
			}
		} else {
			throw new RuntimeException("Error: MASTRO_HOME path " + this.mastroHome + " does not exist!");
		}
		this.kgs = new LinkedList<>();
		Path kgPath = Paths.get(this.kgHome);
		if (Files.exists(kgPath)) {
			if (Files.isDirectory(kgPath)) {
				Stream<Path> content = Files.list(kgPath);
				content.forEach(p -> {
					if (p.toFile().getName().toUpperCase().startsWith("KG_")) {
						try {
							this.loadKnowledgeGraph(p);
						} catch (IOException e) {
							e.printStackTrace();
						}
					}
				});
				content.close();
			} else {
				throw new RuntimeException("Error: KG subdolfer path " + this.kgHome + " is not a directory!");
			}
		} else {
			throw new RuntimeException("Error: KG subfolder path " + this.kgHome + " does not exist!");
		}
	}

	public void deleteAllOntologies() throws IOException {
		List<Ontology> ontos = this.getOntologies().getOntologyList();
		for (Ontology onto : ontos) {
			this.deleteOntology(onto.getOntologyID());
		}
	}

	public void deleteOntology(String name) throws IOException {
		Ontology onto = this.getOntology(name);
		for (OntologyVersion v : onto.getOntologyVersions()) {
			String version = v.getVersionID();
			this.deleteOntologyVersion(name, version);
		}
		String pathName = MwsxRepositoryManager.generateOntologyFolder(name);
		Path p = Paths.get(mastroHome + File.separator + pathName);
		Path iInfo = Paths.get(mastroHome + File.separator + pathName + File.separator + ONTOLOGY_INFO_FILE_NAME);
		if (Files.exists(iInfo))
			Files.delete(iInfo);
		if (Files.exists(p))
			Files.delete(p);
		List<Ontology> nl = new LinkedList<>();
		for (Ontology o : this.ontologies) {
			if (o != null && o.getOntologyID() != null && !o.getOntologyID().equals(name))
				nl.add(o);
		}
		this.ontologies = nl;
	}
	
	public void deleteKnowledgeGraph(String iri) throws IOException {
		KnowledgeGraph kg = this.getKnowledgeGraph(iri);
		if (kg == null)
			return;
		String pathName = MwsxRepositoryManager.generateKGFolder(kg);
		Path p = Paths.get(kgHome + File.separator + pathName);
		Path pmod = Paths.get(kgHome + File.separator + pathName + File.separator + KG_MODELS_FOLDER_NAME);
		Path pq = Paths.get(kgHome + File.separator + pathName + File.separator + KG_QUERIES_FOLDER_NAME);
		Path ptdb = Paths.get(kgHome + File.separator + pathName + File.separator + KG_TDB_FOLDER_NAME);
		Path iInfo = Paths.get(kgHome + File.separator + pathName + File.separator + KG_INFO_FILE_NAME);
		if (Files.exists(pq)) {
			List<Path> files = Files.list(pq).collect(Collectors.toList());
			for (Path file : files) {
				for (Path innerFile : Files.list(file).collect(Collectors.toList()))
					Files.delete(innerFile);
				Files.delete(file);
			}
			Files.delete(pq);
		}
		if (Files.exists(pmod)) {
			List<Path> files = Files.list(pmod).collect(Collectors.toList());
			for (Path file : files)
				Files.delete(file);
			Files.delete(pmod);
		}
		if (Files.exists(ptdb)) {
			List<Path> files = Files.list(ptdb).collect(Collectors.toList());
			for (Path file : files)
				Files.delete(file);
			Files.delete(ptdb);
		}
		if (Files.exists(p)) {
			List<Path> files = Files.list(p).collect(Collectors.toList());
			for (Path file : files)
				Files.delete(file);
			Files.delete(p);
		}
		if (Files.exists(iInfo))
			Files.delete(iInfo);
		List<KnowledgeGraph> nl = new LinkedList<>();
		for (KnowledgeGraph o : this.kgs) {
			if (o != null && o.getKgIri() != null && !o.getKgIri().equals(iri))
				nl.add(o);
		}
		this.kgs = nl;
	}

	public FileInfo deleteOntologyVersion(String name, String version) throws IOException {
		FileInfo f = getOntologyVersionOwlFile(name, version);
		Ontology onto = this.getOntology(name);
		String pathName = MwsxRepositoryManager.generateOntologyFolder(name);
		String versionPath = MwsxRepositoryManager.generateOntologyVersionFolder(version);
		Path p = Paths.get(mastroHome + File.separator + pathName + File.separator + versionPath);
		List<Path> files = Files.list(p).collect(Collectors.toList());
		for (Path file : files) {
			if (Files.isDirectory(file))
				throw new RuntimeException("Ontology " + name + ", version " + version
						+ ": cannot eliminate ontology version. The version folder contains a directory that has to be removed manually");
		}
		for (Path file : files) {
			Files.delete(file);
		}
		Files.delete(p);
		List<OntologyVersion> nl = new LinkedList<>();
		for (OntologyVersion o : onto.getOntologyVersions()) {
			if (!o.getVersionID().equals(version))
				nl.add(o);
		}
		onto.setOntologyVersions(nl);
		return f;
	}

	public FileInfo getOntologyVersionOwlFile(String name, String version) throws IOException {
		FileInfo f = new FileInfo();
		f.setFileName(ONTOLOGY_VERSION_OWL_FILE_NAME);
		f.setFileType("owl");
		String pathName = MwsxRepositoryManager.generateOntologyFolder(name);
		String versionPath = MwsxRepositoryManager.generateOntologyVersionFolder(version);
		Path ontoFilePath = Paths.get(mastroHome + File.separator + pathName + File.separator + versionPath
				+ File.separator + ONTOLOGY_VERSION_OWL_FILE_NAME);
		f.setContent(new String(java.util.Base64.getEncoder().encode(Files.readAllBytes(ontoFilePath))));
		return f;
	}

	public OntologyInfo getOntologyinfo(MwsxSession session, String name, String version)
			throws JsonParseException, JsonMappingException, IOException {
		String pathName = MwsxRepositoryManager.generateOntologyFolder(name);
		String versionPath = MwsxRepositoryManager.generateOntologyVersionFolder(version);
		Path ontoFilePath = Paths.get(mastroHome + File.separator + pathName + File.separator + versionPath
				+ File.separator + ONTOLOGY_VERSION_ONTO_INFO_FILE_NAME);
		ObjectMapper om = new ObjectMapper();
		OntologyInfo info = (OntologyInfo) om.readValue(Files.readAllBytes(ontoFilePath), OntologyInfo.class);
		OntologyID id = new OntologyID();
		id.setOntologyName(name);
		id.setOntologyVersion(version);
		manageLastLoadedOntology(session.getUser(), id);
		return info;
	}

	private void manageLastLoadedOntology(User user, OntologyID id) {
		this.cacheManager.addLastLoadedOntology(user, id);
	}
	
	public List<OntologyOpeningEvent> getLastLoadedOntologies(User user) {
		return this.cacheManager.getLastLoadedOntologies(user);
	}

	public OntologyHierarchy getOntologyHierarchy(String name, String version)
			throws JsonParseException, JsonMappingException, IOException {
		String pathName = MwsxRepositoryManager.generateOntologyFolder(name);
		String versionPath = MwsxRepositoryManager.generateOntologyVersionFolder(version);
		Path ontoFilePath = Paths.get(mastroHome + File.separator + pathName + File.separator + versionPath
				+ File.separator + ONTOLOGY_VERSION_HIERARCHY_INFO_FILE_NAME);
		ObjectMapper om = new ObjectMapper();
		return (OntologyHierarchy) om.readValue(Files.readAllBytes(ontoFilePath), OntologyHierarchy.class);
	}

	public Entities getOntologyEntities(String name, String version)
			throws JsonParseException, JsonMappingException, IOException {
		String pathName = MwsxRepositoryManager.generateOntologyFolder(name);
		String versionPath = MwsxRepositoryManager.generateOntologyVersionFolder(version);
		Path entitiesFilePath = Paths.get(mastroHome + File.separator + pathName + File.separator + versionPath
				+ File.separator + ONTOLOGY_VERSION_ENTITIES_FILE_NAME);
		ObjectMapper om = new ObjectMapper();
		return (Entities) om.readValue(Files.readAllBytes(entitiesFilePath), Entities.class);
	}
	
	public Entity getOntologyEntity(String name, String version, String id)
			throws JsonParseException, JsonMappingException, IOException {
		String pathName = MwsxRepositoryManager.generateOntologyFolder(name);
		String versionPath = MwsxRepositoryManager.generateOntologyVersionFolder(version);
		Path entitiesFilePath = Paths.get(mastroHome + File.separator + pathName + File.separator + versionPath
				+ File.separator + ONTOLOGY_VERSION_ENTITIES_FILE_NAME);
		ObjectMapper om = new ObjectMapper();
		Entities entities = (Entities) om.readValue(Files.readAllBytes(entitiesFilePath), Entities.class);
		for (Entity entity : entities.getClassEntities())
			if (entity.getEntityID().equals(id))
				return entity;
		for (Entity entity : entities.getDataPropertyEntities())
			if (entity.getEntityID().equals(id))
				return entity;
		for (Entity entity : entities.getObjectPropertyEntities())
			if (entity.getEntityID().equals(id))
				return entity;
		throw new RuntimeException("Cannot find entity with id " + id);
	}

	public ClassInfo getOntologyVersionClassInfo(String name, String version, String ID)
			throws JsonParseException, JsonMappingException, IOException {
		String pathName = MwsxRepositoryManager.generateOntologyFolder(name);
		String versionPathName = MwsxRepositoryManager.generateOntologyVersionFolder(version);
		Path ontoClassesInfoPath = Paths.get(mastroHome + File.separator + pathName + File.separator + versionPathName
				+ File.separator + ONTOLOGY_VERSION_ONTO_CLASSES_INFO_FILE_NAME);
		OntologyClassesInfo infos = null;
		ObjectMapper om = new ObjectMapper();
		infos = (OntologyClassesInfo) om.readValue(Files.readAllBytes(ontoClassesInfoPath), OntologyClassesInfo.class);
		for (ClassInfo info : infos.getClassesInfo()) {
			if (info.getCurrentEntity().getEntityID().equals(ID))
				return info;
		}
		throw new RuntimeException("Cannot find info for class ID " + ID);
	}

	public ObjectPropertyInfo getOntologyVersionOPInfo(String name, String version, String ID)
			throws JsonParseException, JsonMappingException, IOException {
		String pathName = MwsxRepositoryManager.generateOntologyFolder(name);
		String versionPathName = MwsxRepositoryManager.generateOntologyVersionFolder(version);
		Path ontoOPInfoPath = Paths.get(mastroHome + File.separator + pathName + File.separator + versionPathName
				+ File.separator + ONTOLOGY_VERSION_ONTO_OP_INFO_FILE_NAME);
		OntologyObjectPropertiesInfo infos = null;
		ObjectMapper om = new ObjectMapper();
		infos = (OntologyObjectPropertiesInfo) om.readValue(Files.readAllBytes(ontoOPInfoPath),
				OntologyObjectPropertiesInfo.class);
		for (ObjectPropertyInfo info : infos.getObjectPropertiesInfo()) {
			if (info.getCurrentEntity().getEntityID().equals(ID))
				return info;
		}
		throw new RuntimeException("Cannot find info for object property ID " + ID);
	}

	public DataPropertyInfo getOntologyVersionDPInfo(String name, String version, String ID)
			throws JsonParseException, JsonMappingException, IOException {
		String pathName = MwsxRepositoryManager.generateOntologyFolder(name);
		String versionPathName = MwsxRepositoryManager.generateOntologyVersionFolder(version);
		Path ontoDPInfoPath = Paths.get(mastroHome + File.separator + pathName + File.separator + versionPathName
				+ File.separator + ONTOLOGY_VERSION_ONTO_DP_INFO_FILE_NAME);
		OntologyDataPropertiesInfo infos = null;
		ObjectMapper om = new ObjectMapper();
		infos = (OntologyDataPropertiesInfo) om.readValue(Files.readAllBytes(ontoDPInfoPath),
				OntologyDataPropertiesInfo.class);
		for (DataPropertyInfo info : infos.getDataPropertiesInfo()) {
			if (info.getCurrentEntity().getEntityID().equals(ID))
				return info;
		}
		throw new RuntimeException("Cannot find info for data property ID " + ID);
	}

	public FileInfo getGrapholFileInfo(String name, String version) throws IOException {
		String pathName = MwsxRepositoryManager.generateOntologyFolder(name);
		String versionPathName = MwsxRepositoryManager.generateOntologyVersionFolder(version);
		Path grapholFilePath = Paths.get(mastroHome + File.separator + pathName + File.separator + versionPathName
				+ File.separator + ONTOLOGY_VERSION_GRAPHOL_FILE_NAME);
		if (!Files.exists(grapholFilePath))
			throw new NoSuchElementException("No GRAPHOL file available for ontology " + name + ", version " + version);
		FileInfo info = new FileInfo();
		info.setFileName(ONTOLOGY_VERSION_GRAPHOL_FILE_NAME);
		info.setFileType("graphol");
		info.setContent(new String(java.util.Base64.getEncoder().encode(Files.readAllBytes(grapholFilePath))));
		return info;
	}
	
	public boolean isGrapholFilePresent(String name, String version) throws IOException {
		String pathName = MwsxRepositoryManager.generateOntologyFolder(name);
		String versionPathName = MwsxRepositoryManager.generateOntologyVersionFolder(version);
		Path grapholFilePath = Paths.get(mastroHome + File.separator + pathName + File.separator + versionPathName
				+ File.separator + ONTOLOGY_VERSION_GRAPHOL_FILE_NAME);
		return Files.exists(grapholFilePath);
	}

	public FileInfo postGrapholFileInfo(String name, String version, FileInfo put) throws IOException {
		String pathName = MwsxRepositoryManager.generateOntologyFolder(name);
		String versionPathName = MwsxRepositoryManager.generateOntologyVersionFolder(version);
		Path grapholFilePath = Paths.get(mastroHome + File.separator + pathName + File.separator + versionPathName
				+ File.separator + ONTOLOGY_VERSION_GRAPHOL_FILE_NAME);
		Files.write(grapholFilePath, java.util.Base64.getDecoder().decode(put.getContent().getBytes()));
		return put;
	}

	public FileInfo deleteGrapholFileInfo(String name, String version) throws IOException {
		String pathName = MwsxRepositoryManager.generateOntologyFolder(name);
		String versionPathName = MwsxRepositoryManager.generateOntologyVersionFolder(version);
		Path grapholFilePath = Paths.get(mastroHome + File.separator + pathName + File.separator + versionPathName
				+ File.separator + ONTOLOGY_VERSION_GRAPHOL_FILE_NAME);
		FileInfo info = new FileInfo();
		info.setFileName(ONTOLOGY_VERSION_GRAPHOL_FILE_NAME);
		info.setFileType("graphol");
		info.setContent(new String(java.util.Base64.getEncoder().encode(Files.readAllBytes(grapholFilePath))));
		Files.delete(grapholFilePath);
		return info;
	}

	public Mappings getMappings(String name, String version)
			throws JsonParseException, JsonMappingException, IOException {
		logger.debug("## name " + name);
		logger.debug("## version " + version);
		String pathName = MwsxRepositoryManager.generateOntologyFolder(name);
		String versionPathName = MwsxRepositoryManager.generateOntologyVersionFolder(version);
		Path mappingsFilePath = Paths.get(mastroHome + File.separator + pathName + File.separator + versionPathName
				+ File.separator + ONTOLOGY_VERSION_MAPPINGS_FILE_NAME);
		logger.debug(" ### PATH: " + mappingsFilePath.toString());
		if (Files.exists(mappingsFilePath)) {
			ObjectMapper om = new ObjectMapper();
			return (Mappings) om.readValue(Files.readAllBytes(mappingsFilePath), Mappings.class);
		} else {
			Mappings m = new Mappings();
			m.setMappingList(new LinkedList<Mapping>());
			return m;
		}
	}

	public FileInfo getMappingFile(String name, String version, String mappingID)
			throws JsonParseException, JsonMappingException, IOException {
		Mappings mappings = getMappings(name, version);
		for (Mapping mapping : mappings.getMappingList()) {
			if (mapping.getMappingID().equals(mappingID)) {
				FileInfo f = new FileInfo();
				f.setFileName(mapping.getFileName());
				f.setFileType(mapping.getFileType());
				String pathName = MwsxRepositoryManager.generateOntologyFolder(name);
				String versionPathName = MwsxRepositoryManager.generateOntologyVersionFolder(version);
				Path mappingFilePath = Paths.get(mastroHome + File.separator + pathName + File.separator
						+ versionPathName + File.separator + mapping.getFileName());
				f.setContent(new String(java.util.Base64.getEncoder().encode(Files.readAllBytes(mappingFilePath))));
				return f;
			}
		}
		throw new RuntimeException("Cannot find mapping with ID " + mappingID);
	}
	
	public Mapping getMapping(String name, String version, String mappingID)
			throws JsonParseException, JsonMappingException, IOException {
		Mappings mappings = getMappings(name, version);
		for (Mapping mapping : mappings.getMappingList()) {
			if (mapping.getMappingID().equals(mappingID)) {
				return mapping;
			}
		}
		throw new RuntimeException("Cannot find mapping with ID " + mappingID);
	}

	public Mapping postMapping(String name, String version, FileInfo info)
			throws JsonParseException, JsonMappingException, IOException, MappingFileMalformedException, SAXException {
		String pathName = MwsxRepositoryManager.generateOntologyFolder(name);
		String versionPathName = MwsxRepositoryManager.generateOntologyVersionFolder(version);
		Mappings mappings = getMappings(name, version);
		String newMapId = getMappingID(info);
		for (Mapping m : mappings.getMappingList())
			if (m.getMappingID().equals(newMapId))
				throw new RuntimeException("Duplicated mapping ID " + newMapId);
		int count = mappings.getMappingList().size();
		String newMapFileName = MAPPING_FILE_NAME_TEMPLATE.replace("[COUNT]", "" + (count+1)).replace("[EXT]", info.getFileType().replace(".", ""));
		byte[] content = java.util.Base64.getDecoder().decode(info.getContent().getBytes());
		Path mappingFilePath = Paths.get(mastroHome + File.separator + pathName + File.separator + versionPathName
				+ File.separator + newMapFileName);
		if (Files.exists(mappingFilePath))
			throw new IOException("Mappings file " + info.getFileName() + " already exists!");
		Files.write(mappingFilePath, content);		
		Path mappingsFilePath = Paths.get(mastroHome + File.separator + pathName + File.separator + versionPathName
				+ File.separator + ONTOLOGY_VERSION_MAPPINGS_FILE_NAME);
		Mapping m = extractMappingFromFileInfo(info, mappingFilePath);
		m.setFileName(newMapFileName);
		m.setFileType(info.getFileType().replace(".", ""));
		mappings.getMappingList().add(m);
		ObjectMapper om = new ObjectMapper();
		om.enable(SerializationFeature.INDENT_OUTPUT);
		om.writeValue(mappingsFilePath.toFile(), mappings);
		return m;
	}	

	private String getMappingID(FileInfo info) throws SAXException, IOException, MappingFileMalformedException {
		DOMParser p = new DOMParser();
		byte[] buf = java.util.Base64.getDecoder().decode(info.getContent());
		p.parse(new InputSource(new ByteInputStream(buf, buf.length)));
		Document document = p.getDocument();
		NodeList m = document.getElementsByTagName(MappingManager.MAPPINGS_METADATA);
		logger.debug("Found mapping metadata tag: " + m.getLength() + " element found");
		if (m.getLength() != 1)
			throw new MappingFileMalformedException(
					"One and only one '" + MappingManager.MAPPINGS_METADATA + "' element must be present in XML specification file");
		Node versionNode = m.item(0).getAttributes().getNamedItem(MappingManager.VERSION);
		Node idNode = m.item(0).getAttributes().getNamedItem(MappingManager.ID);
		return idNode.getTextContent();
	}
	
	private Mapping extractMappingFromFileInfo(FileInfo info, Path mappingFilePath) throws FileNotFoundException, MappingFileMalformedException, SAXException, IOException {
		MappingsMetadata md = MappingManager.getMappingsMetadata(mappingFilePath.toString());
		Mapping m = new Mapping();
		m.setMappingID(md.getId());
		m.setMappingVersion(md.getVersion());
		m.setMappingDate(System.currentTimeMillis());
		m.setFileName(info.getFileName());
		m.setMappingDescription(md.getDescription());
		m.setNumAssertions(md.getMappingsCount() + md.getComplexMappingsCount());
		m.setNumDenials(md.getDisjointDependenciesCount());
		m.setNumInclusionDependencies(md.getInclusionDependenciesCount());
		m.setNumKeyDependencies(md.getKeyDependenciesCount());
		m.setNumViews(md.getPrimitiveViewsCount());
		User u = new User();
		u.setName("santaroni");
		m.setMappingOwner(u);
		for (String name : md.getPrefixDefinitions().keySet()) {
			Prefix p = new Prefix();
			p.setName(name);
			p.setNamespace(md.getPrefixDefinitions().get(name));
			m.getPrefixes().add(p);
		}
		return m;
	}

	public MappingInfo getMappingInfo(String name, String version, String mappingID)
			throws JsonParseException, JsonMappingException, IOException, SAXException {
		logger.debug("# name " + name);
		logger.debug("# version " + version);
		MappingInfo info = new MappingInfo();
		Mapping m = null;
		Mappings mappings = getMappings(name, version);
		for (Mapping map : mappings.getMappingList()) {
			logger.debug(" ---> " + map.getMappingID() + ", " + mappingID);
			if (map.getMappingID().equals(mappingID)) {
				m = map;
				break;
			}
		}
		if (m == null)
			throw new RuntimeException("Cannot find mapping with ID " + mappingID);
		info.setMapping(m);
		info.setMappingDBConnections(extractDatabaseConnections(name, version, m.getFileName()));
		info.setMappingTemplates(extractMappingTemplates(name, version, m.getFileName()));
		return info;
	}

	private List<String> extractMappingTemplates(String name, String version, String fileName)
			throws SAXException, IOException {
		String pathName = MwsxRepositoryManager.generateOntologyFolder(name);
		String versionPathName = MwsxRepositoryManager.generateOntologyVersionFolder(version);
		Path mappingFilePath = Paths.get(
				mastroHome + File.separator + pathName + File.separator + versionPathName + File.separator + fileName);
		List<String> templates = new LinkedList<String>();
		DOMParser p = new DOMParser();
		p.parse(new InputSource(Files.newInputStream(mappingFilePath)));
		Document d = p.getDocument();
		NodeList nl = d.getElementsByTagName("templates");
		for (int i = 0; i < nl.getLength(); i++) {
			Node n = nl.item(i);
			NodeList nlc = n.getChildNodes();
			for (int j = 0; j < nlc.getLength(); j++) {
				Node n1 = nlc.item(j);
				if (n1.getNodeName().equals("template")) {
					String template = n1.getTextContent().trim();
					templates.add(template);
				}
			}
		}
		return templates;
	}

	private List<DatabaseConnection> extractDatabaseConnections(String name, String version, String fileName)
			throws SAXException, IOException {
		String pathName = MwsxRepositoryManager.generateOntologyFolder(name);
		String versionPathName = MwsxRepositoryManager.generateOntologyVersionFolder(version);
		Path mappingFilePath = Paths.get(
				mastroHome + File.separator + pathName + File.separator + versionPathName + File.separator + fileName);
		return getDatabaseConnections(mappingFilePath);
	}

	public static List<DatabaseConnection> getDatabaseConnections(Path mappingFilePath)
			throws SAXException, IOException {
		List<DatabaseConnection> connections = new LinkedList<DatabaseConnection>();
		DOMParser p = new DOMParser();
		p.parse(new InputSource(Files.newInputStream(mappingFilePath)));
		Document doc = p.getDocument();
		NodeList m = doc.getElementsByTagName("dataSource");
		if (m.getLength() == 0)
			throw new SAXException("Missing dataSource element of OBDA file");
		else {
			for (int i = 0; i < m.getLength(); i++) {
				DatabaseConnection connection = new DatabaseConnection();
				Node node = m.item(i);
				NamedNodeMap attr = node.getAttributes();
				Node drvNode = attr.getNamedItem("databaseDriver");
				Node pwdNode = attr.getNamedItem("databasePassword");
				Node urlNode = attr.getNamedItem("databaseURL");
				Node userNode = attr.getNamedItem("databaseUsername");
				Node nameNode = attr.getNamedItem("name");

				if (drvNode != null)
					connection.setDbDriver(drvNode.getNodeValue());
//				else
//					throw new SAXException("Missing databaseDriver attribute node in dataSource element of OBDA file");
				if (nameNode != null)
					connection.setName(nameNode.getNodeValue());
//				else
//					throw new SAXException("Missing name attribute node in dataSource element of OBDA file");
				if (urlNode != null)
					connection.setJdbcURL(urlNode.getNodeValue());
//				else
//					throw new SAXException("Missing databaseURL attribute node in dataSource element of OBDA file");
				if (userNode != null)
					connection.setDbUser(userNode.getNodeValue());
//				else
//					throw new SAXException(
//							"Missing databaseusername attribute node in dataSource element of OBDA file");
				if (pwdNode != null)
					connection.setDbPassword(pwdNode.getNodeValue());
//				else
//					throw new SAXException(
//							"Missing databasePassword attribute node in dataSource element of OBDA file");
				connections.add(connection);
			}
		}
		return connections;
	}

	public FileInfo deleteMapping(String name, String version, String mappingID)
			throws JsonParseException, JsonMappingException, IOException {
		Mappings mappings = getMappings(name, version);
		Mappings newMappings = new Mappings();
		FileInfo remove = null;
		List<Mapping> mappingsList = new LinkedList<Mapping>();
		for (Mapping mapping : mappings.getMappingList()) {
			if (mapping.getMappingID().equals(mappingID)) {
				remove = new FileInfo();
				remove.setFileName(mapping.getFileName());
				remove.setFileType(mapping.getFileType());
				String pathName = MwsxRepositoryManager.generateOntologyFolder(name);
				String versionPathName = MwsxRepositoryManager.generateOntologyVersionFolder(version);
				Path mappingFilePath = Paths.get(mastroHome + File.separator + pathName + File.separator
						+ versionPathName + File.separator + mapping.getFileName());
				remove.setContent(
						new String(java.util.Base64.getEncoder().encode(Files.readAllBytes(mappingFilePath))));
				Files.delete(mappingFilePath);
			} else
				mappingsList.add(mapping);
		}
		if (remove != null) {
			newMappings.setMappingList(mappingsList);
			String pathName = MwsxRepositoryManager.generateOntologyFolder(name);
			String versionPathName = MwsxRepositoryManager.generateOntologyVersionFolder(version);
			Path mappingsFilePath = Paths.get(mastroHome + File.separator + pathName + File.separator + versionPathName
					+ File.separator + ONTOLOGY_VERSION_MAPPINGS_FILE_NAME);
			ObjectMapper om = new ObjectMapper();
			om.enable(SerializationFeature.INDENT_OUTPUT);
			om.writeValue(mappingsFilePath.toFile(), newMappings);
			return remove;
		}
		throw new RuntimeException("Cannot find mapping with ID " + mappingID);
	}

	public List<MappingAssertion> getMappingAssertionsByEntity(String name, String version, String ID, String entityID)
			throws JsonParseException, JsonMappingException, IOException, SAXException, OWLOntologyCreationException,
			ParsingException, ClassNotFoundException, DOMException, PrefixManagerException, SparqlUCQLanguageException,
			ConstraintMalformedException, InclusionAssertionException, UnsupportedLanguageException,
			OntologyAlphabetException, UnrecognizedTypeException, SQLException, DataLevelConfigurationException,
			ParserConfigurationException, OntologyPredicateMappingMalformedException, MappingRewriterStructureException,
			PrimitiveViewMalformedException, MappingMalformedException, TermMappingMalformedException,
			IRITemplateManagerException, IRITemplateFormatException {
		MastroID mid = MastroID.getMastroID(name, version, ID);
		MappingManager mapMan = this.cacheManager.getMappingManager(mid);
		OWLOntology ontology = this.cacheManager.getOwlOntology(mid.getOntologyID());
		Entities entities = this.getOntologyEntities(name, version);
		ReasoningServices rs = new ReasoningServices(ontology, entities);
		List<MappingAssertion> maps = new LinkedList<MappingAssertion>();
		maps.addAll(this.extractMappingsByEntity(mapMan, mid, rs, entityID));
		return maps;
	}
	
	public List<MappingAssertion> getAllMappingAssertions(String name, String version, String ID)
			throws JsonParseException, JsonMappingException, IOException, SAXException, OWLOntologyCreationException,
			ParsingException, ClassNotFoundException, DOMException, PrefixManagerException, SparqlUCQLanguageException,
			ConstraintMalformedException, InclusionAssertionException, UnsupportedLanguageException,
			OntologyAlphabetException, UnrecognizedTypeException, SQLException, DataLevelConfigurationException,
			ParserConfigurationException, OntologyPredicateMappingMalformedException, MappingRewriterStructureException,
			PrimitiveViewMalformedException, MappingMalformedException, TermMappingMalformedException,
			IRITemplateManagerException, IRITemplateFormatException {
		MastroID mid = MastroID.getMastroID(name, version, ID);
		MappingManager mapMan = this.cacheManager.getMappingManager(mid);
		OWLOntology ontology = this.cacheManager.getOwlOntology(mid.getOntologyID());
		Entities entities = this.getOntologyEntities(name, version);
		ReasoningServices rs = new ReasoningServices(ontology, entities);
		List<MappingAssertion> maps = new LinkedList<MappingAssertion>();
		maps.addAll(this.extractAllMappings(mapMan, mid, rs));
		return maps;
	}

	private Collection<? extends MappingAssertion> extractMappingsByEntity(MappingManager mapMan, MastroID mid,
			ReasoningServices rs, String entityID) throws ParsingException, PrefixManagerException,
			SparqlUCQLanguageException, ConstraintMalformedException, InclusionAssertionException,
			UnsupportedLanguageException, OntologyAlphabetException, UnrecognizedTypeException, ClassNotFoundException,
			SAXException, IOException, SQLException, DataLevelConfigurationException, DOMException,
			ParserConfigurationException, OntologyPredicateMappingMalformedException, MappingRewriterStructureException,
			PrimitiveViewMalformedException, MappingMalformedException, TermMappingMalformedException,
			IRITemplateManagerException, IRITemplateFormatException {
		List<MappingAssertion> ass = new LinkedList<MappingAssertion>();
		OWLOntology ontology = this.cacheManager.getOwlOntology(mid.getOntologyID());
		ITBox tbox = mapMan.getTBox();
		Map<String, SQLView> viewsMap = extractSQLViews(mapMan);
		List<com.ruzzi.unfold.model.MappingAssertion> maps = mapMan.getComplexMappings();
		maps.addAll(mapMan.getMappings());
		for (com.ruzzi.unfold.model.MappingAssertion map : maps) {
//			logger.debug("MAP: " + map);
			IRI iri = IRI.create(map.getHead().getPredicate().getName());
			if (tbox.getAlphabet().checkType(iri.getNamespace(), iri.getRemainder().get(), OntologyAlphabet.CONCEPT)) {
				OWLClass clazz = ontology.getOWLOntologyManager().getOWLDataFactory().getOWLClass(iri);
				Entity entity = rs.entity(clazz);
				if (entityID.equals(entity.getEntityID())) {
					MappingAssertion m = convertToMappingAssertion(entity, map, tbox, viewsMap, mapMan);
					if (!ass.contains(m))
						ass.add(m);
				}
			}
			if (tbox.getAlphabet().checkType(iri.getNamespace(), iri.getRemainder().get(), OntologyAlphabet.ROLE)) {
				OWLObjectProperty op = ontology.getOWLOntologyManager().getOWLDataFactory().getOWLObjectProperty(iri);
				Entity entity = rs.entity(op);
				if (entityID.equals(entity.getEntityID())){
					MappingAssertion m = convertToMappingAssertion(entity, map, tbox, viewsMap, mapMan);
					if (!ass.contains(m))
						ass.add(m);
				}
			}
			if (tbox.getAlphabet().checkType(iri.getNamespace(), iri.getRemainder().get(),
					OntologyAlphabet.CONCEPT_ATTRIBUTE)) {
				OWLDataProperty dp = ontology.getOWLOntologyManager().getOWLDataFactory().getOWLDataProperty(iri);
				Entity entity = rs.entity(dp);
				if (entityID.equals(entity.getEntityID())){
					MappingAssertion m = convertToMappingAssertion(entity, map, tbox, viewsMap, mapMan);
					if (!ass.contains(m))
						ass.add(m);
				}
			}
		}
		return ass;
	}
	
	private Collection<? extends MappingAssertion> extractAllMappings(MappingManager mapMan, MastroID mid,
			ReasoningServices rs) throws ParsingException, PrefixManagerException,
			SparqlUCQLanguageException, ConstraintMalformedException, InclusionAssertionException,
			UnsupportedLanguageException, OntologyAlphabetException, UnrecognizedTypeException, ClassNotFoundException,
			SAXException, IOException, SQLException, DataLevelConfigurationException, DOMException,
			ParserConfigurationException, OntologyPredicateMappingMalformedException, MappingRewriterStructureException,
			PrimitiveViewMalformedException, MappingMalformedException, TermMappingMalformedException,
			IRITemplateManagerException, IRITemplateFormatException {
		List<MappingAssertion> ass = new LinkedList<MappingAssertion>();
		OWLOntology ontology = this.cacheManager.getOwlOntology(mid.getOntologyID());
		ITBox tbox = mapMan.getTBox();
		Map<String, SQLView> viewsMap = extractSQLViews(mapMan);
		List<com.ruzzi.unfold.model.MappingAssertion> maps = mapMan.getComplexMappings();
		maps.addAll(mapMan.getMappings());
		for (com.ruzzi.unfold.model.MappingAssertion map : maps) {
//			logger.debug("MAP: " + map);
			IRI iri = IRI.create(map.getHead().getPredicate().getName());
			if (tbox.getAlphabet().checkType(iri.getNamespace(), iri.getRemainder().get(), OntologyAlphabet.CONCEPT)) {
				OWLClass clazz = ontology.getOWLOntologyManager().getOWLDataFactory().getOWLClass(iri);
				Entity entity = rs.entity(clazz);
					MappingAssertion m = convertToMappingAssertion(entity, map, tbox, viewsMap, mapMan);
					if (!ass.contains(m))
						ass.add(m);
			}
			if (tbox.getAlphabet().checkType(iri.getNamespace(), iri.getRemainder().get(), OntologyAlphabet.ROLE)) {
				OWLObjectProperty op = ontology.getOWLOntologyManager().getOWLDataFactory().getOWLObjectProperty(iri);
				Entity entity = rs.entity(op);
					MappingAssertion m = convertToMappingAssertion(entity, map, tbox, viewsMap, mapMan);
					if (!ass.contains(m))
						ass.add(m);
			}
			if (tbox.getAlphabet().checkType(iri.getNamespace(), iri.getRemainder().get(),
					OntologyAlphabet.CONCEPT_ATTRIBUTE)) {
				OWLDataProperty dp = ontology.getOWLOntologyManager().getOWLDataFactory().getOWLDataProperty(iri);
				Entity entity = rs.entity(dp);
					MappingAssertion m = convertToMappingAssertion(entity, map, tbox, viewsMap, mapMan);
					if (!ass.contains(m))
						ass.add(m);
			}
		}
		return ass;
	}

	private Collection<? extends MappingAssertion> extractMappingsByView(OWLOntology ontology, ITBox tbox,
			MappingManager mapMan, ReasoningServices rs, String viewID) throws ParsingException, PrefixManagerException,
			SparqlUCQLanguageException, ConstraintMalformedException, InclusionAssertionException,
			UnsupportedLanguageException, OntologyAlphabetException, UnrecognizedTypeException, ClassNotFoundException,
			SAXException, IOException, SQLException, DataLevelConfigurationException, DOMException,
			ParserConfigurationException, OntologyPredicateMappingMalformedException, MappingRewriterStructureException,
			PrimitiveViewMalformedException, MappingMalformedException, TermMappingMalformedException,
			IRITemplateManagerException, IRITemplateFormatException {
		List<MappingAssertion> ass = new LinkedList<MappingAssertion>();
		Map<String, SQLView> viewsMap = extractSQLViews(mapMan);
		List<com.ruzzi.unfold.model.MappingAssertion> maps = mapMan.getComplexMappingAssertions(mapMan.getTBox(),
				mapMan.getDataSourceManager());
		for (com.ruzzi.unfold.model.MappingAssertion map : maps) {
			IRI iri = IRI.create(map.getHead().getPredicate().getName());
			MappingAssertion m = null;
			if (tbox.getAlphabet().checkType(iri.getNamespace(), iri.getRemainder().get(), OntologyAlphabet.CONCEPT)) {
				OWLClass clazz = ontology.getOWLOntologyManager().getOWLDataFactory().getOWLClass(iri);
				Entity entity = rs.entity(clazz);
				m = convertToMappingAssertion(entity, map, tbox, viewsMap, mapMan);
			}
			if (tbox.getAlphabet().checkType(iri.getNamespace(), iri.getRemainder().get(), OntologyAlphabet.ROLE)) {
				OWLObjectProperty op = ontology.getOWLOntologyManager().getOWLDataFactory().getOWLObjectProperty(iri);
				Entity entity = rs.entity(op);
				m = convertToMappingAssertion(entity, map, tbox, viewsMap, mapMan);
			}
			if (tbox.getAlphabet().checkType(iri.getNamespace(), iri.getRemainder().get(),
					OntologyAlphabet.CONCEPT_ATTRIBUTE)) {
				OWLDataProperty dp = ontology.getOWLOntologyManager().getOWLDataFactory().getOWLDataProperty(iri);
				Entity entity = rs.entity(dp);
				m = convertToMappingAssertion(entity, map, tbox, viewsMap, mapMan);
			}
			if (m != null && !ass.contains(m)) {
				for (Atom a : map.getBody()) {
					if (a.getPredicate().getName().equals(viewID)) {
						ass.add(m);
						break;
					}
				}
			}
		}
		return ass;
	}

	private MappingAssertion convertToMappingAssertion(Entity entity, com.ruzzi.unfold.model.MappingAssertion map,
			ITBox tbox, Map<String, SQLView> viewsMap, MappingManager mapMan)
			throws IRITemplateManagerException, IRITemplateFormatException {
		IRITemplateManager tm = IRITemplateManager.getManager();
		MappingAssertion m = new MappingAssertion();
		m.setId(map.getID());
		com.mwsx.model.IRI _iri = new com.mwsx.model.IRI();
		_iri.setExtendedIRI("http://www.obdasystems.com/mappings/" + map.getID());
		_iri.setShortIRI("obda:" + map.getID());
		m.setIri(_iri);
		m.setCurrentEntity(entity);
		MappingHead mh = convertToMappingHead(tm, map.getHead(), map);
		m.setMappingBody(convertToMappingBody(tm, map.getHead(), map.getBody(), viewsMap, mh, map));
		m.setMappingHead(mh);
		m.setMappingDescription(map.getDescription());
		return m;
	}

	private MappingHead convertToMappingHead(IRITemplateManager tm, Atom atom, com.ruzzi.unfold.model.MappingAssertion map)
			throws IRITemplateManagerException, IRITemplateFormatException {
		MappingHead mh = new MappingHead();
		List<Term> terms = atom.getTerms();
		String fa = null;
		if (terms.get(0) instanceof FunctionTerm) {
			IRITemplate template1 = tm.getTemplate(((FunctionTerm) terms.get(0)).getFunction().getName());
			fa = template1.renamePlaceholders(((FunctionTerm) terms.get(0)).getTerms());
			fa = fa.replace(map.getID() + "_", "");
			mh.setFirstArg(fa);
		}
		else
			mh.setFirstArg(terms.get(0).toString().replace(map.getID() + "_", ""));
		if (terms.size() == 2) {
			String sa = null;
			if (terms.get(1) instanceof FunctionTerm) {
				IRITemplate template2 = tm.getTemplate(((FunctionTerm) terms.get(1)).getFunction().getName());
				sa = template2.renamePlaceholders(((FunctionTerm) terms.get(1)).getTerms());
				sa = sa.replace(map.getID() + "_", "");
				mh.setSecondArg(sa);
			}
			else
				mh.setSecondArg(terms.get(1).toString().replace(map.getID() + "_", ""));
		}
		return mh;
	}

	private MappingBody convertToMappingBody(IRITemplateManager tm, Atom head, List<Atom> atoms,
			Map<String, SQLView> viewsMap, MappingHead mh, com.ruzzi.unfold.model.MappingAssertion map) {
		MappingBody mb = new MappingBody();
		List<SQLView> vs = new LinkedList<SQLView>();
		String select = "";
		if (mh.getFirstArg() != null)
			select += extractPH(mh.getFirstArg());
		if (mh.getSecondArg() != null)
			select += ", " + extractPH(mh.getSecondArg());
		mb.setBodySelect(select);
		String where = "";
		for (Atom atom : atoms) {
			if (atom.getType() == Atom.BUILTIN_PREDICATE_ATOM) {
				where += BuiltinPredicateManager.getWhereSQLCondition(atom) + " AND ";
			} else {
//				logger.debug(atom.toString());
				SQLView v = viewsMap.get(atom.getPredicate().getName());
				vs.add(v);
			}
		}
		mb.setBodyFrom(vs);
		if (where.length() >= 5) {
			where = where.substring(0, where.length() - 5);
		}
		where = where.replace(map.getID() + "_", "");
		mb.setBodyWhere(where);
		return mb;
	}

	private String extractPH(String template) {
		String h = "";
		int count = 0;
		while((template.indexOf("{") != -1 && template.indexOf("}") != -1) && count < 100) {
			count++;
			h += template.substring(template.indexOf("{") + 1, template.indexOf("}")) + ", ";
			StringBuilder sb = new StringBuilder(template);
			sb.setCharAt(template.indexOf("{"), '_');
			sb.setCharAt(template.indexOf("}"), '_');
			template = sb.toString();
		}
		return h.length() > 2 ? h.substring(0, h.length() - 2) : h;
	}

	private Map<String, SQLView> extractSQLViews(MappingManager mapMan)
			throws ParsingException, PrefixManagerException, SparqlUCQLanguageException, ConstraintMalformedException,
			InclusionAssertionException, UnsupportedLanguageException, OntologyAlphabetException,
			UnrecognizedTypeException, ClassNotFoundException, SAXException, IOException, SQLException,
			DataLevelConfigurationException, ParserConfigurationException, PrimitiveViewMalformedException,
			MappingRewriterStructureException, MappingMalformedException, TermMappingMalformedException {
		Map<String, SQLView> views = new HashMap<String, SQLView>();
		AbstractDataSourceManager manager = mapMan.getDataSourceManager();
		ITBox tbox = mapMan.getTBox();
		List<PrimitiveView> pviews = mapMan.getPrimitiveViews(tbox, manager);
		for (PrimitiveView pview : pviews) {
			SQLView view = new SQLView();
			view.setSqlViewCode(pview.getSqlQuery());
			view.setSqlViewID(pview.getPViewHead().getHeadName());
			view.setSqlViewDescription(pview.getDescription());
			views.put(pview.getPViewHead().getHeadName(), view);
		}
		return views;
	}

	public static String object2json(Object o) throws JsonProcessingException {
		ObjectMapper om = new ObjectMapper();
		om.enable(SerializationFeature.INDENT_OUTPUT);
		return om.writeValueAsString(o);
	}

	public SQLViews getViewDefinitions(String name, String version, String ID)
			throws ParsingException, PrefixManagerException, SparqlUCQLanguageException, ConstraintMalformedException,
			InclusionAssertionException, UnsupportedLanguageException, OntologyAlphabetException,
			UnrecognizedTypeException, OWLOntologyCreationException, IOException, SAXException, ClassNotFoundException,
			SQLException, DataLevelConfigurationException, ParserConfigurationException,
			PrimitiveViewMalformedException, MappingRewriterStructureException, MappingMalformedException,
			TermMappingMalformedException {
		MastroID mid = MastroID.getMastroID(name, version, ID);
		MappingManager mapMan = this.cacheManager.getMappingManager(mid);
		SQLViews views = new SQLViews();
		List<SQLView> sqlview = new LinkedList<SQLView>();
		sqlview.addAll(extractSQLViews(mapMan).values());
		views.setSqlViews(sqlview);
		return views;
	}
	
	

	public ViewMappings getViewMappings(String name, String version, String ID, String viewID)
			throws ParsingException, OWLOntologyCreationException, ClassNotFoundException, PrefixManagerException,
			SparqlUCQLanguageException, ConstraintMalformedException, InclusionAssertionException,
			UnsupportedLanguageException, OntologyAlphabetException, UnrecognizedTypeException, IOException,
			SAXException, SQLException, DataLevelConfigurationException, ParserConfigurationException,
			PrimitiveViewMalformedException, MappingRewriterStructureException, MappingMalformedException,
			TermMappingMalformedException, DOMException, OntologyPredicateMappingMalformedException,
			PrimitiveInclusionMalformedException, ViewProjectionMalformedException,
			PrimitiveDisjointnessMalformedException, IRITemplateManagerException, IRITemplateFormatException {
		MastroID mid = MastroID.getMastroID(name, version, ID);
		MappingManager mapMan = this.cacheManager.getMappingManager(mid);
		ViewMappings vm = new ViewMappings();
		OWLOntology ontology = this.cacheManager.getOwlOntology(mid.getOntologyID());
		Entities entities = this.getOntologyEntities(name, version);
		ReasoningServices rs = new ReasoningServices(ontology, entities);
		SQLView view = null;
		for (SQLView v : extractSQLViews(mapMan).values()) {
			if (v.getSqlViewID().equals(viewID))
				view = v;
		}
		if (view == null)
			throw new RuntimeException("Cannot find view ID " + viewID + " in ontology " + name + " version " + version
					+ " mappings ID " + ID);
		vm.setSqlView(view);
		List<MappingAssertion> _mappingAssertions = getMappingAssertionsByView(ontology, mapMan.getTBox(), mapMan, rs,
				viewID);
		vm.setMappingAssertions(_mappingAssertions);
		MappingDependencies _mappingDependencies = getMappingDependenciesByView(mapMan.getTBox(), mapMan, viewID);
		vm.setMappingDependencies(_mappingDependencies);
		return vm;
	}

	private List<MappingAssertion> getMappingAssertionsByView(OWLOntology ontology, ITBox tbox, MappingManager mapMan,
			ReasoningServices rs, String viewID)
			throws JsonParseException, JsonMappingException, IOException, SAXException, OWLOntologyCreationException,
			ParsingException, ClassNotFoundException, DOMException, PrefixManagerException, SparqlUCQLanguageException,
			ConstraintMalformedException, InclusionAssertionException, UnsupportedLanguageException,
			OntologyAlphabetException, UnrecognizedTypeException, SQLException, DataLevelConfigurationException,
			ParserConfigurationException, OntologyPredicateMappingMalformedException, MappingRewriterStructureException,
			PrimitiveViewMalformedException, MappingMalformedException, TermMappingMalformedException,
			IRITemplateManagerException, IRITemplateFormatException {
		List<MappingAssertion> maps = new LinkedList<MappingAssertion>();
		maps.addAll(this.extractMappingsByView(ontology, tbox, mapMan, rs, viewID));
		return maps;
	}

	private MappingDependencies getMappingDependenciesByView(ITBox tbox, MappingManager mapMan, String viewID)
			throws OWLOntologyCreationException, IOException, SAXException, ClassNotFoundException, SQLException,
			DataLevelConfigurationException, ParserConfigurationException, PrimitiveViewMalformedException,
			MappingRewriterStructureException, MappingMalformedException, UnrecognizedTypeException,
			OntologyAlphabetException, UnsupportedLanguageException, TermMappingMalformedException, DOMException,
			PrimitiveInclusionMalformedException, ViewProjectionMalformedException,
			PrimitiveDisjointnessMalformedException, ParsingException, OntologyPredicateMappingMalformedException,
			PrefixManagerException {
		MappingDependencies md = new MappingDependencies();
		List<ViewDenialConstraint> dens = mapMan.getViewDenialConstraints();
		List<ViewInclusionDependency> incs = mapMan.getViewInclusionDependencies();
		List<ViewKeyDependency> kds = mapMan.getViewKeyDependencies();
		List<String> _denials = convertDen(dens, viewID);
		md.setDenials(_denials);
		List<InclusionDependency> _inclusionDependencies = convertInc(incs, viewID);
		md.setInclusionDependencies(_inclusionDependencies);
		List<KeyDependency> _keyDependencies = convertKey(kds, viewID);
		md.setKeyDependencies(_keyDependencies);
		return md;
	}

	private List<InclusionDependency> convertInc(List<ViewInclusionDependency> vincs, String viewID) {
		List<InclusionDependency> incs = new LinkedList<InclusionDependency>();
		for (ViewInclusionDependency vinc : vincs) {
			if (involvesFilter(vinc, viewID))
				incs.add(convert(vinc));
		}
		return incs;
	}

	private static boolean involvesFilter(ViewInclusionDependency den, String filter) {
		if (filter == null || filter.trim().length() == 0)
			return true;
		if (den.getIncludedPredicate().getName().equals(filter))
			return true;
		if (den.getIncludingPredicate().getName().equals(filter))
			return true;
		return false;
	}

	private List<String> convertDen(List<ViewDenialConstraint> vdens, String filter) {
		List<String> dens = new LinkedList<String>();
		for (ViewDenialConstraint den : vdens) {
			if (involvesFilter(den, filter))
				dens.add(convert(den));
		}
		return dens;
	}

	private static boolean involvesFilter(ViewDenialConstraint den, String filter) {
		if (filter == null || filter.trim().length() == 0)
			return true;
		for (Atom a : den.getDenial().getBody()) {
			if (a.getPredicate().getName().equals(filter))
				return true;
		}
		return false;
	}

	private String convert(ViewDenialConstraint den) {
		return String.valueOf(den);
	}

	private List<KeyDependency> convertKey(List<ViewKeyDependency> vkds, String filter) {
		List<KeyDependency> kds = new LinkedList<KeyDependency>();
		for (ViewKeyDependency vkd : vkds) {
			if (inveolvesFIlter(vkd, filter))
				kds.add(convert(vkd));
		}
		return kds;
	}

	private boolean inveolvesFIlter(ViewKeyDependency vkd, String filter) {
		if (filter == null || filter.trim().length() == 0)
			return true;
		if (vkd.getPredicate().getName().equals(filter))
			return true;
		return false;
	}

	private KeyDependency convert(ViewKeyDependency vkd) {
		KeyDependency kd = new KeyDependency();
		kd.setKeyHead(vkd.getKey().toString());
		kd.setSqlViewID(vkd.getPredicate().getName());
		return kd;
	}

	private InclusionDependency convert(ViewInclusionDependency vinc) {
		InclusionDependency id = new InclusionDependency();
		InclusionView including = new InclusionView();
		including.setSqlViewID(vinc.getIncludingPredicate().getName());
		id.setIncludingView(including);
		InclusionView included = new InclusionView();
		included.setSqlViewID(vinc.getIncludedPredicate().getName());
		id.setIncludedView(included);
		List<InclusionPair> m = new LinkedList<InclusionPair>();
		id.setInclusionMap(m);
		return id;
	}

	public MappingDependencies getMappingDependencies(String name, String version, String ID)
			throws OWLOntologyCreationException, ClassNotFoundException, DOMException, ParsingException, IOException,
			SAXException, SQLException, DataLevelConfigurationException, ParserConfigurationException,
			PrimitiveViewMalformedException, MappingRewriterStructureException, MappingMalformedException,
			UnrecognizedTypeException, OntologyAlphabetException, UnsupportedLanguageException,
			TermMappingMalformedException, PrimitiveInclusionMalformedException, ViewProjectionMalformedException,
			PrimitiveDisjointnessMalformedException, OntologyPredicateMappingMalformedException,
			PrefixManagerException {
		MastroID mid = MastroID.getMastroID(name, version, ID);
		MappingManager mapMan = this.cacheManager.getMappingManager(mid);
		return getMappingDependenciesByView(mapMan.getTBox(), mapMan, null);
	}

	// **********************************************************
	// Q U E R Y M E T H O D S
	// **********************************************************

	public OBDACatalog getQueryCatalog(MwsxSession session, String name, String version) {
		logger.debug("getQueryCatalog " + session.getSessionId());
		User user = session.getUser();
		String pathName = MwsxRepositoryManager.generateOntologyFolder(name);
		String versionPathName = MwsxRepositoryManager.generateOntologyVersionFolder(version);
		Path queryCatalogFilePath = Paths.get(mastroHome + File.separator + pathName + File.separator + versionPathName
				+ File.separator + QUERY_CATALOG_FILE_NAME);
		OBDACatalog obdaCatalog = new OBDACatalog();
		if (Files.exists(queryCatalogFilePath)) {
			JSONQueryCatalog catalog = JSONQueryCatalog.loadFromFile(queryCatalogFilePath.toString());
			for (JSONUserQueryCatalog uCatalog : catalog.getUserCatalogs()) {
				if (uCatalog.getUser().equals(user.getName())) {
					for (JSONQueryCatalogEntry entry : uCatalog.getQueries()) {
						SPARQLQuery sparql = new SPARQLQuery();
						sparql.setQueryCode(entry.getQueryCode());
						sparql.setQueryDescription(entry.getQueryDescr());
						sparql.setQueryID(entry.getQueryID());
						sparql.setConstruct(entry.isConstruct());
						sparql.setConstructResultsRDFSyntax(entry.getConstructRDFSyntax());
						if (obdaCatalog.getQueryCatalog() == null) {
							List<SPARQLQuery> queries = new LinkedList<SPARQLQuery>();
							queries.add(sparql);
							obdaCatalog.setQueryCatalog(queries);
						} else {
							obdaCatalog.getQueryCatalog().add(sparql);
						}
					}
				}
			}
		}
		return obdaCatalog;
	}

	public SPARQLQuery getSPARQLQuery(MwsxSession session, String name, String version, String ID) {
		OBDACatalog catalog = getQueryCatalog(session, name, version);
		for (SPARQLQuery sparql : catalog.getQueryCatalog()) {
			if (sparql.getQueryID().equals(ID))
				return sparql;
		}
		throw new NoSuchElementException("Cannot find query in catalog with id " + ID);
	}

	public SPARQLQuery postSPARQLQuery(MwsxSession session, String name, String version, SPARQLQuery query) {
		User user = session.getUser();
		String pathName = MwsxRepositoryManager.generateOntologyFolder(name);
		String versionPathName = MwsxRepositoryManager.generateOntologyVersionFolder(version);
		Path queryCatalogFilePath = Paths.get(mastroHome + File.separator + pathName + File.separator + versionPathName
				+ File.separator + QUERY_CATALOG_FILE_NAME);
		JSONQueryCatalog catalog = null;
		if (Files.exists(queryCatalogFilePath)) {
			catalog = JSONQueryCatalog.loadFromFile(queryCatalogFilePath.toString());
			if (catalog.containsID(user.getName(), query.getQueryID()))
					throw new RuntimeException("Duplicated ID " + query.getQueryID() + " in catalog for user " + user.getName());
			boolean found = false;
			for (JSONUserQueryCatalog uCatalog : catalog.getUserCatalogs()) {
				if (uCatalog.getUser().equals(user.getName())) {
					found = true;
					JSONQueryCatalogEntry entry = new JSONQueryCatalogEntry();
					entry.setQueryCode(query.getQueryCode());
					entry.setQueryID(query.getQueryID());
					entry.setQueryDescr(query.getQueryDescription());
					entry.setConstruct(query.isConstruct());
					entry.setConstructRDFSyntax(query.getConstructResultsRDFSyntax());
					uCatalog.addJSONQueryCatalogEntry(entry);
					break;
				}
			}
			if (!found) {
				JSONUserQueryCatalog uCatalog = new JSONUserQueryCatalog();
				uCatalog.setUser(user.getName());
				List<JSONQueryCatalogEntry> entries = new LinkedList<JSONQueryCatalogEntry>();
				JSONQueryCatalogEntry entry = new JSONQueryCatalogEntry();
				entry.setQueryCode(query.getQueryCode());
				entry.setQueryID(query.getQueryID());
				entry.setQueryDescr(query.getQueryDescription());
				entry.setConstruct(query.isConstruct());
				entry.setConstructRDFSyntax(query.getConstructResultsRDFSyntax());
				entries.add(entry);
				uCatalog.setQueries(entries);
				if (catalog.getUserCatalogs() == null) {
					catalog.setUserCatalogs(new LinkedList<JSONUserQueryCatalog>());
				}
				catalog.getUserCatalogs().add(uCatalog);
			}
		} else {
			catalog = new JSONQueryCatalog();
			JSONUserQueryCatalog uCatalog = new JSONUserQueryCatalog();
			uCatalog.setUser(user.getName());
			List<JSONQueryCatalogEntry> entries = new LinkedList<JSONQueryCatalogEntry>();
			JSONQueryCatalogEntry entry = new JSONQueryCatalogEntry();
			entry.setQueryCode(query.getQueryCode());
			entry.setQueryID(query.getQueryID());
			entry.setQueryDescr(query.getQueryDescription());
			entry.setConstruct(query.isConstruct());
			entry.setConstructRDFSyntax(query.getConstructResultsRDFSyntax());
			entries.add(entry);
			uCatalog.setQueries(entries);
			List<JSONUserQueryCatalog> uCatalogs = new LinkedList<JSONUserQueryCatalog>();
			uCatalogs.add(uCatalog);
			catalog.setUserCatalogs(uCatalogs);
		}
		JSONQueryCatalog.writeToFile(catalog, queryCatalogFilePath.toString());
		return query;
	}

	public SPARQLQuery deleteSPARQLQuery(MwsxSession session, String name, String version, String iD) {
		User user = session.getUser();
		String pathName = MwsxRepositoryManager.generateOntologyFolder(name);
		String versionPathName = MwsxRepositoryManager.generateOntologyVersionFolder(version);
		Path queryCatalogFilePath = Paths.get(mastroHome + File.separator + pathName + File.separator + versionPathName
				+ File.separator + QUERY_CATALOG_FILE_NAME);
		JSONQueryCatalogEntry removed = null;
		if (Files.exists(queryCatalogFilePath)) {
			JSONQueryCatalog oldCatalog = JSONQueryCatalog.loadFromFile(queryCatalogFilePath.toString());
			JSONQueryCatalog newCatalog = new JSONQueryCatalog();
			List<JSONUserQueryCatalog> newCatalogs = new LinkedList<JSONUserQueryCatalog>();
			for (JSONUserQueryCatalog uCatalog : oldCatalog.getUserCatalogs()) {
				if (uCatalog.getUser().equals(user.getName())) {
					JSONUserQueryCatalog newUCatalog = new JSONUserQueryCatalog();
					List<JSONQueryCatalogEntry> newEntries = new LinkedList<JSONQueryCatalogEntry>();
					for (JSONQueryCatalogEntry entry : uCatalog.getQueries()) {
						if (!entry.getQueryID().equals(iD)) {
							newEntries.add(entry);
						} else
							removed = entry;
					}
					newUCatalog.setQueries(newEntries);
					newUCatalog.setUser(uCatalog.getUser());
					newCatalogs.add(newUCatalog);
				} else {
					newCatalogs.add(uCatalog);
				}
			}
			newCatalog.setUserCatalogs(newCatalogs);
			JSONQueryCatalog.writeToFile(newCatalog, queryCatalogFilePath.toString());
		}
		if (removed == null)
			throw new NoSuchElementException("Cannot remove query with ID " + iD);
		SPARQLQuery query = new SPARQLQuery();
		query.setQueryID(removed.getQueryID());
		query.setQueryCode(removed.getQueryCode());
		query.setQueryDescription(removed.getQueryDescr());
		return query;
	}

	public SPARQLQuery putSPARQLQuery(MwsxSession session, String name, String version, SPARQLQuery query, String iD) {
		if (!query.getQueryID().equals(iD))
			throw new UnsupportedOperationException("Cannot change the ID of a query");
		User user = session.getUser();
		String pathName = MwsxRepositoryManager.generateOntologyFolder(name);
		String versionPathName = MwsxRepositoryManager.generateOntologyVersionFolder(version);
		Path queryCatalogFilePath = Paths.get(mastroHome + File.separator + pathName + File.separator + versionPathName
				+ File.separator + QUERY_CATALOG_FILE_NAME);
		JSONQueryCatalog catalog = null;
		if (Files.exists(queryCatalogFilePath)) {
			catalog = JSONQueryCatalog.loadFromFile(queryCatalogFilePath.toString());
			boolean found = false;
			for (JSONUserQueryCatalog uCatalog : catalog.getUserCatalogs()) {
				if (uCatalog.getUser().equals(user.getName())) {
					for (JSONQueryCatalogEntry entry : uCatalog.getQueries()) {
						if (entry.getQueryID().equals(iD)) {
							found = true;
							entry.setQueryCode(query.getQueryCode());
							entry.setQueryDescr(query.getQueryDescription());
							break;
						}
					}
				}
			}
			if (!found)
				throw new NoSuchElementException(
						"Cannot update query with ID " + iD + ", query does not exists in catalog");
			else
				JSONQueryCatalog.writeToFile(catalog, queryCatalogFilePath.toString());
		} else {
			throw new NoSuchElementException("Cannot update query with ID " + iD + ", query catalog does not exists");
		}
		return query;
	}

	public OBDARunQueryInstance startQueryFromCatalog(MwsxSession session, String name, String version, String mapID,
			String queryID, boolean reasoning) {
		MastroID mid = MastroID.getMastroID(name, version, mapID);
		SPARQLQuery sparql = this.getSPARQLQuery(session, name, version, queryID);
		if (sparql.isConstruct())
			throw new RuntimeException("The query identified by ID " + queryID + " is a construct query: use the suitable method");
		MastroAPI mastro = session.getMastroInstance(mid);
		List<String> running = mastro.mtq_getQueryIds(queryID);
		for (String id : running) {
			String state = mastro.mtq_getQueryState(id);
			if (state.equals("RUNNING"))
				throw new RuntimeException(
						"Cannot run query " + queryID + ": there is running an instance of the query");
		}
		String qidsys = sparql.getQueryID() + "_" + UUID.randomUUID().toString();
		int success = mastro.mtq_openQueryChannel(sparql.getQueryCode(), qidsys, queryID,
				sparql.getQueryDescription(), reasoning ? 1 : 0, 1, 1, 1000, 1, session.getUser().getName());
		if (success == 0) {
			int success2 = mastro.mtq_startQuery(qidsys);
			if (success2 == 0) {
				fetchResults(mastro, queryID);
				OBDARunQueryInstance i = new OBDARunQueryInstance();
				i.setExecutionId(qidsys);
				i.setSparql(sparql);
				return i;
			}
		}
		throw new NoSuchElementException("Cannot start query, check system log for details");
	}
	
	public OBDARunQueryInstance startNewQuery(MwsxSession session, String name, String version, String mapID,
			boolean reasoning, SPARQLQuery sparql) {
		MastroID mid = MastroID.getMastroID(name, version, mapID);
		MastroAPI mastro = session.getMastroInstance(mid);
		String qidsys = sparql.getQueryID() + "_" + UUID.randomUUID().toString();
		int success = mastro.mtq_openQueryChannel(sparql.getQueryCode(), qidsys, sparql.getQueryID(),
				sparql.getQueryDescription(), reasoning ? 1 : 0, 1, 1, 1000, 1, session.getUser().getName());
		if (success == 0) {
			int success2 = mastro.mtq_startQuery(qidsys);
			if (success2 == 0) {
				fetchResults(mastro, sparql.getQueryID());
				OBDARunQueryInstance i = new OBDARunQueryInstance();
				i.setExecutionId(qidsys);
				i.setSparql(sparql);
				return i;
			}
		}
		throw new NoSuchElementException("Cannot start query, check system log for details");
	}
	
	private void fetchResults(final MastroAPI mastro, final String queryID) {
		new Thread() {
			public void run() {
				int page = 0;
				logger.debug("Start fetching pages for query " + queryID);
				try {
					int s = Integer.parseInt(mastro.mtq_getQueryState(queryID));
					while(s != IOBDAQueryMonitor.QUERY_STATE_FINISHED) {
						mastro.mtq_getRows(queryID, page);
						page++;
					}
				}
				catch(Throwable t) {
					logger.debug("Errors fetching pages for query " + queryID + ": " + t.getMessage());
				}
				logger.debug("Fetching pages finished for query " + queryID + ": " + page + " pages fetched.");
			}
		}.start();
	}
	
	public OBDARunQueryInstance startConstructQueryFromCatalog(MwsxSession session, String name, String version, String mapID,
			String queryID, boolean reasoning) {
		MastroID mid = MastroID.getMastroID(name, version, mapID);
		SPARQLQuery sparql = this.getSPARQLQuery(session, name, version, queryID);
		if (!sparql.isConstruct())
			throw new RuntimeException("SPARQL query " + sparql.getQueryID() +" is not a construct query");
		MastroAPI mastro = session.getMastroInstance(mid);
		String qid = mastro.mtq_constructOpenEnabledQueryChannel(sparql.getQueryCode(), sparql.getConstructResultsRDFSyntax(), sparql.getQueryID(), sparql.getQueryDescription(), session.getUser().getName());
		if (qid != null) {
			fetchConstructResults(mastro, qid);
			OBDARunQueryInstance i = new OBDARunQueryInstance();
			i.setExecutionId(qid);
			i.setSparql(sparql);
			return i;
		}
		throw new NoSuchElementException("Cannot start query, check system log for details");
	}
	
	public OBDARunQueryInstance startNewConstructQuery(MwsxSession session, String name, String version, String mapID,
			boolean reasoning, SPARQLQuery sparql) {
		MastroID mid = MastroID.getMastroID(name, version, mapID);
		MastroAPI mastro = session.getMastroInstance(mid);
		String qidsys = sparql.getQueryID() + "_" + UUID.randomUUID().toString();
		sparql.setQueryID(qidsys);
		for (SPARQLQuery q : this.getQueryCatalog(session, name, version).getQueryCatalog()) {
			if (q.getQueryID().equals(sparql.getQueryID()))
				throw new RuntimeException("A query with ID " + sparql.getQueryID() + " already exists in catalog");
		}
		String qid = mastro.mtq_constructOpenQueryChannel(sparql.getQueryCode(), sparql.getConstructResultsRDFSyntax(), sparql.getQueryID(), sparql.getQueryDescription(), session.getUser().getName());
		if (qid != null) {
			int success2 = mastro.mtq_constructStartQuery(qid);
			if (success2 == 0) {
				fetchConstructResults(mastro, qid);
				OBDARunQueryInstance i = new OBDARunQueryInstance();
				i.setExecutionId(qid);
				i.setSparql(sparql);
				return i;
			}
		}
		else
			throw new NoSuchElementException("Cannot start query, check system log for details");
		int success = mastro.mtq_openQueryChannel(sparql.getQueryCode(), qidsys, sparql.getQueryID(),
				sparql.getQueryDescription(), reasoning ? 1 : 0, 1, 1, 1000, 1, session.getUser().getName());
		if (success == 0) {
			int success2 = mastro.mtq_startQuery(qidsys);
			if (success2 == 0) {
				fetchResults(mastro, sparql.getQueryID());
				OBDARunQueryInstance i = new OBDARunQueryInstance();
				i.setExecutionId(qidsys);
				i.setSparql(sparql);
				return i;
			}
		}
		throw new NoSuchElementException("Cannot start query, check system log for details");
	}

	private void fetchConstructResults(final MastroAPI mastro, final String queryID) {
		new Thread("FETCHING_CONSTRUCT_QUERY_" + queryID) {
			public void run() {
				int page = 0;
				int iterations = 0;
				logger.debug("Start fetching construct pages for query " + queryID);
				try {
					int s = mastro.mtq_constructGetQueryState(queryID);
//					System.out.print("STATUS: " + s);
					int errors = 0;
					while(s != IOBDAQueryMonitor.QUERY_STATE_FINISHED) {
						logger.debug(" --- [Fetching status]    --- : " + s + " / Errors: " + errors);
						if (iterations > 1000)
							return;
						Thread.sleep(50);
						try {
							List<String> rr = mastro.mtq_constructGetRows(queryID, page);
//							System.out.println("@@@@@@@@@@@@@@@@@@@@@@ " + String.valueOf(rr) + " @@@@@@@@@@@@@@@@@@@@@@@@@@");
							page++;
							s = mastro.mtq_constructGetQueryState(queryID);
//							System.out.println(", " + s);
							errors = mastro.mtq_getConstructQueryErrorsCount(queryID);
							if (mastro.mtq_constructHasErrors(queryID) == 1) {
								logger.debug(" --- [FOUND ERROR]     --- : " + s + " / Errors: " + errors);
								break;
							}
						}
						catch(Throwable t) {
							logger.debug(" --->  [Inner thread MSG]   --- : " + t.getMessage());
							logger.debug(" --->  [Inner thread ERROR] --- : " + t.getStackTrace()[0].toString());
							System.out.println("(**)");
							t.printStackTrace();
							break;							
						}		
						iterations++;
					}
				}
				catch(Throwable t) {
					logger.debug("Errors fetching pages for query " + queryID + ": " + t.getMessage());
					t.printStackTrace();
				}
				logger.debug("Fetching pages finished for query " + queryID + ": " + page + " pages fetched.");
			}
		}.start();
	}

	public int stopQuery(MwsxSession session, String name, String version, String mapID, String queryID) {
		MastroID mid = MastroID.getMastroID(name, version, mapID);
		MastroAPI mastro = session.getMastroInstance(mid);
		List<String> running = mastro.mtq_getQueryIds(queryID);
		String qidsys = null;
		for (String id : running) {
			String state = mastro.mtq_getQueryState(id);
			if (state.equals("RUNNING"))
				qidsys = id;
		}
		if (qidsys != null) {
			mastro.mtq_stopQuery(qidsys);
		}
		throw new NoSuchElementException("Cannot find a running instance of query " + queryID);
	}

	public FileInfo exportQuery(MwsxSession session, String name, String version, String mapID, String queryID
			) throws IOException {
		MastroID mid = MastroID.getMastroID(name, version, mapID);
		MastroAPI mastro = session.getMastroInstance(mid);
		Path tempPath = Paths.get(MwsxRepositoryManager.getRepositoryManager().getMastroHomeTemp() + File.separator
				+ UUID.randomUUID() + ".tmp");
		logger.debug("*****************************************************************************");
		logger.debug("***  EXPORTING QUERY RESULTS TO: " + tempPath.toString());
		logger.debug("*****************************************************************************");
		mastro.mtq_exportCurrentResultsToFile(queryID, tempPath.toString(), true);
		String exportContent = new String(java.util.Base64.getEncoder().encode(Files.readAllBytes(tempPath)));
		FileInfo info = new FileInfo();
		info.setFileName(queryID + ".csv");
		info.setContent(exportContent);
		info.setFileType(".csv");
		Files.delete(tempPath);
		return info;
	}

	public FileInfo exportQueryReport(MwsxSession session, String name, String version, String mapID, String queryID) {
		throw new ChristmasException();
	}

	public SPARQLStatus getQueryStatus(MwsxSession session, String name, String version, String mapID, String queryID) {
		MastroID mid = MastroID.getMastroID(name, version, mapID);
		MastroAPI mastro = session.getMastroInstance(mid);
		QueryRecord qr = mastro.mtq_getQueryRecord(queryID);
		String state = mastro.mtq_getQueryState(queryID);
		SPARQLStatus st = new SPARQLStatus();
		st.setNumResults(mastro.mtq_getAvailableRowsCount(queryID));
		st.setNumHighLevelQueries(mastro.mtq_getMappingRewriting(queryID).size());
		st.setNumLowLevelQueries(mastro.mtq_getMappingViewRewriting(queryID).size());
		st.setNumOntologyRewritings(mastro.mtq_getOntologyRewriting(queryID).size());
		st.setHasError(mastro.mtq_hasErrors(queryID) == 1 ? true : false);
		String jsonInfo = mastro.mtq_getExecutionsInfos(queryID);
		JSONObject obj = new JSONObject(jsonInfo);
		String et = obj.getString("exec_time");
		String res = "" + obj.getInt("results");
		int ett = -1;
		try {
			double d = Double.parseDouble(et.replace(" sec", ""));
			ett = (int) Math.floor(d * 1000);
			st.setNumResults(Integer.parseInt(res));
		}
		catch(Throwable e) {
			
		}
		st.setExecutionTime(ett);		
		int perc = 0;
		if (qr.getOntologyRewritingState() > 0)
			perc = 20 + randomizedDelay();
		if (qr.getHighLevelUnfoldingState() > 0)
			perc = 40 + randomizedDelay();
		if (qr.getOptimizerState() > 0)
			perc = 60 + randomizedDelay();
		if (qr.getLowLevelUnfoldingState() > 0)
			perc = 80 + randomizedDelay();
		if (qr.getEvaluationState() > 0)
			perc = 99;
		if (state.equals("" + IOBDAQueryMonitor.QUERY_STATE_DISABLED)) {
			st.setStatus("DISABLED");
			st.setPercentage(0);
		}
		if (state.equals("" + IOBDAQueryMonitor.QUERY_STATE_READY)) {
			st.setStatus("READY");
			st.setPercentage(0);
		}
		if (state.equals("" + IOBDAQueryMonitor.QUERY_STATE_RUNNING)) {
			st.setStatus("RUNNING");
			st.setPercentage(perc);
		}
		if (state.equals("" + IOBDAQueryMonitor.QUERY_STATE_FINISHED)) {
			st.setStatus("FINISHED");
			st.setExecutionTime(ett);
			st.setPercentage(100);
		}
		return st;
	}
	
	public SPARQLStatus getConstructQueryStatus(MwsxSession session, String name, String version, String mapID, String queryID) {
		MastroID mid = MastroID.getMastroID(name, version, mapID);
		MastroAPI mastro = session.getMastroInstance(mid);
		int state = mastro.mtq_constructGetQueryState(queryID);
		SPARQLStatus st = new SPARQLStatus();
		if (state == IOBDAQueryMonitor.QUERY_STATE_RUNNING) {
			st.setStatus(state + "");
			st.setPercentage(50 + randomizedDelay());
		} else {
			st.setStatus("FINISHED");
			st.setPercentage(100);
		}
		return st;
	}
	
	private int randomizedDelay() {
		Random r = new Random();
		int m = r.nextInt(10);
		return m-5;
	}

	public SPARQLResults getQueryResult(MwsxSession session, String name, String version, String mapID, String queryID,
			int pagesize, int pagenumber) throws JsonParseException, JsonMappingException, IOException {
		MastroID mid = MastroID.getMastroID(name, version, mapID);
		MastroAPI mastro = session.getMastroInstance(mid);
		SPARQLResults results = new SPARQLResults();
		results.setConstruct(false);
		results.setHeadTerms(mastro.mtq_getQueryHead(queryID));
		List<List<SPARQLResult>> rrs = new LinkedList<List<SPARQLResult>>();
		List<String> rs = mastro.mtq_getRows(queryID, (pagenumber - 1) * pagesize, pagesize);
		ObjectMapper om = new ObjectMapper();
		for (String r : rs) {
			JSONTuple tuple = om.readValue(r, JSONTuple.class);
			List<SPARQLResult> l = new LinkedList<SPARQLResult>();
			for (JSONStringValue v : tuple.getValues()) {
				SPARQLResult spRes = new SPARQLResult();
				spRes.setType("string");
				IRI i = IRI.create(v.getValue());
				spRes.setValue(i.toString());
				spRes.setShortIRI(i.getRemainder().isPresent() ? i.getRemainder().get() : v.getValue());
				l.add(spRes);
			}
			rrs.add(l);
		}
		results.setResults(rrs);
		return results;
	}
	
	public SPARQLResults getConstructQueryResult(MwsxSession session, String name, String version, String mapID, String queryID,
			int pagesize, int pagenumber) throws JsonParseException, JsonMappingException, IOException {
		pagesize = IOBDAQueryMonitor.OBDA_CONSTRUCT_QUERY_RESULT_PAGE_SIZE;
		MastroID mid = MastroID.getMastroID(name, version, mapID);
		MastroAPI mastro = session.getMastroInstance(mid);
		SPARQLResults results = new SPARQLResults();
		results.setConstruct(true);
		List<String> head = new LinkedList<String>();
		head.add("Subject");
		head.add("Predicate");
		head.add("Object");
		results.setHeadTerms(head);
		List<List<SPARQLResult>> rrs = new LinkedList<List<SPARQLResult>>();
		List<String> rows = mastro.mtq_constructGetRows(queryID, pagenumber - 1);
		for(int j=0;j<rows.size();j++) {
			List<SPARQLResult> res = new LinkedList<SPARQLResult>();
			JSONObject row = new JSONObject(rows.get(j));
			JSONArray jsonArray = (JSONArray) row.get("values");
			List<String> selectResults = getResultValues(jsonArray);
			System.out.println("###### Tuple nr "+ j + " in Page nr "+(pagenumber - 1)+" ######");
			SPARQLResult subj = new SPARQLResult();
			subj.setShortIRI(selectResults.get(0));
			SPARQLResult pred = new SPARQLResult();
			pred.setShortIRI(selectResults.get(1));
			SPARQLResult obj = new SPARQLResult();
			obj.setShortIRI(selectResults.get(2));
			res.add(subj);
			res.add(pred);
			res.add(obj);
			rrs.add(res);
		}
		results.setResults(rrs);
		return results;
	}
	
	private static List<String> getResultValues(JSONArray jsonArray) {
		List<String> result = new LinkedList<>();
		for (int j = 0; j < jsonArray.length(); j++) {
			JSONObject curr = jsonArray.getJSONObject(j);
			result.add(curr.getString("value"));
		}
		return result;
	}

	public OntologyRewritings getOntologyRewritings(MwsxSession session, String name, String version, String mapID,
			String queryID, int pagesize, int pagenumber) {
		if (pagenumber < 1)
			throw new RuntimeException("Wrong page number: pages starts at number 1");
		MastroID mid = MastroID.getMastroID(name, version, mapID);
		MastroAPI mastro = session.getMastroInstance(mid);
		List<String> rew = mastro.mtq_getOntologyRewriting(queryID);
		int start = pagesize * (pagenumber - 1);
		int end = pagesize * pagenumber;
		if (rew.size() <= start)
			throw new NoSuchElementException("No results available for ontology rewriting page " + pagenumber);
		OntologyRewritings rews = new OntologyRewritings();
		List<String> lines = new LinkedList<String>();
		for (int i = start; i < end; i++) {
			if (rew.size() > i)
				lines.add(rew.get(i));
		}
		rews.setOntologyRewritings(lines);
		return rews;
	}

	public MappingRewritings getMappingRewritings(MwsxSession session, String name, String version, String mapID,
			String queryID, int pagesize, int pagenumber) {
		MastroID mid = MastroID.getMastroID(name, version, mapID);
		MastroAPI mastro = session.getMastroInstance(mid);
		List<String> rew = mastro.mtq_getMappingRewriting(queryID);
		logger.debug(" REW: " + rew);
		int start = pagesize * (pagenumber - 1);
		int end = pagesize * pagenumber;
		if (rew.size() < start)
			throw new NoSuchElementException("No results available for mapping rewriting page " + pagenumber);
		MappingRewritings rews = new MappingRewritings();
		List<String> lines = new LinkedList<String>();
		for (int i = start; i < end; i++) {
			if (rew.size() > i)
				lines.add(rew.get(i));
		}
		rews.setMappingRewritings(lines);
		return rews;
	}

	public ViewRewritings getViewRewritings(MwsxSession session, String name, String version, String mapID,
			String queryID, int pagesize, int pagenumber) throws JsonParseException, JsonMappingException, IOException {
		MastroID mid = MastroID.getMastroID(name, version, mapID);
		MastroAPI mastro = session.getMastroInstance(mid);
		List<String> rew = mastro.mtq_getMappingViewRewriting(queryID);
		List<String> infos = mastro.mtq_getSqlQueryInfos(queryID);
		logger.debug(" REW: " + rew);
		logger.debug(" INFOS: " + infos);
		int start = pagesize * (pagenumber - 1);
		int end = pagesize * pagenumber;
		if (infos.size() < start)
			throw new NoSuchElementException("No results available for mapping rewriting page " + pagenumber);
		ViewRewritings rews = new ViewRewritings();
		List<ViewRewriting> lines = new LinkedList<ViewRewriting>();
		for (int i = start; i < end; i++) {
			if (infos.size() > i) {
				ViewRewriting vr = new ViewRewriting();
				String jsonInfos = infos.get(i);
				ObjectMapper om = new ObjectMapper();
				SqlQueryInfo info = om.readValue(jsonInfos.getBytes(), SqlQueryInfo.class);
				vr.setQuery(info.getSql());
				vr.setNumResults(info.getRows());
				vr.setTime(info.getTime());
				lines.add(vr);
			}
		}
		rews.setViewRewritings(lines);
		return rews;
	}

	public DataSourceInfoEntry getDataSourceInfoEntry(String name) {
		for (DataSourceInfoEntry entry : DataSourceInfo.getDataSources()) {
			if (name.equals(entry.getId()))
				return entry;
		}
		return null;
	}
	
	public DataSourceInfoEntry putDataSourceInfoEntry(String name, DataSourceInfoEntry info) {
		return DataSourceInfo.updateDataSource(info);
	}
	
	public DataSourceInfoEntry postDataSourceInfoEntry(DataSourceInfoEntry info) {
		return DataSourceInfo.createDataSource(info);
	}
	
	public List<DataSourceInfoEntry> getDataSourceInfoEntries(User user) throws JsonParseException, JsonMappingException, IOException {
		return DataSourceInfo.getDataSourcesbyUsername(user.getName());
	}
	
	public List<String> getDataSourceDrivers() {
		return DataSourceInfo.getDataSourceDrivers();
	}

	public DataSourceInfoEntry deleteDataSourceInfoEntry(String name) {
		return DataSourceInfo.deleteDataSource(name);
	}
	
	public MappingsCheckResult checkMappings(MwsxSession session, MastroID id) throws DOMException, ParsingException, ParserConfigurationException, SAXException, IOException, OntologyPredicateMappingMalformedException, MappingRewriterStructureException, PrimitiveViewMalformedException, MappingMalformedException, TermMappingMalformedException, UnrecognizedTypeException, OntologyAlphabetException, UnsupportedLanguageException, PrefixManagerException {
		Map<String, List<String>> messagesByMapId = new HashMap<String, List<String>>();
		boolean success =  session.checkMappings(id, messagesByMapId);
		MappingsCheckResult mcr = new MappingsCheckResult();
		mcr.setSuccess(success);
		mcr.setMessagesByMappingId(messagesByMapId);
		return mcr;
	}
	
	public int startMastroInstance(MwsxSession session, MastroID id, MastroProperties props) {
		return session.loadInstance(id, props);
	}

	public int stopMastroInstance(MwsxSession session, MastroID id) {
		return session.releaseInstance(id);
	}
	
	public OBDAStatus getMastroInstanceStatus(MwsxSession session, MastroID id) {
		MastroAPI mastro = null;
		try {
			mastro = session.getMastroInstance(id);
		}
		catch(RuntimeException e) {
			if (mastro == null) {
				return OBDAStatus.getUnavailableStatus(id);
			}
		}
		if (mastro.isReady()) {
			return OBDAStatus.getRunningStatus(id);
		} else {
			if (mastro.hasError()) {
				List<Throwable> thr = mastro.getErrors();
				String errors = "";
				for (Throwable t : thr)
					errors = t.getMessage() + "\n" + errors;
				return OBDAStatus.getErrorStatus(id, errors);
			} else
				return OBDAStatus.getLoadingStatus(id);
		}
	}

	public List<KnowledgeGraph> getKnowledgeGraphs(User u) {
		List<KnowledgeGraph> kgsUser = new LinkedList<KnowledgeGraph>();
		for (KnowledgeGraph kg : this.kgs) {
			if (u.getName().equals(kg.getKgCreator().getName()))
				kgsUser.add(kg);
		}
		return kgsUser;
	}

	public List<KnowledgeGraphFile> getKnowledgeGraphModels(KnowledgeGraph kg) throws IOException {
//		KGStatus st = this.getKnowledgeGraphState(kg);
		List<KnowledgeGraphFile> models = new LinkedList<KnowledgeGraphFile>();
//		if (st == null)
//			return models;
//		if (st.getStatus().equals("LOADING"))
//			return models;
		String kgSubPath = MwsxRepositoryManager.generateKGFolder(kg);
		Path path = Paths.get(this.kgHome + File.separator + kgSubPath + File.separator + KG_MODELS_FOLDER_NAME);
		Stream<Path> content = Files.list(path);
		content.forEach(p -> {
			if (!Files.isDirectory(p) && !p.toFile().getName().equals(KG_INFO_FILE_NAME) && !p.toFile().getName().equals(KG_MODELS_INFO_FILE_NAME)) {
				try {
					ObjectMapper om = new ObjectMapper();
					System.out.println(p.toFile());
					KnowledgeGraphFile kgf = om.readValue(p.toFile(), KnowledgeGraphFile.class);
					models.add(kgf);
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		});
		content.close();
		return models;
	}

	public void addKnowledgeGraphModel(KnowledgeGraph kg, KnowledgeGraphFile kgf) throws IOException {
		KGStatus st = this.getKnowledgeGraphState(kg);
		if (st == null)
			throw new RuntimeException("Cannot determine the KG status");
		if (st.getStatus().equals("LOADING")) {
			throw new RuntimeException("Cannot load a new model while another model is loading");
		}
		String kgSubPath = MwsxRepositoryManager.generateKGFolder(kg);
		Path kgPath = Paths.get(this.kgHome + File.separator + kgSubPath);
		Path path = Paths.get(this.kgHome + File.separator + kgSubPath + File.separator + KG_MODELS_FOLDER_NAME + File.separator + kgf.getFile().getFileName());
		Path modelFolderPath = Paths.get(this.kgHome + File.separator + kgSubPath + File.separator + KG_MODELS_FOLDER_NAME);
		Path tdbFolderPath = Paths.get(this.kgHome + File.separator + kgSubPath + File.separator + KG_TDB_FOLDER_NAME);
		ObjectMapper om = new ObjectMapper();
		om.writeValue(path.toFile(), kgf);
		KGLoader loader = new KGLoader(kgf, kgPath.toString(), tdbFolderPath.toString(), modelFolderPath.toString());
		new Thread(loader, "KG_LOADER (" + kg.getKgIri() + ")").start();
	}
	
	public void addKnowledgeGraphQuery(KnowledgeGraph kg, SPARQLQuery query) throws IOException {
		String folderQuery = ("KG_QUERY_" + query.getQueryID().hashCode()).replace("-", "n");
		String candidateFileName = "query.json";
		List<SPARQLQuery> qs = this.getKnowledgeGraphQueries(kg);
		for (SPARQLQuery q : qs)
			if (q.getQueryID().equals(query.getQueryID()))
				throw new RuntimeException("Duplicate query ID " + query.getQueryID());
		String kgSubPath = MwsxRepositoryManager.generateKGFolder(kg);
		Path pathQFolder = Paths.get(this.kgHome + File.separator + kgSubPath + File.separator + KG_QUERIES_FOLDER_NAME 
				+ File.separator + folderQuery);
		Path path = Paths.get(this.kgHome + File.separator + kgSubPath + File.separator + KG_QUERIES_FOLDER_NAME 
				+ File.separator + folderQuery + File.separator + candidateFileName);
		Files.createDirectory(pathQFolder);
		ObjectMapper om = new ObjectMapper();
		om.enable(SerializationFeature.INDENT_OUTPUT);
		om.writeValue(path.toFile(), query);
	}
	
	public void editKnowledgeGraphQuery(KnowledgeGraph kg, SPARQLQuery query) throws IOException {
		deleteKnowledgeGraphQuery(kg, query.getQueryID());
		addKnowledgeGraphQuery(kg, query);
	}
	
	public void deleteKnowledgeGraphQuery(KnowledgeGraph kg, String queryID) throws IOException {
		String folderQuery = ("KG_QUERY_" + queryID.hashCode()).replace("-", "n");
		String kgSubPath = MwsxRepositoryManager.generateKGFolder(kg);
		Path path = Paths.get(this.kgHome + File.separator + kgSubPath + File.separator + KG_QUERIES_FOLDER_NAME 
				+ File.separator + folderQuery);
		if (Files.exists(path)) {
			for (Path content : Files.list(path).collect(Collectors.toList())) {
				Files.deleteIfExists(content);
			}
			Files.delete(path);
		}
		else
			throw new NoSuchElementException("Cannot find query with ID " + queryID);
	}
	
	private List<SPARQLQuery> getKnowledgeGraphQueries(KnowledgeGraph kg) throws IOException {
		String candidateFileName = "query.json";
		List<SPARQLQuery> qs = new LinkedList<SPARQLQuery> ();
		String kgSubPath = MwsxRepositoryManager.generateKGFolder(kg);
		Path path = Paths.get(this.kgHome + File.separator + kgSubPath + File.separator + KG_QUERIES_FOLDER_NAME);
		ObjectMapper om = new ObjectMapper();
		for (Path p : Files.list(path).collect(Collectors.toList())) {
			if (Files.isDirectory(p)) {
				Path qInfoPath = Paths.get(p.toString() + File.separator + candidateFileName);
				if (Files.exists(qInfoPath)) {
					SPARQLQuery q = om.readValue(Files.readAllBytes(qInfoPath), SPARQLQuery.class);
					qs.add(q);
				}
			}
		}
		return qs;
	}
	
	public SPARQLQuery getKnowledgeGraphQuery(KnowledgeGraph kg, String id) throws IOException {
		String candidateFileName = "query.json";
		String kgSubPath = MwsxRepositoryManager.generateKGFolder(kg);
		Path path = Paths.get(this.kgHome + File.separator + kgSubPath + File.separator + KG_QUERIES_FOLDER_NAME);
		ObjectMapper om = new ObjectMapper();
		for (Path p : Files.list(path).collect(Collectors.toList())) {
			if (Files.isDirectory(p)) {
				Path qInfoPath = Paths.get(p.toString() + File.separator + candidateFileName);
				if (Files.exists(qInfoPath)) {
					SPARQLQuery q = om.readValue(Files.readAllBytes(qInfoPath), SPARQLQuery.class);
					if (id.equals(q.getQueryID()))
						return q;
				}
			}
		}
		throw new NoSuchElementException("Cannot find query with ID " + id);
	}
	
	public OBDACatalog getKnowledgeGraphQueriesCatalog(KnowledgeGraph kg) throws IOException {
		QueryCatalog qc = new QueryCatalog();
		OBDACatalog cat = new OBDACatalog();
		cat.setQueryCatalog(new LinkedList<SPARQLQuery>());
		qc.setName("query_catalog.json");
		qc.setQueries(new LinkedList<QueryCatalogEntry>());
		String candidateFileName = "query.json";
		String kgSubPath = MwsxRepositoryManager.generateKGFolder(kg);
		Path path = Paths.get(this.kgHome + File.separator + kgSubPath + File.separator + KG_QUERIES_FOLDER_NAME);
		ObjectMapper om = new ObjectMapper();
		for (Path p : Files.list(path).collect(Collectors.toList())) {
			if (Files.isDirectory(p)) {
				Path qInfoPath = Paths.get(p.toString() + File.separator + candidateFileName);
				if (Files.exists(qInfoPath)) {
					SPARQLQuery sq = om.readValue(Files.readAllBytes(qInfoPath), SPARQLQuery.class);
					QueryCatalogEntry qce = new QueryCatalogEntry();
					qce.setId(sq.getQueryID());
					qce.setDescription(sq.getQueryDescription());
					qce.setCode(sq.getQueryCode());
					qc.getQueries().add(qce);
					cat.getQueryCatalog().add(sq);
				}
			}
		}
		return cat;
	}

	public KGStatus getKnowledgeGraphState(KnowledgeGraph kg) throws IOException {
		String kgSubPath = MwsxRepositoryManager.generateKGFolder(kg);
		Path kgPathSemLoadingFile = Paths.get(this.kgHome + File.separator + kgSubPath + File.separator + "_loading_");
		Path kgPathSemReadyFile = Paths.get(this.kgHome + File.separator + kgSubPath + File.separator + "_ready_");
		Path kgPathSemErrorFile = Paths.get(this.kgHome + File.separator + kgSubPath + File.separator + "_error_");
		Path modelFolderPath = Paths.get(this.kgHome + File.separator + kgSubPath + File.separator + KG_MODELS_FOLDER_NAME);
		KGStatus state = new KGStatus();
		state.setStatus("NEW");
		if (Files.exists(modelFolderPath) && Files.isDirectory(modelFolderPath)) {
			List<Path> f = Files.list(modelFolderPath).collect(Collectors.toList());
			int count = 0;
			for (Path p : f) {
				if (!p.toFile().getName().equals("models.info"))
					count++;
			}
			state.setModelsNumber(count);
		}
		else {
			state.setStatus("EMPTY");
			return state;
		}
		if (Files.exists(kgPathSemReadyFile)) {
			state.setStatus("READY");
			String c = new String(Files.readAllBytes(kgPathSemReadyFile));
			if (c != null) {
				c = c.replace("Triples loaded: ", "");
				if (c.trim().length() > 0)
					state.setTriplesNumber(Integer.parseInt(c));
			}
		}
		if (Files.exists(kgPathSemLoadingFile)) {
			state.setStatus("LOADING");
		}
		if (Files.exists(kgPathSemErrorFile)) {
			state.setStatus("ERROR");
		}
		return state;
	}
	
	public void deleteKnowledgeGraphModel(KnowledgeGraph kg, KnowledgeGraphFile kgf) throws IOException {
		String kgSubPath = MwsxRepositoryManager.generateKGFolder(kg);
		Path path = Paths.get(this.kgHome + File.separator + kgSubPath);
		List<Path> remove = new LinkedList<>(); 
		Stream<Path> content = Files.list(path);
		content.forEach(p -> {
			if (!p.toFile().getName().toUpperCase().equals(KG_INFO_FILE_NAME)) {
				try {
					ObjectMapper om = new ObjectMapper();
					KnowledgeGraphFile actKgf = om.readValue(p.toFile(), KnowledgeGraphFile.class);
					if (actKgf.getFile().getFileName().equals(kgf.getFile().getFileName()))
							remove.add(p);
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		});
		content.close();
		for (Path p : remove)
			Files.delete(p);
	}

	public SPARQLStatus getKnowledgeGraphQueryStatus(KnowledgeGraph kg, String queryID) throws JsonParseException, JsonMappingException, IOException {
		SPARQLStatus status = new SPARQLStatus();
		String folderQuery = ("KG_QUERY_" + queryID.hashCode()).replace("-", "n");
		String kgSubPath = MwsxRepositoryManager.generateKGFolder(kg);
		Path path = Paths.get(this.kgHome + File.separator + kgSubPath + File.separator + KG_QUERIES_FOLDER_NAME 
				+ File.separator + folderQuery);
		if (Files.exists(path)) {
			Path semFinished = Paths.get(path.toString() + File.separator + "_finished_");
			Path semRunning = Paths.get(path.toString() + File.separator + "_running_");
			if (Files.exists(semRunning) && Files.exists(semFinished))
				throw new RuntimeException("Query is in an indeterminate state");
			else if (!Files.exists(semRunning) && !Files.exists(semFinished)) {
				status.setStatus("READY");
			}
			else if (Files.exists(semRunning)) {
				if (Files.readAllBytes(semRunning).length != 0) {
					ObjectMapper om = new ObjectMapper();
					status = om.readValue(semRunning.toFile(), SPARQLStatus.class);
				}
			}
			else if (Files.exists(semFinished)) {
				if (Files.readAllBytes(semFinished).length != 0) {
					ObjectMapper om = new ObjectMapper();
					status = om.readValue(semFinished.toFile(), SPARQLStatus.class);
				}
			}
			return status;
		}
		else
			throw new NoSuchElementException("Cannot find query with ID " + queryID);
	}
	
	public SPARQLQueryExecution startKGQueryFromCatalog(MwsxSession session, KnowledgeGraph kg, String namedGraph, String queryID) throws IOException {
		KGStatus st = this.getKnowledgeGraphState(kg);
		if (st == null)
			throw new RuntimeException("Cannot determine the KG status");
		if (st.getStatus().equals("EMPTY")) {
			throw new RuntimeException("Do you really want to run a query over an empty KG?");
		}
		if (st.getStatus().equals("LOADING")) {
			throw new RuntimeException("KG model is currently loading, cannot run queries yet");
		}
		SPARQLQueryExecution exec = new SPARQLQueryExecution();
		exec.setQueryID(queryID);
		String kgSubPath = MwsxRepositoryManager.generateKGFolder(kg);
		Path path = Paths.get(this.kgHome + File.separator + kgSubPath + File.separator + KG_TDB_FOLDER_NAME);
		SPARQLQuery query = this.getKnowledgeGraphQuery(kg, queryID);
		KGQueryRunner runner = new KGQueryRunner(kg, path.toString(), namedGraph, query);
		session.addKGQueryThread(queryID, runner);
		new Thread(runner, "KG_RUNNER (" + kg.getKgIri() + ")(" + queryID + ")").start();
		return exec;
	}
	
	public SPARQLQueryExecution startKGQuery(MwsxSession session, KnowledgeGraph kg, String namedGraph, SPARQLQuery query) throws IOException {
		KGStatus st = this.getKnowledgeGraphState(kg);
		if (st == null)
			throw new RuntimeException("Cannot determine the KG status");
		if (st.getStatus().equals("EMPTY")) {
			throw new RuntimeException("Do you really want to run a query over an empty KG?");
		}
		if (st.getStatus().equals("LOADING")) {
			throw new RuntimeException("KG model is currently loading, cannot run queries yet");
		}
		SPARQLQueryExecution exec = new SPARQLQueryExecution();
		exec.setQueryID(query.getQueryID());
		String kgSubPath = MwsxRepositoryManager.generateKGFolder(kg);
		Path path = Paths.get(this.kgHome + File.separator + kgSubPath + File.separator + KG_TDB_FOLDER_NAME);
		KGQueryRunner runner = new KGQueryRunner(kg, path.toString(), namedGraph, query);
		session.addKGQueryThread(query.getQueryID(), runner);
		new Thread(runner, "KG_RUNNER (" + kg.getKgIri() + ")(" + query.getQueryID() + ")").start();
		return exec;
	}
	
	public boolean stopKGQueryFromCatalog(MwsxSession session, KnowledgeGraph kg, String queryID) throws IOException {
		SPARQLQueryExecution exec = new SPARQLQueryExecution();
		exec.setQueryID(queryID);
		KGQueryRunner runner = session.getKGQueryThread(queryID);
		return (runner!= null ? runner.stop() : false);
	}
	
	public SPARQLResults getKGQueryResult(MwsxSession session, KnowledgeGraph kg, String queryID, int pageSize, int offset) {
		KGQueryRunner runner = session.getKGQueryThread(queryID);
		return runner.getResults(pageSize, offset);
	}

	public Set<String> getKGMentionedClasses(String kg, String namedGraph) {
		Set<String> classes = new HashSet<String>();
		String kgSubPath = MwsxRepositoryManager.generateKGFolder(kg);
		Path path = Paths.get(this.kgHome + File.separator + kgSubPath + File.separator + KG_TDB_FOLDER_NAME);
		Model model = (namedGraph == null 
				? TDBFactory.createDataset(path.toString()).getUnionModel() 
				: TDBFactory.createDataset(path.toString()).getNamedModel(namedGraph));
		Query q = QueryFactory.create("SELECT $X WHERE {$Y <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> $X}");
		
		QueryExecution qExec = QueryExecutionFactory.create(q, model);
		try {
			ResultSet rs = qExec.execSelect();
			while (rs.hasNext()) {
				QuerySolution sol = rs.next();
				RDFNode node = sol.get("X");
				classes.add(node.toString());
			}
		} finally {
			if (qExec != null) qExec.close();
		}
		model.close();
		return classes;
	}
	
	public Set<String> getKGMentionedInstances(String kg, String namedGraph) {
		Set<String> set = new HashSet<String>();
		String kgSubPath = MwsxRepositoryManager.generateKGFolder(kg);
		Path path = Paths.get(this.kgHome + File.separator + kgSubPath + File.separator + KG_TDB_FOLDER_NAME);
		Model model = (namedGraph == null 
				? TDBFactory.createDataset(path.toString()).getUnionModel() 
				: TDBFactory.createDataset(path.toString()).getNamedModel(namedGraph));
		Query q = QueryFactory.create("SELECT $X $Y $Z WHERE {$X $Y $Z}");
		
		QueryExecution qExec = QueryExecutionFactory.create(q, model);
		try {
			ResultSet rs = qExec.execSelect();
			while (rs.hasNext()) {
				QuerySolution sol = rs.next();
				RDFNode nodex = sol.get("X");
				RDFNode nodey = sol.get("Y");
				RDFNode nodez = sol.get("Z");
				if (nodex.isResource())
					set.add(nodex.asResource().getURI().toString());
				if (nodey.isResource())
					set.add(nodey.asResource().getURI().toString());
				if (nodez.isResource())
					set.add(nodez.asResource().getURI().toString());
			}
		} finally {
			if (qExec != null) qExec.close();
		}
		model.close();
		return set;
	}

	public Set<String> getKGNamedGraphs(KnowledgeGraph kg) {
		Set<String> named = new HashSet<String>();
		String kgSubPath = MwsxRepositoryManager.generateKGFolder(kg);
		Path path = Paths.get(this.kgHome + File.separator + kgSubPath + File.separator + KG_TDB_FOLDER_NAME);
		Iterator<String> names = TDBFactory.createDataset(path.toString()).listNames();
		while(names.hasNext()) {
			named.add(names.next());
		}
		return named;
	}

	public InstancePage getInstancePage(MwsxSession mwsxSession, KnowledgeGraph kg, String instanceIri, String namedGraph) {
		String kgSubPath = MwsxRepositoryManager.generateKGFolder(kg);
		Path path = Paths.get(this.kgHome + File.separator + kgSubPath + File.separator + KG_TDB_FOLDER_NAME);
		Model m = (namedGraph == null ? TDBFactory.createDataset(path.toString()).getUnionModel() : TDBFactory.createDataset(path.toString()).getNamedModel(namedGraph));
		KGUtilities kgu = new KGUtilities(m);
		return kgu.getInstancePage(instanceIri);
	}

	public ObjectPredicatePageType getObjectTypePage(MwsxSession mwsxSession, KnowledgeGraph kg, String namedGraph,
			String object, String predicate, String type, int page) {
		String kgSubPath = MwsxRepositoryManager.generateKGFolder(kg);
		Path path = Paths.get(this.kgHome + File.separator + kgSubPath + File.separator + KG_TDB_FOLDER_NAME);
		Model m = (namedGraph == null ? TDBFactory.createDataset(path.toString()).getUnionModel() : TDBFactory.createDataset(path.toString()).getNamedModel(namedGraph));
		KGUtilities kgu = new KGUtilities(m);
		return kgu.getObjectPredicatePageType(object, predicate, type, page);
	}

	public SubjectPredicatePageType getSubjectTypePage(MwsxSession mwsxSession, KnowledgeGraph kg, String namedGraph,
			String subject, String predicate, String type, int page) {
		String kgSubPath = MwsxRepositoryManager.generateKGFolder(kg);
		Path path = Paths.get(this.kgHome + File.separator + kgSubPath + File.separator + KG_TDB_FOLDER_NAME);
		Model m = (namedGraph == null ? TDBFactory.createDataset(path.toString()).getUnionModel() : TDBFactory.createDataset(path.toString()).getNamedModel(namedGraph));
		KGUtilities kgu = new KGUtilities(m);
		return kgu.getSubjectPredicatePageType(subject, predicate, type, page);
	}

	public Set<String> getKGInstancesForClass(String kgIri, String namedGraph, String classIri) {
		Set<String> instances = new HashSet<String>();
		Set<String> set = new HashSet<String>();
		String kgSubPath = MwsxRepositoryManager.generateKGFolder(kgIri);
		Path path = Paths.get(this.kgHome + File.separator + kgSubPath + File.separator + KG_TDB_FOLDER_NAME);
		Model model = (namedGraph == null 
				? TDBFactory.createDataset(path.toString()).getUnionModel() 
				: TDBFactory.createDataset(path.toString()).getNamedModel(namedGraph));
		Query q = QueryFactory.create("SELECT $X WHERE {$X <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <" + String.valueOf(classIri) + ">}");
		
		QueryExecution qExec = QueryExecutionFactory.create(q, model);
		try {
			ResultSet rs = qExec.execSelect();
			while (rs.hasNext()) {
				QuerySolution sol = rs.next();
				RDFNode nodex = sol.get("X");
				if (nodex.isResource())
					set.add(nodex.asResource().getURI().toString());				
			}
		} finally {
			if (qExec != null) qExec.close();
		}
		model.close();
		instances.addAll(set);
		return instances;
	}

	public FileInfo getApproximatedOntology(String name, String version, String format, boolean approximated) throws OWLOntologyCreationException, OWLOntologyStorageException, IOException {
		return getApproximatedOntologyVersionOwlFile(name, version, format, approximated);
	}
	
	public FileInfo getApproximatedOntologyVersionOwlFile(String name, String version, String format, boolean approximated) throws IOException, OWLOntologyCreationException, OWLOntologyStorageException {
		FileInfo f = new FileInfo();
		f.setFileName(ONTOLOGY_VERSION_OWL_FILE_NAME);
		String pathName = MwsxRepositoryManager.generateOntologyFolder(name);
		String versionPath = MwsxRepositoryManager.generateOntologyVersionFolder(version);
		Path ontoFilePath = Paths.get(mastroHome + File.separator + pathName + File.separator + versionPath
				+ File.separator + ONTOLOGY_VERSION_OWL_FILE_NAME);
		OWLOntology ontology = this.owlOntologyManager
				.loadOntologyFromOntologyDocument(new ByteArrayInputStream(Files.readAllBytes(ontoFilePath)));
		if (approximated) {
			if (format.trim().toLowerCase().equals("graphol"))
				throw new RuntimeException("Cannot produce Graphol version of the approximated ontology");
			List<OWLAxiom> tr = new LinkedList<>();
			List<OWLAxiom> rej = new LinkedList<>();
			List<OWLAxiom> app = new LinkedList<>();
			OWLOntology approx = OWL2QLPlusApproximator.getApproximatedOntology(ontology, tr, rej, app);
			ByteArrayOutputStream baos = new ByteArrayOutputStream();
			if (format.trim().toLowerCase().equals("functional syntax")) {
				approx.saveOntology(new FunctionalSyntaxDocumentFormat(), baos);
				f.setFileType("fss");
			}
			if (format.trim().toLowerCase().equals("rdf/xml")) {
				approx.saveOntology(new RDFXMLDocumentFormat(), baos);
				f.setFileType("xml");
			}
			if (format.trim().toLowerCase().equals("turtle")) {
				approx.saveOntology(new TurtleDocumentFormat(), baos);
				f.setFileType("turtle");
			}
			f.setContent(new String(java.util.Base64.getEncoder().encode(baos.toByteArray())));
		}
		else {
			ByteArrayOutputStream baos = new ByteArrayOutputStream();
			if (format.trim().toLowerCase().equals("graphol")) {
				Path grapholFilePath = Paths.get(mastroHome + File.separator + pathName + File.separator + versionPath
						+ File.separator + ONTOLOGY_VERSION_GRAPHOL_FILE_NAME);
				if (Files.exists(grapholFilePath)) {
					Files.copy(grapholFilePath, baos);
				}
				else
					throw new RuntimeException("Cannot find Graphol version of the ontology");
				f.setFileType("graphol");
			}
			else {
				if (format.trim().toLowerCase().equals("functional syntax")) {
					ontology.saveOntology(new FunctionalSyntaxDocumentFormat(), baos);
					f.setFileType("fss");
				}
				if (format.trim().toLowerCase().equals("rdf/xml")) {
					ontology.saveOntology(new RDFXMLDocumentFormat(), baos);
					f.setFileType("xml");
				}
				if (format.trim().toLowerCase().equals("turtle")) {
					ontology.saveOntology(new TurtleDocumentFormat(), baos);
					f.setFileType("turtle");
				}
			}
			f.setContent(new String(java.util.Base64.getEncoder().encode(baos.toByteArray())));
		}
		
		return f;
	}

	public MappingInfo createMapping(MwsxSession session, String name, String version, String create) throws JsonParseException, JsonMappingException, IOException, ParserConfigurationException, TransformerException {
		ObjectMapper om = new ObjectMapper();
		NewMappingFileInfo nmfi = om.readValue(java.util.Base64.getDecoder().decode(create.getBytes()), NewMappingFileInfo.class);
		DatabaseConnection _preExistingDatabaseConnection = null;
		if (nmfi.getDatabaseConnectionName() != null) {
			boolean found = false;
			for (DataSourceInfoEntry entry : this.getDataSourceInfoEntries(session.getUser())) {
				if (entry.getDataSourceUsername().equals(session.getUser().getName())) {
					if (entry.getId().equals(nmfi.getDatabaseConnectionName())) {
						_preExistingDatabaseConnection = new DatabaseConnection();
						_preExistingDatabaseConnection.setDbDriver(entry.getJdbcDriver());
						_preExistingDatabaseConnection.setDbPassword(entry.getJdbcPassword());
						_preExistingDatabaseConnection.setJdbcURL(entry.getJdbcUrl());
						_preExistingDatabaseConnection.setDbUser(entry.getJdbcUsername());
						_preExistingDatabaseConnection.setName(entry.getId());
						found = true;
						break;
					}
				}
			}
			if (!found)
				throw new RuntimeException("Cannot find database connection named " + nmfi.getDatabaseConnectionName() + " for user " + session.getUser().getName());
		}
		else {
			if (nmfi.getNewDatabaseConnection() != null) {
				_preExistingDatabaseConnection = nmfi.getNewDatabaseConnection(); 
				DataSourceInfoEntry dsinfo = new DataSourceInfoEntry();
				dsinfo.setDescription(nmfi.getNewDatabaseConnectionDescription());
				dsinfo.setDataSourceUsername(session.getUser().getName());
				dsinfo.setId(_preExistingDatabaseConnection.getName());
				dsinfo.setJdbcDriver(_preExistingDatabaseConnection.getDbDriver());
				dsinfo.setJdbcPassword(_preExistingDatabaseConnection.getDbPassword());
				dsinfo.setJdbcUrl(_preExistingDatabaseConnection.getJdbcURL());
				dsinfo.setJdbcUsername(_preExistingDatabaseConnection.getDbUser());
				this.postDataSourceInfoEntry(dsinfo);
			}
			else {
				throw new RuntimeException("No valid datasource specified for new mappings");
			}
		}
		String pathName = MwsxRepositoryManager.generateOntologyFolder(name);
		String versionPathName = MwsxRepositoryManager.generateOntologyVersionFolder(version);
		Mappings mappings = getMappings(name, version);
		String newMapId = nmfi.getId();
		for (Mapping m : mappings.getMappingList())
			if (m.getMappingID().equals(newMapId))
				throw new RuntimeException("Duplicated mapping ID " + newMapId);
		int count = mappings.getMappingList().size();
		String newMapFileName = MAPPING_FILE_NAME_TEMPLATE.replace("[COUNT]", "" + (count+1)).replace("[EXT]", "xml");
		
		String dsname = nmfi.getDatabaseConnectionName();
		Properties manager = new Properties();
		manager.put(MappingManager.DB_DRIVER, _preExistingDatabaseConnection.getDbDriver());
		manager.put(MappingManager.DB_PASS, _preExistingDatabaseConnection.getDbPassword());
		manager.put(MappingManager.DB_USERN, _preExistingDatabaseConnection.getDbUser());
		manager.put(MappingManager.DB_URL, _preExistingDatabaseConnection.getJdbcURL());
		Set<String> templates = new HashSet<>();
		templates.addAll(nmfi.getMappingTemplates());
		Map<String, String> prefixesMap = new HashMap<>();
		for (Prefix p : nmfi.getPrefixes()) {
			prefixesMap.put(p.getName(), p.getNamespace());
		}
		Document doc = MappingManager.createEmptyMappingXMLDocument(newMapId, version, nmfi.getDescription(), prefixesMap , templates, manager, dsname);
		TransformerFactory tf = TransformerFactory.newInstance();
	    Transformer transformer;
        transformer = tf.newTransformer();
         
        // Uncomment if you do not require XML declaration
        transformer.setOutputProperty(OutputKeys.OMIT_XML_DECLARATION, "yes");
        transformer.setOutputProperty(OutputKeys.INDENT, "yes");
        transformer.setOutputProperty("{http://xml.apache.org/xslt}indent-amount", "4");
         
        //A character stream that collects its output in a string buffer,
        //which can then be used to construct a string.
        StringWriter writer = new StringWriter();
 
        //transform document to string
        transformer.transform(new DOMSource(doc), new StreamResult(writer));
 
        String xmlString = writer.getBuffer().toString();  
        byte[] content = xmlString.getBytes();
	
		Path mappingFilePath = Paths.get(mastroHome + File.separator + pathName + File.separator + versionPathName
				+ File.separator + newMapFileName);
		Files.write(mappingFilePath, content);		
		Path mappingsFilePath = Paths.get(mastroHome + File.separator + pathName + File.separator + versionPathName
				+ File.separator + ONTOLOGY_VERSION_MAPPINGS_FILE_NAME);
		Mapping m = new Mapping();
		m.setFileName(newMapFileName);
		m.setFileType("xml");
		m.setMappingDate(System.currentTimeMillis());
		m.setMappingDescription(nmfi.getDescription());
		m.setMappingID(newMapId);
		m.setMappingOwner(session.getUser());
		m.setMappingVersion(nmfi.getVersion());
		m.setPrefixes(nmfi.getPrefixes());
		mappings.getMappingList().add(m);
		om.enable(SerializationFeature.INDENT_OUTPUT);
		om.writeValue(mappingsFilePath.toFile(), mappings);
		MappingInfo mi = new MappingInfo();
		mi.setMapping(m);
		mi.setMappingTemplates(nmfi.getMappingTemplates());
		List<DatabaseConnection> conns = new LinkedList<>();
		if (nmfi.getDatabaseConnectionName() == null)
			conns.add(nmfi.getNewDatabaseConnection());
		else
			conns.add(_preExistingDatabaseConnection);
		mi.setMappingDBConnections(conns);
		return mi;
	}
	
	public SQLView postViewDefinitions(String name, String version, String ID, SQLView view)
			throws ParsingException, PrefixManagerException, SparqlUCQLanguageException, ConstraintMalformedException,
			InclusionAssertionException, UnsupportedLanguageException, OntologyAlphabetException,
			UnrecognizedTypeException, OWLOntologyCreationException, IOException, SAXException, ClassNotFoundException,
			SQLException, DataLevelConfigurationException, ParserConfigurationException,
			PrimitiveViewMalformedException, MappingRewriterStructureException, MappingMalformedException,
			TermMappingMalformedException, TransformerException, JSQLParserException {
		Mapping map = this.getMapping(name, version, ID);
		String mapFileName = map.getFileName();
		String pathName = MwsxRepositoryManager.generateOntologyFolder(name);
		String versionPathName = MwsxRepositoryManager.generateOntologyVersionFolder(version);
		Path mappingFilePath = Paths.get(mastroHome + File.separator + pathName + File.separator + versionPathName
				+ File.separator + mapFileName);
		DOMParser parser = new DOMParser();
		parser.parse(mappingFilePath.toString());
		Document document = parser.getDocument();
		List<String> vars = extractVarsFromSQLCode(view.getSqlViewCode());
		document = MappingManager.addPrimitiveView(document, view.getSqlViewID(), vars, view.getSqlViewCode(), view.getSqlViewDescription());
		DOMSource source = new DOMSource(document);
		TransformerFactory transformerFactory = TransformerFactory.newInstance();
		Transformer transformer = transformerFactory.newTransformer();
		transformer.setOutputProperty(OutputKeys.INDENT, "yes");
		transformer.setOutputProperty("{http://xml.apache.org/xslt}indent-amount", "4");
		FileWriter writer = new FileWriter(mappingFilePath.toFile());
		StreamResult result = new StreamResult(writer);
		transformer.transform(source, result);
		MastroID mid = MastroID.getMastroID(name, version, ID);
		MwsxCacheManager.getCacheManager().refreshMappingManager(mid);
		return view;
	}
	
	public SQLView deleteViewDefinitions(String name, String version, String ID, String view_name)
			throws ParsingException, PrefixManagerException, SparqlUCQLanguageException, ConstraintMalformedException,
			InclusionAssertionException, UnsupportedLanguageException, OntologyAlphabetException,
			UnrecognizedTypeException, OWLOntologyCreationException, IOException, SAXException, ClassNotFoundException,
			SQLException, DataLevelConfigurationException, ParserConfigurationException,
			PrimitiveViewMalformedException, MappingRewriterStructureException, MappingMalformedException,
			TermMappingMalformedException, TransformerException, JSQLParserException {
		Mapping map = this.getMapping(name, version, ID);
		String mapFileName = map.getFileName();
		String pathName = MwsxRepositoryManager.generateOntologyFolder(name);
		String versionPathName = MwsxRepositoryManager.generateOntologyVersionFolder(version);
		Path mappingFilePath = Paths.get(mastroHome + File.separator + pathName + File.separator + versionPathName
				+ File.separator + mapFileName);
		DOMParser parser = new DOMParser();
		parser.parse(mappingFilePath.toString());
		Document document = parser.getDocument();
		document = MappingManager.deletePrimitiveView(document, view_name);
		DOMSource source = new DOMSource(document);
		TransformerFactory transformerFactory = TransformerFactory.newInstance();
		Transformer transformer = transformerFactory.newTransformer();
		transformer.setOutputProperty(OutputKeys.INDENT, "yes");
		transformer.setOutputProperty("{http://xml.apache.org/xslt}indent-amount", "4");
		FileWriter writer = new FileWriter(mappingFilePath.toFile());
		StreamResult result = new StreamResult(writer);
		transformer.transform(source, result);
		MastroID mid = MastroID.getMastroID(name, version, ID);
		MwsxCacheManager.getCacheManager().refreshMappingManager(mid);
		return new SQLView();
	}
	
	public SQLView putViewDefinitions(String name, String version, String ID, String view_name, SQLView view)
			throws ParsingException, PrefixManagerException, SparqlUCQLanguageException, ConstraintMalformedException,
			InclusionAssertionException, UnsupportedLanguageException, OntologyAlphabetException,
			UnrecognizedTypeException, OWLOntologyCreationException, IOException, SAXException, ClassNotFoundException,
			SQLException, DataLevelConfigurationException, ParserConfigurationException,
			PrimitiveViewMalformedException, MappingRewriterStructureException, MappingMalformedException,
			TermMappingMalformedException, TransformerException, JSQLParserException {
		if (!view_name.equals(view.getSqlViewID()))
			throw new RuntimeException("View name " + view_name + " does not match the name of SQLView passed: " + view.getSqlViewID());
		Mapping map = this.getMapping(name, version, ID);
		String mapFileName = map.getFileName();
		String pathName = MwsxRepositoryManager.generateOntologyFolder(name);
		String versionPathName = MwsxRepositoryManager.generateOntologyVersionFolder(version);
		Path mappingFilePath = Paths.get(mastroHome + File.separator + pathName + File.separator + versionPathName
				+ File.separator + mapFileName);
		DOMParser parser = new DOMParser();
		parser.parse(mappingFilePath.toString());
		Document document = parser.getDocument();
		List<String> vars = extractVarsFromSQLCode(view.getSqlViewCode());
		document = MappingManager.editPrimitiveView(document, view.getSqlViewID(), vars, view.getSqlViewCode(), view.getSqlViewDescription());
		DOMSource source = new DOMSource(document);
		TransformerFactory transformerFactory = TransformerFactory.newInstance();
		Transformer transformer = transformerFactory.newTransformer();
		transformer.setOutputProperty(OutputKeys.INDENT, "yes");
		transformer.setOutputProperty("{http://xml.apache.org/xslt}indent-amount", "4");
		FileWriter writer = new FileWriter(mappingFilePath.toFile());
		StreamResult result = new StreamResult(writer);
		transformer.transform(source, result);
		MastroID mid = MastroID.getMastroID(name, version, ID);
		MwsxCacheManager.getCacheManager().refreshMappingManager(mid);
		return view;
	}
	
	private List<String> extractVarsFromSQLCode(String sqlViewCode) throws JSQLParserException {
		List<String> v = MappingManager.getTargetAliasList(sqlViewCode);
		return v;
	}

	public MappingAssertion postMappingAssertion(String name, String version, String ID,
			NewMappingData data) throws JsonParseException, JsonMappingException, IOException, SAXException, TransformerException, ParsingException, OWLOntologyCreationException, ClassNotFoundException, PrefixManagerException, SparqlUCQLanguageException, ConstraintMalformedException, InclusionAssertionException, UnsupportedLanguageException, OntologyAlphabetException, UnrecognizedTypeException, SQLException, DataLevelConfigurationException, ParserConfigurationException, PrimitiveViewMalformedException, MappingRewriterStructureException, MappingMalformedException, TermMappingMalformedException, IRITemplateFormatException {
		Mapping map = this.getMapping(name, version, ID);
		String mapFileName = map.getFileName();
		String pathName = MwsxRepositoryManager.generateOntologyFolder(name);
		String versionPathName = MwsxRepositoryManager.generateOntologyVersionFolder(version);
		Path mappingFilePath = Paths.get(mastroHome + File.separator + pathName + File.separator + versionPathName
				+ File.separator + mapFileName);
		DOMParser parser = new DOMParser();
		parser.parse(mappingFilePath.toString());
		Document document = parser.getDocument();
		Entity entity = this.getOntologyEntity(name, version, data.getEntityID());
		MappingAssertion ma = new MappingAssertion();
		MappingHead head = new MappingHead();
		MappingBody body = new MappingBody();
		if (entity.getEntityType().equals(ENTITY_CLASS_TYPE)) {
			String id = "MAP_CL_" + UUID.randomUUID().toString();
			String conceptName = this.getOntologyEntity(name, version, data.getEntityID()).getEntityIRI();
			String template = data.getTemplate();
			String bodyViewName = data.getViewName();
			document = MappingManager.addSimpleConceptMapping(document, id, conceptName, template, bodyViewName);
			ma.setCurrentEntity(entity);
			ma.setId(id);
			ma.setMappingDescription(data.getDescription());
			head.setFirstArg(template);
			List<SQLView> _bodyFrom = new LinkedList<>();
			_bodyFrom.add(this.getViewDefinition(name, version, ID, bodyViewName));
			body.setBodyFrom(_bodyFrom );
			List<String> templateParams = MappingManager.getTemplatePathParam(template);
			String bodySelect = templateParams.get(0);
			for (int i = 1; i < templateParams.size(); i++)
				bodySelect += ", " + templateParams.get(i);
			body.setBodySelect(bodySelect);
		}
		else if (entity.getEntityType().equals(ENTITY_OP_TYPE)) {
			String id = "MAP_OP_" + UUID.randomUUID().toString();
			String roleName = this.getOntologyEntity(name, version, data.getEntityID()).getEntityIRI();
			String template = data.getTemplate();
			String rangeTemplate = data.getRangeTemplate();
			String bodyViewName = data.getViewName();
			document = MappingManager.addSimpleRoleMapping(document, id, roleName, template, rangeTemplate, bodyViewName);
			ma.setCurrentEntity(entity);
			ma.setId(id);
			ma.setMappingDescription(data.getDescription());
			head.setFirstArg(template);
			head.setSecondArg(rangeTemplate);
			List<SQLView> _bodyFrom = new LinkedList<>();
			_bodyFrom.add(this.getViewDefinition(name, version, ID, bodyViewName));
			body.setBodyFrom(_bodyFrom );
			List<String> templateParams = MappingManager.getTemplatePathParam(template);
			String bodySelect = templateParams.get(0);
			for (int i = 1; i < templateParams.size(); i++)
				bodySelect += ", " + templateParams.get(i);
			body.setBodySelect(bodySelect);
		}
		else if (entity.getEntityType().equals(ENTITY_DP_TYPE)) {
			String id = "MAP_DP_" + UUID.randomUUID().toString();
			String attributeName = this.getOntologyEntity(name, version, data.getEntityID()).getEntityIRI();
			String template = data.getTemplate();
			String rangeTemplate = data.getRangeTemplate();
			String bodyViewName = data.getViewName();
			document = MappingManager.addSimpleRoleMapping(document, id, attributeName, template, rangeTemplate, bodyViewName);
			ma.setCurrentEntity(entity);
			ma.setId(id);
			ma.setMappingDescription(data.getDescription());
			head.setFirstArg(template);
			head.setSecondArg(rangeTemplate);
			List<SQLView> _bodyFrom = new LinkedList<>();
			_bodyFrom.add(this.getViewDefinition(name, version, ID, bodyViewName));
			body.setBodyFrom(_bodyFrom );
			List<String> templateParams = MappingManager.getTemplatePathParam(template);
			String bodySelect = templateParams.get(0);
			for (int i = 1; i < templateParams.size(); i++)
				bodySelect += ", " + templateParams.get(i);
			body.setBodySelect(bodySelect);
		}
		else {
			throw new RuntimeException("Unrecognized entity type " + entity.getEntityType() + " for entity " + entity.getEntityIRI());
		}
		DOMSource source = new DOMSource(document);
		TransformerFactory transformerFactory = TransformerFactory.newInstance();
		Transformer transformer = transformerFactory.newTransformer();
		transformer.setOutputProperty(OutputKeys.INDENT, "yes");
		transformer.setOutputProperty("{http://xml.apache.org/xslt}indent-amount", "4");
		FileWriter writer = new FileWriter(mappingFilePath.toFile());
		StreamResult result = new StreamResult(writer);
		transformer.transform(source, result);
		MastroID mid = MastroID.getMastroID(name, version, ID);
		MwsxCacheManager.getCacheManager().refreshMappingManager(mid);
		return ma;
	}
	
	public MappingAssertion deleteMappingAssertion(String name, String version, String ID,
			String mapID) throws JsonParseException, JsonMappingException, IOException, SAXException, TransformerException, ParsingException, OWLOntologyCreationException, ClassNotFoundException, PrefixManagerException, SparqlUCQLanguageException, ConstraintMalformedException, InclusionAssertionException, UnsupportedLanguageException, OntologyAlphabetException, UnrecognizedTypeException, SQLException, DataLevelConfigurationException, ParserConfigurationException, PrimitiveViewMalformedException, MappingRewriterStructureException, MappingMalformedException, TermMappingMalformedException, IRITemplateFormatException {
		Mapping map = this.getMapping(name, version, ID);
		String mapFileName = map.getFileName();
		String pathName = MwsxRepositoryManager.generateOntologyFolder(name);
		String versionPathName = MwsxRepositoryManager.generateOntologyVersionFolder(version);
		Path mappingFilePath = Paths.get(mastroHome + File.separator + pathName + File.separator + versionPathName
				+ File.separator + mapFileName);
		DOMParser parser = new DOMParser();
		parser.parse(mappingFilePath.toString());
		Document document = parser.getDocument();
		document = MappingManager.deleteMappingAssertion(document, mapID);
		DOMSource source = new DOMSource(document);
		TransformerFactory transformerFactory = TransformerFactory.newInstance();
		Transformer transformer = transformerFactory.newTransformer();
		transformer.setOutputProperty(OutputKeys.INDENT, "yes");
		transformer.setOutputProperty("{http://xml.apache.org/xslt}indent-amount", "4");
		FileWriter writer = new FileWriter(mappingFilePath.toFile());
		StreamResult result = new StreamResult(writer);
		transformer.transform(source, result);
		MastroID mid = MastroID.getMastroID(name, version, ID);
		MwsxCacheManager.getCacheManager().refreshMappingManager(mid);
		return new MappingAssertion();
	}
	
	public MappingAssertion editMappingAssertion(String name, String version, String ID,
			String mapID, NewMappingData data) throws JsonParseException, JsonMappingException, IOException, SAXException, TransformerException, ParsingException, OWLOntologyCreationException, ClassNotFoundException, PrefixManagerException, SparqlUCQLanguageException, ConstraintMalformedException, InclusionAssertionException, UnsupportedLanguageException, OntologyAlphabetException, UnrecognizedTypeException, SQLException, DataLevelConfigurationException, ParserConfigurationException, PrimitiveViewMalformedException, MappingRewriterStructureException, MappingMalformedException, TermMappingMalformedException, IRITemplateFormatException {
		Mapping map = this.getMapping(name, version, ID);
		String mapFileName = map.getFileName();
		String pathName = MwsxRepositoryManager.generateOntologyFolder(name);
		String versionPathName = MwsxRepositoryManager.generateOntologyVersionFolder(version);
		Path mappingFilePath = Paths.get(mastroHome + File.separator + pathName + File.separator + versionPathName
				+ File.separator + mapFileName);
		DOMParser parser = new DOMParser();
		parser.parse(mappingFilePath.toString());
		Document document = parser.getDocument();
		document = MappingManager.deleteMappingAssertion(document, mapID);
		DOMSource source = new DOMSource(document);
		TransformerFactory transformerFactory = TransformerFactory.newInstance();
		Transformer transformer = transformerFactory.newTransformer();
		transformer.setOutputProperty(OutputKeys.INDENT, "yes");
		transformer.setOutputProperty("{http://xml.apache.org/xslt}indent-amount", "4");
		FileWriter writer = new FileWriter(mappingFilePath.toFile());
		StreamResult result = new StreamResult(writer);
		transformer.transform(source, result);
		MastroID mid = MastroID.getMastroID(name, version, ID);
		MwsxCacheManager.getCacheManager().refreshMappingManager(mid);
		MappingAssertion ma = this.postMappingAssertion(name, version, ID, data);
		return ma;
	}

	private SQLView getViewDefinition(String name, String version, String iD, String bodyViewName) throws ParsingException, OWLOntologyCreationException, ClassNotFoundException, PrefixManagerException, SparqlUCQLanguageException, ConstraintMalformedException, InclusionAssertionException, UnsupportedLanguageException, OntologyAlphabetException, UnrecognizedTypeException, IOException, SAXException, SQLException, DataLevelConfigurationException, ParserConfigurationException, PrimitiveViewMalformedException, MappingRewriterStructureException, MappingMalformedException, TermMappingMalformedException {
		SQLViews views = this.getViewDefinitions(name, version, iD);
		for (SQLView view : views.getSqlViews()) {
			if (view.getSqlViewID().equals(bodyViewName))
				return view;
		}
		throw new RuntimeException("Cannot find view with name " + bodyViewName);
	}

	public boolean postKGStoreFile(MwsxSession mwsxSession, FileInfo info) throws IOException {
		User user = mwsxSession.getUser();
		byte[] content = java.util.Base64.getDecoder().decode(info.getContent());
		KGStoreFileInfoEntry entry = new KGStoreFileInfoEntry();
		String newName = UUID.randomUUID().toString();
		entry.setFileName(newName);
		entry.setOriginalFileName(info.getFileName());
		entry.setTimestamp(System.currentTimeMillis());
		entry.setUserName(user.getName());
		Path path = Paths.get(this.repositoryManager.getKgStoreHome() + File.separator + newName);
		Files.write(path , content);
		ObjectMapper om = new ObjectMapper();
		Path pathSrc = Paths.get(this.repositoryManager.getKgStoreHome() + File.separator + KG_STORE_INFO_FILE_NAME);
		if (Files.exists(pathSrc)) {
			File src = pathSrc.toFile();
			KGStoreFileInfo storeInfo = om.readValue(src, KGStoreFileInfo.class);
			if (storeInfo.getFiles() != null) {
				storeInfo.getFiles().add(entry);
			}
			else {
				List<KGStoreFileInfoEntry> entries = new LinkedList<>();
				entries.add(entry);
				storeInfo.setFiles(entries);
			}
			om.enable(SerializationFeature.INDENT_OUTPUT);
			om.writeValue(src, storeInfo);
			return true;
		}
		else {
			File src = pathSrc.toFile();
			KGStoreFileInfo storeInfo = new KGStoreFileInfo();
			List<KGStoreFileInfoEntry> entries = new LinkedList<>();
			entries.add(entry);
			storeInfo.setFiles(entries);
			om.enable(SerializationFeature.INDENT_OUTPUT);
			om.writeValue(src, storeInfo);
			return true;
		}
	}
	
	public boolean deleteKGStoreFile(MwsxSession session, String fileName) throws JsonParseException, JsonMappingException, IOException {
		User user = session.getUser();
		File src = Paths.get(this.repositoryManager.getKgStoreHome() + File.separator + KG_STORE_INFO_FILE_NAME).toFile();
		ObjectMapper om = new ObjectMapper();
		KGStoreFileInfo storeInfo = om.readValue(src, KGStoreFileInfo.class);
		KGStoreFileInfoEntry removeEntry = null;
		List<KGStoreFileInfoEntry> entries = storeInfo.getFiles();
		List<KGStoreFileInfoEntry> newEntries = new LinkedList<>();
		for (KGStoreFileInfoEntry e : entries)
			if (e.getUserName().equals(user.getName())) {
				if (e.getFileName().equals(fileName)) {
					removeEntry = e;
				}
				else 
					newEntries.add(e);
			}
			else 
				newEntries.add(e);
		Path remove = Paths.get(this.repositoryManager.getKgStoreHome() + File.separator + removeEntry.getFileName());
		boolean removed = Files.deleteIfExists(remove);
		if (removed) {
			storeInfo.setFiles(newEntries);
			om.enable(SerializationFeature.INDENT_OUTPUT);
			om.writeValue(src, storeInfo);
		}
		return removed;
	}
	
	public List<KGStoreFileInfoEntry> getKGStoreFileEntries(MwsxSession session) throws JsonParseException, JsonMappingException, IOException {
		User user = session.getUser();
		List<KGStoreFileInfoEntry> allEntries = getKGStoreFileEntries();
		List<KGStoreFileInfoEntry> userEntries = new LinkedList<>();
		for (KGStoreFileInfoEntry entry : allEntries)
			if (entry.getUserName().equals(user.getName()))
				userEntries.add(entry);
		return userEntries;
	}
	
	public List<KGStoreFileInfoEntry> getKGStoreFileEntries() throws JsonParseException, JsonMappingException, IOException {
		List<KGStoreFileInfoEntry> entries = new LinkedList<>();
		Path pathSrc = Paths.get(this.repositoryManager.getKgStoreHome() + File.separator + KG_STORE_INFO_FILE_NAME);
		File src = pathSrc.toFile();
		if (!Files.exists(pathSrc))
			return entries;
		ObjectMapper om = new ObjectMapper();
		KGStoreFileInfo storeInfo = om.readValue(src, KGStoreFileInfo.class);
		if (storeInfo.getFiles() != null)
			return storeInfo.getFiles();
		else
			return entries;
	}	

	public KGStoreFileInfoEntry getKGStoreFileEntry(MwsxSession mwsxSession, String name) throws JsonParseException, JsonMappingException, IOException {
		List<KGStoreFileInfoEntry> entries = getKGStoreFileEntries(mwsxSession);
		for (KGStoreFileInfoEntry entry : entries)
			if (entry.getFileName().equals(name))
				return entry;
		return null;
	}

	public boolean postKGUploadFile(MwsxSession mwsxSession, FileInfo info, String iri) throws IOException {
		KnowledgeGraph kg = this.getKnowledgeGraph(iri);
		KnowledgeGraphFile kgf = new KnowledgeGraphFile();
		kgf.setFile(info);
		KnowledgeGraphDestination destination = new KnowledgeGraphDestination();
		destination.setDestination(iri);
		destination.setNamedGraph("NO_NAMED_GRAPH_SPECIFIED");
		kgf.setDestination(destination);
		String kgSubPath = MwsxRepositoryManager.generateKGFolder(kg);
		Path path = Paths.get(this.kgHome + File.separator + kgSubPath + File.separator + KG_MODELS_FOLDER_NAME + File.separator + info.getFileName());
		ObjectMapper om = new ObjectMapper();
		om.writeValue(path.toFile(), kgf);
		KnowledgeGraphFileInfo ninfo = new KnowledgeGraphFileInfo();
		ninfo.setFileName(info.getFileName());
		ninfo.setImported(false);ninfo.setImportingTime(-1);
		ninfo.setNumberOfTriples(-1);
		ninfo.setUploadDate(System.currentTimeMillis());
		Path pathModelInfoFile = Paths.get(this.kgHome + File.separator + kgSubPath + File.separator + KG_MODELS_FOLDER_NAME 
				+ File.separator  + KG_MODELS_INFO_FILE_NAME);
		if (!Files.exists(pathModelInfoFile)) {
			KnowledgeGraphFileInfos infos = new KnowledgeGraphFileInfos();
			List<KnowledgeGraphFileInfo> linfo = new LinkedList<>();
			linfo.add(ninfo);
			infos.setInfos(linfo);
			om.enable(SerializationFeature.INDENT_OUTPUT);
			om.writeValue(pathModelInfoFile.toFile(), infos);
		}
		else {
			KnowledgeGraphFileInfos infos = om.readValue(pathModelInfoFile.toFile(), KnowledgeGraphFileInfos.class);
			if (infos.getInfos() != null)
				infos.getInfos().add(ninfo);
			else {
				List<KnowledgeGraphFileInfo> linfo = new LinkedList<>();
				linfo.add(ninfo);
				infos.setInfos(linfo);
			}
			om.enable(SerializationFeature.INDENT_OUTPUT);
			om.writeValue(pathModelInfoFile.toFile(), infos);
		}
		return true;
	}

	public boolean putKGUploadImport(MwsxSession mwsxSession, KnowledgeGraphFileDestination fileDestination) throws IOException {
		List<String> filesToImport = fileDestination.getFileNames();
		KnowledgeGraphDestination kgd = fileDestination.getKgDestination();
		String iri = kgd.getDestination();
		String named = kgd.getNamedGraph();
		KnowledgeGraph kg = this.getKnowledgeGraph(iri);
		KGStatus st = this.getKnowledgeGraphState(kg);
		if (st == null)
			throw new RuntimeException("Cannot determine the KG status");
		if (st.getStatus().equals("LOADING")) {
			throw new RuntimeException("Cannot import new models while another import process is running");
		}
		String kgSubPath = MwsxRepositoryManager.generateKGFolder(kg);
		Path pathModelFolder = Paths.get(this.kgHome + File.separator + kgSubPath + File.separator + KG_MODELS_FOLDER_NAME);
		List<KnowledgeGraphFile> files = new LinkedList<>();
		List<String> realNames = new LinkedList<>();
		List<Path> filesInStoreForKG = Files.list(pathModelFolder).collect(Collectors.toList());
		ObjectMapper om = new ObjectMapper();
		for (int i=0 ; i < filesInStoreForKG.size(); i++) {
			Path act = filesInStoreForKG.get(i);
			if (!act.toFile().getName().equals("models.info")) {
				KnowledgeGraphFile kgf = om.readValue(Files.readAllBytes(act), KnowledgeGraphFile.class);
				if (filesToImport.contains(kgf.getFile().getFileName())) {
					realNames.add(act.toFile().getName());
					KnowledgeGraphDestination destination = new KnowledgeGraphDestination();
					destination.setDestination(iri);
					destination.setNamedGraph(named);
					kgf.setDestination(destination);
					files.add(kgf);
				}
			}
		}
		Path kgPath = Paths.get(this.kgHome + File.separator + kgSubPath);
		Path modelFolderPath = Paths.get(this.kgHome + File.separator + kgSubPath + File.separator + KG_MODELS_FOLDER_NAME);
		Path tdbFolderPath = Paths.get(this.kgHome + File.separator + kgSubPath + File.separator + KG_TDB_FOLDER_NAME);
		KGMultiFilesLoader multi = new KGMultiFilesLoader(files, realNames, kgPath.toString(), tdbFolderPath.toString(), modelFolderPath.toString());
		new Thread(multi, "KG_MULTI_FILES_LOADER").start();
		return true;
	}
	
	public boolean putKGUploadRemove(MwsxSession mwsxSession, KnowledgeGraphFileDestination fileDestination) throws IOException {
		List<String> filesToImport = fileDestination.getFileNames();
		KnowledgeGraphDestination kgd = fileDestination.getKgDestination();
		String iri = kgd.getDestination();
		String named = kgd.getNamedGraph();
		KnowledgeGraph kg = this.getKnowledgeGraph(iri);
		KGStatus st = this.getKnowledgeGraphState(kg);
		if (st == null)
			throw new RuntimeException("Cannot determine the KG status");
		if (st.getStatus().equals("LOADING")) {
			throw new RuntimeException("Cannot remove triples from models while another import/remove process is running");
		}
		String kgSubPath = MwsxRepositoryManager.generateKGFolder(kg);
		Path pathModelFolder = Paths.get(this.kgHome + File.separator + kgSubPath + File.separator + KG_MODELS_FOLDER_NAME);
		List<KnowledgeGraphFile> files = new LinkedList<>();
		List<String> realNames = new LinkedList<>();
		List<Path> filesInStoreForKG = Files.list(pathModelFolder).collect(Collectors.toList());
		ObjectMapper om = new ObjectMapper();
		for (int i=0 ; i < filesInStoreForKG.size(); i++) {
			Path act = filesInStoreForKG.get(i);
			if (!act.toFile().getName().equals("models.info")) {
				KnowledgeGraphFile kgf = om.readValue(Files.readAllBytes(act), KnowledgeGraphFile.class);
				if (filesToImport.contains(kgf.getFile().getFileName())) {
					realNames.add(act.toFile().getName());
					KnowledgeGraphDestination destination = new KnowledgeGraphDestination();
					destination.setDestination(iri);
					destination.setNamedGraph(named);
					kgf.setDestination(destination);
					files.add(kgf);
				}
			}
		}
		Path kgPath = Paths.get(this.kgHome + File.separator + kgSubPath);
		Path modelFolderPath = Paths.get(this.kgHome + File.separator + kgSubPath + File.separator + KG_MODELS_FOLDER_NAME);
		Path tdbFolderPath = Paths.get(this.kgHome + File.separator + kgSubPath + File.separator + KG_TDB_FOLDER_NAME);
		KGMultiFilesUnloader multi = new KGMultiFilesUnloader(files, realNames, kgPath.toString(), tdbFolderPath.toString(), modelFolderPath.toString());
		new Thread(multi, "KG_MULTI_FILES_UNLOADER").start();
		return true;
	}

	public List<KnowledgeGraphFileInfo> getKGUploadedFiles(MwsxSession mwsxSession, String iri) throws IOException {
		KnowledgeGraph kg = this.getKnowledgeGraph(iri);
		String kgSubPath = MwsxRepositoryManager.generateKGFolder(kg);
		Path pathModelInfoFile = Paths.get(this.kgHome + File.separator + kgSubPath + File.separator + KG_MODELS_FOLDER_NAME 
				+ File.separator  + KG_MODELS_INFO_FILE_NAME);
		ObjectMapper om = new ObjectMapper();
		if(Files.notExists(pathModelInfoFile)) return new LinkedList<KnowledgeGraphFileInfo>();
		KnowledgeGraphFileInfos infos = om.readValue(Files.readAllBytes(pathModelInfoFile), KnowledgeGraphFileInfos.class);
		return infos.getInfos();
	}

	public FileInfo exportConstructQueryResult(MwsxSession session, String name, String version,
			String mapID, String queryID) throws IOException {
		MastroID mid = MastroID.getMastroID(name, version, mapID);
		MastroAPI mastro = session.getMastroInstance(mid);
		boolean available = mastro.mtq_constructIsResultFileAvailable(queryID) == 1;
		if (available) {
			File results = mastro.mtq_constructGetResultFile(queryID);
			System.out.println(" -> " + results.getAbsolutePath());
			String content =  new String(Files.readAllBytes(Paths.get(results.getAbsolutePath())));
			System.out.println(" --> " + content);
			FileInfo info = new FileInfo();
			info.setFileName(results.getName());
			info.setFileType("N3");
			info.setContent(new String(java.util.Base64.getEncoder().encode(content.getBytes())));
			return info;
		}
		else
			throw new RuntimeException("Result file not available for construct query " + queryID);
	}

	public FileInfo downloadKnowledgeGraph(String iri, String namedGraph, String format, String fileName) throws IOException {
		FileInfo kgFile = new FileInfo();
		KnowledgeGraph kg = this.getKnowledgeGraph(iri);
		KGStatus st = this.getKnowledgeGraphState(kg);
		if (st == null)
			throw new RuntimeException("Cannot determine the KG status");
		if (st.getStatus().equals("EMPTY")) {
			throw new RuntimeException("Do you really want to run a query over an empty KG?");
		}
		if (st.getStatus().equals("LOADING")) {
			throw new RuntimeException("KG model is currently loading, cannot run queries yet");
		}
		String kgSubPath = MwsxRepositoryManager.generateKGFolder(kg);
		Path path = Paths.get(this.kgHome + File.separator + kgSubPath + File.separator + KG_TDB_FOLDER_NAME);
		Dataset dataset = TDBFactory.createDataset(path.toString());
		Model model = namedGraph == null ? dataset.getUnionModel() : dataset.getNamedModel(namedGraph);
		ByteArrayOutputStream baos = new ByteArrayOutputStream();
		if (format != null) 
			model.write(baos, format);
		else
			model.write(baos);
		String content = java.util.Base64.getEncoder().encodeToString(baos.toByteArray());
		kgFile.setContent(content);
		kgFile.setFileName(fileName != null ? fileName : kg.getKgTitle() + ".kg");
		kgFile.setFileType(format != null ? format : "DEFAULT_FILE_TYPE");
		return kgFile;
	}

	public boolean deleteKGRemoveFile(MwsxSession mwsxSession, String iri, List<String> files) throws IOException {
		KnowledgeGraph kg = this.getKnowledgeGraph(iri);
		KGStatus st = this.getKnowledgeGraphState(kg);
		if (st == null)
			throw new RuntimeException("Cannot determine the KG status");
		if (st.getStatus().equals("LOADING")) {
			throw new RuntimeException("Cannot delete files while importing triples into the KG");
		}
		String kgSubPath = MwsxRepositoryManager.generateKGFolder(kg);
		for (String file : files) {
			Path path = Paths.get(this.kgHome + File.separator + kgSubPath + File.separator 
					+ KG_MODELS_FOLDER_NAME + File.separator + file);
			Files.deleteIfExists(path);
		}
		
		ObjectMapper om = new ObjectMapper();
		Path pathModelInfoFile = Paths.get(this.kgHome + File.separator + kgSubPath + File.separator + KG_MODELS_FOLDER_NAME 
				+ File.separator  + KG_MODELS_INFO_FILE_NAME);
		KnowledgeGraphFileInfos infos = om.readValue(Files.readAllBytes(pathModelInfoFile), KnowledgeGraphFileInfos.class);
		List<KnowledgeGraphFileInfo> remove = new LinkedList<>();
		for (KnowledgeGraphFileInfo info : infos.getInfos()) {
			if (files.contains(info.getFileName()))
				remove.add(info);
		}
		List<KnowledgeGraphFileInfo> l = infos.getInfos();
		l.removeAll(remove);
		infos.setInfos(l);
		om.enable(SerializationFeature.INDENT_OUTPUT);
		om.writeValue(pathModelInfoFile.toFile(), infos);
		return true;
	}

	public boolean putKGUnionQueryOBDA(MwsxSession mwsxSession,
			KnowledgeGraphDestinationQueryOBDA queryOBDA, boolean uploadOnly) throws IOException {
		OBDAConstructResults source = queryOBDA.getSource();
		KnowledgeGraphDestination target = queryOBDA.getTarget();
		String iri = target.getDestination(); 
		KnowledgeGraph kg = this.getKnowledgeGraph(iri);
		KGStatus st = this.getKnowledgeGraphState(kg);
		if (st == null)
			throw new RuntimeException("Cannot determine the KG status");
		if (st.getStatus().equals("LOADING")) {
			throw new RuntimeException("Cannot import construct query result while importing other triples into the KG");
		}
		FileInfo results = null;
		try {
			results = exportConstructQueryResult(mwsxSession, 
				source.getSource().getOntologyID().getOntologyName(), 
				source.getSource().getOntologyID().getOntologyVersion(), 
				source.getSource().getMappingID(), 
				source.getExecution().getQueryID());
		}
		catch(Throwable t) {
			throw new RuntimeException("Cannot retrieve construct query results", t);
		}
		try {
			this.postKGUploadFile(mwsxSession, results, iri);
		}
		catch(Throwable t) {
			throw new RuntimeException("Cannot upload construct query result file", t);
		}
		try {
			if (!uploadOnly) {
				KnowledgeGraphFileDestination fileDestination = new KnowledgeGraphFileDestination();
				fileDestination.setKgDestination(target);
				List<String> files = new LinkedList<>();
				files.add(results.getFileName());
				fileDestination.setFileNames(files);
				this.putKGUploadImport(mwsxSession, fileDestination);
			}
		}
		catch(Throwable t) {
			throw new RuntimeException("Cannot import construct query result file into KG triple database", t);
		}
		return true;
	}
	
}
