DROP TABLE op.approver_12K@

CREATE TABLE op.approver_hierachy_12K (
	approver VARCHAR(256),
	appr_email_cnum VARCHAR(256),
	role CHAR(50),
	market VARCHAR(256),
	busn_unit VARCHAR(256)
)@