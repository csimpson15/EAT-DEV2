package com.ibm.awt.service;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;

import com.ibm.websphere.security.auth.WSSubject;
import com.ibm.websphere.security.cred.WSCredential;

//@WebFilter(urlPatterns = "/*")
public class SecurityFilter implements Filter {

	@Override
	public void destroy() {}

	@Override
	public void doFilter(ServletRequest arg0, ServletResponse arg1, FilterChain arg2)
			throws IOException, ServletException {
		//HttpServletRequest httpRequest = (HttpServletRequest) arg0;
		
		try {
			WSCredential credential = WSSubject.getCallerSubject().getPublicCredentials(WSCredential.class).iterator().next();
			System.out.println(credential.get("isUserInGroup"));
			if (credential.get("isUserInGroup") == null) {
				credential.set("isUserInGroup", true);
			}
			System.out.println(credential.get("isUserInGroup"));
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		arg2.doFilter(arg0, arg1);
	}

	@Override
	public void init(FilterConfig arg0) throws ServletException {}

}
