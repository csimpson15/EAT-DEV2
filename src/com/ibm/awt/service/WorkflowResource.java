package com.ibm.awt.service;

import java.util.List;

import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.DefaultValue;
import javax.ws.rs.GET;
import javax.ws.rs.PUT;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.MultivaluedMap;
import javax.ws.rs.core.UriInfo;

import com.ibm.awt.data.AwtFile;
import com.ibm.awt.data.AwtFileDAO;
import com.ibm.awt.data.FileClass;
import com.ibm.awt.data.ReadAccess;
import com.ibm.awt.data.ReadAccessDAO;
import com.ibm.awt.data.Workflow;
import com.ibm.awt.data.WorkflowDAO;

@Path("/all")
@RequestScoped
public class WorkflowResource {
	
	@Inject
	private WorkflowDAO dao;
	
	@Inject
	private AwtFileDAO awtFileDAO;
	
	@Inject
	private ReadAccessDAO readAccessDAO;
	
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public List<ReadAccess> get() {
		return readAccessDAO.find();
	}

	@PUT
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public List<Workflow> insertWorkflow(List<Workflow> inputData){
//		System.out.println("Adding new row in workflow");
//		System.out.println(fileToUpload);
//		System.out.println(fileToUpload.getName());
//		System.out.println(fileToUpload.getData());
		System.out.println(inputData.toString());
		return dao.merge(inputData);
	}
	
	// Fetch individual activity's details by passing it's activityId
	@POST
	@Path("/requestdetail")
	@Produces(MediaType.APPLICATION_JSON)
	public Workflow fetchDetail(Workflow params) {
		return dao.findById(params.getLogNbr());
	} 
	
	// Update the status & comment of individual activity
	@PUT
	@Path("/update")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public List<Workflow> put(List<Workflow> request) {	
		request = dao.merge(request);
		return request;
	} 
	
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Path("/uploadfile")
	public int uploadFile(FileClass fileToUpload) {
		System.out.println(fileToUpload);
		System.out.println(fileToUpload.getName());
		System.out.println(fileToUpload.getData());
		System.out.println("uploadFile");
		try{
			awtFileDAO.saveFile(fileToUpload);
		}
		catch(Exception e) {
			System.out.println(e);
		    return 0;
		}
		
		return 1;
	}
	
	@GET
	@Path("/filelist")
	@Produces(MediaType.APPLICATION_JSON)
	public List<AwtFile> getFileList(@DefaultValue("0") @QueryParam("first") int first, 
									@DefaultValue("30") @QueryParam("max") int max,
									@Context UriInfo ui) {
		
		MultivaluedMap<String, String> params = ui.getQueryParameters();
		params.remove("first");
		params.remove("max");
		
		return awtFileDAO.findList(first, max, params);
	}
}
