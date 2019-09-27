package com.mwsx.engine;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.LinkedList;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.mwsx.model.Ontology;
import com.mwsx.model.OntologyVersion;
import com.mwsx.model.Role;
import com.mwsx.model.User;

public class ClientPutOntology {

	public static void main(String[] args) {
		try {
			Ontology o1 = createOntology("ciccio","Prima");

			ObjectMapper om1 = new ObjectMapper();
			om1.enable(SerializationFeature.INDENT_OUTPUT);
			System.out.println(om1.writeValueAsString(o1));
			
			if (true) return;
			URL url = new URL("http://localhost:8080/mws/rest/mwsx/owlOntology");
			HttpURLConnection conn = (HttpURLConnection) url.openConnection();
			conn.setDoOutput(true);
			conn.setRequestMethod("PUT");
			conn.setRequestProperty("Content-Type", "application/json");

			String auth = "Basic " + new String(java.util.Base64.getEncoder().encode("mastro:dasilab".getBytes()));
			System.out.println(auth);
			conn.setRequestProperty("Authorization", auth);
			
			Ontology o = createOntology("ciccio","Prima");

			ObjectMapper om = new ObjectMapper();
			byte[] input = om.writeValueAsBytes(o);

			OutputStream os = conn.getOutputStream();
			os.write(input);
			os.flush();

			if (conn.getResponseCode() != 200) {
				throw new RuntimeException("Failed : HTTP error code : " + conn.getResponseCode());
			}

			BufferedReader br = new BufferedReader(new InputStreamReader((conn.getInputStream())));

			String output;
			System.out.println("Output from Server .... \n");
			while ((output = br.readLine()) != null) {
				System.out.println(output);
			}

			conn.disconnect();

		} catch (MalformedURLException e) {

			e.printStackTrace();

		} catch (IOException e) {

			e.printStackTrace();

		}

	}

	private static Ontology createOntology(String username, String oid) {
		User user = new User();
		user.setName(username);
		user.setRoles(new LinkedList<Role>());
		
		Ontology o = new Ontology();
		o.setOntologyID(oid);
		o.setOntologyDescription("Descrizione lillo lallo");
		o.setOntologyOwner(user);
		o.setOntologyVersions(new LinkedList<OntologyVersion>());
		
		return o;
	}

}
