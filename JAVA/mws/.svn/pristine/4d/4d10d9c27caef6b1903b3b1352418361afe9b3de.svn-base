package com.mws.services;

import java.io.UnsupportedEncodingException;
import java.lang.annotation.Annotation;
import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.lang.reflect.Parameter;
import java.lang.reflect.ParameterizedType;
import java.lang.reflect.Type;
import java.util.Base64;
import java.util.Calendar;
import java.util.LinkedList;
import java.util.List;

import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.QueryParam;

import com.mws.model.ClassInfo;
import com.mws.model.ClassTreeNode;
import com.mws.model.DataPropertyInfo;
import com.mws.model.DataPropertyTreeNode;
import com.mws.model.FieldInfo;
import com.mws.model.FileInfo;
import com.mws.model.MethodInfo;
import com.mws.model.ObjectInfo;
import com.mws.model.ObjectPropertyInfo;
import com.mws.model.ObjectPropertyTreeNode;
import com.mws.model.OntologyAlphabet;
import com.mws.model.OntologyInfo;
import com.mws.model.OntologyVersionInfo;
import com.mws.model.Prefix;
import com.mws.model.PrefixesList;

public class StubFactory {

	public static List<MethodInfo> getProvidedMethodsList(Class<?> c) {
		List<MethodInfo> infos = new LinkedList<MethodInfo>();
		for (Method method : c.getMethods()) {
			Path path = method.getAnnotation(Path.class);
			if (path != null) {
				String pathValue = path.value();
				MethodInfo info = new MethodInfo();
				info.setName(method.getName());
				info.setPath(pathValue);
				if (!pathValue.startsWith("help")) {
					for (Annotation annotation : method.getAnnotations()) {
						if (annotation instanceof GET) {
							info.setMethod("GET");
						}
						if (annotation instanceof POST) {
							info.setMethod("POST");
						}
						if (annotation instanceof PUT) {
							info.setMethod("PUT");
						}
						if (annotation instanceof DELETE) {
							info.setMethod("DELETE");
						}
					}
					for (Parameter param : method.getParameters()) {
						PathParam pathParam = param.getAnnotation(PathParam.class);
						if (pathParam != null) {
							info.addPathParam(pathParam.value());
						}
						QueryParam queryParam = param.getAnnotation(QueryParam.class);
						if (queryParam != null) {
							info.addQueryParam(queryParam.value());
						}
					}
					Type returnType = method.getGenericReturnType();
					info.setReturnType(returnType.getTypeName());
					if (returnType instanceof ParameterizedType) {
						ParameterizedType pt = (ParameterizedType) returnType;
						info.setReturnTypeList(true);
						info.setInnerReturnType(pt.getActualTypeArguments()[0].getTypeName());
					}
					infos.add(info);					
				}
			}
		}
		return infos;
	}	

	public static ObjectInfo getObjectInfo(Class<?> type) {
		ObjectInfo info = new ObjectInfo();
		info.setName(type.getName());
		for (Field field : type.getDeclaredFields()) {
			FieldInfo finfo = new FieldInfo();
			finfo.setName(field.getName());
			Class<?> fieldType = field.getType();
			finfo.setType(fieldType.getName());
			if (fieldType.equals(List.class)) {
				finfo.setList(true);
				Type actType = field.getGenericType();
				if (actType instanceof ParameterizedType) {
					ParameterizedType pt = (ParameterizedType) actType;
					finfo.setInnerType(pt.getActualTypeArguments()[0].getTypeName());
				}
			}
			info.addFieldInfo(finfo);
		}
		return info;
	}
	
	public static OntologyInfo getSampleOntologyInfo(String name) {
		OntologyInfo info1 = new OntologyInfo();
		info1.setId(name);
		info1.setIri("http://wwww.ontos.com/" + name);
		info1.setDescription("Description fo ontology " + name);
		info1.addVersionInfo("B", "BB", "BBB");
		info1.addVersionInfo("B1", "BB1", "BBB1");
		info1.addVersionInfo("B2", "BB2", "BBB2");
		info1.setAxiomsNumber(1000);
		info1.setClassesNumber(20);
		info1.setDataPropertiesNumber(34);
		info1.setObjectPropertiesNumber(23);
		return info1;
	}
	
	public static List<OntologyInfo> getSampleOntologyInfoList() {
		List<OntologyInfo> infos = new LinkedList<OntologyInfo>();
		OntologyInfo info1 = new OntologyInfo();
		info1.setId("onto1");
		info1.setIri("http://wwww.ontos.com/onto1");
		info1.setDescription("Description fo ontology onto1");
		info1.addVersionInfo("B", "BB", "BBB");
		info1.addVersionInfo("B1", "BB1", "BBB1");
		info1.addVersionInfo("B2", "BB2", "BBB2");
		info1.setAxiomsNumber(1000);
		info1.setClassesNumber(20);
		info1.setDataPropertiesNumber(34);
		info1.setObjectPropertiesNumber(23);
		infos.add(info1);
		OntologyInfo info2 = new OntologyInfo();
		info2.setId("onto2");
		info2.setIri("http://wwww.ontos.com/onto2");
		info2.setDescription("Description fo ontology onto2");
		info2.addVersionInfo("A", "AA", "AAA");
		info2.addVersionInfo("A1", "AA1", "AAA1");
		info2.setAxiomsNumber(10000);
		info2.setClassesNumber(200);
		info2.setDataPropertiesNumber(340);
		info2.setObjectPropertiesNumber(230);
		infos.add(info2);
		OntologyInfo info3 = new OntologyInfo();
		info3.setId("onto3");
		info3.setIri("http://wwww.ontos.com/onto2");
		info3.setDescription(
				"Ciao sono Daniela, lavoro ad ACI... anche io pratico OBDA con i fantastici strumenti di OBBA Sistemme");
		info3.addVersionInfo("A", "AA", "AAA");
		info3.addVersionInfo("A1", "AA1", "AAA1");
		info3.setAxiomsNumber(10000);
		info3.setClassesNumber(200);
		info3.setDataPropertiesNumber(340);
		info3.setObjectPropertiesNumber(230);
		infos.add(info3);
		return infos;
	}

	public static OntologyVersionInfo getSampleOntologyVersionInfo(String name, String version) {
		OntologyVersionInfo info = new OntologyVersionInfo();
		info.setVersion(version);
		info.setDescription("Version " + version + " of ontology " + name);
		info.setDate("" + Calendar.getInstance().getTime().getTime());
		return info;
	}
	
	static int idx = 1;
	
	public static Prefix getSamplePrefix() {
		Prefix p = new Prefix();
		p.setPrefix("P" + ++idx);
		p.setValue("http://PREFIX_" + System.currentTimeMillis());
		return p;
	}
	
	public static PrefixesList getSamplePrefixesList() {
		PrefixesList pl = new PrefixesList();
		for (int i = 0; i < 7; i++)
			pl.addPrefix(getSamplePrefix());
		return pl;
	}

	public static OntologyAlphabet getSampleOntologyAlphabet() {
		OntologyAlphabet ab = new OntologyAlphabet ();
		ClassInfo c1 = new ClassInfo();
		c1.setId("C1");
		c1.setIri("http://www.sample.com/c1");
		ab.addClassInfo(c1);
		ClassInfo c2 = new ClassInfo();
		c2.setId("C2");
		c2.setIri("http://www.sample.com/c2");
		ab.addClassInfo(c2);
		ObjectPropertyInfo op1 = new ObjectPropertyInfo();
		op1.setId("OP1");
		op1.setIri("http://ww.sample.com/op/op1");
		ab.addObjectpropertyInfo(op1);
		ObjectPropertyInfo op2 = new ObjectPropertyInfo();
		op2.setId("OP2");
		op2.setIri("http://ww.sample.com/op/op2");
		ab.addObjectpropertyInfo(op2);
		DataPropertyInfo dp1 = new DataPropertyInfo();
		dp1.setId("DP1");
		dp1.setIri("http://ww.sample.com/dp/dp1");
		ab.addDatapropertyInfo(dp1);
		DataPropertyInfo dp2 = new DataPropertyInfo();
		dp2.setId("DP2");
		dp2.setIri("http://ww.sample.com/dp/dp2");
		ab.addDatapropertyInfo(dp2);
		return ab;
	}
	
	public static ClassTreeNode getSampleClassTree(boolean inferred, boolean named) {
		ClassInfo c1 = new ClassInfo();
		c1.setId("C1");
		c1.setIri("http://www.sample.com/c1");
		ClassInfo c2 = new ClassInfo();
		c2.setId("C2");
		c2.setIri("http://www.sample.com/c2");
		ClassInfo c3 = new ClassInfo();
		c3.setId("C3");
		c3.setIri("http://www.sample.com/c3");
		ClassInfo c4 = new ClassInfo();
		c4.setId("C4");
		c4.setIri("http://www.sample.com/c4");
		ClassInfo c5 = new ClassInfo();
		c5.setId("C5");
		c5.setIri("http://www.sample.com/c5");
		ClassInfo c6 = new ClassInfo();
		c6.setId("C6");
		c6.setIri("http://www.sample.com/c6");
		ClassTreeNode node5 = new ClassTreeNode();
		node5.setInfo(c5);
		ClassTreeNode node6 = new ClassTreeNode();
		node6.setInfo(c6);
		ClassTreeNode node4 = new ClassTreeNode();
		node4.setInfo(c4);
		node4.addChildren(node5);
		node4.addChildren(node6);
		ClassTreeNode node3 = new ClassTreeNode();
		node3.setInfo(c3);
		node3.addChildren(node4);
		ClassTreeNode node2 = new ClassTreeNode();
		node2.setInfo(c2);
		ClassTreeNode node1 = new ClassTreeNode();
		node1.setInfo(c1);
		node1.addChildren(node2);
		node1.addChildren(node3);
		return node1;
	}
	
	public static ObjectPropertyTreeNode getSampleObjectPropertyTree(boolean inferred) {
		ObjectPropertyInfo op1 = new ObjectPropertyInfo();
		op1.setId("OP1");
		op1.setIri("http://ww.sample.com/op/op1");
		ObjectPropertyInfo op2 = new ObjectPropertyInfo();
		op2.setId("OP2");
		op2.setIri("http://ww.sample.com/op/op2");
		ObjectPropertyInfo op3 = new ObjectPropertyInfo();
		op3.setId("OP3");
		op3.setIri("http://ww.sample.com/op/op3");
		ObjectPropertyInfo op3i = new ObjectPropertyInfo();
		op3i.setId("OP3i");
		op3i.setIri("http://ww.sample.com/op/op3i");
		ObjectPropertyTreeNode n1 = new ObjectPropertyTreeNode();
		ObjectPropertyTreeNode n2 = new ObjectPropertyTreeNode();
		ObjectPropertyTreeNode n3 = new ObjectPropertyTreeNode();
		ObjectPropertyTreeNode n4 = new ObjectPropertyTreeNode();
		n1.setInfo(op1);
		n2.setInfo(op2);
		n3.setInfo(op3);
		n4.setInfo(op3i);
		n1.addChildren(n2);
		n2.addChildren(n3);
		if (inferred)
			n3.addChildren(n4);
		return n1;
	}
	
	public static DataPropertyTreeNode getSampleDataPropertyTree(boolean inferred) {
		DataPropertyInfo op1 = new DataPropertyInfo();
		op1.setId("DP1");
		op1.setIri("http://ww.sample.com/dp/dp1");
		DataPropertyInfo op2 = new DataPropertyInfo();
		op2.setId("DP2");
		op2.setIri("http://ww.sample.com/dp/dp2");
		DataPropertyInfo op3 = new DataPropertyInfo();
		op3.setId("DP3");
		op3.setIri("http://ww.sample.com/dp/dp3");
		DataPropertyInfo op3ii = new DataPropertyInfo();
		op3ii.setId("DP3ii");
		op3ii.setIri("http://ww.sample.com/dp/dp3ii");
		DataPropertyInfo op3i = new DataPropertyInfo();
		op3i.setId("DP3i");
		op3i.setIri("http://ww.sample.com/dp/dp3i");
		DataPropertyTreeNode n1 = new DataPropertyTreeNode();
		DataPropertyTreeNode n2 = new DataPropertyTreeNode();
		DataPropertyTreeNode n3 = new DataPropertyTreeNode();
		DataPropertyTreeNode n3i = new DataPropertyTreeNode();
		DataPropertyTreeNode n3ii = new DataPropertyTreeNode();
		n1.setInfo(op1);
		n2.setInfo(op2);
		n3.setInfo(op3);
		n3i.setInfo(op3i);
		n3ii.setInfo(op3ii);
		n1.addChildren(n2);
		n2.addChildren(n3);
		if (inferred) {
			n1.addChildren(n3i);
			n3.addChildren(n3ii);
		}
		return n1;
	}
	
	public static FileInfo getSampleFileInfo(String name, String textContent) throws UnsupportedEncodingException {
		FileInfo info = new FileInfo();
		byte[] bytes = textContent.getBytes("UTF-8");
		String encoded = Base64.getEncoder().encodeToString(bytes);
		info.setContent(encoded);
		info.setFileName(name);
		return info;
	}
	
	public static void main(String[] args) {}
	
}
