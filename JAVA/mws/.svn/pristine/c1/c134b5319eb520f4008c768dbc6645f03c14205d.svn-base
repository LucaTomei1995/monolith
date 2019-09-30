package com.mwsx.engine;

import java.util.HashSet;
import java.util.LinkedList;
import java.util.List;
import java.util.Set;
import org.semanticweb.owlapi.formats.PrefixDocumentFormat;
import org.semanticweb.owlapi.manchestersyntax.renderer.ManchesterOWLSyntaxOWLObjectRendererImpl;
import org.semanticweb.owlapi.model.IRI;
import org.semanticweb.owlapi.model.OWLAxiom;
import org.semanticweb.owlapi.model.OWLClass;
import org.semanticweb.owlapi.model.OWLClassAssertionAxiom;
import org.semanticweb.owlapi.model.OWLClassExpression;
import org.semanticweb.owlapi.model.OWLDataFactory;
import org.semanticweb.owlapi.model.OWLDataProperty;
import org.semanticweb.owlapi.model.OWLDataPropertyDomainAxiom;
import org.semanticweb.owlapi.model.OWLDataPropertyExpression;
import org.semanticweb.owlapi.model.OWLDataPropertyRangeAxiom;
import org.semanticweb.owlapi.model.OWLDataRange;
import org.semanticweb.owlapi.model.OWLDataSomeValuesFrom;
import org.semanticweb.owlapi.model.OWLDatatype;
import org.semanticweb.owlapi.model.OWLDisjointClassesAxiom;
import org.semanticweb.owlapi.model.OWLDisjointDataPropertiesAxiom;
import org.semanticweb.owlapi.model.OWLDisjointObjectPropertiesAxiom;
import org.semanticweb.owlapi.model.OWLEntity;
import org.semanticweb.owlapi.model.OWLEquivalentClassesAxiom;
import org.semanticweb.owlapi.model.OWLEquivalentDataPropertiesAxiom;
import org.semanticweb.owlapi.model.OWLEquivalentObjectPropertiesAxiom;
import org.semanticweb.owlapi.model.OWLFunctionalDataPropertyAxiom;
import org.semanticweb.owlapi.model.OWLFunctionalObjectPropertyAxiom;
import org.semanticweb.owlapi.model.OWLNamedIndividual;
import org.semanticweb.owlapi.model.OWLObjectInverseOf;
import org.semanticweb.owlapi.model.OWLObjectProperty;
import org.semanticweb.owlapi.model.OWLObjectPropertyDomainAxiom;
import org.semanticweb.owlapi.model.OWLObjectPropertyExpression;
import org.semanticweb.owlapi.model.OWLObjectPropertyRangeAxiom;
import org.semanticweb.owlapi.model.OWLObjectSomeValuesFrom;
import org.semanticweb.owlapi.model.OWLOntology;
import org.semanticweb.owlapi.model.OWLOntologyCreationException;
import org.semanticweb.owlapi.model.OWLOntologyManager;
import org.semanticweb.owlapi.model.OWLProperty;
import org.semanticweb.owlapi.model.OWLSubClassOfAxiom;
import org.semanticweb.owlapi.model.OWLSubDataPropertyOfAxiom;
import org.semanticweb.owlapi.model.OWLSubObjectPropertyOfAxiom;

import com.mwsx.model.ClassIndividuals;
import com.mwsx.model.Entities;
import com.mwsx.model.Entity;
import com.mwsx.model.HierarchyTree;
import com.mwsx.model.Individuals;
import com.mwsx.model.Label;
import com.mwsx.model.Participation;
import com.mwsx.model.TreeNode;

public class ReasoningServices {
	
	public static final String CLASS_ID_PREFIX = "CL_";
	public static final String OBJECT_PROPERTY_ID_PREFIX = "OP_";
	public static final String DATA_PROPERTY_ID_PREFIX = "DP_";
	
	public static final String MANCHESTER_SYNTAX = "MANCHESTER_SYNTAX";
	public static final String FUNCTIONAL_SYNTAX = "FUNCTIONAL_SYNTAX";
	
	public static String RENDERING_SYNTAX = MANCHESTER_SYNTAX;
	
	private Entities entities;
	private Individuals ind;
	private OWLOntology ontology;
	private PrefixDocumentFormat pdf;
	
	public static Entity getExpressionEntityFunctional(OWLClassExpression expr) {
		Entity exprEntity = new Entity();
		exprEntity.setEntityType(MwsxOntologyManager.ENTITY_EXPR_TYPE);
		exprEntity.setEntityID(expr.toString());
		exprEntity.setEntityIRI(expr.toString());
		exprEntity.setEntityPrefixIRI(expr.toString());
		exprEntity.setEntityRemainder(expr.toString());
		return exprEntity;
	}
	
	public static Entity getExpressionEntityManchester(OWLClassExpression expr) {
		ManchesterOWLSyntaxOWLObjectRendererImpl renderer = new ManchesterOWLSyntaxOWLObjectRendererImpl();
		Entity exprEntity = new Entity();
		exprEntity.setEntityType(MwsxOntologyManager.ENTITY_EXPR_TYPE);
		exprEntity.setEntityID(renderer.render(expr));
		exprEntity.setEntityIRI(renderer.render(expr));
		exprEntity.setEntityPrefixIRI(renderer.render(expr));
		exprEntity.setEntityRemainder(renderer.render(expr));
		return exprEntity;
	}
	
	public static Entity getExpressionEntity(OWLDataRange expr) {
		Entity exprEntity = new Entity();
		exprEntity.setEntityType(MwsxOntologyManager.ENTITY_EXPR_TYPE);
		exprEntity.setEntityID(expr.toString());
		exprEntity.setEntityIRI(expr.toString());
		exprEntity.setEntityPrefixIRI(expr.toString());
		exprEntity.setEntityRemainder(expr.toString());
		return exprEntity;
	}

	public static Individuals extractIndividuals(Entities entities, OWLOntology ontology) throws OWLOntologyCreationException {
		Individuals individs = new Individuals();
		List<ClassIndividuals> clinds = new LinkedList<ClassIndividuals>();
		for (Entity clazz : entities.getClassEntities()) {
			ClassIndividuals cind = new ClassIndividuals();
			cind.setTheClass(clazz);
			int indCount = 1;
			OWLClass owlClass = ontology.getOWLOntologyManager().getOWLDataFactory().getOWLClass(IRI.create(clazz.getEntityIRI()));
			List<Entity> individuals = new LinkedList<Entity>();
			PrefixDocumentFormat pdf =  (PrefixDocumentFormat) ontology.getOWLOntologyManager().getOntologyFormat(ontology);
			for (OWLClassAssertionAxiom clAss : ontology.getClassAssertionAxioms(owlClass)) {
				String id = "IND_" + indCount++ + clazz.getEntityID();
				for (OWLNamedIndividual ind : clAss.getIndividualsInSignature()) {
					individuals.add(MwsxOntologyManager.extractEntity(id, ontology, ind, pdf));					
				}
			}
			clinds.add(cind);
			cind.setIndividuals(individuals);
		}
		individs.setIndividuals(clinds);
		return individs;
	}
	
	public ReasoningServices(OWLOntology o, Entities entities) throws OWLOntologyCreationException {
		this.entities = entities;
		this.ontology = o;
		this.ind = ReasoningServices.extractIndividuals(entities, o);
		this.pdf =  (PrefixDocumentFormat) ontology.getOWLOntologyManager().getOntologyFormat(ontology);
	}

	public String id(OWLEntity entity) {
		if (entity instanceof OWLClass) {
			for (Entity cl : this.entities.getClassEntities()) {
				if (cl.getEntityIRI().equals(entity.getIRI().toString()))
					return cl.getEntityID();
			}
		}
		if (entity instanceof OWLObjectProperty) {
			for (Entity cl : this.entities.getObjectPropertyEntities()) {
				if (cl.getEntityIRI().equals(entity.getIRI().toString()))
					return cl.getEntityID();
			}
		}
		if (entity instanceof OWLDataProperty) {
			for (Entity cl : this.entities.getDataPropertyEntities()) {
				if (cl.getEntityIRI().equals(entity.getIRI().toString()))
					return cl.getEntityID();
			}
		}
		throw new RuntimeException("Entity " + entity + " not found in entity index!");
	}
	
	public Entity entityExpression(OWLClassExpression expr) {
		if (RENDERING_SYNTAX.equals(MANCHESTER_SYNTAX))
			return ReasoningServices.getExpressionEntityManchester(expr);
		else 
			return ReasoningServices.getExpressionEntityFunctional(expr);
	}
	
	public Entity entity(OWLEntity entity) {
		if (entity instanceof OWLClass) {
			for (Entity cl : this.entities.getClassEntities()) {
				if (cl.getEntityIRI().equals(entity.getIRI().toString()))
					return cl;
			}
		}
		if (entity instanceof OWLObjectProperty) {
			for (Entity cl : this.entities.getObjectPropertyEntities()) {
				if (cl.getEntityIRI().equals(entity.getIRI().toString()))
					return cl;
			}
		}
		if (entity instanceof OWLDataProperty) {
			for (Entity cl : this.entities.getDataPropertyEntities()) {
				if (cl.getEntityIRI().equals(entity.getIRI().toString()))
					return cl;
			}
		}
		if (entity instanceof OWLDatatype) {
			OWLDatatype dt = (OWLDatatype) entity;
			Entity e = new Entity();
			e.setEntityID(dt.getIRI().getRemainder().get());
			e.setEntityIRI(dt.getIRI().toString());
			e.setEntityType(MwsxOntologyManager.ENTITY_DT_TYPE);
			e.setEntityPrefixIRI(this.pdf.getPrefixIRI(dt.getIRI()));
			e.setEntityRemainder(dt.getIRI().getRemainder().get());
			return e;
		}
		throw new RuntimeException("Entity " + entity + " not found in entity index!");
	}
	
	public String renderer(OWLEntity entity) {
		return entity.getIRI().toString();
	}
	
	public HierarchyTree buildHierarchyTree(OWLOntology ontology) {
		HierarchyTree tree = new HierarchyTree();
		tree.setClassTree(buildClassTree(ontology));
		tree.setObjectPropertyTree(buildObjectPropertyTree(ontology));
		tree.setDataPropertyTree(buildDataPropertyTree(ontology));
		return tree;
	}
	
	private TreeNode buildClassTree(OWLOntology ontology) {
		TreeNode root = new TreeNode();
		Entity rootEntity = new Entity();
		rootEntity.setEntityID("ROOT");
		rootEntity.setEntityIRI("ROOT");
		root.setEntity(rootEntity );
		Set<OWLClass> childrenClasses = getRootClasses();
		Set<OWLClass> traversed = new HashSet<OWLClass>();
		aux_buildClassTree(ontology, root, childrenClasses, traversed);
		return root;
	}
	
	private TreeNode buildObjectPropertyTree(OWLOntology ontology) {
		TreeNode root = new TreeNode();
		Entity rootEntity = new Entity();
		rootEntity.setEntityID("ROOT");
		rootEntity.setEntityIRI("ROOT");
		root.setEntity(rootEntity );
		Set<OWLObjectProperty> childrenClasses = getRootObjectProperties();
		Set<OWLObjectProperty> traversed = new HashSet<OWLObjectProperty>();
		aux_buildObjectPropertyTree(ontology, root, childrenClasses, traversed);
		return root;
	}
	
	private TreeNode buildDataPropertyTree(OWLOntology ontology) {
		TreeNode root = new TreeNode();
		Entity rootEntity = new Entity();
		rootEntity.setEntityID("ROOT");
		rootEntity.setEntityIRI("ROOT");
		root.setEntity(rootEntity );
		Set<OWLDataProperty> childrenClasses = getRootDataProperties();
		Set<OWLDataProperty> traversed = new HashSet<OWLDataProperty>();
		aux_buildDataPropertyTree(ontology, root, childrenClasses, traversed);
		return root;
	}

	private void aux_buildClassTree(OWLOntology ontology, TreeNode root, Set<OWLClass> childrenClasses, Set<OWLClass> traversed) {
		List<TreeNode> children = new LinkedList<TreeNode>();
		for (OWLClass c : childrenClasses) {
			if (c.isOWLThing())
				continue;
			if (traversed.contains(c))
				break;
			traversed.add(c);
			TreeNode node = new TreeNode();
			Entity entity = entity(c);
			aux_buildClassTree(ontology, node, getSubClasses(c), traversed);
			node.setEntity(entity);
			children.add(node);
		}
		root.setChildren(children);
	}
	
	private void aux_buildObjectPropertyTree(OWLOntology ontology, TreeNode root, Set<OWLObjectProperty> childrenClasses, Set<OWLObjectProperty> traversed) {
		List<TreeNode> children = new LinkedList<TreeNode>();
		for (OWLObjectProperty c : childrenClasses) {
			if (c.isTopEntity())
				continue;
			if (traversed.contains(c))
				break;
			traversed.add(c);
			TreeNode node = new TreeNode();
			Entity entity = entity(c);
			aux_buildObjectPropertyTree(ontology, node, getSubObjectProperties(c), traversed);
			node.setEntity(entity);
			children.add(node);
		}
		root.setChildren(children);
	}
	
	private void aux_buildDataPropertyTree(OWLOntology ontology, TreeNode root, Set<OWLDataProperty> childrenClasses, Set<OWLDataProperty> traversed) {
		List<TreeNode> children = new LinkedList<TreeNode>();
		for (OWLDataProperty c : childrenClasses) {
			if (c.isTopEntity())
				continue;
			if (traversed.contains(c))
				break;
			traversed.add(c);
			TreeNode node = new TreeNode();
			Entity entity = entity(c);
			aux_buildDataPropertyTree(ontology, node, getSubDataProperties(c), traversed);
			node.setEntity(entity);
			children.add(node);
		}
		root.setChildren(children);
	}

	public Set<OWLClass> getRootClasses() {
		Set<OWLClass> rootClasses = new HashSet<OWLClass>();
		for (OWLClass clazz : ontology.getClassesInSignature()) {
			boolean found = false;
			for (OWLAxiom ax : ontology.getAxioms()) {
				if ( ax instanceof OWLSubClassOfAxiom) {
					OWLSubClassOfAxiom sbco = (OWLSubClassOfAxiom) ax;
					OWLClassExpression expr = sbco.getSubClass();
					OWLClassExpression sup = sbco.getSuperClass();
					if (expr instanceof OWLClass && sup instanceof OWLClass) {
						if (expr.asOWLClass().equals(clazz)) {
							found = true;
							break;
						}
					}
				}
			}
			if (!found)
				rootClasses.add(clazz);
		}
		return rootClasses;
	}
	
	public Set<OWLClass> getSubClasses(OWLClass sup) {
		Set<OWLClass> subClasses = new HashSet<OWLClass>();
		for (OWLAxiom ax : ontology.getAxioms()) {
			if ( ax instanceof OWLSubClassOfAxiom) {
				OWLSubClassOfAxiom sbco = (OWLSubClassOfAxiom) ax;
				OWLClassExpression exprSup = sbco.getSuperClass();
				if (exprSup instanceof OWLClass) {
					if (exprSup.asOWLClass().equals(sup)) {
						OWLClassExpression exprSub = sbco.getSubClass();
						if (exprSub instanceof OWLClass)
							subClasses.add(exprSub.asOWLClass());
					}
				}
			}
		}
		return subClasses;
	}
	
	public Set<OWLClassExpression> getSubClasseExpressions(OWLClass sup) {
		Set<OWLClassExpression> subClasses = new HashSet<OWLClassExpression>();
		for (OWLAxiom ax : ontology.getAxioms()) {
			if ( ax instanceof OWLSubClassOfAxiom) {
				OWLSubClassOfAxiom sbco = (OWLSubClassOfAxiom) ax;
				OWLClassExpression exprSup = sbco.getSuperClass();
				if (exprSup instanceof OWLClass) {
					if (exprSup.equals(sup)) {
						OWLClassExpression exprSub = sbco.getSubClass();
						if (!(exprSub instanceof OWLClass)) {
							subClasses.add(exprSub);
						}
					}
				}
			}
		}
		return subClasses;
	}
	
	public Set<OWLClass> getSuperClasses(OWLClass sub) {
		Set<OWLClass> superClasses = new HashSet<OWLClass>();
		for (OWLAxiom ax : ontology.getAxioms()) {
			if ( ax instanceof OWLSubClassOfAxiom) {
				OWLSubClassOfAxiom sbco = (OWLSubClassOfAxiom) ax;
				OWLClassExpression exprSup = sbco.getSubClass();
				if (exprSup instanceof OWLClass) {
					if (exprSup.asOWLClass().equals(sub)) {
						OWLClassExpression exprSub = sbco.getSuperClass();
						if (exprSub instanceof OWLClass)
							superClasses.add(exprSub.asOWLClass());
					}
				}
			}
		}
		return superClasses;
	}
	
	public Set<OWLClassExpression> getSuperClasseExpressions(OWLClass sub) {
		Set<OWLClassExpression> superClasses = new HashSet<OWLClassExpression>();
		for (OWLAxiom ax : ontology.getAxioms()) {
			if ( ax instanceof OWLSubClassOfAxiom) {
				OWLSubClassOfAxiom sbco = (OWLSubClassOfAxiom) ax;
				OWLClassExpression exprSub = sbco.getSubClass();
				if (exprSub instanceof OWLClass) {
					if (exprSub.equals(sub)) {
						OWLClassExpression exprSup = sbco.getSuperClass();
						if (!(exprSup instanceof OWLClass))
							superClasses.add(exprSup);
					}
				}
			}
		}
		return superClasses;
	}
	
	public void getClassParticipations(OWLClass sub, Set<Participation> opPart, Set<Participation> dpPart) {
		for (OWLAxiom ax : ontology.getAxioms()) {
			if ( ax instanceof OWLSubClassOfAxiom) {
				OWLSubClassOfAxiom sbco = (OWLSubClassOfAxiom) ax;
				OWLClassExpression exprSub = sbco.getSubClass();
				if (exprSub instanceof OWLClass) {					
					if (exprSub.asOWLClass().equals(sub)) {
						OWLClassExpression exprSup = sbco.getSuperClass();
						if (exprSup instanceof OWLObjectSomeValuesFrom) {
							OWLObjectSomeValuesFrom osvf = (OWLObjectSomeValuesFrom) exprSup;
							OWLObjectProperty property = null;
							boolean inverse = false;
							if (osvf.getProperty() instanceof OWLObjectInverseOf) {
								property = osvf.getProperty().getInverseProperty().asOWLObjectProperty();
								inverse = true;
							}
							else 
								property = osvf.getProperty().asOWLObjectProperty();
							OWLClassExpression filler = osvf.getFiller();
							Participation p = new Participation();
							p.setProperty(entity(property));
							p.setInverse(inverse);
							if (filler instanceof OWLClass) {
								OWLClass c = filler.asOWLClass();
								p.setFiller(entity(c));								
							}
							else {
								Entity expr = entityExpression(filler);
								p.setFiller(expr);
							}
							opPart.add(p);
						}
						if (exprSup instanceof OWLDataSomeValuesFrom) {
							OWLDataSomeValuesFrom dsvf = (OWLDataSomeValuesFrom) exprSup;
							OWLDataProperty property = dsvf.getProperty().asOWLDataProperty();
							OWLDataRange filler = dsvf.getFiller().asOWLDatatype();
							Participation p = new Participation();
							p.setProperty(entity(property));
							p.setInverse(false);
							if (filler instanceof OWLDatatype) {
								OWLDatatype c = filler.asOWLDatatype();
								p.setFiller(entityDatatype(c));
							}
							else {
								Entity expr = ReasoningServices.getExpressionEntity(filler);
								p.setFiller(expr);
							}
							dpPart.add(p);
						}
					}
				}
			}
		}
	}
	
	private Entity entityDatatype(OWLDatatype filler) {
		Entity entity = new Entity();
		entity.setEntityID("");
		entity.setEntityIRI(filler.getIRI().toString());
		List<Label> ls = new LinkedList<Label>();
		Label l = new Label();
		l.setContent(filler.getIRI().getRemainder().get());
		ls.add(l);
		entity.setEntityLabels(ls);
		entity.setEntityType("DATA_TYPE");
		entity.setEntityRemainder(filler.getIRI().getRemainder().get());
		return entity;
	}

	public Set<OWLObjectProperty> getRootObjectProperties() {
		Set<OWLObjectProperty> rootClasses = new HashSet<OWLObjectProperty>();
		for (OWLObjectProperty clazz : ontology.getObjectPropertiesInSignature()) {
			boolean found = false;
			for (OWLAxiom ax : ontology.getAxioms()) {
				if ( ax instanceof OWLSubObjectPropertyOfAxiom) {
					OWLSubObjectPropertyOfAxiom sbco = (OWLSubObjectPropertyOfAxiom) ax;
					OWLObjectPropertyExpression expr = sbco.getSubProperty();
					OWLObjectPropertyExpression sup = sbco.getSuperProperty();
					if (expr instanceof OWLObjectProperty && sup instanceof OWLObjectProperty) {
						if (expr.asOWLObjectProperty().equals(clazz)) {
							found = true;
							break;
						}
					}
				}
			}
			if (!found)
				rootClasses.add(clazz);
		}
		return rootClasses;
	}
	
	public Set<OWLObjectProperty> getSubObjectProperties(OWLObjectProperty sup) {
		Set<OWLObjectProperty> subClasses = new HashSet<OWLObjectProperty>();
		for (OWLAxiom ax : ontology.getAxioms()) {
			if ( ax instanceof OWLSubObjectPropertyOfAxiom) {
				OWLSubObjectPropertyOfAxiom sbco = (OWLSubObjectPropertyOfAxiom) ax;
				OWLObjectPropertyExpression exprSup = sbco.getSuperProperty();
				if (exprSup instanceof OWLObjectProperty) {
					if (exprSup.asOWLObjectProperty().equals(sup)) {
						OWLObjectPropertyExpression exprSub = sbco.getSubProperty();
						if (exprSub instanceof OWLObjectProperty)
							subClasses.add(exprSub.asOWLObjectProperty());
					}
				}
			}
		}
		return subClasses;
	}
	
	public Set<OWLObjectProperty> getSuperObjectProperties(OWLObjectProperty sub) {
		Set<OWLObjectProperty> superOP = new HashSet<OWLObjectProperty>();
		for (OWLAxiom ax : ontology.getAxioms()) {
			if ( ax instanceof OWLSubObjectPropertyOfAxiom) {
				OWLSubObjectPropertyOfAxiom sbco = (OWLSubObjectPropertyOfAxiom) ax;
				OWLObjectPropertyExpression exprSup = sbco.getSubProperty();
				if (exprSup instanceof OWLObjectProperty) {
					if (exprSup.asOWLObjectProperty().equals(sub)) {
						OWLObjectPropertyExpression exprSub = sbco.getSuperProperty();
						if (exprSub instanceof OWLObjectProperty)
							superOP.add(exprSub.asOWLObjectProperty());
					}
				}
			}
		}
		return superOP;
	}
	
	public Set<OWLDataProperty> getRootDataProperties() {
		Set<OWLDataProperty> rootClasses = new HashSet<OWLDataProperty>();
		for (OWLDataProperty clazz : ontology.getDataPropertiesInSignature()) {
			boolean found = false;
			for (OWLAxiom ax : ontology.getAxioms()) {
				if ( ax instanceof OWLSubDataPropertyOfAxiom) {
					OWLSubDataPropertyOfAxiom sbco = (OWLSubDataPropertyOfAxiom) ax;
					OWLDataPropertyExpression expr = sbco.getSubProperty();
					OWLDataPropertyExpression sup = sbco.getSuperProperty();
					if (expr instanceof OWLDataProperty && sup instanceof OWLDataProperty) {
						if (expr.asOWLDataProperty().equals(clazz)) {
							found = true;
							break;
						}
					}
				}
			}
			if (!found)
				rootClasses.add(clazz);
		}
		return rootClasses;
	}
	
	public Set<OWLDataProperty> getSubDataProperties(OWLDataProperty sup) {
		Set<OWLDataProperty> subClasses = new HashSet<OWLDataProperty>();
		for (OWLAxiom ax : ontology.getAxioms()) {
			if ( ax instanceof OWLSubDataPropertyOfAxiom) {
				OWLSubDataPropertyOfAxiom sbco = (OWLSubDataPropertyOfAxiom) ax;
				OWLDataPropertyExpression exprSup = sbco.getSuperProperty();
				if (exprSup instanceof OWLDataProperty) {
					if (exprSup.asOWLDataProperty().equals(sup)) {
						OWLDataPropertyExpression exprSub = sbco.getSubProperty();
						if (exprSub instanceof OWLDataProperty)
							subClasses.add(exprSub.asOWLDataProperty());
					}
				}
			}
		}
		return subClasses;
	}
	
	public Set<OWLDataProperty> getSuperDataProperties(OWLDataProperty sub) {
		Set<OWLDataProperty> superDP = new HashSet<OWLDataProperty>();
		for (OWLAxiom ax : ontology.getAxioms()) {
			if ( ax instanceof OWLSubDataPropertyOfAxiom) {
				OWLSubDataPropertyOfAxiom sbco = (OWLSubDataPropertyOfAxiom) ax;
				OWLDataPropertyExpression exprSup = sbco.getSubProperty();
				if (exprSup instanceof OWLDataProperty) {
					if (exprSup.asOWLDataProperty().equals(sub)) {
						OWLDataPropertyExpression exprSub = sbco.getSuperProperty();
						if (exprSub instanceof OWLDataProperty)
							superDP.add(exprSub.asOWLDataProperty());
					}
				}
			}
		}
		return superDP;
	}
	
	public List<Entity> getSubEntities(OWLEntity entity) {
		List<Entity> sub = new LinkedList<Entity>();
		if (entity instanceof OWLClass) {
			for (OWLClass c : this.getSubClasses((OWLClass)entity)) {
				sub.add(entity(c));
			}
			for (OWLClassExpression c : this.getSubClasseExpressions((OWLClass)entity)) {
				sub.add(entityExpression(c));
			}
		}
		if (entity instanceof OWLObjectProperty) {
			for (OWLObjectProperty c : this.getSubObjectProperties((OWLObjectProperty)entity)) {
				sub.add(entity(c));
			}
		}
		if (entity instanceof OWLDataProperty) {
			for (OWLDataProperty c : this.getSubDataProperties((OWLDataProperty)entity)) {
				sub.add(entity(c));
			}
		}
		return sub;
	}
	
	public List<Entity> getSuperEntities(OWLEntity entity) {
		List<Entity> sup = new LinkedList<Entity>();
		if (entity instanceof OWLClass) {
			for (OWLClass c : this.getSuperClasses((OWLClass)entity)) {
				sup.add(entity(c));
			}
			for (OWLClassExpression c : this.getSuperClasseExpressions((OWLClass)entity)) {
				sup.add(entityExpression(c));
			}
		}
		if (entity instanceof OWLObjectProperty) {
			for (OWLObjectProperty c : this.getSuperObjectProperties((OWLObjectProperty)entity)) {
				sup.add(entity(c));
			}
		}
		if (entity instanceof OWLDataProperty) {
			for (OWLDataProperty c : this.getSuperDataProperties((OWLDataProperty)entity)) {
				sup.add(entity(c));
			}
		}
		return sup;
	}
	
	public Set<Entity> getDisjointEntities(OWLEntity entity) {
		Set<Entity> disj = new HashSet<Entity>();
		if (entity instanceof OWLClass) {
			OWLClass clazz = (OWLClass) entity;
			for (OWLDisjointClassesAxiom axiom : this.ontology.getDisjointClassesAxioms(clazz)) {
				Set<Entity> curr = new HashSet<Entity>();
				boolean found = false;
				for (OWLClassExpression exp : axiom.getClassExpressions()) {
					if (exp instanceof OWLClass) {
						OWLClass actClass = exp.asOWLClass();
						if (actClass.equals(clazz))
							found = true;
						else
							curr.add(entity(actClass));
					}
					else {
						Entity ent = entityExpression(exp);
						disj.add(ent);
					}
				}
				if (found)
					disj.addAll(curr);
			}
		}
		if (entity instanceof OWLObjectProperty) {
			OWLObjectProperty clazz = (OWLObjectProperty) entity;
			for (OWLDisjointObjectPropertiesAxiom axiom : this.ontology.getDisjointObjectPropertiesAxioms(clazz)) {
				Set<Entity> curr = new HashSet<Entity>();
				boolean found = false;
				for (OWLObjectPropertyExpression exp : axiom.getObjectPropertiesInSignature()) {
					if (exp instanceof OWLObjectProperty) {
						OWLObjectProperty actClass = exp.asOWLObjectProperty();
						if (actClass.equals(clazz))
							found = true;
						else
							curr.add(entity(actClass));
					}
				}
				if (found)
					disj.addAll(curr);
			}
		}
		if (entity instanceof OWLDataProperty) {
			OWLDataProperty clazz = (OWLDataProperty) entity;
			for (OWLDisjointDataPropertiesAxiom axiom : this.ontology.getDisjointDataPropertiesAxioms(clazz)) {
				Set<Entity> curr = new HashSet<Entity>();
				boolean found = false;
				for (OWLDataPropertyExpression exp : axiom.getDataPropertiesInSignature()) {
					if (exp instanceof OWLDataProperty) {
						OWLDataProperty actClass = exp.asOWLDataProperty();
						if (actClass.equals(clazz))
							found = true;
						else
							curr.add(entity(actClass));
					}
				}
				if (found)
					disj.addAll(curr);
			}
		}
		return disj; 
	}
	
	public Set<Entity> getEquivalentEntities(OWLEntity entity) {
		Set<Entity> equiv = new HashSet<Entity>();
		if (entity instanceof OWLClass) {
			OWLClass clazz = (OWLClass) entity;
			for (OWLEquivalentClassesAxiom axiom : this.ontology.getEquivalentClassesAxioms(clazz)) {
				Set<Entity> curr = new HashSet<Entity>();
				boolean found = false;
				for (OWLClassExpression exp : axiom.getClassExpressions()) {
					if (exp instanceof OWLClass) {
						OWLClass actClass = exp.asOWLClass();
						if (actClass.equals(clazz))
							found = true;
						else
							curr.add(entity(actClass));
					}
					else {
						Entity ent = entityExpression(exp);
						equiv.add(ent);
					}
				}
				if (found)
					equiv.addAll(curr);
			}
		}
		if (entity instanceof OWLObjectProperty) {
			OWLObjectProperty clazz = (OWLObjectProperty) entity;
			for (OWLEquivalentObjectPropertiesAxiom axiom : this.ontology.getEquivalentObjectPropertiesAxioms(clazz)) {
				Set<Entity> curr = new HashSet<Entity>();
				boolean found = false;
				for (OWLObjectPropertyExpression exp : axiom.getObjectPropertiesInSignature()) {
					if (exp instanceof OWLObjectProperty) {
						OWLObjectProperty actClass = exp.asOWLObjectProperty();
						if (actClass.equals(clazz))
							found = true;
						else
							curr.add(entity(actClass));
					}
				}
				if (found)
					equiv.addAll(curr);
			}
		}
		if (entity instanceof OWLDataProperty) {
			OWLDataProperty clazz = (OWLDataProperty) entity;
			for (OWLEquivalentDataPropertiesAxiom axiom : this.ontology.getEquivalentDataPropertiesAxioms(clazz)) {
				Set<Entity> curr = new HashSet<Entity>();
				boolean found = false;
				for (OWLDataPropertyExpression exp : axiom.getDataPropertiesInSignature()) {
					if (exp instanceof OWLDataProperty) {
						OWLDataProperty actClass = exp.asOWLDataProperty();
						if (actClass.equals(clazz))
							found = true;
						else
							curr.add(entity(actClass));
					}
				}
				if (found)
					equiv.addAll(curr);
			}
		}
		return equiv; 
	}

	public List<Entity> getIndividuals(OWLClass owlClass, OWLOntology ontology) {
		Entity clazz = entity(owlClass);
		for (ClassIndividuals clInd : this.ind.getIndividuals()) {
			if (clInd.getTheClass().getEntityID().equals(clazz.getEntityID()))
				return clInd.getIndividuals() == null ? new LinkedList<Entity>() : clInd.getIndividuals();
		}
		throw new RuntimeException("Cannot find individuals for class " + owlClass.getIRI().toString());
	}
	
	public List<Entity> getPropertyDomain(OWLProperty property, OWLOntology ontology) {
		List<Entity> domains = new LinkedList<Entity>();
		for (OWLAxiom ax : ontology.getAxioms()) {
			if (property instanceof OWLObjectProperty && ax instanceof OWLObjectPropertyDomainAxiom) {
				OWLObjectPropertyDomainAxiom opdax = (OWLObjectPropertyDomainAxiom) ax;
				if (opdax.getProperty().asOWLObjectProperty().equals(property)) {
					OWLClassExpression c = opdax.getDomain();
					if (c instanceof OWLClass) {
						domains.add(entity(c.asOWLClass()));
					}
					else {
						domains.add(entityExpression(c));
					}
				}
			}
			if (property instanceof OWLDataProperty && ax instanceof OWLDataPropertyDomainAxiom) {
				OWLDataPropertyDomainAxiom opdax = (OWLDataPropertyDomainAxiom) ax;
				if (opdax.getProperty().asOWLDataProperty().equals(property)) {
					OWLClassExpression c = opdax.getDomain();
					if (c instanceof OWLClass) {
						domains.add(entity(c.asOWLClass()));
					}
					else {
						domains.add(entityExpression(c));
					}
				}
			}
		}
		return domains;
	}
	
	public List<Entity> getPropertyRange(OWLProperty property, OWLOntology ontology) {
		List<Entity> ranges = new LinkedList<Entity>();
		for (OWLAxiom ax : ontology.getAxioms()) {
			if (property instanceof OWLObjectProperty && ax instanceof OWLObjectPropertyRangeAxiom) {
				OWLObjectPropertyRangeAxiom oprax = (OWLObjectPropertyRangeAxiom) ax;
				if (oprax.getProperty().asOWLObjectProperty().equals(property)) {
					OWLClassExpression c = oprax.getRange();
					if (c instanceof OWLClass) {
						ranges.add(entity(c.asOWLClass()));
					}
					else {
						ranges.add(entityExpression(c));
					}
				}
			}
			if (property instanceof OWLDataProperty && ax instanceof OWLDataPropertyRangeAxiom) {
				OWLDataPropertyRangeAxiom dprax = (OWLDataPropertyRangeAxiom) ax;
				if (dprax.getProperty().asOWLDataProperty().equals(property)) {
					OWLDataRange c = dprax.getRange();
					if (c instanceof OWLDatatype) {
						ranges.add(entity(c.asOWLDatatype()));
					}
					else {
						ranges.add(ReasoningServices.getExpressionEntity(c));
					}
				}
			}
		}
		return ranges;
	}
	
	public Boolean getPropertyFunctional(OWLProperty property, OWLOntology ontology) {
		if (property instanceof OWLDataProperty)
			for (OWLAxiom ax : ontology.getAxioms()) {
				if (ax instanceof OWLFunctionalDataPropertyAxiom) {
					OWLFunctionalDataPropertyAxiom f = (OWLFunctionalDataPropertyAxiom) ax;
					if (f.getProperty().asOWLDataProperty().equals(property)) {
						return new Boolean(true);
					}
				}
			}
		if (property instanceof OWLObjectProperty)
			for (OWLAxiom ax : ontology.getAxioms()) {
				if (ax instanceof OWLFunctionalObjectPropertyAxiom) {
					OWLFunctionalObjectPropertyAxiom f = (OWLFunctionalObjectPropertyAxiom) ax;
					if (f.getProperty().asOWLObjectProperty().equals(property)) {
						return new Boolean(true);
					}
				}
				
			}
		return new Boolean(false);
	}
	
	public Boolean getPropertyInverseFunctional(OWLObjectProperty property, OWLOntology ontology) {
		for (OWLAxiom ax : ontology.getAxioms()) {
			if (ax instanceof OWLFunctionalObjectPropertyAxiom) {
				OWLFunctionalObjectPropertyAxiom f = (OWLFunctionalObjectPropertyAxiom) ax;
				if (f.getProperty() instanceof OWLObjectInverseOf) {
					if (f.getProperty().getInverseProperty().asOWLObjectProperty().equals(property)) {
						return new Boolean(true);
					}
				}
			}
		}
		return new Boolean(false);
	}
	
	public List<String> getObjectPropertyCharacteristics(OWLObjectProperty property, OWLOntology ontology) {
		List<String> c = new LinkedList<String>();
		return c;
	}
	
}
