package com.mwsx.test;

import java.util.LinkedList;
import java.util.List;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.mwsx.model.MastroConfigurationParam;
import com.mwsx.model.MastroProperties;

public class MastroPropertiesSampleCode {
	public static void main(String[] args) throws JsonProcessingException {
		MastroConfigurationParam p1 = new MastroConfigurationParam();
		p1.setName("pippo");
		p1.setValue("valore di pippo");
		MastroConfigurationParam p2 = new MastroConfigurationParam();
		p2.setName("pluto");
		p2.setValue("valore di pluto");
		MastroConfigurationParam p3 = new MastroConfigurationParam();
		p3.setName("paperino");
		p3.setValue("valore di paperino");
		List<MastroConfigurationParam> l = new LinkedList<>();;
		l.add(p3);
		l.add(p2);
		l.add(p1);
		MastroProperties pp = new MastroProperties();
		pp.setMastroProperties(l);
		ObjectMapper om = new ObjectMapper();
		om.enable(SerializationFeature.INDENT_OUTPUT);
		System.out.println(om.writeValueAsString(pp));
	}
}
