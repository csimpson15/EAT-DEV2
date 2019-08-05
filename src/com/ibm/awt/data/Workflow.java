package com.ibm.awt.data;

import java.io.Serializable;
import javax.persistence.*;
import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.Date;


/**
 * The persistent class for the WORKFLOW database table.
 * 
 */
@Entity
@Table(name="WORKFLOW", schema="RPT")
public class Workflow implements Serializable {
	private static final long serialVersionUID = 1L;
	

	@Column(name="ACHV_SRC")
	private String achvSrc;

	@Column(name="ADDT_EMPL_MEAS")
	private int addtEmplMeas;
	
	@Column(name="AMT_ADV")
	private BigDecimal amtAdv;

	@Column(name="APPR_CATE")
	private String apprCate;

	@Column(name="APPR_NAME")
	private String apprName;
	
	@Column(name="APPR_TYPE")
	private String apprType;
	
	@Column(name="ASCA_CERT")
	private String ascaCert;

	@Column(name="BRIEF_DESCR")
	private String briefDescr;

	@Column(name="BUS_UNIT")
	private String busUnit;

	@Column(name="BUSN_VALUES")
	private String busnValues;

	@Column(name="CALC_METH")
	private String calcMeth;

	@Column(name="CHNGS_RES")
	private String chngsRes;
	
	private String country;
	
	@Column(name="COMP_MEAS_REQ")
	private BigDecimal compMeasReq;
	
	@Column(name="CONTR_CHECKS")
	private String contrChecks;
	
	@Column(name="CORRECT_ROOTCAUSE")
	private String correctRootcause;
	
	@Temporal(TemporalType.DATE)
	@Column(name="CONFIRMED_PR")
	private Date confirmedPr;
	
	@Column(name="COMMN_MTH")
	private String commnMth;
	
	@Column(name="CUR_QTA")
	private BigDecimal curQta;
	
	@Column(name="DATA_APPR")
	private String dataAppr;
	
	@Column(name="DATA_ID")
	private String dataID;
	
	@Column(name="DURATION_AFFECTED")
	private String durationAffected;
	
	@Column(name="EMPL_MAIL")
	private String emplMail;
	
	@Column(name="EMPL_SCOPE")
	private String emplScope;
	
	@Column(name="EMPL_MEAS")
	private int emplMeas;
	
	@Column(name="EXEC_NOTES_ID")
	private String execNotesId;

	@Column(name="EXTRACT_CRIT")
	private String extractCrit;
	
	@Column(name="FREQ_RESULT")
	private String freqResult;
	
	@Column(name="FULL_ASSN")
	private String fullAssn;

	@Column(name="FURTH_CHECKS")
	private String furthChecks;
	
	private String geo;
	
	@Column(name="IMPACT")
	private String impact;

	@Temporal(TemporalType.DATE)
	@Column(name="IMPLEMENTATION_DATE")
	private Date implementationDate;

	@Column(name="INCR_CATE")
	private String incrCate;

	@Column(name="INCR_PGR")
	private String incrPgr;

	@Temporal(TemporalType.DATE)
	@Column(name="ISSUE_IDENTIFIED")
	private Date issueIdentified;
	
	@Id
	@Column(name="LOG_NBR")
	private int logNbr;

	@Column(name="MANAGER_ENDORSEMENT")
	private String managerEndorsement;
	
	private String market;

	@Column(name="NEW_QTA")
	private BigDecimal newQta;

	@Column(name="NO_AFFECTED_EMPL")
	private String noAffectedEmpl;
	
	@Column(name="NAME_AFFECTED_EMPLOYEE")
	private String nameAffectedEmployee;
	
	@Column(name="OVERNIGHT_MAIL")
	private String overnightMail;
	
	@Temporal(TemporalType.DATE)
	@Column(name="OVERPAYMENT_BEGIN")
	private Date overpaymentBegin;
	
	@Temporal(TemporalType.DATE)
	@Column(name="OVERPAYMENT_END")
	private Date overpaymentEnd;
	
	@Temporal(TemporalType.DATE)
	@Column(name="PLAN_START")
	private Date planStart;
	
	@Temporal(TemporalType.DATE)
	@Column(name="PLAN_END")
	private Date planEnd;
		
	@Column(name="PLAN_YEAR_AFFECTED")
	private String planYearAffected;
	
	@Column(name="PMT_AMOUNT")
	private BigDecimal pmtAmount;
	
	@Column(name="PMT_TYPE")
	private String pmtType;
	
	@Column(name="PMT_REASON")
	private String pmtReason;
	
	@Column(name="PMT_CATEGORY")
	private String pmtCategory;
	
	@Column(name="PMT_CURR")
	private String pmtCurr;
	
	@Column(name="PR_CODE")
	private String prCode;
	
	@Column(name="PR_EMAIL")
	private String prEmail;
	
	@Column(name="PROV_DEN")
	private String provDen;
	
	@Column(name="REQ_CHANGES")
	private String reqChanges;
	
	@Column(name="REQ_MTH")
	private String reqMth;

	@Column(name="RES_IMPL")
	private String resImpl;
	
	@Column(name="RESP_PROV_RESULTS")
	private String respProvResults;
	
	@Column(name="REQUEST_DETAIL")
	private String requestDetail;

	@Column(name="REQUEST_ID")
	private String requestId;
	
	@Column(name="ROOT_CAUSE")
	private String rootCause;

	@Column(name="SALES_ROLES")
	private String salesRoles;
	
	@Column(name="SALES_ROLES_AFFECTED")
	private String salesRolesAffected;
	
	@Temporal(TemporalType.DATE)
	@Column(name="SR_REQUEST")
	private Date srRequest;

	@Column(name="SRC_SYS")
	private String srcSys;
	
	@Column(name="SUBMIT_PAYROLL")
	private String submitPayroll;
	
	@Column(name="SUBMITTER_CNUM")
	private String submitterCnum;

	@Column(name="SUBMITTER_MGR")
	private String submitterMgr;

	@Column(name="SUBMITTER_NAME")
	private String submitterName;
	
	@Temporal(TemporalType.DATE)
	@Column(name="SUBMITTED_PR")
	private Date submittedPR;
	
	@Column(name="SUM_DEBIT_BALANCE")
	private BigDecimal sumDebitBalance;
	
	@Column(name="TRUST_SRC")
	private String trustSrc;
	
	@Column(name="WK_DAY")
	private String wkDay;
	
	@Column(name="WW_LOCAL")
	private String wwLocal;
	
/*	@Id*/
	@Column(name="\"ID\"")
	private long id;

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public byte[] getData() {
		return data;
	}

	public void setData(byte[] data) {
		this.data = data;
	}

	public Timestamp getLastUpdtTime() {
		return lastUpdtTime;
	}

	public void setLastUpdtTime(Timestamp lastUpdtTime) {
		this.lastUpdtTime = lastUpdtTime;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	@Lob
	@Column(name="\"DATA\"")
	private byte[] data;

	@Column(name="LAST_UPDT_TIME")
	private Timestamp lastUpdtTime;

	@Column(name="\"NAME\"")
	private String name;
	
	@Column(name="TIME_GENERATED")
	private String timeGenerated;
	
	public String getTimeGenerated() {
		return timeGenerated;
	}

	public void setTimeGenerated(String timeGenerated) {
		this.timeGenerated = timeGenerated;
	}
			
	public Workflow() {
	}

	public BigDecimal getAmtAdv() {
		return this.amtAdv;
	}

	public void setAmtAdv(BigDecimal amtAdv) {
		this.amtAdv = amtAdv;
	}

	public String getApprCate() {
		return this.apprCate;
	}

	public void setApprCate(String apprCate) {
		this.apprCate = apprCate;
	}

	public String getApprType() {
		return this.apprType;
	}

	public void setApprType(String apprType) {
		this.apprType = apprType;
	}

	public String getBriefDescr() {
		return this.briefDescr;
	}

	public void setBriefDescr(String briefDescr) {
		this.briefDescr = briefDescr;
	}

	public String getBusUnit() {
		return this.busUnit;
	}

	public void setBusUnit(String busUnit) {
		this.busUnit = busUnit;
	}

	public String getBusnValues() {
		return this.busnValues;
	}

	public void setBusnValues(String busnValues) {
		this.busnValues = busnValues;
	}

	public String getCalcMeth() {
		return this.calcMeth;
	}

	public void setCalcMeth(String calcMeth) {
		this.calcMeth = calcMeth;
	}

	public String getCountry() {
		return this.country;
	}

	public void setCountry(String country) {
		this.country = country;
	}

	public BigDecimal getCurQta() {
		return this.curQta;
	}

	public void setCurQta(BigDecimal curQta) {
		this.curQta = curQta;
	}

	public String getDurationAffected() {
		return this.durationAffected;
	}

	public void setDurationAffected(String durationAffected) {
		this.durationAffected = durationAffected;
	}

	public String getEmplScope() {
		return this.emplScope;
	}

	public void setEmplScope(String emplScope) {
		this.emplScope = emplScope;
	}

	public String getFullAssn() {
		return this.fullAssn;
	}

	public void setFullAssn(String fullAssn) {
		this.fullAssn = fullAssn;
	}

	public String getGeo() {
		return this.geo;
	}

	public void setGeo(String geo) {
		this.geo = geo;
	}

	public Date getImplementationDate() {
		return this.implementationDate;
	}

	public void setImplementationDate(Date implementationDate) {
		this.implementationDate = implementationDate;
	}

	public String getIncrCate() {
		return this.incrCate;
	}

	public void setIncrCate(String incrCate) {
		this.incrCate = incrCate;
	}

	public String getIncrPgr() {
		return this.incrPgr;
	}

	public void setIncrPgr(String incrPgr) {
		this.incrPgr = incrPgr;
	}

	public int getLogNbr() {
		return this.logNbr;
	}

	public void setLogNbr(int logNbr) {
		this.logNbr = logNbr;
	}

	public String getManagerEndorsement() {
		return this.managerEndorsement;
	}

	public void setManagerEndorsement(String managerEndorsement) {
		this.managerEndorsement = managerEndorsement;
	}

	public String getMarket() {
		return this.market;
	}

	public void setMarket(String market) {
		this.market = market;
	}

	public BigDecimal getNewQta() {
		return this.newQta;
	}

	public void setNewQta(BigDecimal newQta) {
		this.newQta = newQta;
	}

	public String getNoAffectedEmpl() {
		return this.noAffectedEmpl;
	}

	public void setNoAffectedEmpl(String noAffectedEmpl) {
		this.noAffectedEmpl = noAffectedEmpl;
	}

	public String getPlanYearAffected() {
		return this.planYearAffected;
	}

	public void setPlanYearAffected(String planYearAffected) {
		this.planYearAffected = planYearAffected;
	}

	public String getReqMth() {
		return this.reqMth;
	}

	public void setReqMth(String reqMth) {
		this.reqMth = reqMth;
	}

	public String getRequestDetail() {
		return this.requestDetail;
	}

	public void setRequestDetail(String requestDetail) {
		this.requestDetail = requestDetail;
	}

	public String getRequestId() {
		return this.requestId;
	}

	public void setRequestId(String requestId) {
		this.requestId = requestId;
	}

	public String getSalesRoles() {
		return this.salesRoles;
	}

	public void setSalesRoles(String salesRoles) {
		this.salesRoles = salesRoles;
	}

	public String getSubmitterCnum() {
		return this.submitterCnum;
	}

	public void setSubmitterCnum(String submitterCnum) {
		this.submitterCnum = submitterCnum;
	}

	public String getSubmitterMgr() {
		return this.submitterMgr;
	}

	public void setSubmitterMgr(String submitterMgr) {
		this.submitterMgr = submitterMgr;
	}

	public String getSubmitterName() {
		return this.submitterName;
	}

	public void setSubmitterName(String submitterName) {
		this.submitterName = submitterName;
	}

	public String getSalesRolesAffected() {
		return salesRolesAffected;
	}

	public void setSalesRolesAffected(String salesRolesAffected) {
		this.salesRolesAffected = salesRolesAffected;
	}
	
	public String getNameAffectedEmployee() {
		return nameAffectedEmployee;
	}

	public void setNameAffectedEmployee(String nameAffectedEmployee) {
		this.nameAffectedEmployee = nameAffectedEmployee;
	}
		
	public Date getSrRequest() {
		return srRequest;
	}

	public void setSrRequest(Date srRequest) {
		this.srRequest = srRequest;
	}
	
	public String getCommnMth() {
		return commnMth;
	}

	public void setCommnMth(String commnMth) {
		this.commnMth = commnMth;
	}
	
	public String getPmtType() {
		return pmtType;
	}

	public void setPmtType(String pmtType) {
		this.pmtType = pmtType;
	}
	
	public String getPmtReason() {
		return pmtReason;
	}

	public void setPmtReason(String pmtReason) {
		this.pmtReason = pmtReason;
	}

	public String getPmtCategory() {
		return pmtCategory;
	}

	public void setPmtCategory(String pmtCategory) {
		this.pmtCategory = pmtCategory;
	}
		
	public String getSubmitPayroll() {
		return submitPayroll;
	}

	public void setSubmitPayroll(String submitPayroll) {
		this.submitPayroll = submitPayroll;
	}
	
	public Date getIssueIdentified() {
		return issueIdentified;
	}

	public void setIssueIdentified(Date issueIdentified) {
		this.issueIdentified = issueIdentified;
	}
	
	public String getEmplMail() {
		return emplMail;
	}

	public void setEmplMail(String emplMail) {
		this.emplMail = emplMail;
	}
	
	public BigDecimal getPmtAmount() {
		return pmtAmount;
	}

	public void setPmtAmount(BigDecimal pmtAmount) {
		this.pmtAmount = pmtAmount;
	}

	public String getPmtCurr() {
		return pmtCurr;
	}

	public void setPmtCurr(String pmtCurr) {
		this.pmtCurr = pmtCurr;
	}
	
	public String getPrCode() {
		return prCode;
	}

	public void setPrCode(String prCode) {
		this.prCode = prCode;
	}
	
	public String getPrEmail() {
		return prEmail;
	}

	public void setPrEmail(String prEmail) {
		this.prEmail = prEmail;
	}
	
	public String getOvernightMail() {
		return overnightMail;
	}

	public void setOvernightMail(String overnightMail) {
		this.overnightMail = overnightMail;
	}

	public BigDecimal getSumDebitBalance() {
		return sumDebitBalance;
	}

	public void setSumDebitBalance(BigDecimal sumDebitBalance) {
		this.sumDebitBalance = sumDebitBalance;
	}	
	
	public Date getSubmittedPR() {
		return submittedPR;
	}

	public void setSubmittedPR(Date submittedPR) {
		this.submittedPR = submittedPR;
	}
	
	public Date getConfirmedPr() {
		return confirmedPr;
	}

	public void setConfirmedPr(Date confirmedPr) {
		this.confirmedPr = confirmedPr;
	}
	
	public Date getOverpaymentBegin() {
		return overpaymentBegin;
	}

	public void setOverpaymentBegin(Date overpaymentBegin) {
		this.overpaymentBegin = overpaymentBegin;
	}
	
	public Date getOverpaymentEnd() {
		return overpaymentEnd;
	}

	public void setOverpaymentEnd(Date overpaymentEnd) {
		this.overpaymentEnd = overpaymentEnd;
	}
	
	public Date getPlanStart() {
		return planStart;
	}

	public void setPlanStart(Date planStart) {
		this.planStart = planStart;
	}

	public Date getPlanEnd() {
		return planEnd;
	}

	public void setPlanEnd(Date planEnd) {
		this.planEnd = planEnd;
	}
	
	public String getRootCause() {
		return rootCause;
	}

	public void setRootCause(String rootCause) {
		this.rootCause = rootCause;
	}
	
	public String getCorrectRootcause() {
		return correctRootcause;
	}

	public void setCorrectRootcause(String correctRootcause) {
		this.correctRootcause = correctRootcause;
	}

	public String getExecNotesId() {
		return execNotesId;
	}

	public void setExecNotesId(String execNotesId) {
		this.execNotesId = execNotesId;
	}
	
	public String getDataAppr() {
		return dataAppr;
	}

	public void setDataAppr(String dataAppr) {
		this.dataAppr = dataAppr;
	}
	public String getFreqResult() {
		return freqResult;
	}

	public void setFreqResult(String freqResult) {
		this.freqResult = freqResult;
	}
	
	public String getAscaCert() {
		return ascaCert;
	}

	public void setAscaCert(String ascaCert) {
		this.ascaCert = ascaCert;
	}
	
	public String getExtractCrit() {
		return extractCrit;
	}

	public void setExtractCrit(String extractCrit) {
		this.extractCrit = extractCrit;
	}
	
	public String getContrChecks() {
		return contrChecks;
	}

	public void setContrChecks(String contrChecks) {
		this.contrChecks = contrChecks;
	}

	public String getFurthChecks() {
		return furthChecks;
	}

	public void setFurthChecks(String furthChecks) {
		this.furthChecks = furthChecks;
	}
	
	public String getWkDay() {
		return wkDay;
	}

	public void setWkDay(String wkDay) {
		this.wkDay = wkDay;
	}
	
	public String getChngsRes() {
		return chngsRes;
	}

	public void setChngsRes(String chngsRes) {
		this.chngsRes = chngsRes;
	}

	public String getResImpl() {
		return resImpl;
	}

	public void setResImpl(String resImpl) {
		this.resImpl = resImpl;
	}
	
	public String getAchvSrc() {
		return achvSrc;
	}

	public void setAchvSrc(String achvSrc) {
		this.achvSrc = achvSrc;
	}
	public String getDataID() {
		return dataID;
	}

	public void setDataID(String dataID) {
		this.dataID = dataID;
	}
	public String getWwLocal() {
		return wwLocal;
	}

	public void setWwLocal(String wwLocal) {
		this.wwLocal = wwLocal;
	}
	public int getEmplMeas() {
		return emplMeas;
	}

	public void setEmplMeas(int emplMeas) {
		this.emplMeas = emplMeas;
	}
	public int getAddtEmplMeas() {
		return addtEmplMeas;
	}

	public void setAddtEmplMeas(int addtEmplMeas) {
		this.addtEmplMeas = addtEmplMeas;
	}
	public BigDecimal getCompMeasReq() {
		return compMeasReq;
	}

	public void setCompMeasReq(BigDecimal compMeasReq) {
		this.compMeasReq = compMeasReq;
	}
	public String getRespProvResults() {
		return respProvResults;
	}

	public void setRespProvResults(String respProvResults) {
		this.respProvResults = respProvResults;
	}
	public String getSrcSys() {
		return srcSys;
	}

	public void setSrcSys(String srcSys) {
		this.srcSys = srcSys;
	}
	public String getReqChanges() {
		return reqChanges;
	}

	public void setReqChanges(String reqChanges) {
		this.reqChanges = reqChanges;
	}
	public String getApprName() {
		return apprName;
	}

	public void setApprName(String apprName) {
		this.apprName = apprName;
	}
	
	public String getImpact() {
		return impact;
	}

	public void setImpact(String impact) {
		this.impact = impact;
	}
	public String getTrustSrc() {
		return trustSrc;
	}

	public void setTrustSrc(String trustSrc) {
		this.trustSrc = trustSrc;
	}
	public String getProvDen() {
		return provDen;
	}

	public void setProvDen(String provDen) {
		this.provDen = provDen;
	}
	
	public String toString(){
	    String foo = "name: "+ this.name + "data:" + this.data; //example
	    return foo;  
	}
}