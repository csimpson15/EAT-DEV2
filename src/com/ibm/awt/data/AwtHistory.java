package com.ibm.awt.data;

import java.io.Serializable;
import javax.persistence.*;
import java.sql.Timestamp;


/**
 * The persistent class for the AWT_HISTORY database table.
 * 
 */
@Entity
@Table(name="AWT_HISTORY", schema="OP")
@NamedQuery(name="AwtHistory.findAll", query="SELECT a FROM AwtHistory a")
@NamedStoredProcedureQuery(
        name="approver_history",
        procedureName="STGN.APPROVER_HISTORY",
        parameters={
                @StoredProcedureParameter(type=Integer.class, name="p_log_nbr", mode=ParameterMode.IN),
                @StoredProcedureParameter(type=String.class, name="p_submitter_cnum", mode=ParameterMode.IN),
                @StoredProcedureParameter(type=String.class, name="p_comments", mode=ParameterMode.IN),
                @StoredProcedureParameter(type=String.class, name="p_status", mode=ParameterMode.IN)
        }
)
public class AwtHistory implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@Column(name="HISTORY_ID")
	private int historyId;

	@Column(name="APPROVER_ID")
	private short approverId;

	private String comments;

	@Column(name="\"DATE\"")
	private Timestamp date;

	@Column(name="LOG_NBR")
	private int logNbr;

	@Column(name="ROLE_LEVEL")
	private short roleLevel;

	@Column(name="\"STATUS\"")
	private String status;

	public AwtHistory() {
	}

	public int getHistoryId() {
		return this.historyId;
	}

	public void setHistoryId(int historyId) {
		this.historyId = historyId;
	}

	public short getApproverId() {
		return this.approverId;
	}

	public void setApproverId(short approverId) {
		this.approverId = approverId;
	}

	public String getComments() {
		return this.comments;
	}

	public void setComments(String comments) {
		this.comments = comments;
	}

	public Timestamp getDate() {
		return this.date;
	}

	public void setDate(Timestamp date) {
		this.date = date;
	}

	public int getLogNbr() {
		return this.logNbr;
	}

	public void setLogNbr(int logNbr) {
		this.logNbr = logNbr;
	}

	public short getRoleLevel() {
		return this.roleLevel;
	}

	public void setRoleLevel(short roleLevel) {
		this.roleLevel = roleLevel;
	}

	public String getStatus() {
		return this.status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

}