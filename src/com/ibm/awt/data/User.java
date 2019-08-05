package com.ibm.awt.data;
 
import javax.enterprise.context.RequestScoped;
import javax.xml.bind.annotation.XmlRootElement;

@RequestScoped
@XmlRootElement
public class User {
private String userId;	
	

	private String name;
	
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
	
	public String getUserId() {
	return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

}
