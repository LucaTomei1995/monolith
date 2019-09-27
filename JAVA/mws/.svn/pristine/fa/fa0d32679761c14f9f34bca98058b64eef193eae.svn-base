package com.mwsx.services;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Base64;
import java.util.LinkedList;
import java.util.List;
import java.util.stream.Stream;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.OPTIONS;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import com.mwsx.configuration.CustomApplication;
import com.mwsx.model.FileInfo;

@Path("/file")
public class MwsxFileManager {

	public static final String base_path = "/home/mr/Desktop/files";
	private static List<FileInfo> files = new LinkedList<FileInfo>();
	private static List<String> filesNames = new LinkedList<String>();
	private static String selected;

	static {
		new CustomApplication();
	}

	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public FileInfo listFiles(@QueryParam("name") String name) {
		System.out.println("Called listFiles()...");
		try {
			MwsxFileManager.files = new LinkedList<FileInfo>();
			MwsxFileManager.selected = name;
			Stream<java.nio.file.Path> realFiles = Files.list(Paths.get(MwsxFileManager.base_path));
			realFiles.forEach(MwsxFileManager::selectFile);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} 
		return files.get(0);
	}
	
	@Path("list")
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public List<String> filesNames() {
		System.out.println("Called filesNames()...");
		try {
			MwsxFileManager.filesNames = new LinkedList<String>();
			Stream<java.nio.file.Path> realFiles = Files.list(Paths.get(MwsxFileManager.base_path));
			realFiles.forEach(MwsxFileManager::loadFileNames);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} 
		return filesNames;
	}
	
	@OPTIONS
	public Response options() {
		System.out.println("Called options()...");
		return Response.ok().build();
	}
	
	@PUT
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response putFile(FileInfo info) {
		System.out.println("Called putFile()...");
		byte[] content = Base64.getDecoder().decode(info.getContent());
		try {
			Files.write(Paths.get(base_path + "/" + info.getFileName()), content);
		} catch (IOException e) {
			e.printStackTrace();
			Response.serverError().build();
		}
		return Response.ok().build();		
	}
	
	private static void loadFile(java.nio.file.Path p) {
		File file = p.toFile();
		try {
			byte[] fileContent = Files.readAllBytes(file.toPath());
			String content = Base64.getEncoder().encodeToString(fileContent);
		    FileInfo f = new FileInfo();
		    f.setContent(content);
		    f.setFileName(file.getName());
		    f.setFileType(extractExtension(file.getName()));
		    files.add(f);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	private static void selectFile(java.nio.file.Path p) {
		File file = p.toFile();
		try {
			if (file.getName().equals(MwsxFileManager.selected)) {
				byte[] fileContent = Files.readAllBytes(file.toPath());
				String content = Base64.getEncoder().encodeToString(fileContent);
			    FileInfo f = new FileInfo();
			    f.setContent(content);
			    f.setFileName(file.getName());
			    f.setFileType(extractExtension(file.getName()));
			    files.add(f);
			}
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	private static void loadFileNames(java.nio.file.Path p) {
		File file = p.toFile();
		filesNames.add(file.getName());		
	}

	private static String extractExtension(String name) {
		int idx = name.lastIndexOf(".");
		return name.substring(idx);
	}

}