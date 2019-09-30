package com.mwsx.test;

import org.apache.jena.graph.Node;
import org.apache.jena.graph.NodeFactory;
import org.apache.jena.graph.Triple;
import org.apache.jena.query.Dataset;
import org.apache.jena.query.Query;
import org.apache.jena.query.QueryExecution;
import org.apache.jena.query.QueryExecutionFactory;
import org.apache.jena.query.QueryFactory;
import org.apache.jena.query.QuerySolution;
import org.apache.jena.query.ResultSet;
import org.apache.jena.query.ResultSetFormatter;
import org.apache.jena.rdf.model.Model;
import org.apache.jena.rdf.model.ModelFactory;
import org.apache.jena.rdf.model.ResourceFactory;
import org.apache.jena.rdf.model.Statement;
import org.apache.jena.rdf.model.StmtIterator;
import org.apache.jena.riot.Lang;
import org.apache.jena.riot.RDFDataMgr;
import org.apache.jena.sparql.core.DatasetGraph;
import org.apache.jena.sparql.core.Quad;
import org.apache.jena.sparql.core.mem.DatasetGraphInMemory;
import org.apache.jena.tdb.TDBFactory;

import com.mwsx.model.KnowledgeGraph;

public class KGSampleCode {

	public static void main(String[] args) {
		KnowledgeGraph kg = new KnowledgeGraph();
		
		if (true) return;
		testTDBJena();
		
		if (true) return;
		Model model = ModelFactory.createDefaultModel();
		Model model2 = ModelFactory.createDefaultModel() ;
		model.read("./src/test/resources/triples/Regione_01.triples", "N3");
		Node node = NodeFactory.createURI("http://www.ruzzi.com/ciccio");
		
		DatasetGraph g = new DatasetGraphInMemory();
		
		StmtIterator stmt = model.listStatements();
		while(stmt.hasNext()){
			Statement s = stmt.next();
			Triple t = s.asTriple();
			Quad q = Quad.create(node, t);
			g.add(q);
		}
		
		RDFDataMgr.write(System.out, g, Lang.NQUADS);
	}
	
	public static void testTDBJena() {
		String dir = "./src/test/resources/tdb_store";
		Dataset dataset = TDBFactory.createDataset(dir);
		System.out.println(dataset.asDatasetGraph().getDefaultGraph().size());
//		Model m = ModelFactory.createDefaultModel();
//		m.read("./src/test/resources/triples/Regione_01.ntriples", "N3");
//		dataset.addNamedModel("http://pippo/o1", m);
//		Model model = dataset.getDefaultModel();
//		model.removeAll();
//		model.read("./src/test/resources/triples/sample.turtle", "N3");
//		model.add(ResourceFactory.createStatement(ResourceFactory.createResource("http://subj"),
//				ResourceFactory.createProperty("http://pred"),
//				ResourceFactory.createPlainLiteral("http://obj")));
//		
		if (true) return;
//		String sparqlQueryString = "SELECT (count(*) AS ?count) { ?s ?p ?o }" ;
		String sparqlQueryString = "SELECT ?s ?p ?o {graph http://pippo/o1 { ?s ?p ?o }}" ;
        // See http://incubator.apache.org/jena/documentation/query/app_api.html
        
//        Query query = QueryFactory.create(sparqlQueryString) ;
//        QueryExecution qexec = QueryExecutionFactory.create(query, m) ;
//        ResultSet results = qexec.execSelect() ;
//        while(results.hasNext()) {
//        	QuerySolution qs = results.next();
//        	System.out.println(qs);
//        }
//        qexec.close() ;
//
//        dataset.close();
		//model.read("./src/test/resources/triples/Regione_01.triples", "N3");
		//model.read("./src/test/resources/triples/Regione_10.triples", "N3");
	}
	
}
