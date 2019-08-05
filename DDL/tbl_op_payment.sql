DROP TABLE op.payment@

CREATE TABLE op.payment (
	log_nbr INT NOT NULL,
	correct_rootcause VARCHAR(256),
	pmt_type VARCHAR(128),
	pmt_reason VARCHAR(1024),
	pmt_category VARCHAR(30),
	plan_start DATE,
	plan_end DATE,
	commn_mth VARCHAR(10),
	submit_payroll VARCHAR(3),
	root_cause VARCHAR(256),
	issue_identified DATE,
	empl_mail VARCHAR(3),
	pmt_amount DECIMAL(15,2),
	pmt_curr VARCHAR(30),
	pr_code VARCHAR(60),
	pr_email NVARCHAR (128),
	overnight_mail VARCHAR(3),
	sum_debit_balance DECIMAL(15,2),
	overpayment_begin DATE,
	overpayment_end DATE,
	submitted_pr DATE,
	confirmed_pr DATE,
	sr_request DATE
)@

ALTER TABLE op.payment ADD CONSTRAINT payment_pk PRIMARY KEY
	(log_nbr)@