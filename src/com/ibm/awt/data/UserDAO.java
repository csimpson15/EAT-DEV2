package com.ibm.awt.data;

import javax.enterprise.context.RequestScoped;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import com.ibm.websphere.security.auth.WSSubject;
import com.ibm.websphere.security.cred.WSCredential;

@RequestScoped
public class UserDAO extends DAOFacade<User> {

	@PersistenceContext
	private EntityManager em;

	public UserDAO() {
		super(User.class);
	}
	
	public String fetchUid() {
		WSCredential credential;
		try {
			credential = WSSubject.getCallerSubject().getPublicCredentials(WSCredential.class).iterator().next();


			
			uid = credential.getUniqueSecurityName().substring(4, 13);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return uid;
	}
	
	public String fetchName() {
		WSCredential credential;
		try {
			credential = WSSubject.getCallerSubject().getPublicCredentials(WSCredential.class).iterator().next();
			name = credential.getSecurityName();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return name;
	}	
	
	
	@Override
	EntityManager getEntityManager() {
		return em;
	}
	
}
