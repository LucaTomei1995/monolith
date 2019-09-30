package com.mwsx.engine;

import static java.lang.System.out;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;

import org.apache.jena.graph.Graph;
import org.apache.jena.iri.IRIFactory;
import org.apache.jena.query.Dataset;
import org.apache.jena.query.Query;
import org.apache.jena.query.QueryExecution;
import org.apache.jena.query.QueryExecutionFactory;
import org.apache.jena.query.QueryFactory;
import org.apache.jena.query.QuerySolution;
import org.apache.jena.query.ResultSet;
import org.apache.jena.rdf.model.Model;
import org.apache.jena.rdf.model.RDFNode;
import org.apache.jena.tdb.TDB;
import org.apache.jena.tdb.TDBFactory;

import com.fasterxml.jackson.core.JsonGenerationException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.mwsx.model.KnowledgeGraph;
import com.mwsx.model.SPARQLQuery;
import com.mwsx.model.SPARQLResult;
import com.mwsx.model.SPARQLResults;
import com.mwsx.model.SPARQLStatus;

public class KGQueryRunner implements Runnable {

	private SPARQLQuery query;
	private Dataset dataset;
	private KnowledgeGraph kg;
	private SPARQLResults results;
	private boolean hasErrors;
	private Throwable error;
	private String namedGraph;
	private boolean stop;

	public KGQueryRunner(KnowledgeGraph kg, String datasetFolder, String namedGraph, SPARQLQuery query) {
		this.dataset = TDBFactory.createDataset(datasetFolder);
		this.query = query;
		this.kg = kg;
		this.namedGraph = namedGraph;
	}
	
	public KGQueryRunner(KnowledgeGraph kg, String datasetFolder, SPARQLQuery query) {
		this.dataset = TDBFactory.createDataset(datasetFolder);
		this.query = query;
		this.kg = kg;
	}
	
	public KGQueryRunner(KnowledgeGraph kg, Dataset dataset, SPARQLQuery query) {
		this.dataset = dataset;
		this.query = query;
		this.kg = kg;
	}
	
	public KGQueryRunner(KnowledgeGraph kg, Dataset dataset, SPARQLQuery query, String namedGraph) {
		this.dataset = dataset;
		this.query = query;
		this.kg = kg;
		this.namedGraph = namedGraph;
	}
	
	public SPARQLResults getResults(int pageSize, int offset) {
		SPARQLResults page = new SPARQLResults();
		page.setHeadTerms(this.results.getHeadTerms());
		int start = offset;
		int end = offset + pageSize;
		if (this.results.getResults().size() < end)
			end = this.results.getResults().size();
		if (start < end) {
			List<List<SPARQLResult>> r = new LinkedList<List<SPARQLResult>>();
			for(int i = start; i < end; i++)
				r.add(this.results.getResults().get(i));
			page.setResults(r);
		}
		return page;
	}

	@Override
	public void run() {
		this.results = new SPARQLResults();
		List<List<SPARQLResult>> tuples = new LinkedList<List<SPARQLResult>>();
		this.results.setResults(tuples);
		long start = System.currentTimeMillis();
		Model model = null;
		QueryExecution qExec = null;
		try {
			resetQuery();
			setQueryStatus("RUNNING","_running_",0,0);
			TDB.setOptimizerWarningFlag(false);
	
			model = this.namedGraph == null ? this.dataset.getUnionModel() : this.dataset.getNamedModel(this.namedGraph);
			Query q = QueryFactory.create(query.getQueryCode());
			
			qExec = QueryExecutionFactory.create(q, model);
			int count = 0;
			try {
				ResultSet rs = qExec.execSelect();
				while (rs.hasNext()) {
					count++;
					QuerySolution sol = rs.next();
					List<String> vars = getHeadVars(sol);
					if (vars != null) 
						this.results.setHeadTerms(vars);
					List<SPARQLResult> tuple = getResult(sol, vars, model);
					this.results.getResults().add(tuple);
					if (count%1000 == 0)  {
						if (this.stop) {
							if (qExec != null) qExec.close();
							if (model != null) model.close();
							setFinishedStatus((int)(System.currentTimeMillis() - start), count);
							return;
						}
						setQueryStatus("RUNNING","_running_",(int)(System.currentTimeMillis() - start), count);
					}
				}
			} finally {
				if (qExec != null) qExec.close();
				setFinishedStatus((int)(System.currentTimeMillis() - start), count);
			}
			if (model != null) model.close();
		}
		catch(Throwable t) {
			this.hasErrors = true;
			this.error = t;
			try {
				setFinishedStatus((int)(System.currentTimeMillis() - start), -1);
			} catch (IOException e) {
				throw new RuntimeException("Error finalizing query with errors",e);
			}
			t.printStackTrace();
		}
	}

	public boolean isHasErrors() {
		return hasErrors;
	}

	public void setHasErrors(boolean hasErrors) {
		this.hasErrors = hasErrors;
	}

	public Throwable getError() {
		return error;
	}

	public void setError(Throwable error) {
		this.error = error;
	}

	private List<String> getHeadVars(QuerySolution sol) {
		List<String> r = new LinkedList<String>();
		for (Iterator<String> names = sol.varNames(); names.hasNext();) {
			String name = names.next();
			r.add(name);
		}
		return r;
	}
	
	private List<SPARQLResult> getResult(QuerySolution sol, List<String> vars, Model model) {
		List<SPARQLResult> vn = new LinkedList<SPARQLResult>();
		for (String var : vars) {
			RDFNode node = sol.get(var);
			SPARQLResult res = new SPARQLResult();
			if (node == null) {
				res.setShortIRI("<MISSING HEAD VAR " + String.valueOf(var) + ">");
			}
			else {
				res.setShortIRI(node.toString());				
			}
			vn.add(res);
		}
		return vn;
	}

	private void resetQuery() throws IOException {
		String folderQuery = ("KG_QUERY_" + query.getQueryID().hashCode()).replace("-", "n");
		String kgSubPath = MwsxRepositoryManager.generateKGFolder(kg);
		Path queryFolderPath = Paths.get(MwsxRepositoryManager.getRepositoryManager().getKgHome() + File.separator 
				+ kgSubPath + File.separator + MwsxOntologyManager.KG_QUERIES_FOLDER_NAME 
				+ File.separator + folderQuery);
		if (Files.exists(queryFolderPath)) {
			Path semFinishedPath = Paths.get(MwsxRepositoryManager.getRepositoryManager().getKgHome() + File.separator 
					+ kgSubPath + File.separator + MwsxOntologyManager.KG_QUERIES_FOLDER_NAME 
					+ File.separator + folderQuery + File.separator + "_finished_");
			Files.deleteIfExists(semFinishedPath);
		}
		else
			Files.createDirectories(queryFolderPath);
	}
	
	private void setQueryStatus(String st, String sem, int time, int num) throws JsonGenerationException, JsonMappingException, IOException {
		String folderQuery = ("KG_QUERY_" + query.getQueryID().hashCode()).replace("-", "n");
		String kgSubPath = MwsxRepositoryManager.generateKGFolder(kg);
		Path semPath = Paths.get(MwsxRepositoryManager.getRepositoryManager().getKgHome() + File.separator 
				+ kgSubPath + File.separator + MwsxOntologyManager.KG_QUERIES_FOLDER_NAME 
				+ File.separator + folderQuery + File.separator + sem);
		SPARQLStatus status = new SPARQLStatus();
		status.setStatus(st);
		status.setExecutionTime(time);
		status.setNumResults(num);
		ObjectMapper om = new ObjectMapper();
		om.enable(SerializationFeature.INDENT_OUTPUT);
		om.writeValue(semPath.toFile(), status);
	}
	
	private void setFinishedStatus(int time, int num) throws JsonGenerationException, JsonMappingException, IOException {
		String folderQuery = ("KG_QUERY_" + query.getQueryID().hashCode()).replace("-", "n");
		String kgSubPath = MwsxRepositoryManager.generateKGFolder(kg);
		Path semFinished = Paths.get(MwsxRepositoryManager.getRepositoryManager().getKgHome() + File.separator 
				+ kgSubPath + File.separator + MwsxOntologyManager.KG_QUERIES_FOLDER_NAME 
				+ File.separator + folderQuery + File.separator + "_finished_");
		Path semRunning = Paths.get(MwsxRepositoryManager.getRepositoryManager().getKgHome() + File.separator 
				+ kgSubPath + File.separator + MwsxOntologyManager.KG_QUERIES_FOLDER_NAME 
				+ File.separator + folderQuery + File.separator + "_running_");
		SPARQLStatus status = new SPARQLStatus();
		status.setStatus("FINISHED");
		status.setExecutionTime(time);
		status.setNumResults(num);
		if (Files.exists(semRunning))
			Files.delete(semRunning);
		ObjectMapper om = new ObjectMapper();
		om.enable(SerializationFeature.INDENT_OUTPUT);
		om.writeValue(semFinished.toFile(), status);
	}

	public boolean stop() {
		this.stop = true;
		return true;
	}

}
