DROP TABLE op.approver_hierachy_BROAD@

RENAME COLUMN op.approver_hierachy_BROAD.appr_cate TO appr_type

CREATE TABLE op.approver_hierachyBROAD (
	appr_cate VARCHAR(256),
	appr_level VARCHAR(10),	
	role VARCHAR(60)
)@