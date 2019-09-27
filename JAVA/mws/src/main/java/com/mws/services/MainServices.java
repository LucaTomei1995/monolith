package com.mws.services;

import java.io.IOException;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.OPTIONS;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.Response;

import org.apache.log4j.ConsoleAppender;
import org.apache.log4j.Level;
import org.apache.log4j.Logger;
import org.apache.log4j.PatternLayout;

import com.mws.model.ClassTreeNode;
import com.mws.model.DataPropertyTreeNode;
import com.mws.model.FileInfo;
import com.mws.model.MethodInfo;
import com.mws.model.ObjectInfo;
import com.mws.model.ObjectPropertyTreeNode;
import com.mws.model.OntologyAlphabet;
import com.mws.model.OntologyInfo;
import com.mws.model.OntologyStore;
import com.mws.model.OntologyVersionInfo;
import com.mws.model.PrefixesList;
import com.mws.tools.CodeGeneration;

public class MainServices {

	static OntologyStore store;
	
	static {
		store = new OntologyStore("TEST");
		store.getOntologyList().add(StubFactory.getSampleOntologyInfo("FIRST"));
	}
	
	static Logger logger = Logger.getLogger(MainServices.class);

	static {
		ConsoleAppender console = new ConsoleAppender(); // create appender
		String PATTERN = "%d [%p]%m%n";
		console.setLayout(new PatternLayout(PATTERN));
		console.setThreshold(Level.ALL);
		console.activateOptions();
		logger.addAppender(console);
	}

	static void write(HttpServletRequest request, String message) {
		String clazz = "";
		String method = "";
		String ln = "";
		try {
			throw new Exception();
		}
		catch(Exception e) {
			if (e.getStackTrace().length > 0) {
				clazz = e.getStackTrace()[1].getClassName();
				method = e.getStackTrace()[1].getMethodName();
				ln = "" + e.getStackTrace()[1].getLineNumber();
			}
		}
		String user = request != null ? (request.getRemoteAddr() != null ? "[" + request.getRemoteAddr() + "]" : "[NONE]") : ("-");
		logger.debug("[" + clazz + "." + method + "(...):" + ln + "]" + user + " " + message);
	}
	
	/********************************************************************
	 * A U X I L I A R Y     M E T H O D S       S T A R T     H E R E  *
	 ********************************************************************/
	
	private void handleError(HttpServletResponse response, HttpServletRequest request, String errorMessage, int statusCode) {
		response.setStatus(statusCode);
		write(request, "STATUS-CODE " + statusCode);
		response.setHeader("ERROR-MESSAGE", errorMessage);
		write(request, "ERROR-MESSAGE " + errorMessage);		
	}
	
	@Path("help")
	@GET
	@Produces("application/json")
	public List<MethodInfo> help(@Context HttpServletRequest request) {
		write(request, "call");
		List<MethodInfo> infos = StubFactory.getProvidedMethodsList(MainServices.class);
		return infos;
	}

	@Path("help2")
	@GET
	@Produces("application/json")
	public Response help2(@Context HttpServletRequest request) {
		List<MethodInfo> infos = CodeGeneration.getAllMethods();
		write(request, "test");
		return Response.status(200).entity(infos).build();
	}

	@Path("help/{name}")
	@GET
	@Produces("application/json")
	public ObjectInfo help(@PathParam("name") String name) throws ClassNotFoundException {
		Class<?> type = Class.forName(name);
		ObjectInfo info = StubFactory.getObjectInfo(type);
		return info;
	}
	
	@Path("upload")
	@POST
	@Produces("application/json")
	public boolean upload(FileInfo post) throws IOException {
		return store.uploadFile(post, "upload", true);
	}
	
	@Path("file")
	@GET
	@Produces("application/json")
	public FileInfo file() throws IOException {
		return StubFactory.getSampleFileInfo("text.txt", "Favellum fellatio");
	}
	
	
	/******************************************************************
	 * S E R V I C E S     M E T H O D S       S T A R T     H E R E  *
	 ******************************************************************/
	
	@Path("owlOntology")
	@GET
	@Produces("application/json")
	public List<OntologyInfo> get_owlOntology(@Context HttpServletRequest request,@Context HttpServletResponse response) {
		write(request, "call");
		manageHeaders(request, response);
		return store.getOntologyList();
	}
	
	@Path("owlOntology")
	@PUT
	@Produces("application/json")
	@Consumes("application/json")
	public OntologyInfo put_owlOntology(
			@Context HttpServletRequest request,
			@Context HttpServletResponse response,
			OntologyInfo info) {
		write(request, "call");
		manageHeaders(request, response);
		if (store.getOntologyList().contains(info)) {
			String errorMessage = "Cannot create ontology " + info.getId() + ": already present in the system";
			handleError(response, request, errorMessage, HttpServletResponse.SC_INTERNAL_SERVER_ERROR);			
			return null;
		}
		store.getOntologyList().add(info);
		write(request, "new ontology infos size: " + store.getOntologyList().size());
		return info;
	}
	
	@Path("owlOntology")
	@OPTIONS
	public void options_owlOntology(
			@Context HttpServletRequest request,
			@Context HttpServletResponse response) {
		write(request, "call");
		manageHeaders(request, response);
	}

	private void manageHeaders(HttpServletRequest request, HttpServletResponse response) {
		write(request, "managing headers");
		response.addHeader("Access-Control-Allow-Origin", "http://192.168.0.135:8000");
//		response.addHeader("Access-Control-Allow-Origin", "*");
		response.addHeader("Access-Control-Allow-Credentials", "true");
		response.addHeader("Access-Control-Allow-Headers","content-type");
		response.addHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT, OPTIONS, HEAD");
	}

	@Path("owlOntology")
	@POST
	@Produces("application/json")
	@Consumes("application/json")
	public OntologyInfo post_owlOntology(
			@Context HttpServletRequest request,
			@Context HttpServletResponse response,
			OntologyInfo info) {
		write(request, "call");
		manageHeaders(request, response);
		if (!store.getOntologyList().contains(info)) {
			String errorMessage = "Cannot update ontology " + info.getId() + ": not present in the system";
			handleError(response, request, errorMessage, HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
			return null;
		}
		int idx = store.getOntologyList().indexOf(info);
		store.getOntologyList().remove(idx);
		store.getOntologyList().add(idx, info);
		return info;
	}
	
	@Path("owlOntology")
	@DELETE
	@Produces("application/json")
	@Consumes("application/json")
	public OntologyInfo delete_owlOntology(
			@Context HttpServletRequest request,
			@Context HttpServletResponse response,
			OntologyInfo info) {
		write(request, "call");
		manageHeaders(request, response);
		if (!store.getOntologyList().contains(info)) {
			String errorMessage = "Cannot delete ontology " + info.getId() + ": not present in the system";
			handleError(response, request, errorMessage, HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
			return null;
		}
		int idx = store.getOntologyList().indexOf(info);
		store.getOntologyList().remove(idx);
		return info;
	}

	@Path("owlOntology/{name}")
	@GET
	@Produces("application/json")
	public OntologyInfo get_owlOntology_name(
			@Context HttpServletRequest request, 
			@Context HttpServletResponse response,
			@PathParam("name") String name) {
		write(request, "call, name=" + name);
		manageHeaders(request, response);
		for (OntologyInfo i : store.getOntologyList()) {
			if (i.getId().equals(name)) {
				return i;
			}
		}
		String errorMessage = "Cannot find ontology " + name + ": not present in the system";
		handleError(response, request, errorMessage, HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
		return null;
	}
	
	@Path("owlOntology/{name}/{version}")
	@GET
	@Produces("application/json")
	public OntologyVersionInfo get_owlOntology_name_version(
			@Context HttpServletRequest request,
			@Context HttpServletResponse response,
			@PathParam("name") String name, 
			@PathParam("version") String version
		) {
		write(request, "call, name=" + name + ", version=" + version);
		boolean ontoFound = false;
		for (OntologyInfo i : store.getOntologyList()) {
			if (i.getId().equals(name)) {
				ontoFound = true;
				for (OntologyVersionInfo vi : i.getVersions()) {
					if (vi.getVersion().equals(version)) {
						return vi;
					}
				}
			}
		}
		String errorMessage = null;
		if (ontoFound) {
			errorMessage = "Cannot find ontology version " + version + ": not present in the system";
		}
		else {
			errorMessage = "Cannot find ontology " + name + ": not present in the system";
		}
		handleError(response, request, errorMessage, HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
		return null;
	}
	
	@Path("owlOntology/{name}/{version}")
	@POST
	@Produces("application/json")
	@Consumes("application/json")
	public OntologyVersionInfo post_owlOntology_name_version(
			@Context HttpServletRequest request,
			@Context HttpServletResponse response,
			@PathParam("name") String name, @PathParam("version") String version,
			OntologyVersionInfo post) {
		write(request, "call, name=" + name + ", version=" + version);
		boolean ontoFound = false;
		for (OntologyInfo i : store.getOntologyList()) {
			if (i.getId().equals(name)) {
				ontoFound = true;
				for (OntologyVersionInfo vi : i.getVersions()) {
					if (vi.getVersion().equals(version)) {
						vi.setVersion(post.getVersion());
						vi.setDescription(post.getDescription());
						vi.setDate(post.getDate());
						return vi;
					}
				}
			}
		}
		String errorMessage = null;
		if (ontoFound) {
			errorMessage = "Cannot find ontology version " + version + ": not present in the system";
		}
		else {
			errorMessage = "Cannot find ontology " + name + ": not present in the system";
		}
		handleError(response, request, errorMessage, HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
		return null;
	}
	
	@Path("owlOntology/{name}/{version}")
	@PUT
	@Produces("application/json")
	@Consumes("application/json")
	public OntologyVersionInfo put_owlOntology_name_version(
			@Context HttpServletRequest request,
			@Context HttpServletResponse response, 
			@PathParam("name") String name, @PathParam("version") String version,
			OntologyVersionInfo post) {
		write(request, "call, name=" + name + ", version=" + version);
		boolean ontoFound = false;
		boolean duplicateVersion = false;
		for (OntologyInfo i : store.getOntologyList()) {
			if (i.getId().equals(name)) {
				ontoFound = true;
				for (OntologyVersionInfo vi : i.getVersions()) {
					if (vi.getVersion().equals(version)) {
						duplicateVersion = true;
					}
				}
				if (!duplicateVersion) {
					i.getVersions().add(post);
					return post;
				}
			}
		}
		String errorMessage = null;
		if (ontoFound) {
			if (duplicateVersion)
				errorMessage = "Duplicate version " + version + ": already present in ontology " + name;
		}
		else {
			errorMessage = "Cannot find ontology " + name + ": not present in the system";
		}
		handleError(response, request, errorMessage, HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
		return null;
	}
	
	@Path("owlOntology/{name}/{version}")
	@DELETE
	@Produces("application/json")
	@Consumes("application/json")
	public OntologyVersionInfo delete_owlOntology_name_version(
			@Context HttpServletRequest request,
			@Context HttpServletResponse response, 
			@PathParam("name") String name, @PathParam("version") String version) {
		write(request, "call, name=" + name + ", version=" + version);
		boolean ontoFound = false;
		int idx = -1;
		for (OntologyInfo i : store.getOntologyList()) {
			if (i.getId().equals(name)) {
				ontoFound = true;
				for (int j=0; j < i.getVersions().size(); j++) {
					if (i.getVersions().get(j).getVersion().equals(version)) {
						idx = j;
					}
				}
				if (idx != -1) {
					OntologyVersionInfo removed = i.getVersions().remove(idx);
					return removed;
				}
			}
		}
		String errorMessage = null;
		if (ontoFound) {
			if (idx == -1)
				errorMessage = "Cannot remove version " + version + ": not present in ontology " + name;
		}
		else {
			errorMessage = "Cannot find ontology " + name + ": not present in the system";
		}
		handleError(response, request, errorMessage, HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
		return null;
	}
	
	@Path("owlOntology/{name}/{version}/prefixes")
	@GET
	@Produces("application/json")
	public PrefixesList get_owlOntology_name_version_prefixes(@Context HttpServletRequest request, @PathParam("name") String name, @PathParam("version") String version) {
		write(request, "call, name=" + name + ", version=" + version);
		return StubFactory.getSamplePrefixesList();
	}
	
	@Path("owlOntology/{name}/{version}/alphabet")
	@GET
	@Produces("application/json")
	public OntologyAlphabet get_owlOntology_name_version_alphabet(@Context HttpServletRequest request, @PathParam("name") String name, @PathParam("version") String version) {
		write(request, "call, name=" + name + ", version=" + version);
		return StubFactory.getSampleOntologyAlphabet();
	}
	
	@Path("owlOntology/{name}/{version}/alphabet/class")
	@GET
	@Produces("application/json")
	public ClassTreeNode get_owlOntology_name_version_alphabet_class(
			@Context HttpServletRequest request, 
			@PathParam("name") String name, @PathParam("version") String version,
			@QueryParam("inferred") boolean inferred, @QueryParam("named") boolean named
		) {
		write(request, "call, name=" + name + ", version=" + version + ", inferred=" + inferred + ", named=" + named);
		return StubFactory.getSampleClassTree(inferred, named);
	}
	
	@Path("owlOntology/{name}/{version}/alphabet/objectProperty")
	@GET
	@Produces("application/json")
	public ObjectPropertyTreeNode get_owlOntology_name_version_alphabet_objectProperty(
			@Context HttpServletRequest request, 
			@PathParam("name") String name, @PathParam("version") String version,
			@QueryParam("inferred") boolean inferred
		) {
		write(request, "call, name=" + name + ", version=" + version + ", inferred=" + inferred);
		return StubFactory.getSampleObjectPropertyTree(inferred);
	}
	
	@Path("owlOntology/{name}/{version}/alphabet/dataProperty")
	@GET
	@Produces("application/json")
	public DataPropertyTreeNode get_owlOntology_name_version_alphabet_dataProperty(
			@Context HttpServletRequest request, 
			@PathParam("name") String name, @PathParam("version") String version,
			@QueryParam("inferred") boolean inferred
		) {
		write(request, "call, name=" + name + ", version=" + version + ", inferred=" + inferred);
		return StubFactory.getSampleDataPropertyTree(inferred);
	}

}
