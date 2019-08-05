DROP TABLE op.approver_hierachy@

CREATE TABLE op.approver_hierachy (
	market CHAR(30),
	appr_cate VARCHAR(256),
	role1 CHAR(50),
	approver_name1 VARCHAR(256),
	approver_email1 VARCHAR(256),
	role2 CHAR(50),
	approver_name2 VARCHAR(256),
	approver_email2 VARCHAR(256),
	role3 CHAR(50),
	approver_name3 VARCHAR(256),
	approver_email3 VARCHAR(256)
)@
	 
