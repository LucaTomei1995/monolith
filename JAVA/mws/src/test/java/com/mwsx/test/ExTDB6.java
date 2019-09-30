package com.mwsx.test;

import static java.lang.System.out;

import java.util.Iterator;

import org.apache.jena.iri.IRIFactory;

import org.apache.jena.graph.Graph;
import org.apache.jena.query.*;
import org.apache.jena.rdf.model.Model;
import org.apache.jena.rdf.model.ModelFactory;
import org.apache.jena.rdf.model.Property;
import org.apache.jena.rdf.model.Resource;
import org.apache.jena.rdf.model.Statement;
import org.apache.jena.rdf.model.StmtIterator;
import org.apache.jena.tdb.TDB;
import org.apache.jena.tdb.TDBFactory;

/** Example of single threaded use of TDB working with the Jena RDF API */
public class ExTDB6 {
	/// observe the non-http "protocol", because it is a bad precident
	/// to only use http IRI when there is no http protocol involved
	public static final String MY_NS = "x-ns://example.org/ns1/";

	public static void main(String[] args) throws Exception {
		/// turn off the "No BGP optimizer warning"
		TDB.setOptimizerWarningFlag(false);

		final IRIFactory iriFactory = IRIFactory.iriImplementation();//   semanticWebImplementation();

		final String DATASET_DIR_NAME = "/home/marco/Scrivania/data0";
		final Dataset data0 = TDBFactory.createDataset(DATASET_DIR_NAME);

		// show the currently registered names
		if (!data0.listNames().hasNext())
			System.out.println("No names defined into the TDB " + DATASET_DIR_NAME);
		for (Iterator<String> it = data0.listNames(); it.hasNext();) {
			out.println("NAME=" + it.next());
		}

		out.println("getting named model...");
		/// this is the OWL portion
		final Model model = data0.getNamedModel(MY_NS);
		out.println("Model := " + model);

		out.println("getting graph...");
		/// this is the DATA in that MODEL
		final Graph graph = model.getGraph();
		out.println("Graph := " + graph);


		if (graph.isEmpty()) {
			Model m = ModelFactory.createDefaultModel();
			m.read("./src/test/resources/triples/Regione_01.triples", "N3");
			StmtIterator l = m.listStatements();
			while(l.hasNext()) {
				Statement st = l.next();
				final Resource product1 = model.createResource(
	                    iriFactory.construct( st.asTriple().getSubject().toString() )
	                        .toString() );
	
	            final Property hasName = model.createProperty( st.asTriple().getPredicate().toString() );
	            final Statement stmt = model.createStatement(
	                    product1, hasName, model.createLiteral(st.asTriple().getObject().toString() ));
//	            out.println("Statement = " + stmt);
//	
	            model.add(stmt);
	
	            // just for fun
	            out.println("Triple := " + stmt.asTriple().toString());
			}
			
//            final Resource product1 = model.createResource(
//                    iriFactory.construct( MY_NS +"product/1" )
//                        .toString() );
//
//            final Property hasName = model.createProperty( MY_NS, "#hasName");
//            final Statement stmt = model.createStatement(
//                    product1, hasName, model.createLiteral("Beach Ball","en") );
//            out.println("Statement = " + stmt);
//
//            model.add(stmt);
//
//            // just for fun
//            out.println("Triple := " + stmt.asTriple().toString());
		} else {
			out.println("Graph is not Empty; it has " + graph.size() + " Statements");
			long t0, t1;
			t0 = System.currentTimeMillis();
			final Query q = QueryFactory.create(
//					"PREFIX exns: <" + MY_NS + "#>\n" + "PREFIX exprod: <" + MY_NS + "product/>\n" + " SELECT ?class "
					"SELECT ?class "
					// if you don't provide the Model to the
					// QueryExecutionFactory below, then you'll need
					// to specify the FROM;
					// you *can* always specify it, if you want
					// +" FROM <"+MY_NS+">\n"
					// +" WHERE { ?node <"+MY_NS+"#hasName> ?name }"
					// +" WHERE { ?node exns:hasName ?name }"
					// +" WHERE { exprod:1 exns:hasName ?name }"
							+ " WHERE { ?res <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> ?class }");
			out.println("Query := " + q);
			t1 = System.currentTimeMillis();
			out.println("QueryFactory.TIME=" + (t1 - t0));

			t0 = System.currentTimeMillis();
			final QueryExecution qExec = QueryExecutionFactory
					// if you query the whole DataSet,
					// you have to provide a FROM in the SparQL
					// .create(q, data0);
					.create(q, model);
			t1 = System.currentTimeMillis();
			out.println("QueryExecutionFactory.TIME=" + (t1 - t0));

			try {
				t0 = System.currentTimeMillis();
				ResultSet rs = qExec.execSelect();
				t1 = System.currentTimeMillis();
				out.println("executeSelect.TIME=" + (t1 - t0));
				while (rs.hasNext()) {
					QuerySolution sol = rs.next();
//					out.println("Solution := " + sol);
					for (Iterator<String> names = sol.varNames(); names.hasNext();) {
						final String name = names.next();
						out.println("\t" + name + " := " + sol.get(name));
					}
				}
			} finally {
				qExec.close();
			}
		}
		out.println("closing graph");
		graph.close();
		out.println("closing model");
		model.close();
		// out.println("closing DataSetGraph");
		// dsg.close();
		out.println("closing DataSet");
		data0.close();
	}
}