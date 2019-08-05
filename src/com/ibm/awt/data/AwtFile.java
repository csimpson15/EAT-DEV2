package com.ibm.awt.data;

import java.io.Serializable;
import javax.persistence.*;
import java.sql.Timestamp;


/**
 * The persistent class for the AWT_FILES database table.
 * 
 */
@Entity
@Table(schema="RPT", name="WORKFLOW")
//@Table(schema="OP", name="AWT_FILES")
//@NamedQuery(name="AwtFile.findAll", query="SELECT a FROM AwtFile a")
public class AwtFile implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@Column(name="\"ID\"")
	private long id;

	@Lob
	@Column(name="\"DATA\"")
	private byte[] data;

	@Column(name="LAST_UPDT_TIME")
	private Timestamp lastUpdtTime;

	@Column(name="\"NAME\"")
	private String name;
	
	@Column(name="LOG_NBR")
	private int logNbr;

	public int getLogNbr() {
		return logNbr;
	}

	public void setLogNbr(int logNbr) {
		this.logNbr = logNbr;
	}

	public AwtFile() {
	}

	public long getId() {
		return this.id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public byte[] getData() {
		return this.data;
	}

	public void setData(byte[] data) {
		this.data = data;
	}

	public Timestamp getLastUpdtTime() {
		return this.lastUpdtTime;
	}

	public void setLastUpdtTime(Timestamp lastUpdtTime) {
		this.lastUpdtTime = lastUpdtTime;
	}

	public String getName() {
		return this.name;
	}

	public void setName(String name) {
		this.name = name;
	}

}