CREATE OR REPLACE VIEW "RPT"."WORKFLOW" ("LOG_NBR","SUBMITTER_CNUM","SUBMITTER_NAME","SUBMITTER_MGR","MANAGER_ENDORSEMENT","REQUEST_ID","APPR_CATE","APPR_TYPE","PLAN_YEAR_AFFECTED","DURATION_AFFECTED","IMPLEMENTATION_DATE","BRIEF_DESCR","REQUEST_DETAIL","GEO","MARKET","COUNTRY","BUS_UNIT","SALES_ROLES", "SALES_ROLES_AFFECTED", "NO_AFFECTED_EMPL", "NAME_AFFECTED_EMPLOYEE", "EMPL_SCOPE","CUR_QTA","NEW_QTA","FULL_ASSN","BUSN_VALUES", "INCR_CATE", "INCR_PGR", "AMT_ADV", "REQ_MTH", "CALC_METH", "CORRECT_ROOTCAUSE", "PMT_TYPE", "PMT_REASON", "PMT_CATEGORY",
"PLAN_START", "PLAN_END", "COMMN_MTH", "SUBMIT_PAYROLL", "ROOT_CAUSE", "ISSUE_IDENTIFIED", "EMPL_MAIL", "PMT_AMOUNT", "PMT_CURR", "PR_CODE", "PR_EMAIL", "OVERNIGHT_MAIL", "SUM_DEBIT_BALANCE", "OVERPAYMENT_BEGIN", "OVERPAYMENT_END", "SUBMITTED_PR", "CONFIRMED_PR", "SR_REQUEST", "EXEC_NOTES_ID", "DATA_APPR", "FREQ_RESULT", "ASCA_CERT", "EXTRACT_CRIT", "CONTR_CHECKS", "FURTH_CHECKS", "WK_DAY", "CHNGS_RES", "RES_IMPL", "ACHV_SRC", "DATA_ID", "WW_LOCAL", "COMP_MEAS_REQ", "EMPL_MEAS", "ADDT_EMPL_MEAS", "RESP_PROV_RESULTS", "SRC_SYS",
"REQ_CHANGES", "APPR_NAME", "IMPACT", "TRUST_SRC", "PROV_DEN", "ID", "NAME","LAST_UPDT_TIME", "DATA", "TIME_GENERATED")AS
SELECT
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
		wf.log_nbr = wfa.log_nbr@
		
		
CREATE OR REPLACE TRIGGER "RPT"."WORKFLOW_INST"
	INSTEAD OF UPDATE OR INSERT ON "RPT"."WORKFLOW"
	REFERENCING NEW AS new_row
	FOR EACH ROW
BEGIN
	DECLARE v_log_nbr INT;
	DECLARE v_approver_id SMALLINT;
	DECLARE v_cnum VARCHAR(9);
	
	SELECT log_nbr INTO v_log_nbr
    FROM FINAL TABLE (
						  
		-- Set sub stage times for tracking reference
		INSERT INTO
			op.workflow
			(submitter_cnum, submitter_name, submitter_mgr, manager_endorsement, request_id, appr_cate, appr_type, plan_year_affected, duration_affected, implementation_date, brief_descr, request_detail, geo, market, country, bus_unit, sales_roles, sales_roles_affected, no_affected_empl, name_affected_employee, empl_scope)
		VALUES
			(new_row.submitter_cnum, new_row.submitter_name, new_row.submitter_mgr, new_row.manager_endorsement, new_row.request_id, new_row.appr_cate, new_row.appr_type, new_row.plan_year_affected, new_row.duration_affected, new_row.implementation_date, new_row.brief_descr, 
			 new_row.request_detail, new_row.geo, new_row.market, new_row.country, new_row.bus_unit, new_row.sales_roles, new_row.sales_roles_affected, new_row.no_affected_empl, new_row.name_affected_employee, new_row.empl_scope)
	);
	
	IF(new_row.cur_qta IS NOT NULL) THEN 
		INSERT INTO
			op.quota
			(log_nbr, cur_qta, new_qta, full_assn, busn_values)
		VALUES
			(v_log_nbr, new_row.cur_qta, new_row.new_qta, new_row.full_assn, new_row.busn_values);
	END IF;
	
	IF(new_row.incr_cate IS NOT NULL) THEN 
		INSERT INTO
			op.eligibility
			(log_nbr, incr_cate, incr_pgr, amt_adv, req_mth, calc_meth)
		VALUES
			(v_log_nbr, new_row.incr_cate, new_row.incr_pgr, new_row.amt_adv, new_row.req_mth, new_row.calc_meth);
	END IF;
	
	IF(new_row.pmt_type IS NOT NULL) THEN 
		INSERT INTO
			op.payment
			(log_nbr, correct_rootcause, pmt_type, pmt_reason, pmt_category, plan_start, plan_end, commn_mth, submit_payroll, root_cause, issue_identified, empl_mail, pmt_amount, pmt_curr, pr_code, pr_email, overnight_mail, sum_debit_balance, overpayment_begin, overpayment_end, submitted_pr, confirmed_pr, sr_request)
		VALUES
			(v_log_nbr, new_row.correct_rootcause, new_row.pmt_type, new_row.pmt_reason, new_row.pmt_category, new_row.plan_start, new_row.plan_end, new_row.commn_mth, new_row.submit_payroll, new_row.root_cause, new_row.issue_identified, new_row.empl_mail, new_row.pmt_amount,
			new_row.pmt_curr, new_row.pr_code, new_row.pr_email, new_row.overnight_mail, new_row.sum_debit_balance, new_row.overpayment_begin, new_row.overpayment_end, new_row.submitted_pr, new_row.confirmed_pr, new_row.sr_request);
	END IF;

	IF(new_row.data_appr IS NOT NULL) THEN 
		INSERT INTO
			op.measurements
			(log_nbr, exec_notes_id, data_appr, freq_result, asca_cert, extract_crit, contr_checks, furth_checks, wk_day, chngs_res, res_impl, achv_src, data_id, ww_local, comp_meas_req, empl_meas, addt_empl_meas, resp_prov_results, src_sys, req_changes, appr_name, impact, trust_src, prov_den)
		VALUES
			(v_log_nbr, new_row.exec_notes_id, new_row.data_appr, new_row.freq_result, new_row.asca_cert, new_row.extract_crit, new_row.contr_checks, new_row.furth_checks, new_row.wk_day, new_row.chngs_res, new_row.res_impl, new_row.achv_src, new_row.data_id, new_row.ww_local, new_row.comp_meas_req, new_row.empl_meas,
			new_row.addt_empl_meas, new_row.resp_prov_results, new_row.src_sys, new_row.req_changes, new_row.appr_name, new_row.impact, new_row.trust_src, new_row.prov_den);
	END IF;
	

	CALL STGN.TESTING_APPROVER(v_log_nbr, '1');
	CALL STGN.TESTING_APPROVER(v_log_nbr, '2');
	SELECT approver1 INTO v_approver_id FROM op.workflow WHERE log_nbr = v_log_nbr;
	SELECT cnum INTO v_cnum FROM op.approver_info WHERE id = v_approver_id;
	CALL STGN.APPROVER_HISTORY(v_log_nbr, v_cnum, 'Initial Request Submitted', 'PENDING');
		
	IF (new_row.name IS NOT NULL) THEN
		INSERT INTO 
			op.awt_files
			(id, name, last_updt_time, log_nbr, time_generated)
		VALUES
			(new_row.id, new_row.name, current_timestamp, v_log_nbr, current_timestamp);
	END IF;
			
END@




