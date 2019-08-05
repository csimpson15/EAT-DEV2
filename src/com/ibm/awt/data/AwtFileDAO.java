package com.ibm.awt.data;

import java.sql.Timestamp;
import java.util.Base64;
import java.util.Base64.Decoder;
import java.util.List;
import java.util.Random;

import javax.annotation.PostConstruct;
import javax.enterprise.context.RequestScoped;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import javax.ws.rs.core.MultivaluedMap;

@RequestScoped
public class AwtFileDAO extends DAOFacade<AwtFile> {

	@PersistenceContext
	private EntityManager em;

	public AwtFileDAO() {
		super(AwtFile.class);
	}
	
	@PostConstruct
	private void init() {
		super.initFacade();
	}
  	
	@Transactional
	public void saveFile(FileClass fileToUpload) throws Exception {
			
		Decoder decoder = Base64.getDecoder();
		byte[] decodedByte = decoder.decode(fileToUpload.getData().split(",")[1]);
		
		
		AwtFile lt = new AwtFile();
//		Workflow lt = new Workflow();
		
		Integer id = new Random().nextInt(Integer.MAX_VALUE - 1) + 1;
		
		lt.setId(id);
		lt.setName(fileToUpload.getName());
		lt.setData(decodedByte);
		lt.setLastUpdtTime(new Timestamp(System.currentTimeMillis()));
//		lt.setLogNbr(fileToUpload.getLogNbr());
		
		em.merge(lt);
	}
          
     public AwtFile findFile(long id) {
    	 //Long ids = Long.valueOf(id);
         Object obj = em.find(AwtFile.class, id);
         AwtFile lt = (AwtFile)obj;
         
         return lt;
     }
     

	public List<AwtFile> findList(int first, int max, MultivaluedMap<String, String> map) {		
		addPredicates(map);

		orders.add(cb.desc(root.get("lastUpdtTime")));


		return findSelection(root.get("id"), root.get("name"), root.get("lastUpdtTime"));
	}

	@Override
	EntityManager getEntityManager() {
		return em;
	}
	
}
