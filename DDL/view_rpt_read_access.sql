CREATE OR REPLACE VIEW "RPT"."READ_ACCESS" ("NAME","APP","LOG_NBR","SUBMITTER_CNUM","SUBMITTER_NAME","SUBMITTER_MGR","MANAGER_ENDORSEMENT","REQUEST_ID","APPR_CATE","APPR_TYPE","PLAN_YEAR_AFFECTED","DURATION_AFFECTED","IMPLEMENTATION_DATE","BRIEF_DESCR","REQUEST_DETAIL","GEO","MARKET","COUNTRY","BUS_UNIT","SALES_ROLES", "SALES_ROLES_AFFECTED", "NO_AFFECTED_EMPL", "NAME_AFFECTED_EMPLOYEE", "EMPL_SCOPE", "APPROVER1", "APPROVER2", "CUR_QTA","NEW_QTA","FULL_ASSN","BUSN_VALUES", "INCR_CATE", "INCR_PGR", "AMT_ADV", "REQ_MTH", "CALC_METH", "CORRECT_ROOTCAUSE", "PMT_TYPE", "PMT_REASON", "PMT_CATEGORY",
"PLAN_START", "PLAN_END", "COMMN_MTH", "SUBMIT_PAYROLL", "ROOT_CAUSE", "ISSUE_IDENTIFIED", "EMPL_MAIL", "PMT_AMOUNT", "PMT_CURR", "PR_CODE", "PR_EMAIL", "OVERNIGHT_MAIL", "SUM_DEBIT_BALANCE", "OVERPAYMENT_BEGIN", "OVERPAYMENT_END", "SUBMITTED_PR", "CONFIRMED_PR", "SR_REQUEST", "EXEC_NOTES_ID", "DATA_APPR", "FREQ_RESULT", "ASCA_CERT", "EXTRACT_CRIT", "CONTR_CHECKS", "FURTH_CHECKS", "WK_DAY", "CHNGS_RES", "RES_IMPL", "ACHV_SRC", "DATA_ID", "WW_LOCAL", "COMP_MEAS_REQ", "EMPL_MEAS", "ADDT_EMPL_MEAS", "RESP_PROV_RESULTS", "SRC_SYS",
"REQ_CHANGES", "APPR_NAME", "IMPACT", "TRUST_SRC", "PROV_DEN", "ID", "NAME","LAST_UPDT_TIME", "DATA", "TIME_GENERATED")AS
SELECT
	ai.name,
	wfa.app,
	wf.log_nbr,
	wf.submitter_cnum,
	wf.submitter_name,
	wf.submitter_mgr,
	wf.manager_endorsement,
	wf.request_id,
	wf.appr_cate,
	wf.appr_type,
	wf.plan_year_affected,
	wf.duration_affected,
	wf.implementation_date,
	wf.brief_descr,
	wf.request_detail,
	wf.geo,
	wf.market,
	wf.country,
	wf.bus_unit,
	wf.sales_roles,
	wf.sales_roles_affected,
	wf.no_affected_empl,
	wf.name_affected_employee,
	wf.empl_scope,
	wf.approver1,
	wf.approver2, 
	qt.cur_qta,
	qt.new_qta,
	qt.full_assn,
	qt.busn_values,
	el.incr_cate,
	el.incr_pgr,
	el.amt_adv,
	el.req_mth,
	el.calc_meth,
	pymt.correct_rootcause,
	pymt.pmt_type,
	pymt.pmt_reason,
	pymt.pmt_category,
	pymt.plan_start,
	pymt.plan_end,
	pymt.commn_mth,
	pymt.submit_payroll,
	pymt.root_cause,
	pymt.issue_identified,
	pymt.empl_mail,
	pymt.pmt_amount,
	pymt.pmt_curr,
	pymt.pr_code,
	pymt.pr_email,
	pymt.overnight_mail,
	pymt.sum_debit_balance,
	pymt.overpayment_begin,
	pymt.overpayment_end,
	pymt.submitted_pr,
	pymt.confirmed_pr,
	pymt.sr_request,
	mea.exec_notes_id,
	mea.data_appr,
	mea.freq_result,
	mea.asca_cert,
	mea.extract_crit,
	mea.contr_checks,
	mea.furth_checks,
	mea.wk_day,
	mea.chngs_res,
	mea.res_impl,
	mea.achv_src,
	mea.data_id,
	mea.ww_local,
	mea.comp_meas_req,
	mea.empl_meas,
	mea.addt_empl_meas,
	mea.resp_prov_results,
	mea.src_sys,
	mea.req_changes,
	mea.appr_name,
	mea.impact,
	mea.trust_src,
	mea.prov_den,
	f.id,
	f.name,
	f.last_updt_time,
	f.data,
	f.time_generated
FROM
	op.workflow wf
	LEFT OUTER JOIN
	op.quota qt ON
		wf.log_nbr = qt.log_nbr
		
	LEFT OUTER JOIN
	op.eligibility el ON
		wf.log_nbr = el.log_nbr
		
	LEFT OUTER JOIN
	op.payment pymt ON
		wf.log_nbr = pymt.log_nbr	
		
	LEFT OUTER JOIN
	op.measurements mea ON
		wf.log_nbr = mea.log_nbr

	LEFT OUTER JOIN
	op.awt_files f ON
		wf.log_nbr = f.log_nbr
		
	INNER JOIN
	rpt.workflow_access wfa ON
		wf.log_nbr = wfa.log_nbr
	
	op.approver_info ai
	INNER JOIN 
	rpt.workflow_access ON
		ai.name = wfa.name@
		
	
		
	


			
		