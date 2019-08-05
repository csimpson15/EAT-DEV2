DROP TABLE op.quota@

CREATE TABLE op.quota (
	log_nbr INT NOT NULL,
	cur_qta DECIMAL(15,2),
	new_qta DECIMAL(15,2),
	full_assn VARCHAR(3),
	busn_values VARCHAR(256)
)@

ALTER TABLE op.quota ADD CONSTRAINT quota_pk PRIMARY KEY
	(log_nbr)@