package com.ibm.gsi.data;

import java.io.Serializable;
import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.NamedQuery;
import javax.persistence.Table;


/**
 * The persistent class for the DATA_TABLE database table.
 * 
 */
@Entity
@Table(name="DATA_TABLE", schema="DEV")
@NamedQuery(name="DataTable.findAll", query="SELECT d FROM DataTable d")
public class DataTable implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@Column(name="\"ID\"")
	private long id;

	@Lob
	@Column(name="\"DATA\"")
	private byte[] data;

	@Column(name="\"NAME\"")
	private String name;

	@Column(name="LAST_UPDT_TIME")
	private Timestamp lastUpdtTime;

	public DataTable() {
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

	public String getName() {
		return this.name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Timestamp getLastUpdtTime() {
		return lastUpdtTime;
	}

	public void setLastUpdtTime(Timestamp lastUpdtTime) {
		this.lastUpdtTime = lastUpdtTime;
	}

}