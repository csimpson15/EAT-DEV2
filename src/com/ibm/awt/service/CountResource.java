package com.ibm.awt.service;
 
import java.util.List;

import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.MultivaluedMap;
import javax.ws.rs.core.UriInfo;

import com.ibm.awt.data.WorkflowDAO;


@Path("/count")
@RequestScoped
public class CountResource {
	
	@Inject
	private WorkflowDAO dao;
		
	@GET
	@Path("/allee")
	@Produces(MediaType.APPLICATION_JSON)
	public Object countAll(@Context UriInfo ui) {
		MultivaluedMap<String, String> params = ui.getQueryParameters();
		return dao.count(params);
	}
	
}
