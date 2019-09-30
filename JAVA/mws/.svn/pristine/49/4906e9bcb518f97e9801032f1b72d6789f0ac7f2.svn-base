package com.mwsx.engine;

import java.io.File;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.nio.charset.Charset;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import org.glassfish.jersey.internal.util.Base64;
import org.semanticweb.owlapi.apibinding.OWLManager;
import org.semanticweb.owlapi.model.IRI;
import org.semanticweb.owlapi.model.OWLAnnotation;
import org.semanticweb.owlapi.model.OWLAnnotationAssertionAxiom;
import org.semanticweb.owlapi.model.OWLAnnotationProperty;
import org.semanticweb.owlapi.model.OWLAxiom;
import org.semanticweb.owlapi.model.OWLClass;
import org.semanticweb.owlapi.model.OWLDataProperty;
import org.semanticweb.owlapi.model.OWLEntity;
import org.semanticweb.owlapi.model.OWLObjectProperty;
import org.semanticweb.owlapi.model.OWLOntology;
import org.semanticweb.owlapi.model.OWLOntologyCreationException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.mwsx.configuration.CustomApplication;
import com.mwsx.model.Entities;
import com.mwsx.model.Entity;
import com.mwsx.model.FileInfo;
import com.mwsx.model.HierarchyTree;
import com.mwsx.model.MappingAssertion;
import com.mwsx.model.OBDACatalog;
import com.mwsx.model.Ontology;
import com.mwsx.model.Participation;
import com.mwsx.model.SPARQLQuery;
import com.mwsx.model.SQLView;
import com.mwsx.model.SQLViews;
import com.mwsx.model.TreeNode;
import com.mwsx.model.User;
import com.mwsx.services.MwsxService;

public class TestMain {

	private static MwsxRepositoryManager repositoryManager;
	private static MwsxOntologyManager ontologyManager;
	private static MwsxSessionManager sessionManager;
	private static Thread sessionManagerThread;
	private static MwsxPermissionManager permissionManager;
	
	private static User user;
	private static MwsxSession session;

	public static void init() throws IOException {
		System.out.println("********************* STARTING APPLICATION MANAGER *********************");
		new CustomApplication();
		try {
			repositoryManager = MwsxRepositoryManager.getRepositoryManager();
			sessionManager = MwsxSessionManager.getSessionManager(repositoryManager.getMastroHome());
			permissionManager = MwsxPermissionManager.getPermissionManager(repositoryManager.getMastroHome());
			ontologyManager = MwsxOntologyManager.getOntologyManager();
			sessionManagerThread = new Thread(sessionManager);
			sessionManagerThread.start();
			sessionManager.setThread(sessionManagerThread);
			user = permissionManager.getUser("ciccio");
			session = sessionManager.createSession(user);
		} catch (IOException e) {
			throw new RuntimeException(e);
		}
	}
	
	public static void main(String[] args) throws IOException {
		init();
		String name = "Books";
		String version = "http://www.obdasystems.com/books/1.1";
		
		SPARQLQuery query = new SPARQLQuery();
		query.setQueryCode("THE CODE 4 - CORRETTA");
		query.setQueryDescription("THE DESCRIPTION 4 - CORRETTA");
		query.setQueryID("Q4");
		ontologyManager.putSPARQLQuery(session, name, version, query, "Q4" );
		
		OBDACatalog c = ontologyManager.getQueryCatalog(session, name, version);
		System.out.println(MwsxService.o2j(c));
		System.exit(0);
	}
	
	public static void main1(String[] args) throws Throwable {
		md5();
		
		if (true) return;
		testViews();		
		
		if (true) return;
		testMappings();
	}
	
	private static void md5() throws UnsupportedEncodingException, NoSuchAlgorithmException {
		String yourString = "La mia stringa da hashare";
		byte[] bytesOfMessage = yourString.getBytes("UTF-8");

		MessageDigest md = MessageDigest.getInstance("MD5");
		byte[] thedigest = md.digest(bytesOfMessage);
		String s = java.util.Base64.getEncoder().encodeToString(thedigest);
		System.out.println(new String(s));
	}

	static void testViews() throws Throwable {
		MwsxOntologyManager manager = getManager();
		SQLViews ass = manager.getViewDefinitions("NewOntology", "http://www.obdasystems.com/books/1.0", "76b0f02c-9ad9-43d2-9561-ae6631981eb8");
		for (SQLView m : ass.getSqlViews()) {
			System.out.println(m);
		}
	}
	
	static void testMappings() throws Throwable {
		MwsxOntologyManager manager = getManager();
		List<MappingAssertion> ass = manager.getMappingAssertionsByEntity("NewOntology", "http://www.obdasystems.com/books/1.0", "76b0f02c-9ad9-43d2-9561-ae6631981eb8", "OP_3");
		for (MappingAssertion m : ass) {
			ObjectMapper om = new ObjectMapper();
			om.enable(SerializationFeature.INDENT_OUTPUT);
			String j = om.writeValueAsString(m);
			System.out.println(j);
		}
	}
	
	static MwsxOntologyManager getManager() throws Throwable {
		System.out.println("================= INIT ===================");
		String MASTRO_HOME = System.getenv("MASTRO_HOME");
		if (MASTRO_HOME == null || MASTRO_HOME.trim().equals(""))
			throw new RuntimeException("Cannot find MASTRO_HOME environment variable: cannot initialize the system");
		MwsxOntologyManager manager = MwsxOntologyManager.getOntologyManager();
		return manager;
	}
	
	static void testDescriptions() throws OWLOntologyCreationException {
		String url = "/Users/mr/test-ontologies/test-labels.owl";
		File file = new File(url);
		OWLOntology ontology = OWLManager.createOWLOntologyManager().loadOntologyFromOntologyDocument(file);
		OWLAnnotationProperty prop = ontology.getOWLOntologyManager().getOWLDataFactory().getOWLAnnotationProperty(IRI.create("http://www.w3.org/2000/01/rdf-schema#comment"));
		for (OWLAnnotation annotation : ontology.getAnnotations()) {
			System.out.println("[" + annotation.getValue().asLiteral().get().getLang() + "] " + annotation.getValue().asLiteral().get().getLiteral());
			if (annotation.getProperty().equals(prop))
				System.out.println("   they matched!!!");
		}
		for (OWLClass clazz : ontology.getClassesInSignature()) {
			for (OWLAnnotationAssertionAxiom annotation : ontology.getAnnotationAssertionAxioms(clazz.getIRI())) {
				System.out.println("[" + annotation.getValue().asLiteral().get().getLang() + "] " + annotation.getValue().asLiteral().get().getLiteral());
				System.out.println(annotation.getAnnotation().getProperty().getIRI());
				System.out.println(annotation.getSubject());
				if (annotation.getProperty().equals(prop))
					System.out.println("   they matched!!!");
			}
		}
	}
	
//	static Entity testEntityGenerator(String id) throws OWLOntologyCreationException {
//		String url = "/home/mr/test-descriptions.owl";
//		File file = new File(url);
//		Entity entity = new Entity();
//		OWLOntology ontology = OWLManager.createOWLOntologyManager().loadOntologyFromOntologyDocument(file);
//		OWLAnnotationProperty labelProp = ontology.getOWLOntologyManager().getOWLDataFactory().getOWLAnnotationProperty("http://www.w3.org/2000/01/rdf-schema#label");
//		PrefixDocumentFormat pdf =  ontology.getFormat().asPrefixOWLDocumentFormat();
//		for (OWLClass clazz : ontology.classesInSignature()) {
//			boolean labelFound = false;
//			for (OWLAnnotationAssertionAxiom annotation : ontology.annotationAssertionAxioms(clazz.getIRI())) {
//				String value = annotation.getValue().asLiteral().get().getLiteral();
//				System.out.println(" --> " + annotation.annotations());
//				System.out.println(" --> " + annotation.getProperty().toString());
//				if (annotation.getProperty().equals(labelProp)) {
//					entity.setEntityLabel(value);
//					labelFound = true;
//				}
//				
//			}
//			if (!labelFound)
//				entity.setEntityLabel("");
//
//			IRI iri = clazz.getIRI();
//			entity.setEntityIRI(iri.toString());
//			entity.setEntityRemainder(iri.getRemainder().isPresent() ? iri.getRemainder().get() : "");
//			entity.setEntityPrefixIRI(pdf.getPrefixIRI(iri));
//			entity.setEntityID(id);
//		}
//		return entity;
//	}
	
	
	public static void testEquivDisj() throws OWLOntologyCreationException {
		String url = "/home/mr/test-equiv-disj.owl";
		File file = new File(url);
		OWLOntology ontology = OWLManager.createOWLOntologyManager().loadOntologyFromOntologyDocument(file);
		Entities entities = MwsxOntologyManager.extractEntities(ontology);
		ReasoningServices rs = new ReasoningServices(ontology, entities);
		OWLEntity entity1 = ontology.getOWLOntologyManager().getOWLDataFactory().getOWLClass(IRI.create("http://www.semanticweb.org/mr/test-disj-equiv#C1"));
		OWLEntity entity4 = ontology.getOWLOntologyManager().getOWLDataFactory().getOWLClass(IRI.create("http://www.semanticweb.org/mr/test-disj-equiv#D3"));
		OWLEntity entity2 = ontology.getOWLOntologyManager().getOWLDataFactory().getOWLObjectProperty(IRI.create("http://www.semanticweb.org/mr/test-disj-equiv#OP1"));
		OWLEntity entity3 = ontology.getOWLOntologyManager().getOWLDataFactory().getOWLDataProperty(IRI.create("http://www.semanticweb.org/mr/test-disj-equiv#DP1"));
		OWLEntity[] owlEntities = new OWLEntity[] {entity1, entity2, entity3, entity4};
		for (OWLEntity entity : owlEntities) {
			for(Entity en : rs.getEquivalentEntities(entity)) {
				System.out.println("EQUIV: " + en.getEntityIRI());
			}
			for(Entity en : rs.getDisjointEntities(entity)) {
				System.out.println("DISJ: " + en.getEntityIRI());
			}
			if (entity instanceof OWLClass) {
				for(Entity en : rs.getIndividuals((OWLClass) entity, ontology)) {
					System.out.println("   -> INDIVID: " + en.getEntityIRI());
				}
			}
		}
	}
	
	public static void testSomeValuesFrom() throws OWLOntologyCreationException {
		String url = "/home/mr/test-svf-nested-class.owl";
		File file = new File(url);
		OWLOntology ontology = OWLManager.createOWLOntologyManager().loadOntologyFromOntologyDocument(file);
		for (OWLAxiom ax : ontology.getAxioms()) {
			System.out.println(ax);
		}
		Entities entities = MwsxOntologyManager.extractEntities(ontology);
		ReasoningServices rs = new ReasoningServices(ontology, entities);
		for (OWLClass c : ontology.getClassesInSignature()) {
			Set<Participation> opPart = new HashSet<Participation>();
			Set<Participation> dpPart = new HashSet<Participation>();
			rs.getClassParticipations(c, opPart, dpPart);
			for (Participation p : opPart) {
				System.out.println("OPR: " + p.isInverse() + ", " + p.getProperty().getEntityRemainder() + ", " + p.getFiller().getEntityRemainder());
			}
			for (Participation p : dpPart) {
				System.out.println("DPR: " + p.isInverse() + ", " + p.getProperty().getEntityRemainder() + ", " + p.getFiller().getEntityRemainder());
			}
		}
	}
	
	static String[] encodings = new String[] {
			"Big5",
			"Big5-HKSCS",
			"CESU-8",
			"EUC-JP",
			"EUC-KR",
			"GB18030",
			"GB2312",
			"GBK",
			"IBM-Thai",
			"IBM00858",
			"IBM01140",
			"IBM01141",
			"IBM01142",
			"IBM01143",
			"IBM01144",
			"IBM01145",
			"IBM01146",
			"IBM01147",
			"IBM01148",
			"IBM01149",
			"IBM037",
			"IBM1026",
			"IBM1047",
			"IBM273",
			"IBM277",
			"IBM278",
			"IBM280",
			"IBM284",
			"IBM285",
			"IBM290",
			"IBM297",
			"IBM420",
			"IBM424",
			"IBM437",
			"IBM500",
			"IBM775",
			"IBM850",
			"IBM852",
			"IBM855",
			"IBM857",
			"IBM860",
			"IBM861",
			"IBM862",
			"IBM863",
			"IBM864",
			"IBM865",
			"IBM866",
			"IBM868",
			"IBM869",
			"IBM870",
			"IBM871",
			"IBM918",
			"ISO-2022-CN",
			"ISO-2022-JP",
			"ISO-2022-JP-2",
			"ISO-2022-KR",
			"ISO-8859-1",
			"ISO-8859-13",
			"ISO-8859-15",
			"ISO-8859-2",
			"ISO-8859-3",
			"ISO-8859-4",
			"ISO-8859-5",
			"ISO-8859-6",
			"ISO-8859-7",
			"ISO-8859-8",
			"ISO-8859-9",
			"JIS_X0201",
			"JIS_X0212-1990",
			"KOI8-R",
			"KOI8-U",
			"Shift_JIS",
			"TIS-620",
			"US-ASCII",
			"UTF-16",
			"UTF-16BE",
			"UTF-16LE",
			"UTF-32",
			"UTF-32BE",
			"UTF-32LE",
			"UTF-8",
			"windows-1250",
			"windows-1251",
			"windows-1252",
			"windows-1253",
			"windows-1254",
			"windows-1255",
			"windows-1256",
			"windows-1257",
			"windows-1258",
			"windows-31j",
			"x-Big5-HKSCS-2001",
			"x-Big5-Solaris",
			"x-COMPOUND_TEXT",
			"x-euc-jp-linux",
			"x-EUC-TW",
			"x-eucJP-Open",
			"x-IBM1006",
			"x-IBM1025",
			"x-IBM1046",
			"x-IBM1097",
			"x-IBM1098",
			"x-IBM1112",
			"x-IBM1122",
			"x-IBM1123",
			"x-IBM1124",
			"x-IBM1166",
			"x-IBM1364",
			"x-IBM1381",
			"x-IBM1383",
			"x-IBM300",
			"x-IBM33722",
			"x-IBM737",
			"x-IBM833",
			"x-IBM834",
			"x-IBM856",
			"x-IBM874",
			"x-IBM875",
			"x-IBM921",
			"x-IBM922",
			"x-IBM930",
			"x-IBM933",
			"x-IBM935",
			"x-IBM937",
			"x-IBM939",
			"x-IBM942",
			"x-IBM942C",
			"x-IBM943",
			"x-IBM943C",
			"x-IBM948",
			"x-IBM949",
			"x-IBM949C",
			"x-IBM950",
			"x-IBM964",
			"x-IBM970",
			"x-ISCII91",
			"x-ISO-2022-CN-CNS",
			"x-ISO-2022-CN-GB",
			"x-iso-8859-11",
			"x-JIS0208",
			"x-JISAutoDetect",
			"x-Johab",
			"x-MacArabic",
			"x-MacCentralEurope",
			"x-MacCroatian",
			"x-MacCyrillic",
			"x-MacDingbat",
			"x-MacGreek",
			"x-MacHebrew",
			"x-MacIceland",
			"x-MacRoman",
			"x-MacRomania",
			"x-MacSymbol",
			"x-MacThai",
			"x-MacTurkish",
			"x-MacUkraine",
			"x-MS932_0213",
			"x-MS950-HKSCS",
			"x-MS950-HKSCS-XP",
			"x-mswin-936",
			"x-PCK",
			"x-SJIS_0213",
			"x-UTF-16LE-BOM",
			"X-UTF-32BE-BOM",
			"X-UTF-32LE-BOM",
			"x-windows-50220",
			"x-windows-50221",
			"x-windows-874",
			"x-windows-949",
			"x-windows-950",
			"x-windows-iso2022jp"	
	};
	
	public static void main2(String[] args) throws OWLOntologyCreationException, IOException {
		Path p1 = Paths.get("/opt/mastro-home/ONTO_64369290/VERSION_2053947464/ontology.owl");
		String s1 = new String(java.util.Base64.getEncoder().encodeToString(Files.readAllBytes(p1)));
		System.out.println(s1);
		
		if (true) return;
//		SortedMap<String, Charset> r = Charset.availableCharsets();
//		for (String k : r.keySet())
//			System.out.println("\"" + k + "\",");
//		
//		
//		if (true) return;
		
		for (String enc : encodings) {
			System.out.println("Trying " + enc);
			try {
				Path p = Paths.get("/opt/mastro-home/ONTO_64369290/VERSION_2053947464/ontology.owl");
				String s = new String(Base64.encodeAsString(new String(Files.readAllBytes(p),Charset.forName(enc))));
				System.out.println("SUCCEEDED!!!");
			}
			catch(Throwable t) {
				t.printStackTrace();
			}
		}
//		List<String> content = Files.readAllLines(p);
//		System.out.println(content.size());
//		int c1 = 0;
//		int e = 0;
//		for (String s : content) {
//			String l = "";
//			c1++;
//			try {
//				l = new String(Base64.encodeAsString(s));				
//			}
//			catch(Throwable t) {
//				e++;
//				for (int i=0; i < s.length() / 10; i++) {
//					String split = s.substring(i*10, i*10 + 10);
//					String ll = "";
//					try {
//						ll = new String(Base64.encodeAsString(split));
//					}
//					catch(Throwable t1) {
//						System.out.println(" ====================== " + i + " ========================== ");
//						System.out.println(split);
//					}
//				}
//				System.out.println("-------------------------------- " + c1 + " --------------------------------------------------");
//				System.out.println(s.length());
//				System.out.println(s.getBytes().length);
//				System.out.println(s);
//			}
//		}
//		System.out.println(c1);
//		System.out.println(e);
		
		
		if (true) return;
		testSomeValuesFrom();
		
		if (true) return;
		testEquivDisj();
		
		if (true) return;
		testDescriptions();
		
		if (true) return;
		testDescriptions();
		
		if (true) return;
		String url = "/home/mr/eclipse-workspace/owl2sql/src/main/resources/test/abcde2.owl";
		String target = "/home/mr/verinfo.json";
		String targetOnto = "/home/mr/onto.json";
		
		FileInfo info = new FileInfo();
		info.setContent(Base64.encodeAsString(Files.readAllBytes(Paths.get(url))));
		info.setFileName("ontology.owl");
		info.setFileType("owl");
		
		Ontology onto = new Ontology();
		onto.setOntologyDescription("TEST SENDING ONTOLOGY FROM CURL CALLS");
		onto.setOntologyID("VIA_CURL");
		User ciccio = new User();
		ciccio.setName("ciccio");
		onto.setOntologyOwner(ciccio);
		
		ObjectMapper om = new ObjectMapper();
		om.writeValue(Paths.get(target).toFile(), info);
		om.writeValue(Paths.get(targetOnto).toFile(), onto);
		
		if (true) return;
		File file = new File(url);
		OWLOntology ontology = OWLManager.createOWLOntologyManager().loadOntologyFromOntologyDocument(file);
		ReasoningServices reasoning = new ReasoningServices(ontology, null);
		for(OWLClass c : reasoning.getRootClasses()) {
			System.out.println(c);
			System.out.println(reasoning.getSubClasses(c));
		}
		System.out.println();
		for(OWLObjectProperty c : reasoning.getRootObjectProperties()) {
			System.out.println(c);
			System.out.println(reasoning.getSubObjectProperties(c));
		}
		System.out.println();
		for(OWLDataProperty c : reasoning.getRootDataProperties()) {
			System.out.println(c);
			System.out.println(reasoning.getSubDataProperties(c));
		}
		System.out.println();
		HierarchyTree d = reasoning.buildHierarchyTree(ontology);
		TreeNode nodeClasses = d.getClassTree();
		TreeNode nodeOP = d.getObjectPropertyTree();
		TreeNode nodeDP = d.getDataPropertyTree();
		String indent = "  ";
		printTree(nodeClasses, indent);
		printTree(nodeOP, indent);
		printTree(nodeDP, indent);
	}

	private static void printTree(TreeNode node, String indent) {
		System.out.println(indent + " + " + node.getEntity().getEntityIRI());
		indent = indent + "  ";
		for (TreeNode child : node.getChildren())
			printTree(child, indent);
	}

}
