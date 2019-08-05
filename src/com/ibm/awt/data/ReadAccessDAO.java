package com.ibm.awt.data;

import java.util.List;
import javax.annotation.PostConstruct;
import javax.enterprise.context.RequestScoped;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

@RequestScoped
public class ReadAccessDAO extends DAOFacade<ReadAccess> {

	@PersistenceContext
	private EntityManager em;
	
	public ReadAccessDAO() {
		super(ReadAccess.class);
	}
	
	@PostConstruct
	private void init() {
		super.initFacade();
		addUidPredicate(root.get("app")); 
	}
		
	public List<ReadAccess> findAll() {
		return find();
	}
		
/*	public ReadAccess findById(int logNbr) {
		List<Predicate> predicates = new ArrayList<>();

		predicates.add(cb.equal(root.get("logNbr"), logNbr));

		this.predicates.add(cb.and(predicates.toArray(new Predicate[predicates.size()])));

		return findFirst();
	} */
	
	/*
	 * EntityManager methods
	 */
		
	@Override
	EntityManager getEntityManager() {
		return em;
	}

}
