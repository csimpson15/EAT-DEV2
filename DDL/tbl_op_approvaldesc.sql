DROP TABLE op.appr_desc@

CREATE TABLE op.appr_desc (
	request_id VARCHAR(3) NOT NULL,
	request_desc VARCHAR(100)
)@

ALTER TABLE op.appr_desc ADD CONSTRAINT requestid_pk PRIMARY KEY
	(request_id)@