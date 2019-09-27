package com.mwsx.engine;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Base64;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.mwsx.model.FileInfo;

public class ClientPutOntologyVersion {

	public static void main(String[] args) {
		try {
			m();
			
			if (true) return;
			URL url = new URL("http://localhost:8080/mws/rest/mwsx/owlOntology/OID1");
			HttpURLConnection conn = (HttpURLConnection) url.openConnection();
			conn.setDoOutput(true);
			conn.setRequestMethod("PUT");
			conn.setRequestProperty("Content-Type", "application/json");

			String auth = "Basic " + new String(java.util.Base64.getEncoder().encode("mastro:dasilab".getBytes()));
			System.out.println(auth);
			conn.setRequestProperty("Authorization", auth);
			
			Path path = Paths.get("/Users/marco/Scrivania/prima.owl");
			FileInfo f = getFileInfo(path);

			ObjectMapper om = new ObjectMapper();
			om.enable(SerializationFeature.INDENT_OUTPUT);
			byte[] input = om.writeValueAsBytes(f);

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

	private static void m() throws IOException {
		Path path = Paths.get("/home/marco/Scrivania/mappings2.xml");
		FileInfo f = getMappingFileInfo(path);

		ObjectMapper om = new ObjectMapper();
		om.enable(SerializationFeature.INDENT_OUTPUT);
		System.out.println(om.writeValueAsString(f));
	}

	private static FileInfo getFileInfo(Path path) throws IOException {
		FileInfo f = new FileInfo();
		f.setFileName("ontology.owl");
		f.setFileType(".owl");
		f.setContent(new String(Base64.getEncoder().encode(Files.readAllBytes(path))));
		return f;
	}
	
	private static FileInfo getMappingFileInfo(Path path) throws IOException {
		FileInfo f = new FileInfo();
		f.setFileName("mappings.xml");
		f.setFileType(".xml");
		f.setContent(new String(Base64.getEncoder().encode(Files.readAllBytes(path))));
		return f;
	}

}
