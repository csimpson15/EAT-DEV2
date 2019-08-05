DROP TABLE op.measurements@

CREATE TABLE op.measurements (
	log_nbr INT NOT NULL,
	exec_notes_id NVARCHAR(512),
	data_appr NVARCHAR(512),
	freq_result VARCHAR(30),
	asca_cert VARCHAR(10),
	extract_crit VARCHAR(256),
	contr_checks VARCHAR(256),
	furth_checks VARCHAR(10),
	wk_day VARCHAR(10),
	chngs_res VARCHAR(10),
	res_impl VARCHAR(3),
	achv_src VARCHAR(3),
	data_id VARCHAR(3),
	ww_local VARCHAR(256),
	comp_meas_req DECIMAL(15,2),
	empl_meas INT,
	addt_empl_meas INT,
	resp_prov_results VARCHAR(50),
	src_sys VARCHAR(256),
	req_changes VARCHAR(256),
	appr_name VARCHAR(150),
	impact VARCHAR(256),
	trust_src VARCHAR(3),
	prov_den VARCHAR(3)
	
	
)@

ALTER TABLE op.measurements ADD CONSTRAINT measurements_pk PRIMARY KEY
	(log_nbr)@
