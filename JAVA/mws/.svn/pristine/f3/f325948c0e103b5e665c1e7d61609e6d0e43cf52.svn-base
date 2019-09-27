package com.mwsx.engine;

import java.io.File;
import java.io.IOException;
import java.io.PrintStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.LinkedList;
import java.util.List;
import java.util.UUID;

import org.apache.jena.graph.Graph;
import org.apache.jena.query.Dataset;
import org.apache.jena.rdf.model.Model;
import org.apache.jena.rdf.model.ModelFactory;
import org.apache.jena.rdf.model.Statement;
import org.apache.jena.rdf.model.StmtIterator;
import org.apache.jena.tdb.TDB;
import org.apache.jena.tdb.TDBFactory;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.mwsx.model.KnowledgeGraph;
import com.mwsx.model.KnowledgeGraphFile;
import com.mwsx.model.KnowledgeGraphFileInfo;
import com.mwsx.model.KnowledgeGraphFileInfos;

public class KGMultiFilesUnloader implements Runnable {

	private List<KnowledgeGraphFile> kgds;
	private List<String> realNames;
	private String tdbFolder;
	private String modelFolderPath;
	private String kgFolder;

	public KGMultiFilesUnloader(List<KnowledgeGraphFile> _kgds, List<String> _realNames, String _kgFolder, String _tdbFolder, String _modelFolderPath) {
		this.kgds = _kgds;
		this.tdbFolder = _tdbFolder;
		this.modelFolderPath = _modelFolderPath;
		this.kgFolder = _kgFolder;
		this.realNames = new LinkedList<String>();
		this.realNames.addAll(_realNames);
	}

	@Override
	public void run() {
		Path semLoading = Paths.get(this.kgFolder + File.separator + "_loading_");
		try {
			Path modelInfoFile = Paths.get(this.modelFolderPath + File.separator + MwsxOntologyManager.KG_MODELS_INFO_FILE_NAME);
			ObjectMapper om = new ObjectMapper();
			KnowledgeGraphFileInfos infos = om.readValue(modelInfoFile.toFile(), KnowledgeGraphFileInfos.class);
			try {
				Files.createFile(semLoading);
			} catch (IOException e) {
				throw new RuntimeException("Error creating .loading file", e);
			}
			int total = 0;
			for (int i=0; i < this.kgds.size(); i++) {
				String actRealName = this.realNames.get(i);
				KnowledgeGraphFile kgd = this.kgds.get(i);
				final Dataset data0 = TDBFactory.createDataset(this.tdbFolder);
				TDB.setOptimizerWarningFlag(false);
				final Model model = data0.getNamedModel(kgd.getDestination().getNamedGraph());
				final Graph graph = model.getGraph();
				String modelPath = this.modelFolderPath + File.separator + UUID.randomUUID().toString();
				try {
					Files.createFile(Paths.get(modelPath));
				} catch (IOException e1) {
					throw new RuntimeException("Error creating source model file in " + modelPath, e1);
				}
				try {
					Files.write(Paths.get(modelPath),
							java.util.Base64.getDecoder().decode(kgd.getFile().getContent()));
				} catch (IOException e1) {
					throw new RuntimeException("Error writing content to source model file in " + modelPath, e1);
				}
				long loadingTime = System.currentTimeMillis();
				Model m = ModelFactory.createDefaultModel();
				m.read(modelPath, kgd.getFile().getFileType());
				StmtIterator l = m.listStatements();
				int count = 0;
				while (l.hasNext()) {
					count++;
					Statement st = l.next();
					int s1 = graph.size();
					graph.delete(st.asTriple());
					if (count % 1000 == 0) {
						try {
							Files.write(semLoading, new String("Triples unloaded: " + count).getBytes());
						} catch (IOException e) {
							throw new RuntimeException("Error writing data to .loading file", e);
						}
					}
				}
				updateKGTriplesCount(count, om);
				loadingTime = System.currentTimeMillis() - loadingTime;
				for (KnowledgeGraphFileInfo info : infos.getInfos()) {
					if (info.getFileName().equals(actRealName)) {
						info.setImported(false);
						info.setImportingTime(-1);
						info.setNumberOfTriples(-1);
						om.enable(SerializationFeature.INDENT_OUTPUT);
						om.writeValue(modelInfoFile.toFile(), infos);
						break;
					}
				}
				try {
					Files.delete(Paths.get(modelPath));
				} catch (IOException e1) {
					throw new RuntimeException("Error removing source model file", e1);
				}
				total += count;
			}		
			try {
				Files.deleteIfExists(semLoading);
			} catch (IOException e) {
				throw new RuntimeException("Error removing .loading file", e);
			}
			Path semReady = Paths.get(this.kgFolder + File.separator + "_ready_");
			int previouslyAvailableTriples = 0;
			try {
				if (!Files.exists(semReady))
					Files.createFile(semReady);
				else {
					List<String> lines = Files.readAllLines(semReady);
					if (lines.size() == 1) {
						String val = lines.get(0).replace("Triples loaded: ", "");
						try {
							previouslyAvailableTriples = Integer.parseInt(val);
						}
						catch(Throwable t) {
							
						}
					}
				}
			} catch (IOException e) {
				throw new RuntimeException("Error creating .ready file", e);
			}
			try {
				Files.write(semReady, new String("Triples loaded: " + (previouslyAvailableTriples - total)).getBytes());
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

	private void updateKGTriplesCount(int count, ObjectMapper om) {
		try {
			Path kgInfoFile = Paths.get(this.kgFolder + File.separator + MwsxOntologyManager.KG_INFO_FILE_NAME);
			KnowledgeGraph kg = om.readValue(kgInfoFile.toFile(), KnowledgeGraph.class);
			kg.setKgTriples(kg.getKgTriples() - count);
			om.enable(SerializationFeature.INDENT_OUTPUT);
			om.writeValue(kgInfoFile.toFile(), kg);
		}
		catch(Throwable t) {
			t.printStackTrace();
		}
	}

}
