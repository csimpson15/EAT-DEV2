package com.ibm.awt.service;

import java.util.List;

import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import com.ibm.awt.data.AwtHistory;
import com.ibm.awt.data.AwtHistoryDAO;

@Path("/awthist")
@RequestScoped
public class AwtHistoryResource {
	
	@Inject
	private AwtHistoryDAO dao;
		
/*	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public List<Workflow> get() {
		return dao.find();
	}*/

	@PUT
	@Consumes(MediaType.APPLICATION_JSON)
	public void insertApproverHistory(List<AwtHistory> inputData){
		dao.addApproverHistory(inputData.get(0).getLogNbr(), inputData.get(0).getComments(), inputData.get(0).getStatus());
/*		return dao.merge(inputData);*/
	}
	
}
