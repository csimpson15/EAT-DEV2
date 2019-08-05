package com.ibm.awt.data;

import java.io.Serializable;


/**
 * The persistent class for the DATA_TABLE database table.
 * 
 */
public class FileClass implements Serializable {
	private static final long serialVersionUID = 1L;

	
	private String data;

	private String name;
	
//	private int logNbr;
//
//
//	public int getLogNbr() {
//		return logNbr;
//	}
//
//
//	public void setLogNbr(int logNbr) {
//		this.logNbr = logNbr;
//	}


	public FileClass() {
	}


	public String getData() {
		return data;
	}


	public void setData(String data) {
		this.data = data;
	}


	public String getName() {
		return name;
	}


	public void setName(String name) {
		this.name = name;
	}

}