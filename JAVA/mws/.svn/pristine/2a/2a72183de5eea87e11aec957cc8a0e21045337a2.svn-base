package com.mwsx.test;

import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.lang.reflect.Method;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.HashSet;
import java.util.LinkedList;
import java.util.List;
import java.util.Set;

import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;

import org.apache.http.HttpStatus;
import org.xml.sax.SAXException;

import com.fasterxml.jackson.core.JsonGenerationException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.mwsx.configuration.AuthenticationFilter;
import com.mwsx.engine.MwsxPermissionManager;
import com.mwsx.engine.MwsxRepositoryManager;
import com.mwsx.model.FileInfo;
import com.mwsx.model.OBDARunQueryInstance;
import com.mwsx.model.Ontology;
import com.mwsx.model.OntologyVersion;
import com.mwsx.model.SPARQLQuery;
import com.mwsx.model.User;

import it.uniroma1.dis.mastro.rdf.RDFUtilities;
import it.uniroma1.dis.quonto.core.datasourcemanager.DataSourceInfo;
import it.uniroma1.dis.quonto.core.datasourcemanager.DataSourceInfoEntry;
import it.uniroma1.dis.quonto.mapping.exceptions.MappingFileMalformedException;

public class Utils {
	
	public static List<String> getTemplateParams(String path) {
		List<String> map = new LinkedList<String>();
		int start = path.indexOf("{");
		int end = path.indexOf("}");
		while(start != -1 && end != -1) {
			String param = path.substring(start+1, end);
			map.add(param);
			path = path.substring(end+1);
			start = path.indexOf("{");
			end = path.indexOf("}");
		}
		return map;
	}

	public static Set<ResourceModel> listPath() throws ClassNotFoundException {
		Class<?> s =  Class.forName("com.mwsx.services.MwsxService");
		Set<ResourceModel> res = new HashSet<ResourceModel>();
		for (Method method : s.getMethods()) {
			if (method.isAnnotationPresent(Path.class)) {
				ResourceModel rmod = new ResourceModel();
				Path path = method.getAnnotation(Path.class);
				rmod.path = path.value();
				rmod.templateParams = getTemplateParams(rmod.path);
				rmod.javaMethodName = method.getName();
				if (method.isAnnotationPresent(GET.class)) {
					rmod.isGetSupported = true;
				}
				if (method.isAnnotationPresent(POST.class)) {
					rmod.isPostSupported = true;
				}
				if (method.isAnnotationPresent(PUT.class)) {
					rmod.isPutSupported = true;
				}
				if (method.isAnnotationPresent(DELETE.class)) {
					rmod.isDeleteSupported = true;
				}
				if (rmod.isDeleteSupported || rmod.isGetSupported || rmod.isPostSupported || rmod.isPutSupported) {
					res.add(rmod);
					System.out.println(rmod);
				}				
			}			
		}
		return res;
	}
	
	public static FileInfo getFileInfo(String path, String name, String type) throws IOException {
		FileInfo f = new FileInfo();
		byte[] content = Files.readAllBytes(Paths.get(path));
		f.setContent(java.util.Base64.getEncoder().encodeToString(content));
		f.setFileName(name);
		f.setFileType(type);
		return f;
	}
	
//	String urlParameters  = "param1=a&param2=b&param3=c";
//	byte[] postData       = urlParameters.getBytes( StandardCharsets.UTF_8 );
//	int    postDataLength = postData.length;
//	String request        = "http://example.com/index.php";
//	URL    url            = new URL( request );
//	HttpURLConnection conn= (HttpURLConnection) url.openConnection();           
//	conn.setDoOutput( true );
//	conn.setInstanceFollowRedirects( false );
//	conn.setRequestMethod( "POST" );
//	conn.setRequestProperty( "Content-Type", "application/x-www-form-urlencoded"); 
//	conn.setRequestProperty( "charset", "utf-8");
//	conn.setRequestProperty( "Content-Length", Integer.toString( postDataLength ));
//	conn.setUseCaches( false );
//	try( DataOutputStream wr = new DataOutputStream( conn.getOutputStream())) {
//	   wr.write( postData );
//	}
	
	public static int makeWebCall(String address, String method, Object body, HashMap<String, String> inputHeaders, HashMap<String, String> outputHeaders, HashMap<String, String> response) throws IOException {
		if (response != null)
			response.remove("content");
		method = method.toUpperCase();
		URL url = new URL(address);
		HttpURLConnection conn = (HttpURLConnection) url.openConnection();
		conn.setRequestMethod(method);
		for (String header : inputHeaders.keySet()) {
			conn.setRequestProperty(header, inputHeaders.get(header));
		}
		if (!method.equals("GET")) {
			conn.setRequestProperty("Accept", "application/json");
			if (body != null) {
				conn.setDoOutput( true );
				String contentType;
				if (body instanceof String) {
					contentType = "application/text";
				}
				else {
					contentType = "application/json";
				}
				conn.setRequestProperty( "Content-Type", contentType); 
				conn.setRequestProperty( "charset", "utf-8");
				DataOutputStream wr = new DataOutputStream( conn.getOutputStream());
				ObjectMapper om = new ObjectMapper();
				om.enable(SerializationFeature.INDENT_OUTPUT);
				om.writeValue(wr, body);
			}
		}		
		int httpCode = conn.getResponseCode();
		if (httpCode == HttpStatus.SC_OK) {
			for (String header : conn.getHeaderFields().keySet()) {
				List<String> values = conn.getHeaderFields().get(header);
				if (header != null && values.size() > 0)
					outputHeaders.put(header, values.get(0));
			}
			BufferedReader reader = new BufferedReader(new InputStreamReader(conn.getInputStream()));
			String output = "";
			String line;
			while((line = reader.readLine()) != null) {
				output += line;
			}
			response.put("content", output);
			return HttpStatus.SC_OK;			
		}
		else
			return httpCode;
	}
	
	public static String BASE_URL = "http://localhost:8080/mws/rest/mwsx";//"https://obdatest.dis.uniroma1.it:8080/mws-dev/rest/mwsx";
	public static String USER = "santaroni";
	public static String PASSWORD = "ronconelli";
	
	public static String login(String user, String password) throws IOException {
		HashMap<String, String> inHead = new HashMap<String, String>();
		inHead.put("Authorization", "Basic " + java.util.Base64.getEncoder().encodeToString(new String(user + ":" + password).getBytes()));
		HashMap<String, String> outHead = new HashMap<String, String>();
		HashMap<String, String> response = new HashMap<String, String>();
		int code = makeWebCall(BASE_URL + "/login", "get", null, inHead, outHead, response);
		System.out.println(code);
		System.out.println(response.get("content"));
		for(String header : outHead.keySet()) {
			if (header.equals(AuthenticationFilter.X_MONOLITH_SESSION_ID)) {
				return outHead.get(AuthenticationFilter.X_MONOLITH_SESSION_ID);
			}
		}
		throw new RuntimeException("Cannot login");
	}
	
	public static int deleteAllOntologies(String sessionId) throws IOException {
		HashMap<String, String> inHead = new HashMap<String, String>();
		inHead.put(AuthenticationFilter.X_MONOLITH_SESSION_ID, sessionId);
		HashMap<String, String> outHead = new HashMap<String, String>();
		HashMap<String, String> response = new HashMap<String, String>();
		return makeWebCall(BASE_URL + "/owlOntology", "DELETE", null, inHead, outHead, response);
	}
	
	
	public static int createOntology(String sessionId, String name, String description) throws IOException {
		User user = MwsxPermissionManager.getPermissionManager(
				MwsxRepositoryManager.getRepositoryManager().getMastroHome()).getUser(USER);
		Ontology o = new Ontology();
		o.setOntologyID(name);
		o.setOntologyDate(System.currentTimeMillis());
		o.setOntologyVersions(new LinkedList<OntologyVersion>());
		o.setOntologyOwner(user);
		o.setOntologyDescription(description);
		HashMap<String, String> inputHeaders = new HashMap<String, String>();
		inputHeaders.put(AuthenticationFilter.X_MONOLITH_SESSION_ID, sessionId);
		HashMap<String, String> outputHeaders = new HashMap<String, String>();
		HashMap<String, String> response = new HashMap<String, String>();
		String address = BASE_URL + "/owlOntology";
		return makeWebCall(address, "POST", o, inputHeaders, outputHeaders, response);
	}
	
	public static int createOntologyVersion(String sessionId, String name, FileInfo o) throws IOException {
		HashMap<String, String> inputHeaders = new HashMap<String, String>();
		inputHeaders.put(AuthenticationFilter.X_MONOLITH_SESSION_ID, sessionId);
		HashMap<String, String> outputHeaders = new HashMap<String, String>();
		HashMap<String, String> response = new HashMap<String, String>();
		String address = BASE_URL + "/owlOntology/" + name;
		return makeWebCall(address, "POST", o, inputHeaders, outputHeaders, response);
	}
	
	public static int createOntologyVersionMapping(String sessionId, String name, String version, FileInfo o) throws IOException {
		HashMap<String, String> inputHeaders = new HashMap<String, String>();
		inputHeaders.put(AuthenticationFilter.X_MONOLITH_SESSION_ID, sessionId);
		HashMap<String, String> outputHeaders = new HashMap<String, String>();
		HashMap<String, String> response = new HashMap<String, String>();
		String address = BASE_URL + "/owlOntology/" + name + "/version/mapping?version=" + URLEncoder.encode(version, "UTF-8");
		return makeWebCall(address, "POST", o, inputHeaders, outputHeaders, response);
	}
	
	public static int createOntologyVersionMappingCheck(String sessionId, String name, String version, FileInfo o, HashMap<String, String> response) throws IOException {
		HashMap<String, String> inputHeaders = new HashMap<String, String>();
		inputHeaders.put(AuthenticationFilter.X_MONOLITH_SESSION_ID, sessionId);
		HashMap<String, String> outputHeaders = new HashMap<String, String>();
		String address = BASE_URL + "/owlOntology/" + name + "/version/mapping?version=" + URLEncoder.encode(version, "UTF-8") + "&check=true";
		return makeWebCall(address, "POST", o, inputHeaders, outputHeaders, response);
	}
	
	public static int createQuery(String sessionId, String name, String version, SPARQLQuery q) throws IOException {
		HashMap<String, String> inputHeaders = new HashMap<String, String>();
		inputHeaders.put(AuthenticationFilter.X_MONOLITH_SESSION_ID, sessionId);
		HashMap<String, String> outputHeaders = new HashMap<String, String>();
		HashMap<String, String> response = new HashMap<String, String>();
		String address = BASE_URL + "/owlOntology/" + name + "/version/query?version=" + URLEncoder.encode(version, "UTF-8");
		return makeWebCall(address, "POST", q, inputHeaders, outputHeaders, response);
	}
	
	public static int updateQuery(String sessionId, String name, String version, SPARQLQuery q) throws IOException {
		HashMap<String, String> inputHeaders = new HashMap<String, String>();
		inputHeaders.put(AuthenticationFilter.X_MONOLITH_SESSION_ID, sessionId);
		HashMap<String, String> outputHeaders = new HashMap<String, String>();
		HashMap<String, String> response = new HashMap<String, String>();
		String address = BASE_URL + "/owlOntology/" + name + "/version/query/" + q.getQueryID() + "?version=" + URLEncoder.encode(version, "UTF-8");
		return makeWebCall(address, "PUT", q, inputHeaders, outputHeaders, response);
	}
	
	public static int deleteQuery(String sessionId, String name, String version, SPARQLQuery q) throws IOException {
		HashMap<String, String> inputHeaders = new HashMap<String, String>();
		inputHeaders.put(AuthenticationFilter.X_MONOLITH_SESSION_ID, sessionId);
		HashMap<String, String> outputHeaders = new HashMap<String, String>();
		HashMap<String, String> response = new HashMap<String, String>();
		String address = BASE_URL + "/owlOntology/" + name + "/version/query/" + q.getQueryID() + "?version=" + URLEncoder.encode(version, "UTF-8");
		return makeWebCall(address, "DELETE", q, inputHeaders, outputHeaders, response);
	}
	
	public static int startMastro(String sessionId, String name, String version, String mapID) throws IOException {
		HashMap<String, String> inputHeaders = new HashMap<String, String>();
		inputHeaders.put(AuthenticationFilter.X_MONOLITH_SESSION_ID, sessionId);
		HashMap<String, String> outputHeaders = new HashMap<String, String>();
		HashMap<String, String> response = new HashMap<String, String>();
		String address = BASE_URL + "/owlOntology/" + name + "/version/mapping/" + mapID + "/instance?version=" + URLEncoder.encode(version, "UTF-8");
		return makeWebCall(address, "POST", null, inputHeaders, outputHeaders, response);
	}
	
	public static int startQuery(String sessionId, String name, String version, String mapID, String queryID, OBDARunQueryInstance rqi) throws IOException {
		HashMap<String, String> inputHeaders = new HashMap<String, String>();
		inputHeaders.put(AuthenticationFilter.X_MONOLITH_SESSION_ID, sessionId);
		HashMap<String, String> outputHeaders = new HashMap<String, String>();
		HashMap<String, String> response = new HashMap<String, String>();
		String address = BASE_URL + "/owlOntology/" + name + "/version/mapping/" + mapID + "/query/" 
				+ queryID + "/start?version=" + URLEncoder.encode(version, "UTF-8") + "&reasoning=true";
		int res =  makeWebCall(address, "POST", null, inputHeaders, outputHeaders, response);
		System.out.println("--\n" + response.get("content") + "\n--");
		ObjectMapper om = new ObjectMapper();
		OBDARunQueryInstance ret = om.readValue(response.get("content").getBytes(), OBDARunQueryInstance.class);
		rqi.setExecutionId(ret.getExecutionId());
		return res;
	}
	
	public static int startConstructQueryFromCatalog(String sessionId, String name, String version, String mapID, String queryID, OBDARunQueryInstance rqi) throws IOException {
		HashMap<String, String> inputHeaders = new HashMap<String, String>();
		inputHeaders.put(AuthenticationFilter.X_MONOLITH_SESSION_ID, sessionId);
		HashMap<String, String> outputHeaders = new HashMap<String, String>();
		HashMap<String, String> response = new HashMap<String, String>();
		String address = BASE_URL + "/owlOntology/" + name + "/version/mapping/" + mapID + "/cquery/" 
				+ queryID + "/start?version=" + URLEncoder.encode(version, "UTF-8");
		int res =  makeWebCall(address, "POST", null, inputHeaders, outputHeaders, response);
		System.out.println("--\n" + response.get("content") + "\n--");
		ObjectMapper om = new ObjectMapper();
		OBDARunQueryInstance ret = om.readValue(response.get("content").getBytes(), OBDARunQueryInstance.class);
		rqi.setExecutionId(ret.getExecutionId());
		rqi.setSparql(ret.getSparql());
		return res;
	}
	
	public static int startConstructQuery(String sessionId, String name, String version, String mapID, SPARQLQuery query, OBDARunQueryInstance rqi) throws IOException {
		HashMap<String, String> inputHeaders = new HashMap<String, String>();
		inputHeaders.put(AuthenticationFilter.X_MONOLITH_SESSION_ID, sessionId);
		HashMap<String, String> outputHeaders = new HashMap<String, String>();
		HashMap<String, String> response = new HashMap<String, String>();
		String address = BASE_URL + "/owlOntology/" + name + "/version/mapping/" + mapID + "/cquery/" 
				+ "start?version=" + URLEncoder.encode(version, "UTF-8");
		int res =  makeWebCall(address, "POST", query, inputHeaders, outputHeaders, response);
		System.out.println("--\n" + response.get("content") + "\n--");
		ObjectMapper om = new ObjectMapper();
		OBDARunQueryInstance ret = om.readValue(response.get("content").getBytes(), OBDARunQueryInstance.class);
		rqi.setExecutionId(ret.getExecutionId());
		rqi.setSparql(ret.getSparql());
		return res;
	}
	
	public static int getQueryResult(String sessionId, String name, String version, String mapID, String queryID, int pagesize, int pagenumber) throws IOException {
		HashMap<String, String> inputHeaders = new HashMap<String, String>();
		inputHeaders.put(AuthenticationFilter.X_MONOLITH_SESSION_ID, sessionId);
		HashMap<String, String> outputHeaders = new HashMap<String, String>();
		HashMap<String, String> response = new HashMap<String, String>();
		String address = BASE_URL + "/owlOntology/" + name + "/version/mapping/" + mapID + "/query/" 
				+ queryID + "/results?version=" + URLEncoder.encode(version, "UTF-8") + "&pagesize=" + pagesize + "&pagenumber=" + pagenumber;
		int res = makeWebCall(address, "GET", null, inputHeaders, outputHeaders, response);
		System.out.println("--\n" + response.get("content") + "\n--");
		return res;
	}
	
	public static int getConstructQueryResult(String sessionId, String name, String version, String mapID, String queryID, int pagesize, int pagenumber) throws IOException {
		HashMap<String, String> inputHeaders = new HashMap<String, String>();
		inputHeaders.put(AuthenticationFilter.X_MONOLITH_SESSION_ID, sessionId);
		HashMap<String, String> outputHeaders = new HashMap<String, String>();
		HashMap<String, String> response = new HashMap<String, String>();
		String address = BASE_URL + "/owlOntology/" + name + "/version/mapping/" + mapID + "/cquery/" 
				+ queryID + "/results?version=" + URLEncoder.encode(version, "UTF-8") + "&pagesize=" + pagesize + "&pagenumber=" + pagenumber;
		int res = makeWebCall(address, "GET", null, inputHeaders, outputHeaders, response);
		System.out.println("--\n" + response.get("content") + "\n--");
		return res;
	}
	
	public static int getQueryRewritings(String sessionId, String name, String version, String mapID, String queryID, int pagesize, int pagenumber) throws IOException {
		HashMap<String, String> inputHeaders = new HashMap<String, String>();
		inputHeaders.put(AuthenticationFilter.X_MONOLITH_SESSION_ID, sessionId);
		HashMap<String, String> outputHeaders = new HashMap<String, String>();
		HashMap<String, String> response = new HashMap<String, String>();
		// fetching onto rewritings
		String address1 = BASE_URL + "/owlOntology/" + name + "/version/mapping/" + mapID + "/query/" 
				+ queryID + "/ontologyRewritings?version=" + URLEncoder.encode(version, "UTF-8") + "&pagesize=" + pagesize + "&pagenumber=" + pagenumber;
		int res1 = makeWebCall(address1, "GET", null, inputHeaders, outputHeaders, response);
		System.out.println("-- ontology rewritings -- \n" + response.get("content") + "\n--");
		
		// fetching onto rewritings
		String address2 = BASE_URL + "/owlOntology/" + name + "/version/mapping/" + mapID + "/query/" 
				+ queryID + "/mappingRewritings?version=" + URLEncoder.encode(version, "UTF-8") + "&pagesize=" + pagesize + "&pagenumber=" + pagenumber;
		int res2 = makeWebCall(address2, "GET", null, inputHeaders, outputHeaders, response);
		System.out.println("--mapping rewritings --\n" + response.get("content") + "\n--");
		
		// fetching onto rewritings
		String address3 = BASE_URL + "/owlOntology/" + name + "/version/mapping/" + mapID + "/query/" 
				+ queryID + "/viewRewritings?version=" + URLEncoder.encode(version, "UTF-8") + "&pagesize=" + pagesize + "&pagenumber=" + pagenumber;
		int res3 = makeWebCall(address3, "GET", null, inputHeaders, outputHeaders, response);
		System.out.println("--view rewritings --\n" + response.get("content") + "\n--");
		return res1 + res2 + res3;
	}
	
	public static int createDataSourceInfo(String sessionId, DataSourceInfoEntry entry) throws IOException {
		HashMap<String, String> inputHeaders = new HashMap<String, String>();
		inputHeaders.put(AuthenticationFilter.X_MONOLITH_SESSION_ID, sessionId);
		HashMap<String, String> outputHeaders = new HashMap<String, String>();
		HashMap<String, String> response = new HashMap<String, String>();
		String address = BASE_URL + "/datasource";
		return makeWebCall(address, "POST", entry, inputHeaders, outputHeaders, response);
	}
	
	public static int updateDataSourceInfo(String sessionId, DataSourceInfoEntry entry) throws IOException {
		HashMap<String, String> inputHeaders = new HashMap<String, String>();
		inputHeaders.put(AuthenticationFilter.X_MONOLITH_SESSION_ID, sessionId);
		HashMap<String, String> outputHeaders = new HashMap<String, String>();
		HashMap<String, String> response = new HashMap<String, String>();
		String address = BASE_URL + "/datasource/" + entry.getId();
		return makeWebCall(address, "PUT", entry, inputHeaders, outputHeaders, response);
	}
	
	public static int deleteDataSourceInfo(String sessionId, String name) throws IOException {
		HashMap<String, String> inputHeaders = new HashMap<String, String>();
		inputHeaders.put(AuthenticationFilter.X_MONOLITH_SESSION_ID, sessionId);
		HashMap<String, String> outputHeaders = new HashMap<String, String>();
		HashMap<String, String> response = new HashMap<String, String>();
		String address = BASE_URL + "/datasource/" + name;
		return makeWebCall(address, "DELETE", null, inputHeaders, outputHeaders, response);
	}
	

	public static void mainOld4(String[] args) throws IOException, MappingFileMalformedException, SAXException, InterruptedException {
		String sessionId = login(USER, PASSWORD);
		String sessionId2 = login("ciccio", "enoicorf");
		String sessionId3 = login("mastro", "dasilab");
//		DataSourceInfoEntry entry = new DataSourceInfoEntry();
//		entry.setId("S2");
//		entry.setDescription("test updating data source info from code sample");
//		entry.setDataSourceUsername("bisma");
//		entry.setJdbcDriver("postgresso");
//		entry.setJdbcPassword("pivvuddi");
//		entry.setJdbcUrl("http://localhost/url/mod");
//		entry.setJdbcUsername("pippolo");
//		System.out.println(deleteDataSourceInfo(sessionId, "S1"));
	}
	
	public static void main(String[] args) throws IOException, MappingFileMalformedException, SAXException, InterruptedException {
		movieQueryTest();
	}
	
	public static void constructQueryFromCatalogTest() throws IOException, MappingFileMalformedException, SAXException, InterruptedException {
		String sessionId = login(USER, PASSWORD);
		System.out.println("REPO CLEAN: " + deleteAllOntologies(sessionId));
		System.out.println("ONTO CREATION: " + createOntology(sessionId, "BOOKS", "Ontology books test loading from test code"));
		FileInfo v = getFileInfo("./src/test/resources/specs/books/tbox.owl", "onto", "owl");
		System.out.println("ONTO VERSION UPLOAD: " + createOntologyVersion(sessionId, "BOOKS", v));
		FileInfo m1 = getFileInfo("./src/test/resources/specs/books/mappings.xml", "mappings.xml", "xml");
		System.out.println("MAPPING UPLOAD: " + createOntologyVersionMapping(sessionId, "BOOKS", "http://www.obdasystems.com/books/1.0", m1));
		SPARQLQuery query = new SPARQLQuery();
		String qid = "QUERY_001";
		query.setQueryID(qid);
		query.setQueryDescription("The description of query " + qid);
		query.setQueryCode("construct {$S <http://pred> <http://obj> } where {$S a <http://www.obdasystems.com/books/Book>}");
		query.setConstruct(true);
		query.setConstructResultsRDFSyntax(RDFUtilities.RDF_TURTLE_SYNTAX_IDENTIFIER_0);
		System.out.println("QUERY CREATION: " + createQuery(sessionId, "BOOKS", "http://www.obdasystems.com/books/1.0", query));
		System.out.println("STARTING MASTRO: " + startMastro(sessionId, "BOOKS", "http://www.obdasystems.com/books/1.0", "MAP_04"));
		System.out.println("Waiting for Mastro to load...");
		Thread.sleep(10000);
		OBDARunQueryInstance rqi = new OBDARunQueryInstance();
		System.out.println("STARTING QUERY: " + startConstructQueryFromCatalog(sessionId, "BOOKS", "http://www.obdasystems.com/books/1.0", "MAP_04", "QUERY_001", rqi));
		System.out.println("Waiting for Query to load results...");
		Thread.sleep(10000);
		System.out.println("GETTING QUERY RESULTS: " + getConstructQueryResult(sessionId, "BOOKS", "http://www.obdasystems.com/books/1.0", "MAP_04", rqi.getExecutionId(), 10, 1));
		
	}
	
	public static void movieQueryTest() throws IOException, InterruptedException {
		String sessionId = login(USER, PASSWORD);
		System.out.println("REPO CLEAN: " + deleteAllOntologies(sessionId));
//		DataSourceInfoEntry entry = new DataSourceInfoEntry();
//		entry.setDataSourceUsername(USER);
//		entry.setDescription("Movie OBDA specification data source");
//		entry.setId("imdb");
//		entry.setJdbcDriver("com.mysql.jdbc.Driver");
//		entry.setJdbcPassword("enoicorf");
//		entry.setJdbcUsername("root");
//		entry.setJdbcUrl("jdbc:mysql://localhost/imdb");
//		createDataSourceInfo(sessionId, entry);
		String ONTO_NAME = "MOVIEW";
		String ONTO_VERSION = "http://www.movieontology.org/ontology/1.0.0";
		String MAP_ID = "MOVIE_MAP_01";
		System.out.println("ONTO CREATION: " + createOntology(sessionId, ONTO_NAME, "Ontology movies"));
		FileInfo v = getFileInfo("./src/test/resources/specs/movies/movieontology.owl", "onto", "owl");
		System.out.println("ONTO VERSION UPLOAD: " + createOntologyVersion(sessionId, ONTO_NAME, v));
		FileInfo m1 = getFileInfo("./src/test/resources/specs/movies/mappings-movies.xml", "mappings-movies.xml", "xml");
		System.out.println("MAPPING UPLOAD: " + createOntologyVersionMapping(sessionId, ONTO_NAME, ONTO_VERSION, m1));
		SPARQLQuery query = new SPARQLQuery();
		String qid = "q09";
		query.setQueryID(qid);
		query.setQueryDescription("The description of query " + qid);
		String code = new String(Files.readAllBytes(Paths.get("./src/test/resources/specs/movies/queries/q09.sparql")));
		query.setQueryCode(code);
		System.out.println("QUERY CREATION: " + createQuery(sessionId, ONTO_NAME, ONTO_VERSION, query));
		System.out.println("STARTING MASTRO: " + startMastro(sessionId, ONTO_NAME, ONTO_VERSION, MAP_ID));
		System.out.println("Waiting for mastro to load");
		Thread.sleep(10000);
		OBDARunQueryInstance rqi = new OBDARunQueryInstance();
		System.out.println("STARTING QUERY: " + startQuery(sessionId, ONTO_NAME, ONTO_VERSION, MAP_ID, qid, rqi));
		System.out.println("Waiting for Query to load results...");
		Thread.sleep(5000);
		System.out.println("GETTING QUERY RESULTS: " + getQueryResult(sessionId, ONTO_NAME, ONTO_VERSION, MAP_ID, rqi.getExecutionId(), 10, 1));
		System.out.println("GETTING QUERY REWRITINGS: " + getQueryRewritings(sessionId, ONTO_NAME, ONTO_VERSION, MAP_ID, rqi.getExecutionId(), 10, 1));
	}
	
	public static void mappingCheckErrorTest() throws IOException {
		String sessionId = login(USER, PASSWORD);
		System.out.println("REPO CLEAN: " + deleteAllOntologies(sessionId));
		System.out.println("ONTO CREATION: " + createOntology(sessionId, "UNIT1", "Ontology test"));
		FileInfo v = getFileInfo("./src/test/resources/specs/unit1/unit1.owl", "onto", "owl");
		System.out.println("ONTO VERSION UPLOAD: " + createOntologyVersion(sessionId, "UNIT1", v));
		FileInfo m1 = getFileInfo("./src/test/resources/specs/unit1/unit1-errors2.xml", "unit1-errors2.xml", "xml");
		HashMap<String, String> response = new HashMap<String, String>();
		System.out.println("MAPPING UPLOAD: " + createOntologyVersionMappingCheck(sessionId, "UNIT1", "http://www.obdasystems.com/unit1/1.0", m1, response ));
		for (String r : response.keySet())
			System.out.println(response.get(r));
	}
	
	public static void constructQueryTest() throws IOException, MappingFileMalformedException, SAXException, InterruptedException {
		String sessionId = login(USER, PASSWORD);
		System.out.println("REPO CLEAN: " + deleteAllOntologies(sessionId));
		System.out.println("ONTO CREATION: " + createOntology(sessionId, "BOOKS", "Ontology books test loading from test code"));
		FileInfo v = getFileInfo("./src/test/resources/specs/books/tbox.owl", "onto", "owl");
		System.out.println("ONTO VERSION UPLOAD: " + createOntologyVersion(sessionId, "BOOKS", v));
		FileInfo m1 = getFileInfo("./src/test/resources/specs/books/mappings.xml", "mappings.xml", "xml");
		System.out.println("MAPPING UPLOAD: " + createOntologyVersionMapping(sessionId, "BOOKS", "http://www.obdasystems.com/books/1.0", m1));
		SPARQLQuery query = new SPARQLQuery();
		String qid = "QUERY_001";
		query.setQueryID(qid);
		query.setQueryDescription("The description of query " + qid);
		query.setQueryCode("construct {$S <http://pred> <http://obj> } where {$S a <http://www.obdasystems.com/books/Book>}");
		query.setConstruct(true);
		query.setConstructResultsRDFSyntax(RDFUtilities.RDF_TURTLE_SYNTAX_IDENTIFIER_0);
		System.out.println("STARTING MASTRO: " + startMastro(sessionId, "BOOKS", "http://www.obdasystems.com/books/1.0", "MAP_04"));
		System.out.println("Waiting for Mastro to load...");
		Thread.sleep(10000);
		OBDARunQueryInstance rqi = new OBDARunQueryInstance();
		System.out.println("STARTING QUERY: " + startConstructQuery(sessionId, "BOOKS", "http://www.obdasystems.com/books/1.0", "MAP_04", query, rqi));
		System.out.println("Waiting for Query to load results...");
		Thread.sleep(10000);
		System.out.println("GETTING QUERY RESULTS: " + getConstructQueryResult(sessionId, "BOOKS", "http://www.obdasystems.com/books/1.0", "MAP_04", rqi.getExecutionId(), 10, 1));
	}
	
	public static void queryTest() throws IOException, MappingFileMalformedException, SAXException, InterruptedException {
		String sessionId = login(USER, PASSWORD);
		System.out.println("REPO CLEAN: " + deleteAllOntologies(sessionId));
		System.out.println("ONTO CREATION: " + createOntology(sessionId, "BOOKS", "Ontology books test loading from test code"));
		FileInfo v = getFileInfo("./src/test/resources/specs/books/books_ontology.owl", "onto", "owl");
		System.out.println("ONTO VERSION UPLOAD: " + createOntologyVersion(sessionId, "BOOKS", v));
		FileInfo m1 = getFileInfo("./src/test/resources/specs/books/mappings-books.xml", "mappings-books.xml", "xml");
		System.out.println("MAPPING UPLOAD: " + createOntologyVersionMapping(sessionId, "BOOKS", "http://www.obdasystems.com/books/1.0", m1));
		FileInfo m2 = getFileInfo("./src/test/resources/specs/books/mappings-books-2.xml", "mappings-books-2.xml", "xml");
		System.out.println("MAPPING UPLOAD #2: " + createOntologyVersionMapping(sessionId, "BOOKS", "http://www.obdasystems.com/books/1.0", m2));
		FileInfo m3 = getFileInfo("./src/test/resources/specs/books/mappings-books-3.xml", "mappings-books-3.xml", "xml");
		System.out.println("MAPPING UPLOAD #3: " + createOntologyVersionMapping(sessionId, "BOOKS", "http://www.obdasystems.com/books/1.0", m3));
		SPARQLQuery query = new SPARQLQuery();
		String qid = "QUERY_001";
		query.setQueryID(qid);
		query.setQueryDescription("The description of query " + qid);
		query.setQueryCode("select $X where {$X a owl:Thing}");
		System.out.println("QUERY CREATION: " + createQuery(sessionId, "BOOKS", "http://www.obdasystems.com/books/1.0", query));
		SPARQLQuery query2 = new SPARQLQuery();
		String qid2 = "QUERY_002";
		query2.setQueryID(qid2);
		query2.setQueryDescription("The description of query " + qid2);
		query2.setQueryCode("select $Y where {$Y a owl:Thing}");
		System.out.println("QUERY CREATION: " + createQuery(sessionId, "BOOKS", "http://www.obdasystems.com/books/1.0", query2));
		query2.setQueryCode("select $Z where {$Z a <http://www.obdasystems.com/books/Book>}");
		query2.setQueryDescription("Modified via PUT operation");
		System.out.println("QUERY MODIFICATION: " + updateQuery(sessionId, "BOOKS", "http://www.obdasystems.com/books/1.0", query2));
		System.out.println("QUERY DELETION: " + deleteQuery(sessionId, "BOOKS", "http://www.obdasystems.com/books/1.0", query));
		System.out.println("STARTING MASTRO: " + startMastro(sessionId, "BOOKS", "http://www.obdasystems.com/books/1.0", "MAP_03"));
		System.out.println("Waiting for Mastro to load...");
		Thread.sleep(10000);
		OBDARunQueryInstance rqi = new OBDARunQueryInstance();
		System.out.println("STARTING QUERY: " + startQuery(sessionId, "BOOKS", "http://www.obdasystems.com/books/1.0", "MAP_03", "QUERY_002", rqi));
		System.out.println("Waiting for Query to load results...");
		Thread.sleep(10000);
		System.out.println("GETTING QUERY RESULTS: " + getQueryResult(sessionId, "BOOKS", "http://www.obdasystems.com/books/1.0", "MAP_03", rqi.getExecutionId(), 10, 1));
		
	}
	
	public static void mainold2(String[] args) throws JsonGenerationException, JsonMappingException, IOException {
		DataSourceInfo n = new DataSourceInfo();
		DataSourceInfoEntry n1 = new DataSourceInfoEntry();
		n1.setId("S1");
		n1.setDataSourceUsername("ciccio");
		n1.setDescription("test data source");
		n1.setJdbcDriver("com.mysql.jdbc.Driver");
		n1.setJdbcUrl("jdbc:mysql://localhost/books");
		n1.setJdbcUsername("root");
		n1.setJdbcPassword("enoicorf");
		List<DataSourceInfoEntry> entries = new LinkedList<>();
		entries.add(n1);
		n.setDataSourceInfoEntries(entries);
		ObjectMapper om = new ObjectMapper();
		om.enable(SerializationFeature.INDENT_OUTPUT);
		om.writeValue(Paths.get("/home/marco/mastro-home/mastro.datasources").toFile(), n);
		
	}
	
	public static void mainOld(String[] args) throws ClassNotFoundException, IOException {
		String sessionId = login(USER, PASSWORD);
		FileInfo v = getFileInfo("./src/test/resources/specs/books/books_ontology.owl", "onto", "owl");
		System.out.println(createOntologyVersion(sessionId, "BOOKS", v));
		
		if (true) return;
		System.out.println(createOntology(sessionId, "BOOKS", "Ontology books test loading from test code"));
		
		if (true) return;
		FileInfo f = getFileInfo("./src/test/resources/specs/books/books_ontology.owl", "onto", "owl");
		System.out.println(f.getContent());
		
		if (true) return;
		HashMap<String, String> inHead = new HashMap<String, String>();
		HashMap<String, String> outHead = new HashMap<String, String>();
		HashMap<String, String> response = new HashMap<String, String>();
		makeWebCall("http://obdatest.dis.uniroma1.it", "get", null, inHead, outHead, response);
		System.out.println(response.get("content"));
		listPath();
	}
	
}
