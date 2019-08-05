--FIXME(COURTNEY): SN_AFFECTED_EMPL should be a new table to allow multiple employees affected by each workflow. 
--TODO(COURTNEY): Change request_type to request_id VARCHAR(3), then build new table with Request_ID and Request_Description. Primary Key in new table will be request_id.
--NORMALIZE: REDUCING REDUCANCY--IN TABLES 
--TODO(COurtney): Implement Name of affected employee... normalize

DROP TABLE op.workflow@

CREATE TABLE op.workflow (
	log_nbr INT NOT NULL GENERATED ALWAYS AS IDENTITY (START WITH 1, INCREMENT BY 1),
	submitter_cnum VARCHAR(9),
	submitter_name VARCHAR(50),
	submitter_mgr VARCHAR(60),
	manager_endorsement VARCHAR(3),
	request_id VARCHAR(3),
	appr_cate VARCHAR(256),
	appr_type VARCHAR(256),
	plan_year_affected VARCHAR(4),
	duration_affected VARCHAR(4),
	implementation_date DATE,
	brief_descr VARCHAR(256),
	request_detail VARCHAR(256),
	geo VARCHAR(15),
	market CHAR(30),
	country VARCHAR(30),
	bus_unit VARCHAR(50),
	sales_roles CHAR(50),
	no_affected_empl VARCHAR(30),
	empl_scope VARCHAR(30),
	approver1 SMALLINT,
	approver2 SMALLINT,
	TIME_GENERATED TIMESTAMP
)@

ALTER TABLE op.workflow ADD CONSTRAINT workflow_pk PRIMARY KEY
	(log_nbr)@