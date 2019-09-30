package com.mwsx.engine;

import java.io.IOException;

import org.apache.jena.rdf.model.Model;
import org.apache.jena.rdf.model.ModelFactory;
import org.apache.jena.tdb.TDBFactory;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.mwsx.model.kg.InstanceLabelType;
import com.mwsx.model.kg.InstanceObjectTripsGroup;
import com.mwsx.model.kg.InstancePage;
import com.mwsx.model.kg.InstanceSubjectTripsGroup;
import com.mwsx.model.kg.ObjectPredicatePageType;
import com.mwsx.model.kg.SubjectPredicatePageType;

import eu.optique.r2rml.api.model.ObjectMap;
import it.uniroma1.dis.mastro.api.impl.RDFInstanceNavigation;

public class KGUtilities {

	private Model model;
	private ObjectMapper objectMapper;

	TDBFactory f = null;
	
	public KGUtilities(Model m) {
		this.model = m;
		this.objectMapper = new ObjectMapper();
		if (this.objectMapper != null)
			this.objectMapper.enable(SerializationFeature.INDENT_OUTPUT);
	}

	/***************************************************
	 * INSERIRE I PARAMETRI DEI METODI DOVE NECESSARIO *
	 ***************************************************/

	private InstanceLabelType getInstanceLabelType(String resource) {

		try {
			return objectMapper.readValue(RDFInstanceNavigation.getInstanceLabelType(resource, model).toString(),
					InstanceLabelType.class);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		return null;
	}

	private InstanceSubjectTripsGroup getInstanceSubjectTripsGroup(String resource) {
		try {
			return objectMapper.readValue(
					RDFInstanceNavigation.getInstanceSubjectTripsGroup(resource, model).toString(),
					InstanceSubjectTripsGroup.class);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		return null;
	}

	private InstanceObjectTripsGroup getInstanceObjectTripsGroup(String resource) {
		try {
			return objectMapper.readValue(RDFInstanceNavigation.getInstanceObjectTripsGroup(resource, model).toString(),
					InstanceObjectTripsGroup.class);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;
	}

	public ObjectPredicatePageType getObjectPredicatePageType(String object, String predicate, String type, int page) {
		try {
			return objectMapper.readValue(
					RDFInstanceNavigation.getObjectPredicatePageType(object, predicate, type, model, page).toString(),
					ObjectPredicatePageType.class);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;
	}

	public SubjectPredicatePageType getSubjectPredicatePageType(String subject, String predicate, String type,
			int page) {
		try {
			return objectMapper.readValue(
					RDFInstanceNavigation.getSubjectPredicatePageType(subject, predicate, type, model, page).toString(),
					SubjectPredicatePageType.class);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;
	}

	public InstancePage getInstancePage(String resource) {
		InstancePage ip = new InstancePage();
		ip.setTitle(getInstanceLabelType(resource));
		ip.setSubjects(getInstanceSubjectTripsGroup(resource));
		ip.setObjects(getInstanceObjectTripsGroup(resource));
		return ip;
	}

	public static void main(String[] args) {
		ObjectMapper om = new ObjectMapper();
		Model model = ModelFactory.createDefaultModel();
		model.read("file:///home/obdasystems/Desktop/rdf/latest/enti_territoriali.nt", "N-TRIPLE");
		String iri = "http://www.aci.it/ontology/Provincia/032";
		String predicate = "http://www.aci.it/ontology/ha_provincia";
		String type = "http://www.aci.it/ontology/Comune";
		
		String predicate2 = "http://www.aci.it/opendataontology/compare_in_dataset";
		String type2 = "other_types";
		KGUtilities kgu = new KGUtilities(model);
		try {
			System.out.println(om.writeValueAsString(kgu.getInstancePage(iri)));
//			System.out.println(om.writeValueAsString(kgu.getInstanceObjectTripsGroup(iri)));
//			System.out.println(om.writeValueAsString(kgu.getObjectPredicatePageType(iri, predicate, type, 0)));
			System.out.println(om.writeValueAsString(kgu.getInstanceSubjectTripsGroup(iri)));
			System.out.println(om.writeValueAsString(kgu.getSubjectPredicatePageType(iri, predicate2, type2, 0)));
			
		} catch (JsonProcessingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

	}

}
