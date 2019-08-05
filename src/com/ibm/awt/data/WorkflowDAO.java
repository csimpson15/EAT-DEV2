package com.ibm.awt.data;

import java.util.List;
import java.util.Random;
import java.util.Base64.Decoder;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Base64;

import javax.persistence.criteria.Predicate;

import javax.annotation.PostConstruct;
import javax.enterprise.context.RequestScoped;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import javax.ws.rs.core.MultivaluedMap;

@RequestScoped
public class WorkflowDAO extends DAOFacade<Workflow> {

	@PersistenceContext
	private EntityManager em;
	
	public WorkflowDAO() {
		super(Workflow.class);
	}
	
	@PostConstruct
	private void init() {
		super.initFacade();
		addUidPredicate(root.get("app")); //CHANGE TO SOMETHING????
	}
	
	@Transactional
	public void saveFile(FileClass fileToUpload) throws Exception {
		initFacade();
			
		Decoder decoder = Base64.getDecoder();
		byte[] decodedByte = decoder.decode(fileToUpload.getData().split(",")[1]);
		
		
		Workflow lt = new Workflow();
		
		Integer id = new Random().nextInt(Integer.MAX_VALUE - 1) + 1;
		
		lt.setId(id);
		lt.setName(fileToUpload.getName());
		lt.setData(decodedByte);
		lt.setLastUpdtTime(new Timestamp(System.currentTimeMillis()));
//		lt.setLogNbr(fileToUpload.getLogNbr());
		
//		em.merge(lt);
	}
	
	public List<Workflow> findAll() {
		return find();
	}
	
	public Object count(MultivaluedMap<String, String> map) {
		addPredicates(map);
		return count();
	} 
	
	public Workflow findById(int logNbr) {
		List<Predicate> predicates = new ArrayList<>();

		predicates.add(cb.equal(root.get("logNbr"), logNbr));

		this.predicates.add(cb.and(predicates.toArray(new Predicate[predicates.size()])));

		return findFirst();
	} 
	
	/*
	 * EntityManager methods
	 */
	
	@Transactional
	public List<Workflow> merge(List<Workflow> workFlows) {
		for (Workflow workFlow : workFlows) {
			System.out.println(workFlow.toString());
			workFlow = em.merge(workFlow);
//			System.out.println(workFlow.toString());
			System.out.println(workFlow);
		}
		return workFlows;
	}
	
	@Override
	EntityManager getEntityManager() {
		return em;
	}

}
