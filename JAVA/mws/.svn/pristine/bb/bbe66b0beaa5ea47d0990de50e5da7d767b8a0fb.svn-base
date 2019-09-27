package com.mwsx.services;

import java.util.Enumeration;
import java.util.LinkedList;
import java.util.List;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.Response;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.github.andrewoma.dexx.collection.HashMap;
import com.github.andrewoma.dexx.collection.Map;
import com.mwsx.configuration.AuthenticationFilter;
import com.mwsx.configuration.RuntimeListener;
import com.mwsx.engine.MwsxOntologyManager;
import com.mwsx.engine.MwsxSession;
import com.mwsx.engine.MwsxSessionManager;
import com.mwsx.model.FileInfo;
import com.mwsx.model.KGOpeningEvent;
import com.mwsx.model.KGStatus;
import com.mwsx.model.KGStoreFileInfoEntry;
import com.mwsx.model.KnowledgeGraph;
import com.mwsx.model.KnowledgeGraphDestinationQueryKg;
import com.mwsx.model.KnowledgeGraphDestinationQueryOBDA;
import com.mwsx.model.KnowledgeGraphFile;
import com.mwsx.model.KnowledgeGraphFileDestination;
import com.mwsx.model.KnowledgeGraphFileInfo;
import com.mwsx.model.KnowledgeGraphOntologyUnion;
import com.mwsx.model.KnowledgeGraphUnion;
import com.mwsx.model.OBDACatalog;
import com.mwsx.model.SPARQLQuery;
import com.mwsx.model.SPARQLQueryExecution;
import com.mwsx.model.SPARQLResults;
import com.mwsx.model.SPARQLStatus;
import com.mwsx.model.User;
import com.mwsx.model.kg.InstancePage;
import com.mwsx.model.kg.ObjectPredicatePageType;
import com.mwsx.model.kg.SubjectPredicatePageType;

@Path("/mwsx")
public class MwsxKGService {

	static Logger logger = LoggerFactory.getLogger(MwsxKGService.class);
	private static MwsxOntologyManager ontologyManager = RuntimeListener.getOntologyManager();
	
	@Path("/knowledgeGraphs")
	@GET
	@Produces("application/json")
	@Consumes("application/json")
	@MwsxAvailable
	public Response get__knowledgeGraphs(@Context HttpServletRequest request, @Context HttpServletResponse response

	) {
		if (MwsxService.LOG_METHODS) MwsxService.logMethodInfo();
		List<KnowledgeGraph> kgs = null;
		try {
			MwsxSession session = this.getMwsxSession(request);
			User u = session.getUser();
			kgs = MwsxKGService.ontologyManager.getKnowledgeGraphs(u);
		}
		catch(Throwable t) {
			return MwsxService.manageError(t, response);
		}
		response.setHeader("MASTRO-MESSAGE", "OK");
		response.setStatus(HttpServletResponse.SC_OK);
		return Response.ok().entity(kgs).build();
	}

	@Path("/knowledgeGraphs")
	@POST
	@Produces("application/json")
	@Consumes("application/json")
	@MwsxAvailable
	public Response post__knowledgeGraphs(@Context HttpServletRequest request, @Context HttpServletResponse response,
			KnowledgeGraph post

	) {
		if (MwsxService.LOG_METHODS) MwsxService.logMethodInfo(MwsxService.o2j(post));
		try {
			if (post != null) {
				if (post.getKgCreationTs() == 0)
					post.setKgCreationTs(System.currentTimeMillis());
			}
			MwsxKGService.ontologyManager.addKnowledgeGraph(post);
		}
		catch(Throwable t) {
			return MwsxService.manageError(t, response);
		}
		response.setHeader("MASTRO-MESSAGE", "OK");
		response.setStatus(HttpServletResponse.SC_OK);
		return Response.ok().entity(post).build();
	}

	@Path("/knowledgeGraph")
	@DELETE
	@Produces("application/json")
//	@Consumes("application/json")
	@MwsxAvailable
	public Response delete__knowledgeGraph(@Context HttpServletRequest request, @Context HttpServletResponse response,
			String kg

	) {
		if (MwsxService.LOG_METHODS) MwsxService.logMethodInfo(kg);
		try {
			MwsxKGService.ontologyManager.deleteKnowledgeGraph(kg);
		}
		catch(Throwable t) {
			return MwsxService.manageError(t, response);
		}
		response.setHeader("MASTRO-MESSAGE", "OK");
		response.setStatus(HttpServletResponse.SC_OK);
		return Response.ok().entity(true).build();
	}

	@Path("/knowledgeGraph/info")
	@GET
	@Produces("application/json")
	@Consumes("application/json")
	@MwsxAvailable
	public Response get__knowledgeGraph_info(@Context HttpServletRequest request, @Context HttpServletResponse response,
			@QueryParam("iri") String iri) {
		if (MwsxService.LOG_METHODS) MwsxService.logMethodInfo(iri);
		KnowledgeGraph kg = null;
		try {
			MwsxSession session = this.getMwsxSession(request);
			kg = MwsxKGService.ontologyManager.getKnowledgeGraph(session, iri);
			if (kg == null)
				return Response.status(404).entity("Cannot find KG with IRI " + iri).build();
		}
		catch(Throwable t) {
			return MwsxService.manageError(t, response);
		}
		response.setHeader("MASTRO-MESSAGE", "OK");
		response.setStatus(HttpServletResponse.SC_OK);
		return Response.ok().entity(kg).build();
	}
	
	@Path("/knowledgeGraph/status")
	@GET
	@Produces("application/json")
	@Consumes("application/json")
	@MwsxAvailable
	public Response get__knowledgeGraph_status(@Context HttpServletRequest request, @Context HttpServletResponse response,
			@QueryParam("iri") String iri) {
		if (MwsxService.LOG_METHODS) MwsxService.logMethodInfo(iri);
		KGStatus kgstatus = null;
		try {
			KnowledgeGraph kg = MwsxKGService.ontologyManager.getKnowledgeGraph(iri);
			if (kg == null)
				return Response.status(404).entity("Cannot find KG with IRI " + iri).build();
			kgstatus = MwsxKGService.ontologyManager.getKnowledgeGraphState(kg);
		}
		catch(Throwable t) {
			return MwsxService.manageError(t, response);
		}
		response.setHeader("MASTRO-MESSAGE", "OK");
		response.setStatus(HttpServletResponse.SC_OK);
		return Response.ok().entity(kgstatus).build();
	}
	
	@Path("/knowledgeGraph/status/list")
	@GET
	@Produces("application/json")
	@Consumes("application/json")
	@MwsxAvailable
	public Response get__knowledgeGraph_status_list(@Context HttpServletRequest request, @Context HttpServletResponse response) {
		if (MwsxService.LOG_METHODS) MwsxService.logMethodInfo();
		Map<String, List<String>> m = new HashMap<String, List<String>>();
		List<String> qst = new LinkedList<String>();
		qst.add("READY");
		qst.add("RUNNING");
		qst.add("FINISHED");
		List<String> kgst = new LinkedList<String>();
		kgst.add("EMPTY");
		kgst.add("LOADING");
		kgst.add("READY");
		m.put("queryStatusValues", qst);
		m.put("kgStatusValues", kgst);
		response.setHeader("MASTRO-MESSAGE", "OK");
		response.setStatus(HttpServletResponse.SC_OK);
		return Response.ok().entity(m).build();
	}
	
	@Path("/knowledgeGraph")
	@GET
	@Produces("application/json")
	@Consumes("application/json")
	@MwsxAvailable
	public Response get__knowledgeGraph(@Context HttpServletRequest request, @Context HttpServletResponse response,
			@QueryParam("iri") String iri) {
		return get__knowledgeGraph_info(request, response, iri);
	}
	
	@Path("lastLoaded/knowledgeGraph")
	@GET
	@Produces("application/json")
	@Consumes("application/json")
	@MwsxAvailable
	public Response get_lastLoaded_knowledgeGraph(@Context HttpServletRequest request, @Context HttpServletResponse response) {
		if (MwsxService.LOG_METHODS) MwsxService.logMethodInfo();
		List<KGOpeningEvent> oev = null;
		try {
			oev = MwsxKGService.ontologyManager.getLastLoadedKG(this.getMwsxSession(request).getUser());
		}
		catch(Throwable t) {
			return MwsxService.manageError(t, response);
		}
		response.setHeader("MASTRO-MESSAGE", "OK");
		response.setStatus(HttpServletResponse.SC_OK);
		return Response.ok().entity(oev).build();
	}

	@Path("/knowledgeGraph/file")
	@PUT
	@Produces("application/json")
	@Consumes("application/json")
	@MwsxAvailable
	public Response patch__knowledgeGraph_file(@Context HttpServletRequest request,
			@Context HttpServletResponse response, KnowledgeGraphFile kgf

	) {
		String iri = kgf.getDestination().getDestination();
		if (MwsxService.LOG_METHODS) MwsxService.logMethodInfo(iri);
		KnowledgeGraph kg = null;
		try {
			kg = MwsxKGService.ontologyManager.getKnowledgeGraph(iri);
			if (kg == null)
				return Response.status(404).entity("Cannot find KG destination with IRI " + iri).build();
			MwsxKGService.ontologyManager.addKnowledgeGraphModel(kg, kgf);			
		}
		catch(Throwable t) {
			return MwsxService.manageError(t, response);
		}
		response.setHeader("MASTRO-MESSAGE", "OK");
		response.setStatus(HttpServletResponse.SC_OK);
		return Response.ok().entity(true).build();
	}
	
	@Path("/knowledgeGraph/file")
	@DELETE
	@Produces("application/json")
	@Consumes("application/json")
	@MwsxAvailable
	public Response delete__knowledgeGraph_file(@Context HttpServletRequest request,
			@Context HttpServletResponse response, KnowledgeGraphFile kgf

	) {
		String iri = kgf.getDestination().getDestination();
		if (MwsxService.LOG_METHODS) MwsxService.logMethodInfo(iri);
		KnowledgeGraph kg = null;
		try {
			kg = MwsxKGService.ontologyManager.getKnowledgeGraph(iri);
			MwsxKGService.ontologyManager.deleteKnowledgeGraphModel(kg, kgf);
		}
		catch(Throwable t) {
			return MwsxService.manageError(t, response);
		}
		response.setHeader("MASTRO-MESSAGE", "OK");
		response.setStatus(HttpServletResponse.SC_OK);
		return Response.ok().entity(true).build();
	}
	
	@Path("/knowledgeGraph/classes")
	@GET
	@Produces("application/json")
	@Consumes("application/json")
	@MwsxAvailable
	public Response get__knowledgeGraph_mentioned_classes(@Context HttpServletRequest request,
			@Context HttpServletResponse response, @QueryParam("iri") String iri,
			@QueryParam("namedGraph") String namedGraph
	) {
		if (MwsxService.LOG_METHODS) MwsxService.logMethodInfo(iri);
		Set<String> classes = null;
		try {
			classes = MwsxKGService.ontologyManager.getKGMentionedClasses(iri, namedGraph);
		}
		catch(Throwable t) {
			return MwsxService.manageError(t, response);
		}
		response.setHeader("MASTRO-MESSAGE", "OK");
		response.setStatus(HttpServletResponse.SC_OK);
		return Response.ok().entity(classes).build();
	}
	
	@Path("/knowledgeGraph/class/instances")
	@GET
	@Produces("application/json")
	@Consumes("application/json")
	@MwsxAvailable
	public Response get__knowledgeGraph_mentioned_instances_by_class(@Context HttpServletRequest request,
			@Context HttpServletResponse response, @QueryParam("kgIri") String kgIri, 
			@QueryParam("classIri") String classIri, @QueryParam("namedGraph") String namedGraph

	) {
		if (MwsxService.LOG_METHODS) MwsxService.logMethodInfo(kgIri, classIri, namedGraph);
		Set<String> classes = null;
		try {
			classes = MwsxKGService.ontologyManager.getKGInstancesForClass(kgIri, namedGraph, classIri);
		}
		catch(Throwable t) {
			return MwsxService.manageError(t, response);
		}
		response.setHeader("MASTRO-MESSAGE", "OK");
		response.setStatus(HttpServletResponse.SC_OK);
		return Response.ok().entity(classes).build();
	}
	
	@Path("/knowledgeGraph/namedGraphs")
	@GET
	@Produces("application/json")
	@Consumes("application/json")
	@MwsxAvailable
	public Response get__knowledgeGraph_named_graphs(@Context HttpServletRequest request,
			@Context HttpServletResponse response, @QueryParam("iri") String iri

	) {
		if (MwsxService.LOG_METHODS) MwsxService.logMethodInfo(iri);
		Set<String> classes = null;
		try {
			KnowledgeGraph kg = MwsxKGService.ontologyManager.getKnowledgeGraph(iri);
			classes = MwsxKGService.ontologyManager.getKGNamedGraphs(kg);
		}
		catch(Throwable t) {
			return MwsxService.manageError(t, response);
		}
		response.setHeader("MASTRO-MESSAGE", "OK");
		response.setStatus(HttpServletResponse.SC_OK);
		return Response.ok().entity(classes).build();
	}
	
	@Path("/knowledgeGraph/instances")
	@GET
	@Produces("application/json")
	@Consumes("application/json")
	@MwsxAvailable
	public Response get__knowledgeGraph_instances(@Context HttpServletRequest request,
			@Context HttpServletResponse response, @QueryParam("iri") String iri,
			@QueryParam("namedGraph") String namedGraph
	) {
		if (MwsxService.LOG_METHODS) MwsxService.logMethodInfo(iri);
		Set<String> classes = null;
		try {
			classes = MwsxKGService.ontologyManager.getKGMentionedInstances(iri, namedGraph);
		}
		catch(Throwable t) {
			return MwsxService.manageError(t, response);
		}
		response.setHeader("MASTRO-MESSAGE", "OK");
		response.setStatus(HttpServletResponse.SC_OK);
		return Response.ok().entity(classes).build();
	}

	@Path("/knowledgeGraph/file")
	@GET
	@Produces("application/json")
	@Consumes("application/json")
	public Response get__knowledgeGraph_file(@Context HttpServletRequest request, @Context HttpServletResponse response,
			@QueryParam("iri") String iri, @QueryParam("format") String format,
			@QueryParam("namedGraph") String namedGraph, @QueryParam("fileName") String fileName) {
		if (MwsxService.LOG_METHODS) MwsxService.logMethodInfo(iri);
		FileInfo info = null;
		try {
			info = MwsxKGService.ontologyManager.downloadKnowledgeGraph(iri, namedGraph, format, fileName);
		}
		catch(Throwable t) {
			return MwsxService.manageError(t, response);
		}
		response.setHeader("MASTRO-MESSAGE", "Method not implemented yet");
		response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
		return Response.ok().entity(info).build();
	}

	@Path("/knowledgeGraph/union")
	@PUT
	@Produces("application/json")
	@Consumes("application/json")
	public Response patch__knowledgeGraph_union(@Context HttpServletRequest request,
			@Context HttpServletResponse response, KnowledgeGraphUnion kgu

	) {
		response.setHeader("MASTRO-MESSAGE", "Method not implemented yet");
		response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
		return null;
	}

	@Path("/knowledgeGraph/union/ontology")
	@PUT
	@Produces("application/json")
	@Consumes("application/json")
	public Response patch__knowledgeGraph_union_ontology(@Context HttpServletRequest request,
			@Context HttpServletResponse response, KnowledgeGraphOntologyUnion kgou

	) {
		response.setHeader("MASTRO-MESSAGE", "Method not implemented yet");
		response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
		return null;
	}

	@Path("/knowledgeGraph/union/queryKg")
	@PUT
	@Produces("application/json")
	@Consumes("application/json")
	public Response patch__knowledgeGraph_union_queryKg(@Context HttpServletRequest request,
			@Context HttpServletResponse response, KnowledgeGraphDestinationQueryKg kgdqk

	) {
		response.setHeader("MASTRO-MESSAGE", "Method not implemented yet");
		response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
		return null;
	}

	@Path("/knowledgeGraph/query/catalog")
	@GET
	@Produces("application/json")
	@Consumes("application/json")
	@MwsxAvailable
	public Response get__knowledgeGraph_query_catalog(@Context HttpServletRequest request,
			@Context HttpServletResponse response, @QueryParam("iri") String iri) {
		if (MwsxService.LOG_METHODS) MwsxService.logMethodInfo(iri);
		OBDACatalog q = null;
		try {
			KnowledgeGraph kg = MwsxKGService.ontologyManager.getKnowledgeGraph(iri);
			if (kg == null)
				return Response.status(404).entity("Cannot find KG with IRI " + iri).build();
			q = MwsxKGService.ontologyManager.getKnowledgeGraphQueriesCatalog(kg);
			
		}
		catch(Throwable t) {
			return MwsxService.manageError(t, response);
		}
		response.setHeader("MASTRO-MESSAGE", "OK");
		response.setStatus(HttpServletResponse.SC_OK);
		return Response.ok().entity(q).build();
	}

	@Path("/knowledgeGraph/query/catalog/export")
	@GET
	@Produces("application/json")
	@Consumes("application/json")
	public Response get__knowledgeGraph_query_catalog_export(@Context HttpServletRequest request,
			@Context HttpServletResponse response, @QueryParam("iri") String iri) {
		response.setHeader("MASTRO-MESSAGE", "Method not implemented yet");
		response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
		return null;
	}

	@Path("/knowledgeGraph/query/catalog/{queryID}")
	@GET
	@Produces("application/json")
	@Consumes("application/json")
	@MwsxAvailable
	public Response get__knowledgeGraph_query_catalog_queryID(@Context HttpServletRequest request,
			@Context HttpServletResponse response, @PathParam("queryID") String queryID,
			@QueryParam("iri") String iri) {
		if (MwsxService.LOG_METHODS) MwsxService.logMethodInfo(iri);
		SPARQLQuery q = null;
		try {
			KnowledgeGraph kg = MwsxKGService.ontologyManager.getKnowledgeGraph(iri);
			if (kg == null)
				return Response.status(404).entity("Cannot find KG with IRI " + iri).build();
			q = MwsxKGService.ontologyManager.getKnowledgeGraphQuery(kg, queryID);
			
		}
		catch(Throwable t) {
			return MwsxService.manageError(t, response);
		}
		response.setHeader("MASTRO-MESSAGE", "OK");
		response.setStatus(HttpServletResponse.SC_OK);
		return Response.ok().entity(q).build();
	}

	@Path("/knowledgeGraph/query/catalog")
	@POST
	@Produces("application/json")
	@Consumes("application/json")
	@MwsxAvailable
	public Response post__knowledgeGraph_query_catalog(@Context HttpServletRequest request,
			@Context HttpServletResponse response, @QueryParam("iri") String iri, SPARQLQuery sparql) {
		if (MwsxService.LOG_METHODS) MwsxService.logMethodInfo(iri);
		try {
			KnowledgeGraph kg = MwsxKGService.ontologyManager.getKnowledgeGraph(iri);
			if (kg == null)
				return Response.status(404).entity("Cannot find KG with IRI " + iri).build();
			MwsxKGService.ontologyManager.addKnowledgeGraphQuery(kg, sparql);			
		}
		catch(Throwable t) {
			return MwsxService.manageError(t, response);
		}
		response.setHeader("MASTRO-MESSAGE", "OK");
		response.setStatus(HttpServletResponse.SC_OK);
		return Response.ok().entity(true).build();
	}

	@Path("/knowledgeGraph/query/catalog/{queryID}")
	@PUT
	@Produces("application/json")
	@Consumes("application/json")
	@MwsxAvailable
	public Response put__knowledgeGraph_query_catalog_queryID(@Context HttpServletRequest request,
			@Context HttpServletResponse response, @PathParam("queryID") String queryID, @QueryParam("iri") String iri,
			SPARQLQuery sparql) {
		if (MwsxService.LOG_METHODS) MwsxService.logMethodInfo(iri);
		try {
			KnowledgeGraph kg = MwsxKGService.ontologyManager.getKnowledgeGraph(iri);
			if (kg == null)
				return Response.status(404).entity("Cannot find KG with IRI " + iri).build();
			MwsxKGService.ontologyManager.editKnowledgeGraphQuery(kg, sparql);			
		}
		catch(Throwable t) {
			return MwsxService.manageError(t, response);
		}
		response.setHeader("MASTRO-MESSAGE", "OK");
		response.setStatus(HttpServletResponse.SC_OK);
		return Response.ok().entity(true).build();
	}

	@Path("/knowledgeGraph/query/catalog/{queryID}")
	@DELETE
	@Produces("application/json")
	@Consumes("application/json")
	@MwsxAvailable
	public Response delete__knowledgeGraph_query_catalog_queryID(@Context HttpServletRequest request,
			@Context HttpServletResponse response, @PathParam("queryID") String queryID,
			@QueryParam("iri") String iri) {
		if (MwsxService.LOG_METHODS) MwsxService.logMethodInfo(iri);
		try {
			KnowledgeGraph kg = MwsxKGService.ontologyManager.getKnowledgeGraph(iri);
			if (kg == null)
				return Response.status(404).entity("Cannot find KG with IRI " + iri).build();
			MwsxKGService.ontologyManager.deleteKnowledgeGraphQuery(kg, queryID);			
		}
		catch(Throwable t) {
			return MwsxService.manageError(t, response);
		}
		response.setHeader("MASTRO-MESSAGE", "OK");
		response.setStatus(HttpServletResponse.SC_OK);
		return Response.ok().entity(true).build();
	}

	@Path("/knowledgeGraph/query/start")
	@POST
	@Produces("application/json")
	@Consumes("application/json")
	public Response post__knowledgeGraph_query_start(@Context HttpServletRequest request,
			@Context HttpServletResponse response, @QueryParam("iri") String iri, 
			@QueryParam("namedGraph") String namedGraph, SPARQLQuery sparql) {
		SPARQLQueryExecution exec = null;
		try {
			KnowledgeGraph kg = MwsxKGService.ontologyManager.getKnowledgeGraph(iri);
			if (kg == null)
				return Response.status(404).entity("Cannot find KG with IRI " + iri).build();
			exec = MwsxKGService.ontologyManager.startKGQuery(this.getMwsxSession(request), kg, namedGraph, sparql);			
		}
		catch(Throwable t) {
			return MwsxService.manageError(t, response);
		}
		response.setHeader("MASTRO-MESSAGE", "Method not implemented yet");
		response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
		return Response.ok().entity(exec).build();
	}

	@Path("/knowledgeGraph/query/catalog/{queryID}/start")
	@POST
	@Produces("application/json")
	@Consumes("application/json")
	@MwsxAvailable
	public Response post__knowledgeGraph_query_catalog_queryID_start(@Context HttpServletRequest request,
			@Context HttpServletResponse response, @PathParam("queryID") String queryID, @QueryParam("iri") String iri,
			@QueryParam("namedGraph") String namedGraph) {
		if (MwsxService.LOG_METHODS) MwsxService.logMethodInfo(queryID, iri, namedGraph);
		SPARQLQueryExecution exec = null;
		try {
			KnowledgeGraph kg = MwsxKGService.ontologyManager.getKnowledgeGraph(iri);
			if (kg == null)
				return Response.status(404).entity("Cannot find KG with IRI " + iri).build();
			exec = MwsxKGService.ontologyManager.startKGQueryFromCatalog(this.getMwsxSession(request), kg, namedGraph, queryID);			
		}
		catch(Throwable t) {
			return MwsxService.manageError(t, response);
		}
		response.setHeader("MASTRO-MESSAGE", "OK");
		response.setStatus(HttpServletResponse.SC_OK);
		return Response.ok().entity(exec).build();
	}

	@Path("/knowledgeGraph/query/{queryID}/stop")
	@PUT
	@Produces("application/json")
	@Consumes("application/json")
	@MwsxAvailable
	public Response get__knowledgeGraph_query_executionID_stop(@Context HttpServletRequest request,
			@Context HttpServletResponse response, @PathParam("queryID") String queryID,
			@QueryParam("iri") String iri) {
		if (MwsxService.LOG_METHODS) MwsxService.logMethodInfo(iri);
		try {
			KnowledgeGraph kg = MwsxKGService.ontologyManager.getKnowledgeGraph(iri);
			if (kg == null)
				return Response.status(404).entity("Cannot find KG with IRI " + iri).build();
			MwsxKGService.ontologyManager.stopKGQueryFromCatalog(this.getMwsxSession(request), kg, queryID);			
		}
		catch(Throwable t) {
			return MwsxService.manageError(t, response);
		}
		response.setHeader("MASTRO-MESSAGE", "OK");
		response.setStatus(HttpServletResponse.SC_OK);
		return Response.ok().entity(true).build();
	}

	@Path("/knowledgeGraph/query/{queryID}/exportResults")
	@GET
	@Produces("application/json")
	@Consumes("application/json")
	public Response get__knowledgeGraph_query_executionID_exportResults(@Context HttpServletRequest request,
			@Context HttpServletResponse response, @PathParam("queryID") String queryID,
			@QueryParam("iri") String iri) {
		response.setHeader("MASTRO-MESSAGE", "Method not implemented yet");
		response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
		return null;
	}

	@Path("/knowledgeGraph/query/{queryID}/status")
	@GET
	@Produces("application/json")
	@Consumes("application/json")
	@MwsxAvailable
	public Response get__knowledgeGraph_query_executionID_status(@Context HttpServletRequest request,
			@Context HttpServletResponse response, @PathParam("queryID") String queryID,
			@QueryParam("iri") String iri) {
		if (MwsxService.LOG_METHODS) MwsxService.logMethodInfo(iri);
		SPARQLStatus status = null;
		try {
			KnowledgeGraph kg = MwsxKGService.ontologyManager.getKnowledgeGraph(iri);
			if (kg == null)
				return Response.status(404).entity("Cannot find KG with IRI " + iri).build();
			status = MwsxKGService.ontologyManager.getKnowledgeGraphQueryStatus(kg, queryID);			
		}
		catch(Throwable t) {
			return MwsxService.manageError(t, response);
		}
		response.setHeader("MASTRO-MESSAGE", "OK");
		response.setStatus(HttpServletResponse.SC_OK);
		return Response.ok().entity(status).build();
	}

	@Path("/knowledgeGraph/query/{queryID}/results")
	@GET
	@Produces("application/json")
	@Consumes("application/json")
	@MwsxAvailable
	public Response get__knowledgeGraph_query_executionID_results(@Context HttpServletRequest request,
			@Context HttpServletResponse response, @PathParam("queryID") String queryID,
			@QueryParam("iri") String iri, @QueryParam("pagesize") int pagesize, @QueryParam("offset") int offset) {
		if (MwsxService.LOG_METHODS) MwsxService.logMethodInfo(iri);
		SPARQLResults res = null;
		try {
			KnowledgeGraph kg = MwsxKGService.ontologyManager.getKnowledgeGraph(iri);
			if (kg == null)
				return Response.status(404).entity("Cannot find KG with IRI " + iri).build();
			res = MwsxKGService.ontologyManager.getKGQueryResult(this.getMwsxSession(request), kg, queryID, pagesize, offset);			
		}
		catch(Throwable t) {
			return MwsxService.manageError(t, response);
		}
		response.setHeader("MASTRO-MESSAGE", "OK");
		response.setStatus(HttpServletResponse.SC_OK);
		return Response.ok().entity(res).build();
	}

	@Path("/knowledgeGraph/prefixes")
	@GET
	@Produces("application/json")
	@Consumes("application/json")
	public Response get__knowledgeGraph_prefixes(@Context HttpServletRequest request,
			@Context HttpServletResponse response, @QueryParam("iri") String iri) {
		response.setHeader("MASTRO-MESSAGE", "Method not implemented yet");
		response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
		return null;
	}
	
	@Path("/knowledgeGraph/instance/page")
	@GET
	@Produces("application/json")
	@Consumes("application/json")
	@MwsxAvailable
	public Response get__knowledgeGraph_instance_page(@Context HttpServletRequest request,
			@Context HttpServletResponse response, @QueryParam("instanceIri") String instanceIri, 
			@QueryParam("kgIri") String kgIri, @QueryParam("namedGraph") String namedGraph) {
		if (MwsxService.LOG_METHODS) MwsxService.logMethodInfo(kgIri, instanceIri);
		InstancePage res = null;
		try {
			KnowledgeGraph kg = MwsxKGService.ontologyManager.getKnowledgeGraph(kgIri);
			if (kg == null)
				return Response.status(404).entity("Cannot find KG with IRI " + kgIri).build();
			res = MwsxKGService.ontologyManager.getInstancePage(this.getMwsxSession(request), kg, instanceIri, namedGraph);			
		}
		catch(Throwable t) {
			return MwsxService.manageError(t, response);
		}
		response.setHeader("MASTRO-MESSAGE", "OK");
		response.setStatus(HttpServletResponse.SC_OK);
		return Response.ok().entity(res).build();
	}
	
	@Path("/knowledgeGraph/instance/objectType")
	@GET
	@Produces("application/json")
	@Consumes("application/json")
	@MwsxAvailable
	public Response get__knowledgeGraph_instance_objectType(@Context HttpServletRequest request,
			@Context HttpServletResponse response,  
			@QueryParam("kgIri") String kgIri, @QueryParam("namedGraph") String namedGraph,
			@QueryParam("object") String object, @QueryParam("predicate") String predicate, 
			@QueryParam("type") String type, @QueryParam("page") int page) {
		if (MwsxService.LOG_METHODS) MwsxService.logMethodInfo(kgIri, namedGraph, object, predicate, type, page);
		ObjectPredicatePageType res = null;
		try {
			KnowledgeGraph kg = MwsxKGService.ontologyManager.getKnowledgeGraph(kgIri);
			if (kg == null)
				return Response.status(404).entity("Cannot find KG with IRI " + kgIri).build();
			res = MwsxKGService.ontologyManager.getObjectTypePage(this.getMwsxSession(request), kg, namedGraph, object, predicate, type, page);			
		}
		catch(Throwable t) {
			return MwsxService.manageError(t, response);
		}
		response.setHeader("MASTRO-MESSAGE", "OK");
		response.setStatus(HttpServletResponse.SC_OK);
		return Response.ok().entity(res).build();
	}
	
	@Path("/knowledgeGraph/instance/subjectType")
	@GET
	@Produces("application/json")
	@Consumes("application/json")
	@MwsxAvailable
	public Response get__knowledgeGraph_instance_subjectType(@Context HttpServletRequest request,
			@Context HttpServletResponse response,  
			@QueryParam("kgIri") String kgIri, @QueryParam("namedGraph") String namedGraph,
			@QueryParam("subject") String subject, @QueryParam("predicate") String predicate, 
			@QueryParam("type") String type, @QueryParam("page") int page) {
		if (MwsxService.LOG_METHODS) MwsxService.logMethodInfo(kgIri, namedGraph, subject, predicate, type, page);
		SubjectPredicatePageType res = null;
		try {
			KnowledgeGraph kg = MwsxKGService.ontologyManager.getKnowledgeGraph(kgIri);
			if (kg == null)
				return Response.status(404).entity("Cannot find KG with IRI " + kgIri).build();
			res = MwsxKGService.ontologyManager.getSubjectTypePage(this.getMwsxSession(request), kg, namedGraph, subject, predicate, type, page);			
		}
		catch(Throwable t) {
			return MwsxService.manageError(t, response);
		}
		response.setHeader("MASTRO-MESSAGE", "OK");
		response.setStatus(HttpServletResponse.SC_OK);
		return Response.ok().entity(res).build();
	}
	
	@Path("/knowledgeGraph/store/file")
	@POST
	@Produces("application/json")
	@Consumes("application/json")
	@MwsxAvailable
	public Response post__knowledgeGraph_store_file(@Context HttpServletRequest request,
			@Context HttpServletResponse response, FileInfo info) {
		if (MwsxService.LOG_METHODS) MwsxService.logMethodInfo();
		boolean res = false;
		try {
			res = MwsxKGService.ontologyManager.postKGStoreFile(this.getMwsxSession(request), info);
		}
		catch(Throwable t) {
			return MwsxService.manageError(t, response);
		}
		response.setHeader("MASTRO-MESSAGE", "OK");
		response.setStatus(HttpServletResponse.SC_OK);
		return Response.ok().entity(res).build();
	}
	
	@Path("/knowledgeGraph/store/file/{name}")
	@DELETE
	@Produces("application/json")
	@Consumes("application/json")
	@MwsxAvailable
	public Response delete__knowledgeGraph_store_file(@Context HttpServletRequest request,
			@Context HttpServletResponse response, @PathParam("name") String name) {
		if (MwsxService.LOG_METHODS) MwsxService.logMethodInfo();
		boolean res = false;
		try {
			res = MwsxKGService.ontologyManager.deleteKGStoreFile(this.getMwsxSession(request), name);
		}
		catch(Throwable t) {
			return MwsxService.manageError(t, response);
		}
		response.setHeader("MASTRO-MESSAGE", "OK");
		response.setStatus(HttpServletResponse.SC_OK);
		return Response.ok().entity(res).build();
	}
	
	@Path("/knowledgeGraph/store/file")
	@GET
	@Produces("application/json")
	@Consumes("application/json")
	@MwsxAvailable
	public Response get__knowledgeGraph_store_file(@Context HttpServletRequest request,
			@Context HttpServletResponse response) {
		if (MwsxService.LOG_METHODS) MwsxService.logMethodInfo();
		List<KGStoreFileInfoEntry> res = null;
		try {
			res = MwsxKGService.ontologyManager.getKGStoreFileEntries(this.getMwsxSession(request));
		}
		catch(Throwable t) {
			return MwsxService.manageError(t, response);
		}
		response.setHeader("MASTRO-MESSAGE", "OK");
		response.setStatus(HttpServletResponse.SC_OK);
		return Response.ok().entity(res).build();
	}
	
	@Path("/knowledgeGraph/store/file/{name}")
	@GET
	@Produces("application/json")
	@Consumes("application/json")
	@MwsxAvailable
	public Response get__knowledgeGraph_store_file(@Context HttpServletRequest request,
			@Context HttpServletResponse response, @PathParam("name") String name) {
		if (MwsxService.LOG_METHODS) MwsxService.logMethodInfo();
		KGStoreFileInfoEntry res = null;
		try {
			res = MwsxKGService.ontologyManager.getKGStoreFileEntry(this.getMwsxSession(request), name);
		}
		catch(Throwable t) {
			return MwsxService.manageError(t, response);
		}
		response.setHeader("MASTRO-MESSAGE", "OK");
		response.setStatus(HttpServletResponse.SC_OK);
		return Response.ok().entity(res).build();
	}
	
	@Path("/knowledgeGraph/upload/file")
	@POST
	@Produces("application/json")
	@Consumes("application/json")
	@MwsxAvailable
	public Response post__knowledgeGraph_upload_file(@Context HttpServletRequest request,
			@Context HttpServletResponse response, @QueryParam("iri") String iri, FileInfo info) {
		if (MwsxService.LOG_METHODS) MwsxService.logMethodInfo();
		boolean res = false;
		try {
			res = MwsxKGService.ontologyManager.postKGUploadFile(this.getMwsxSession(request), info, iri);
		}
		catch(Throwable t) {
			return MwsxService.manageError(t, response);
		}
		response.setHeader("MASTRO-MESSAGE", "OK");
		response.setStatus(HttpServletResponse.SC_OK);
		return Response.ok().entity(res).build();
	}
	
	@Path("/knowledgeGraph/delete/file")
	@DELETE
	@Produces("application/json")
	@Consumes("application/json")
	@MwsxAvailable
	public Response delete__knowledgeGraph_delete_file(@Context HttpServletRequest request,
			@Context HttpServletResponse response, @QueryParam("iri") String iri, List<String> files) {
		if (MwsxService.LOG_METHODS) MwsxService.logMethodInfo();
		boolean res = false;
		try {
			res = MwsxKGService.ontologyManager.deleteKGRemoveFile(this.getMwsxSession(request), iri, files);
		}
		catch(Throwable t) {
			return MwsxService.manageError(t, response);
		}
		response.setHeader("MASTRO-MESSAGE", "OK");
		response.setStatus(HttpServletResponse.SC_OK);
		return Response.ok().entity(res).build();
	}
	
	@Path("/knowledgeGraph/upload/import")
	@PUT
	@Produces("application/json")
	@Consumes("application/json")
	@MwsxAvailable
	public Response put__knowledgeGraph_upload_import(@Context HttpServletRequest request,
			@Context HttpServletResponse response, KnowledgeGraphFileDestination fileDestination) {
		if (MwsxService.LOG_METHODS) MwsxService.logMethodInfo();
		boolean res = false;
		try {
			res = MwsxKGService.ontologyManager.putKGUploadImport(this.getMwsxSession(request), fileDestination);
		}
		catch(Throwable t) {
			return MwsxService.manageError(t, response);
		}
		response.setHeader("MASTRO-MESSAGE", "OK");
		response.setStatus(HttpServletResponse.SC_OK);
		return Response.ok().entity(res).build();
	}
	
	@Path("/knowledgeGraph/upload/remove")
	@DELETE
	@Produces("application/json")
	@Consumes("application/json")
	@MwsxAvailable
	public Response delete__knowledgeGraph_upload_remove(@Context HttpServletRequest request,
			@Context HttpServletResponse response, KnowledgeGraphFileDestination fileDestination) {
		if (MwsxService.LOG_METHODS) MwsxService.logMethodInfo();
		boolean res = false;
		try {
			res = MwsxKGService.ontologyManager.putKGUploadRemove(this.getMwsxSession(request), fileDestination);
		}
		catch(Throwable t) {
			return MwsxService.manageError(t, response);
		}
		response.setHeader("MASTRO-MESSAGE", "OK");
		response.setStatus(HttpServletResponse.SC_OK);
		return Response.ok().entity(res).build();
	}
	
	@Path("/knowledgeGraph/upload/files")
	@GET
	@Produces("application/json")
	@Consumes("application/json")
	@MwsxAvailable
	public Response get__knowledgeGraph_upload_files(@Context HttpServletRequest request,
			@Context HttpServletResponse response, @QueryParam("iri") String iri) {
		if (MwsxService.LOG_METHODS) MwsxService.logMethodInfo();
		List<KnowledgeGraphFileInfo> res = null;
		try {
			res = MwsxKGService.ontologyManager.getKGUploadedFiles(this.getMwsxSession(request), iri);
		}
		catch(Throwable t) {
			return MwsxService.manageError(t, response);
		}
		response.setHeader("MASTRO-MESSAGE", "OK");
		response.setStatus(HttpServletResponse.SC_OK);
		return Response.ok().entity(res).build();
	}
	
	@Path("/knowledgeGraph/union/queryOBDA")
	@PUT
	@Produces("application/json")
	@Consumes("application/json")
	@MwsxAvailable
	public Response put__knowledgeGraph_union_queryOBDA(@Context HttpServletRequest request,
			@Context HttpServletResponse response, 
			@QueryParam("fileName") String fileName, @QueryParam("uploadOnly") boolean uploadOnly,
			KnowledgeGraphDestinationQueryOBDA queryOBDA) {
		if (MwsxService.LOG_METHODS) MwsxService.logMethodInfo();
		boolean res = false;
		try {
			res = MwsxKGService.ontologyManager.putKGUnionQueryOBDA(this.getMwsxSession(request), queryOBDA, uploadOnly);
		}
		catch(Throwable t) {
			return MwsxService.manageError(t, response);
		}
		response.setHeader("MASTRO-MESSAGE", "OK");
		response.setStatus(HttpServletResponse.SC_OK);
		return Response.ok().entity(res).build();
	}
	
	private MwsxSession getMwsxSession(HttpServletRequest request) {
		logger.debug(request.getClass().getName());
		logger.debug(request.getHeaderNames().toString());
		Enumeration<String> e = request.getHeaderNames();
		while(e.hasMoreElements()) {
			String headerName = e.nextElement();
			logger.debug("   -> " + headerName);
			if (headerName.equalsIgnoreCase(AuthenticationFilter.X_MONOLITH_SESSION_ID)) {
				String id = request.getHeader(headerName);
				logger.debug("     -> " + id);
				return MwsxSessionManager.getSessionManager().getSessionByID(id);
			}
		}
		throw new RuntimeException("Cannot retrieve session");
	}

}
