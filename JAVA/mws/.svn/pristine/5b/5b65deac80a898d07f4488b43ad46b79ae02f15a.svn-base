package com.mwsx.engine;

import java.util.Properties;

import org.semanticweb.owlapi.model.OWLOntology;

import com.ruzzi.unfold.mastro.MappingManager;

import it.uniroma1.dis.mastro.api.impl.MastroAPI;
import it.uniroma1.dis.quonto.core.domain.ITBox;
import it.uniroma1.dis.quonto.reformulation.QueryReformulatorException;

public class MwsxMastroInstanceLoader implements Runnable{

	private Properties p;
	private MappingManager mm;
	private ITBox tbox;
	private MastroAPI mastro;
	private OWLOntology ontology;
	
	public MwsxMastroInstanceLoader(Properties p, MappingManager mm, ITBox tbox, OWLOntology ontology) {
		this.p = p;
		this.mm = mm;
		this.tbox = tbox;
		this.ontology = ontology;
		this.mastro = new MastroAPI(this.p, this.tbox, this.mm, this.ontology, true);
	}
	
	@Override
	public void run() {
		try {
			this.mastro.init();
		} catch (QueryReformulatorException e) {
			throw new RuntimeException(e);
		}		
	}
	
	public MastroAPI getMastroInstance() {
		return this.mastro;
	}

}
