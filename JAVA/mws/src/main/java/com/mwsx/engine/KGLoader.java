package com.mwsx.engine;

import java.io.File;
import java.io.IOException;
import java.io.PrintStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

import org.apache.jena.graph.Graph;
import org.apache.jena.query.Dataset;
import org.apache.jena.rdf.model.Model;
import org.apache.jena.rdf.model.ModelFactory;
import org.apache.jena.rdf.model.Statement;
import org.apache.jena.rdf.model.StmtIterator;
import org.apache.jena.tdb.TDB;
import org.apache.jena.tdb.TDBFactory;

import com.mwsx.model.KnowledgeGraphFile;

public class KGLoader implements Runnable {

	private KnowledgeGraphFile kgd;
	private String tdbFolder;
	private String modelFolderPath;
	private String kgFolder;

	public KGLoader(KnowledgeGraphFile _kgd, String _kgFolder, String _tdbFolder, String _modelFolderPath) {
		this.kgd = _kgd;
		this.tdbFolder = _tdbFolder;
		this.modelFolderPath = _modelFolderPath;
		this.kgFolder = _kgFolder;
	}

	@Override
	public void run() {
		Path semLoading = Paths.get(this.kgFolder + File.separator + "_loading_");
		try {
			try {
				Files.createFile(semLoading);
			} catch (IOException e) {
				throw new RuntimeException("Error creating .loading file", e);
			}
			final Dataset data0 = TDBFactory.createDataset(this.tdbFolder);
			TDB.setOptimizerWarningFlag(false);
			final Model model = data0.getNamedModel(this.kgd.getDestination().getNamedGraph());
			final Graph graph = model.getGraph();
			String modelPath = this.modelFolderPath + File.separator + UUID.randomUUID().toString();
			try {
				Files.createFile(Paths.get(modelPath));
			} catch (IOException e1) {
				throw new RuntimeException("Error creating source model file in " + modelPath, e1);
			}
			try {
				Files.write(Paths.get(modelPath),
						java.util.Base64.getDecoder().decode(this.kgd.getFile().getContent()));
			} catch (IOException e1) {
				throw new RuntimeException("Error writing content to source model file in " + modelPath, e1);
			}
			Model m = ModelFactory.createDefaultModel();
			m.read(modelPath, this.kgd.getFile().getFileType());
			StmtIterator l = m.listStatements();
			int count = 0;
			while (l.hasNext()) {
				count++;
				Statement st = l.next();
//				final Resource product1 = model
//						.createResource(iriFactory.construct(st.asTriple().getSubject().toString()).toString());
//
//				final Property hasName = model.createProperty(st.asTriple().getPredicate().toString());
//				final Statement stmt = model.createStatement(product1, hasName,
//						model.createLiteral(st.asTriple().getObject().toString()));
				graph.add(st.asTriple());
				if (count % 1000 == 0) {
					try {
						Files.write(semLoading, new String("Triples loaded: " + count).getBytes());
					} catch (IOException e) {
						throw new RuntimeException("Error writing data to .loading file", e);
					}
				}
			}
			try {
				Files.delete(Paths.get(modelPath));
			} catch (IOException e1) {
				throw new RuntimeException("Error removing source model file", e1);
			}
			try {
				Files.deleteIfExists(semLoading);
			} catch (IOException e) {
				throw new RuntimeException("Error removing .loading file", e);
			}
			Path semReady = Paths.get(this.kgFolder + File.separator + "_ready_");
			try {
				if (!Files.exists(semReady))
					Files.createFile(semReady);
			} catch (IOException e) {
				throw new RuntimeException("Error creating .ready file", e);
			}
			try {
				Files.write(semReady, new String("Triples loaded: " + graph.size()).getBytes());
			} catch (IOException e) {
				throw new RuntimeException("Error writing data to .ready file", e);
			}
		} catch (Throwable t) {
			try {
				Path semError = Paths.get(this.kgFolder + File.separator + "_error_");
				Files.deleteIfExists(semLoading);
				Files.createFile(semError);
				PrintStream pt = new PrintStream(semError.toFile());
				t.printStackTrace(pt);
				pt.close();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
	}

}
