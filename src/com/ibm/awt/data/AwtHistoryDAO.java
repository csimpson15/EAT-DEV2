package com.ibm.awt.data;

import java.util.List;
import java.util.ArrayList;
import javax.persistence.criteria.Predicate;

import javax.annotation.PostConstruct;
import javax.enterprise.context.RequestScoped;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.StoredProcedureQuery;
import javax.transaction.Transactional;
import javax.ws.rs.core.MultivaluedMap;

@RequestScoped
public class AwtHistoryDAO extends DAOFacade<AwtHistory> {

	@PersistenceContext
	private EntityManager em;
	
	public AwtHistoryDAO() {
		super(AwtHistory.class);
	}

	@PostConstruct
	private void init() {
		super.initFacade();
		//addUidPredicate(root.get("id").get("rptUid"));
	}
	
	/*
	 * EntityManager methods
	 */
	
	@Transactional
	public List<AwtHistory> merge(List<AwtHistory> awtHistorys) {
		for (AwtHistory awtHistory : awtHistorys) {
			awtHistory = em.merge(awtHistory);
		}
		return awtHistorys;
	}
	
	@Override
	EntityManager getEntityManager() {
		return em;
	}
	
	
	public void addApproverHistory(int p_log_nbr, String p_comments, String p_status) {
        StoredProcedureQuery storedProcedure = em.createNamedStoredProcedureQuery("approver_history");
        storedProcedure.setParameter("p_log_nbr", p_log_nbr);
        storedProcedure.setParameter("p_submitter_cnum", uid);
        storedProcedure.setParameter("p_comments", p_comments);
        storedProcedure.setParameter("p_status", p_status);
        storedProcedure.execute();
    }
}
