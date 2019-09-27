package com.mws.tools;

import java.io.IOException;
import java.lang.reflect.Field;
import java.lang.reflect.ParameterizedType;
import java.lang.reflect.Type;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mws.model.MethodInfo;
import com.mwsx.model.FileInfo;

public class CodeGeneration {

	static String[] classNames = new String[] {
			"com.mwsx.model.ClassIndividuals",
			"com.mwsx.model.ClassInfo",
			"com.mwsx.model.DatabaseConnection",
			"com.mwsx.model.DataPropertyInfo",
			"com.mwsx.model.DiagramNode",
			"com.mwsx.model.Entities",
			"com.mwsx.model.Entity",
			"com.mwsx.model.FileInfo",
			"com.mwsx.model.HierarchyTree",
			"com.mwsx.model.InclusionDependency",
			"com.mwsx.model.InclusionPair",
			"com.mwsx.model.InclusionView",
			"com.mwsx.model.IndividualInfo",
			"com.mwsx.model.Individuals",
			"com.mwsx.model.IRI",
			"com.mwsx.model.KeyDependency",
			"com.mwsx.model.Label",
			"com.mwsx.model.MapItem",
			"com.mwsx.model.Mapping",
			"com.mwsx.model.MappingAssertion",
			"com.mwsx.model.MappingBody",
			"com.mwsx.model.MappingDependencies",
			"com.mwsx.model.MappingHead",
			"com.mwsx.model.MappingInfo",
			"com.mwsx.model.MappingRewritings",
			"com.mwsx.model.Mappings",
			"com.mwsx.model.OBDACatalog",
			"com.mwsx.model.OBDAQuery",
			"com.mwsx.model.ObjectPropertyInfo",
			"com.mwsx.model.Ontologies",
			"com.mwsx.model.Ontology",
			"com.mwsx.model.OntologyClassesInfo",
			"com.mwsx.model.OntologyDataPropertiesInfo",
			"com.mwsx.model.OntologyHierarchy",
			"com.mwsx.model.OntologyInfo",
			"com.mwsx.model.OntologyMetrics",
			"com.mwsx.model.OntologyObjectPropertiesInfo",
			"com.mwsx.model.OntologyRewritings",
			"com.mwsx.model.OntologyVersion",
			"com.mwsx.model.Participation",
			"com.mwsx.model.Role",
			"com.mwsx.model.SPARQLQuery",
			"com.mwsx.model.SPARQLResult",
			"com.mwsx.model.SPARQLResults",
			"com.mwsx.model.SPARQLStatus",
			"com.mwsx.model.SQLView",
			"com.mwsx.model.SQLViews",
			"com.mwsx.model.TreeNode",
			"com.mwsx.model.User",
			"com.mwsx.model.ViewMappings",
			"com.mwsx.model.ViewRewriting",
			"com.mwsx.model.ViewRewritings"	
	};
	
	static String[] resources = new String[] {
			"Ontologies,ontologyList,Ontology,,",
			"OntologyVersion,ontologyID,String,,",
			"OntologyVersion,versionID,String,,",
			"OntologyVersion,versionDescription,String,,",
			"OntologyVersion,versionDate,long,,",
			"OntologyVersion,numClasses,int,,",
			"OntologyVersion,numObjectProperties,int,,",
			"OntologyVersion,numDataProperties,int,,",
			"OntologyVersion,numAxioms,int,,",
			"OntologyVersion,versionOwner,User,,",
			"Ontology,ontologyID,String,,",
			"Ontology,ontologyDescription,String,,",
			"Ontology,ontologyVersions,List,OntologyVersion,",
			"Ontology,ontologyOwner,User,,",
			"OntologyInfo,ontologyIRI,String,,",
			"OntologyInfo,ontologyImports,List,String,",
			"OntologyInfo,ontologyPrefixManager,List,MapItem,",
			"OntologyInfo,ontologyDescriptions,List,String,",
			"OntologyInfo,ontologyMetrics,OntologyMetrics,,",
			"MapItem,mapKey,String,,",
			"MapItem,mapValue,String,,",
			"OntologyMetrics,metrics,List,MapItem,",
			"OntologyMetrics,classAxioms,List,MapItem,",
			"OntologyMetrics,objectPropertyAxioms,List,MapItem,",
			"OntologyMetrics,dataPropertyAxioms,List,MapItem,",
			"OntologyMetrics,individualAxioms,List,MapItem,",
			"OntologyMetrics,annotationAxioms,List,MapItem,",
			"OntologyHierarchy,hierarchyTree,HierarchyTree,,",
			"HierarchyTree,classTree,TreeNode,,",
			"HierarchyTree,objectPropertyTree,TreeNode,,",
			"HierarchyTree,dataPropertyTree,TreeNode,,",
			"Entity,entityRender,String,,",
			"Entity,entityID,String,,",
			"TreeNode,children,List,TreeNode,",
			"TreeNode,entity,Entity,,",
			"ClassInfo,currentEntity,Entity,,",
			"ClassInfo,iri,IRI,,",
			"IRI,shortIRI,String,,",
			"IRI,extendedIRI,String,,",
			"ClassInfo,entityDiagrams,List,DiagramNode,",
			"DiagramNode,nodeID,String,,",
			"DiagramNode,diagramName,String,,",
			"ClassInfo,classDescriptions,List,String,",
			"ClassInfo,equivalentClasses,List,Entity,",
			"ClassInfo,subClasses,List,Entity,",
			"ClassInfo,superClasses,List,Entity,",
			"ClassInfo,disjointClasses,List,Entity,",
			"ClassInfo,objectProperties,List,Entity,",
			"ClassInfo,classIndividuals,List,Entity,",
			"ClassInfo,dataProperties,List,Entity,",
			"ClassInfo,disjointUnions,List,List,Entity",
			"ObjectPropertyInfo,currentEntity,Entity,,",
			"ObjectPropertyInfo,iri,IRI,,",
			"ObjectPropertyInfo,entityDiagrams,List,DiagramNode,",
			"ObjectPropertyInfo,superObjectProperties,List,Entity,",
			"ObjectPropertyInfo,subObjectProperties,List,Entity,",
			"ObjectPropertyInfo,inverseObjectProperties,List,Entity,",
			"ObjectPropertyInfo,objectPropertyDomain,List,Entity,",
			"ObjectPropertyInfo,objectPropertyRange,List,Entity,",
			"ObjectPropertyInfo,equivalentObjectProperties,List,Entity,",
			"ObjectPropertyInfo,objectPropertyCharacteristics,List,String,",
			"ObjectPropertyInfo,objectPropertyIndividuals,List,Entity,",
			"ObjectPropertyInfo,objectPropertyDescriptions,List,String,",
			"DataPropertyInfo,currentEntity,Entity,,",
			"DataPropertyInfo,iri,IRI,,",
			"DataPropertyInfo,entityDiagrams,List,DiagramNode,",
			"DataPropertyInfo,dataPropertyDescriptions,List,String,",
			"DataPropertyInfo,superDataProperties,List,Entity,",
			"DataPropertyInfo,subDataProperties,List,Entity,",
			"DataPropertyInfo,dataPropertyDomain,List,Entity,",
			"DataPropertyInfo,dataPropertyRange,List,Entity,",
			"DataPropertyInfo,dataPropertyIndividuals,List,Entity,",
			"DataPropertyInfo,equivalentDataProperties,List,Entity,",
			"DataPropertyInfo,dataPropertyFunctional,Boolean,,",
			"IndividualInfo,currentEntity,Entity,,",
			"IndividualInfo,iri,IRI,,",
			"IndividualInfo,entityDiagrams,List,DiagramNode,",
			"IndividualInfo,individualDescriptions,List,String,",
			"IndividualInfo,sameIndividuals,List,Entity,",
			"IndividualInfo,differentIndividuals,List,Entity,",
			"IndividualInfo,individualTypes,List,Entity,",
			"Mappings,mappingList,List,Mapping,",
			"Mappings,mappingsCanModify,boolean,,",
			"Mapping,mappingID,String,,",
			"Mapping,mappingDescription,String,,",
			"Mapping,mappingDate,long,,",
			"Mapping,numAssertions,int,,",
			"Mapping,numViews,int,,",
			"Mapping,mappingOwner,User,,",
			"Mapping,numInclusionDependencies,int,,",
			"Mapping,numKeyDependencies,int,,",
			"Mapping,numDenials,int,,",
			"MappingInfo,mapping,Mapping,,",
			"MappingInfo,mappingDBConnection,DatabaseConnection,,",
			"MappingInfo,mappingTemplates,List,String,",
			"DatabaseConnection,jdbcURL,String,,",
			"DatabaseConnection,dbUser,String,,",
			"DatabaseConnection,dbDriver,String,,",
			"DatabaseConnection,dbPassword,String,,",
			"MappingAssertion,currentEntity,Entity,,",
			"MappingAssertion,iri,IRI,,",
			"MappingAssertion,mappingHead,MappingHead,,",
			"MappingAssertion,mappingBody,MappingBody,,",
			"MappingAssertion,mappingDescription,String,,",
			"MappingHead,firstArg,String,,",
			"MappingHead,secondArg,String,,",
			"MappingBody,bodySelect,String,,",
			"MappingBody,bodyFrom,List,SQLView,",
			"MappingBody,bodyWhere,String,,",
			"SQLView,sqlViewID,String,,",
			"SQLView,sqlViewDescription,String,,",
			"SQLView,sqlViewCode,String,,",
			"SQLViews,sqlViews,List,String,",
			"ViewMappings,sqlView,SQLView,,",
			"ViewMappings,mappingAssertions,List,MappingAssertion,",
			"ViewMappings,mappingDependencies,MappingDependencies,,",
			"MappingDependencies,keyDependencies,List,KeyDependency,",
			"MappingDependencies,inclusionDependencies,List,InclusionDependency,",
			"MappingDependencies,denials,List,String,",
			"KeyDependency,keyHead,String,,",
			"KeyDependency,sqlViewID,String,,",
			"InclusionDependency,includedView,InclusionView,,",
			"InclusionDependency,includingView,InclusionView,,",
			"InclusionDependency,inclusionMap,List,InclusionPair,",
			"InclusionView,sqlViewID,String,,",
			"InclusionView,termList,List,String,",
			"InclusionPair,leftHandTerm,String,,",
			"InclusionPair,rightHandTerm,String,,",
			"OBDACatalog,queryCatalog,List,SPARQLQuery,",
			"OBDACatalog,mappings,Mappings,,",
			"OBDAQuery,sparql,SPARQLQuery,,",
			"OBDAQuery,options,List,MapItem,",
			"SPARQLQuery,queryID,String,,",
			"SPARQLQuery,queryDescription,String,,",
			"SPARQLQuery,queryCode,String,,",
			"FileInfo,fileName,String,,",
			"FileInfo,fileType,String,,",
			"FileInfo,content,String,,",
			"SPARQLStatus,status,String,,",
			"SPARQLStatus,percentage,int,,",
			"SPARQLStatus,numOntologyRewritings,int,,",
			"SPARQLStatus,numHighLevelQueries,int,,",
			"SPARQLStatus,numOptimizedQueries,int,,",
			"SPARQLStatus,numLowLevelQueries,int,,",
			"SPARQLStatus,executionTime,int,,",
			"SPARQLStatus,numResults,int,,",
			"SPARQLResults,construct,boolean,,",
			"SPARQLResults,headTerms,List,String,",
			"SPARQLResults,results,List,List,SPARQLResult",
			"SPARQLResult,type,String,,",
			"SPARQLResult,shortIRI,String,,",
			"SPARQLResult,value,String,,",
			"OntologyRewritings,List,String,,",
			"MappingRewritings,List,String,,",
			"ViewRewritings,List,ViewRewriting,,",
			"ViewRewriting,query,String,,",
			"ViewRewriting,numResults,int,,",
			"ViewRewriting,time,int,,",
			"User,name,String,,",
			"User,roles,List,Role,",
			"Role,name,String,,",
			"Role,domain,String,,",
			"Role,action,String,,",
			"Role,id,String,,",
	};
	
	static String[] methods = new String[] {
			"/owlOntology,GET,Ontologies,-,-",
			"/owlOntology/{name},PUT,Ontology,-,-",
			"/owlOntology,DELETE,Ontologies,-,-",
			"/owlOntology/{name}/{version},GET,FileInfo,-,-",
			"/owlOntology/{name}/{version},PUT,FileInfo,-,-",
			"/owlOntology/{name}/{version},DELETE,FileInfo,-,-",
			"/owlOntology/{name}/{version}/hierarchy,GET,OntologyHierarchy,-,-",
			"/owlOntology/{name}/{version}/info,GET,OntologyInfo,-,-",
			"/owlOntology/{name}/{version}/alphabet/class/{ID}/logical,GET,ClassInfo,-,-",
			"/owlOntology/{name}/{version}/alphabet/objectProperty/{ID}/logical,GET,ObjectPropertyInfo,-,-",
			"/owlOntology/{name}/{version}/alphabet/dataProperty/{ID}/logical,GET,DataPropertyInfo,-,-",
			"/owlOntology/{name}/{version}/graphol,GET,FileInfo,-,-",
			"/owlOntology/{name}/{version}/mapping,GET,Mappings,-,-",
			"/owlOntology/{name}/{version}/mapping/{ID},GET,FileInfo,-,-",
			"/owlOntology/{name}/{version}/mapping/{ID},PUT,FileInfo,-,-",
			"/owlOntology/{name}/{version}/mapping/{ID},DELETE,FileInfo,-,-",
			"/owlOntology/{name}/{version}/mapping/{ID}/info,GET,MappingInfo,-,-",
			"/owlOntology/{name}/{version}/mapping/{ID}/assertions/{entityID},GET,List,MappingAssertion,-",
			"/owlOntology/{name}/{version}/mapping/{ID}/views,GET,SQLViews,-,-",
			"/owlOntology/{name}/{version}/mapping/{ID}/views/{viewID},GET,ViewMappings,-,-",
			"/owlOntology/{name}/{version}/mapping/{ID}/dependencies,GET,MappingDependencies,-,-",
			"/owlOntology/{name}/{version}/querycatalog,GET,OBDACatalog,-,-",
			"/owlOntology/{name}/{version}/query/{ID},GET,SPARQLQuery,-,-",
			"/owlOntology/{name}/{version}/query/{ID},PUT,SPARQLQuery,-,-",
			"/owlOntology/{name}/{version}/query/{ID},DELETE,SPARQLQuery,-,-",
			"/owlOntology/{name}/{version}/query/{ID}/start,PUT,OBDAQuery,-,reasoning={boolean}",
			"/owlOntology/{name}/{version}/query/{ID}/stop,GET,int,-,-",
			"/owlOntology/{name}/{version}/query/{ID}/exportFile,GET,FileInfo,-,-",
			"/owlOntology/{name}/{version}/query/{ID}/exportQueryReport,GET,FileInfo,-,-",
			"/owlOntology/{name}/{version}/query/{ID}/status,GET,SPARQLStatus,-,-",
			"/owlOntology/{name}/{version}/query/{ID}/results,GET,SPARQLResults,-,pagesize={int}, offset={int}",
			"/owlOntology/{name}/{version}/query/{ID}/ontologyRewritings,GET,OntologyRewritings,-,pagesize={int}, offset={int}",
			"/owlOntology/{name}/{version}/query/{ID}/mappingRewritings,GET,MappingRewritings,-,pagesize={int}, offset={int}",
			"/owlOntology/{name}/{version}/query/{ID}/viewRewritings,GET,ViewRewritings,-,pagesize={int}, offset={int}"	
	};
	
	static final String set = "public void [SET_NAME]([TYPE] _[NAME]){this.[NAME] = _[NAME];}";
	static String get = "public [TYPE] [GET_NAME](){return this.[NAME];}";
	
	private static List<String> extractPathParameters(String path) {
		List<String> params = new LinkedList<String>();
		if (path.equals("-"))
			return params;
		for (String pathElement : path.trim().split("/")) {
			if (pathElement.startsWith("{")) {
				if (pathElement.endsWith("}")) {
					params.add(pathElement.substring(1,  pathElement.length() - 1));
				}
				else
					throw new RuntimeException("Malformed path parameter " + pathElement + " in pasth " + path);
			}
		}
		return params;
	}
	
	static String generateSetMethod(String name, String type) {
		String setName = "set" + name.substring(0,1).toUpperCase() + name.substring(1,name.length());
		return set.replace("[SET_NAME]", setName).replace("[NAME]", name).replace("[TYPE]", type);
	}
	
	static String generateGetMethod(String name, String type) {
		String getName = "get" + name.substring(0,1).toUpperCase() + name.substring(1,name.length());
		return get.replace("[GET_NAME]", getName).replace("[NAME]", name).replace("[TYPE]", type);
	}
	
	static String[] paths = new String[] {
			"/owlOntology",
			"/owlOntology/{name}",
			"/owlOntology/{name}/{version}",
			"/owlOntology/{name}/{version}/prefixes",
			"/owlOntology/{name}/{version}/alphabet",
			"/owlOntology/{name}/{version}/alphabet/class",
			"?inferred (boolean)",
			"?named (boolean)",
			"/owlOntology/{name}/{version}/alphabet/objectProperty",
			"?inferred (boolean)",
			"/owlOntology/{name}/{version}/alphabet/dataProperty",
			"?inferred (boolean)",
			"/owlOntology/{name}/{version}/alphabet/class/{IRI}/desc",
			"/owlOntology/{name}/{version}/alphabet/class/{IRI}/logical",
			"/owlOntology/{name}/{version}/alphabet/objectProperty/{IRI}/desc",
			"/owlOntology/{name}/{version}/alphabet/objectProperty/{IRI}/logical",
			"/owlOntology/{name}/{version}/alphabet/dataProperty/{IRI}/desc",
			"/owlOntology/{name}/{version}/alphabet/dataProperty/{IRI}/logical",
			"/owlOntology/{name}/{version}/graphol",
			"/owlOntology/{name}/{version}/mapping",
			"/owlOntology/{name}/{version}/mapping/{ID}",
			"/owlOntology/{name}/{version}/mapping/{ID}/assertions",
			"/owlOntology/{name}/{version}/mapping/{ID}/assertions/{mapID}",
			"/owlOntology/{name}/{version}/mapping/{ID}/views",
			"/owlOntology/{name}/{version}/mapping/{ID}/views/{viewID}",
			"/owlOntology/{name}/{version}/querycatalog",
			"/owlOntology/{name}/{version}/query",
			"/owlOntology/{name}/{version}/query/{ID}",
			"/owlOntology/{name}/{version}/query/{ID}/meta",
			"/owlOntology/{name}/{version}/query/{ID}/results",
			"/owlOntology/{name}/{version}/query/{ID}/results/data",
			"?pagesize (boolean)",
			"?offset (boolean)",
			"/owlOntology/{name}/{version}/query/{ID}/results/ontRewriting",
			"?pagesize (boolean)",
			"?offset (boolean)",
			"/owlOntology/{name}/{version}/query/{ID}/results/viewRewriting",
			"?pagesize (boolean)",
			"?offset (boolean)",
			"/owlOntology/{name}/{version}/query/{ID}/results/mapRewriting",
			"?pagesize (boolean)",
			"?offset (boolean)",
			"/owlOntology/{name}/{version}/query/{ID}/results/info",
			"/owlOntology/{name}/{version}/constraints/disjointness",
			"/owlOntology/{name}/{version}/constraints/disjointness/results",
			"/owlOntology/{name}/{version}/constraints/functionality",
			"/owlOntology/{name}/{version}/constraints/functionality/results",
			"/owlOntology/{name}/{version}/constraints/denial",
			"/owlOntology/{name}/{version}/constraints/denial/results",
			"/owlOntology/{name}/{version}/constraints/identification",
			"/owlOntology/{name}/{version}/constraints/identification/results",
			"/knowledgeGraph",
			"/knowledgeGraph/{ID}",
			"/knowledgeGraph/{ID}/{IRI}",
			"/knowledgeGraph/{ID}/provenance",
			"/knowledgeGraph/{ID}/querycatalog",
			"/knowledgeGraph/{ID}/query",
			"/knowledgeGraph/{ID}/query/{queryID}",
			"/dataset",
			"/dataset/{ID}"
	};
	
	static String createMethodCode(String path) {
		return "";
	}
	
	public static List<MethodInfo> getAllMethods() {
		return extract(paths);
	}
	
	static List<MethodInfo> extract(String[] paths) {
		List<MethodInfo> infos = new LinkedList<MethodInfo>();
		for (int i=0; i < paths.length; i++) {
			String path = paths[i].trim();
			if (path.startsWith("/")) {
				MethodInfo info = new MethodInfo();
				info.setPath(path);
				info.setMethod("GET");
				String name = info.getMethod().toLowerCase() + createMethodName(path);
				info.setName(name);
				for(String pathParam : extractPathParam(path)) {
					info.addPathParam(pathParam);
				}
				if (i < paths.length - 1) {
					while (paths[i+1].startsWith("?")) {
						info.addQueryParam(extractQueryParamName(paths[i+1]));
						i++;
					}
				}
				infos.add(info);
			}
		}
		return infos;
	}
	
	private static String extractQueryParamName(String string) {
		string = string.replace("?", "");
		string = string.substring(0,  string.indexOf(" "));
		return string;
	}

	private static List<String> extractPathParam(String path) {
		List<String> pathParams = new LinkedList<String>();
		String[] parts = path.split("/");
		for (String part : parts) {
			part = part.trim();
			if (part.startsWith("{") && part.endsWith("}")) {
				pathParams.add(part.replace("{", "").replace("}",""));
			}
		}
		return pathParams;
	}

	static String createMethodName(String path, String httpMethod) {
		String[] parts = path.split("/");
		String name = httpMethod.toLowerCase() + "_";
		for (String part : parts) {
			part = part.replace("{", "");
			part = part.replace("}", "");
			name += part.trim() + "_";
		}
		return name.substring(0, name.length()-1);
	}
	
	static String createMethodName(String path) {
		String[] parts = path.split("/");
		String name = "";
		for (String part : parts) {
			part = part.replace("{", "");
			part = part.replace("}", "");
			name += part.trim() + "_";
		}
		return name.substring(0, name.length()-1);
	}
	
	static void generateFieldDefinitions(String[] input, Map<String, List<String>> objectDefs, Map<String, List<String>> getters, Map<String, List<String>> setters) {
		if (input.length == 3) {
			String obj = input[0].trim();
			String field = fixCapitalisation(input[1].trim());
			String type = fixType(input[2].trim());
			String def = type + " " + field + ";";
			if (objectDefs.containsKey(obj)) {
				List<String> old = objectDefs.get(obj);
				old.add(def);
				objectDefs.put(obj, old);
			}
			else {
				List<String> old = new LinkedList<String>();
				old.add(def);
				objectDefs.put(obj, old);
			}
			if (getters.containsKey(obj)) {
				List<String> old = getters.get(obj);
				old.add(generateGetMethod(field, type));
				getters.put(obj, old);
			}
			else {
				List<String> old = new LinkedList<String>();
				old.add(generateGetMethod(field, type));
				getters.put(obj, old);
			}
			if (setters.containsKey(obj)) {
				List<String> old = setters.get(obj);
				old.add(generateSetMethod(field, type));
				setters.put(obj, old);
			}
			else {
				List<String> old = new LinkedList<String>();
				old.add(generateSetMethod(field, type));
				setters.put(obj, old);
			}
		}
		if (input.length == 4) {
			String obj = input[0].trim();
			String field = fixCapitalisation(input[1].trim());
			String type = fixType("List<" + input[3].trim() + ">");
			String def = type + " " + field + ";";
			if (objectDefs.containsKey(obj)) {
				List<String> old = objectDefs.get(obj);
				old.add(def);
				objectDefs.put(obj, old);
			}
			else {
				List<String> old = new LinkedList<String>();
				old.add(def);
				objectDefs.put(obj, old);
			}
			if (getters.containsKey(obj)) {
				List<String> old = getters.get(obj);
				old.add(generateGetMethod(field, type));
				getters.put(obj, old);
			}
			else {
				List<String> old = new LinkedList<String>();
				old.add(generateGetMethod(field, type));
				getters.put(obj, old);
			}
			if (setters.containsKey(obj)) {
				List<String> old = setters.get(obj);
				old.add(generateSetMethod(field, type));
				setters.put(obj, old);
			}
			else {
				List<String> old = new LinkedList<String>();
				old.add(generateSetMethod(field, type));
				setters.put(obj, old);
			}
		}
		if (input.length == 5) {
			String obj = input[0].trim();
			String field = fixCapitalisation(input[1].trim());
			String type = "List<List<" + input[4].trim() + ">>";
			String def =  type + " " + field + ";";
			if (objectDefs.containsKey(obj)) {
				List<String> old = objectDefs.get(obj);
				old.add(def);
				objectDefs.put(obj, old);
			}
			else {
				List<String> old = new LinkedList<String>();
				old.add(def);
				objectDefs.put(obj, old);
			}
			if (getters.containsKey(obj)) {
				List<String> old = getters.get(obj);
				old.add(generateGetMethod(field, type));
				getters.put(obj, old);
			}
			else {
				List<String> old = new LinkedList<String>();
				old.add(generateGetMethod(field, type));
				getters.put(obj, old);
			}
			if (setters.containsKey(obj)) {
				List<String> old = setters.get(obj);
				old.add(generateSetMethod(field, type));
				setters.put(obj, old);
			}
			else {
				List<String> old = new LinkedList<String>();
				old.add(generateSetMethod(field, type));
				setters.put(obj, old);
			}
		}
	}
	
	private static String fixType(String trim) {
		if (trim.equals("integer"))
			return "int";
		return trim;
	}

	private static String fixCapitalisation(String trim) {
		return trim.substring(0,1).toLowerCase() + trim.substring(1, trim.length());
	}

	public static void main(String[] args) throws IOException, ClassNotFoundException {
		for (String[] data : newMet) {
			System.out.println(generateAnnotatedWebMethod(data));
		}
		
		if (true) return;
		FileInfo f = new FileInfo();
		f.setFileName("ontology.owl");
		f.setFileType(".owl");
		f.setContent(new String(java.util.Base64.getEncoder().encode(Files.readAllBytes(Paths.get("/home/marco/Scrivania/prima.owl"))),"UTF-8"));
		
		ObjectMapper on = new ObjectMapper();
		on.writeValue(Paths.get("/home/marco/Scrivania/finfo.json").toFile(), f);
		
		if (true) return;
		for (String className : classNames) {
			Class<?> theClass = Class.forName(className);
			String name = theClass.getSimpleName();
			for (Field field : theClass.getDeclaredFields()) {
				String fieldLine = className.replace("com.mwsx.model.","") + "\t" + field.getName();
				Type type = field.getGenericType();
				Type innerType = null;
				Type innerInnerType = null;
				if (type instanceof ParameterizedType) {
					ParameterizedType pt = (ParameterizedType) type;
					innerType = pt.getActualTypeArguments()[0];
					fieldLine += "\tList";
					if (innerType instanceof ParameterizedType) {
						ParameterizedType ptinn = (ParameterizedType) innerType;
						innerInnerType = ptinn.getActualTypeArguments()[0];
						fieldLine += "\tList\t" + innerInnerType.getTypeName().replace("com.mwsx.model.","").replace("java.lang.","");
					}
					else
						fieldLine += "\t" + innerType.getTypeName().replace("com.mwsx.model.","").replace("java.lang.","");;
				}
				else {
					fieldLine += "\t" + type.getTypeName().replace("com.mwsx.model.","").replace("java.lang.","");;
				}
				System.out.println(fieldLine);
			}
		}
		
		if (true) return;
		for(String data : methods) {
			System.out.println(generateAnnotatedWebMethod(data.split(",")));
			System.out.println();
			System.out.println();
		}
		
		if (true) return;
		Map<String, List<String>> map = new HashMap<String, List<String>>();
		Map<String, List<String>> mapGetter = new HashMap<String, List<String>>();
		Map<String, List<String>> mapSetter = new HashMap<String, List<String>>();
		for (String resource : resources) {
			generateFieldDefinitions(resource.split(","), map, mapGetter, mapSetter);
		}
		for (String key : map.keySet()) {
			StringBuffer buf = new StringBuffer();
			buf.append("package com.mwsx.model;");
			buf.append("\n[IMPORT]");
			buf.append("\n// generated by CodeGeneration.java @ MR (tm)");
			buf.append("\n\npublic class " + key + " {");
			buf.append("\n\t// fields");
			for (String def : map.get(key)) {
				buf.append("\n\t" + def);
			}
			buf.append("\n\t// getters");
			for (String def : mapGetter.get(key)) {
				buf.append("\n\t" + def);
			}
			buf.append("\n\t// setters");
			for (String def : mapSetter.get(key)) {
				buf.append("\n\t" + def);
			}
			buf.append("\n}");
			Path path = Paths.get("./src/main/java/com/mwsx/model/" + key + ".java");
			String code = buf.toString();
			if (code.indexOf("List<") != -1)
				code = code.replace("[IMPORT]", "\nimport java.util.List;");
			else
				code = code.replace("[IMPORT]", "");
			Files.write(path, code.getBytes());
		}		
		
		if (true) return;
		for (String path : paths) {
			System.out.println(createMethodName(path));
		}
	}
	
	static String METHOD_TEMPLATE = "" +   
	"[PATH]\n" +
	"[METHOD]\n" +
	"@Produces(\"application/json\")\n" + 
	"@Consumes(\"application/json\")\n" + 
	//"public [RETURN_TYPE] [METHOD_NAME](\n" +
	"public Response [METHOD_NAME](\n" +
			"\t@Context HttpServletRequest request,\n" + 
			"\t@Context HttpServletResponse response\n" +  
			"\t[PATH_PARAM_LIST]\n" +
			"\t[QUERY_PARAM_LIST]\n" + 
	"){\n" +  
		"\t[BODY_TEMPLATE]" +
	"\n}";
	
	static String[][] newMet = new String[][] {
		new String[]{"/knowledgeGraphs","GET","List","KnowledgeGraph",""},
		new String[]{"/knowledgeGraphs","POST","KnowledgeGraph","",""},
		new String[]{"/knowledgeGraph","DELETE","boolean","",""},
		new String[]{"/knowledgeGraph/info","GET","KnowledgeGraph","","iri={String}"},
		new String[]{"/knowledgeGraph/file","PATCH","boolean","",""},
		new String[]{"/knowledgeGraph/file","GET","FileInfo","","iri={String}, format={String}"},
		new String[]{"/knowledgeGraph/union","PATCH","boolean","",""},
		new String[]{"/knowledgeGraph/union/ontology","PATCH","boolean","",""},
		new String[]{"/knowledgeGraph/union/queryOBDA","PATCH","boolean","",""},
		new String[]{"/knowledgeGraph/union/queryKg","PATCH","boolean","",""},
		new String[]{"/knowledgeGraph/query/catalog","GET","List","SPARQLQuery","iri={String}"},
		new String[]{"/knowledgeGraph/query/catalog/export","GET","FileInfo","","iri={String}"},
		new String[]{"/knowledgeGraph/query/catalog/{queryID}","GET","SPARQLQuery","","iri={String}"},
		new String[]{"/knowledgeGraph/query/catalog","POST","boolean","","iri={String}"},
		new String[]{"/knowledgeGraph/query/catalog/{queryID}","PUT","boolean","","iri={String}"},
		new String[]{"/knowledgeGraph/query/catalog/{queryID}","DELETE","boolean","","iri={String}"},
		new String[]{"/knowledgeGraph/query/start","POST","SPARQLQueryExecution","","iri={String}"},
		new String[]{"/knowledgeGraph/query/catalog/{queryID}/start","POST","SPARQLQueryExecution","","iri={String}"},
		new String[]{"/knowledgeGraph/query/{executionID}/stop","GET","boolean","","iri={String}"},
		new String[]{"/knowledgeGraph/query/{executionID}/exportResults","GET","FileInfo","","iri={String}"},
		new String[]{"/knowledgeGraph/query/{executionID}/status","GET","SPARQLStatus","","iri={String}"},
		new String[]{"/knowledgeGraph/query/{executionID}/results","GET","SPARQLResults","","iri={String}, pagesize={integer}, offset={integer}"},
		new String[]{"/knowledgeGraph/prefixes","GET","List","Prefix","iri={String}"}
	};
	
	static String generateAnnotatedWebMethod(String[] data) {
		String methodCode = METHOD_TEMPLATE;
		List<String> pathParamList = extractPathParameters(data[0]);
		List<String> queryParamList = extractQueryParameters(data[4]);
		String[] pathParameters = pathParamList.toArray(new String[pathParamList.size()]);
		String[] queryParameters = queryParamList.toArray(new String[queryParamList.size()]);
		String pathParamListCode = generateAnnotatedParamListCode(pathParameters, "@PathParam");
		String queryParamListCode = generateAnnotatedParamListCode(queryParameters, "@QueryParam");
		String returnType = processReturnType(data[2], data[3]);
		String bodyTemplate = generateBodyTemplate(returnType);
		methodCode = methodCode.replace("[PATH]", "@Path(\"" + data[0] + "\")");
		methodCode = methodCode.replace("[METHOD]", "@" + data[1]);
		methodCode = methodCode.replace("[RETURN_TYPE]", returnType);
		methodCode = methodCode.replace("[METHOD_NAME]", createMethodName(data[0], data[1]));
		methodCode = methodCode.replace("[PATH_PARAM_LIST]", pathParamListCode == null ? "" : pathParamListCode);
		methodCode = methodCode.replace("[QUERY_PARAM_LIST]", queryParamListCode == null ? "" : queryParamListCode);
		methodCode = methodCode.replace("[BODY_TEMPLATE]", bodyTemplate);
		return methodCode;
	}

	private static String generateBodyTemplate(String returnType) {
		String body = "response.setHeader(\"MASTRO-MESSAGE\", \"Method not implemented yet\");\n" + 
		"response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);\n";
		if (returnType.equals("int"))
			return body + "return 0;";
		return body + "return null;";
	}

	private static String processReturnType(String string, String string2) {
		if (string.equals("int"))
			return "int";
		if (string.equals("List"))
			return "List<" + processReturnType(string2, null) + ">";
		return "com.mwsx.model." + string;
	}

	private static String generateAnnotatedParamListCode(String[] params, String annotation) {
		if (params.length == 0)
			return null;
		String list = ", ";
		for (String param : params) {
			if (annotation.contains("@QueryParam")) {
				String p = param.substring(0, param.indexOf("/"));
				String t = param.substring(param.indexOf("/") + 1, param.length());
				list = list + annotation + "(\"" + p + "\") " + t + " " + p + ", ";
			}
			else {
				list = list + annotation + "(\"" + param + "\") String " + param + ", "; 
			}
		}
		return list.substring(0, list.length() - 2);
	}
	
	private static List<String> extractQueryParameters(String string) {
		List<String> queryParams = new LinkedList<String>();
		if (string.equals(""))
			return queryParams;
		for(String qp : string.trim().split(",")) {
			qp = qp.trim();
			int idx = qp.indexOf("=");
			if (idx != -1) {
				String param = qp.substring(0,  idx).trim();
				String type = qp.substring(idx + 1).trim();
				type = type.substring(1, type.length() - 1);
				queryParams.add(param + "/" + type);
			}
			else {
				throw new RuntimeException("Cannot parse query param list " + string);
			}
		}
		return queryParams;
	}
	
}
