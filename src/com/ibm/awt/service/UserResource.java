package com.ibm.awt.service;
 
import java.io.IOException;

import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.SecurityContext;

import com.ibm.awt.data.User;
import com.ibm.awt.data.UserDAO;

@RequestScoped
@Path("/user")
public class UserResource {
	
	@Inject
	private HttpServletRequest servletRequest;
	
	@Inject
	private UserDAO dao;
	
	@Context
	private SecurityContext securityContext;
	
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public User getUser() throws IOException {
		User user = new User();
		String uid = dao.fetchUid();	
		
		user.setName(servletRequest.getRemoteUser());
		user.setUserId(uid); 
		
		return user;
	}
	
}
