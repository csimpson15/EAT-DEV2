DROP TABLE op.eligibility@

CREATE TABLE op.eligibility (
	log_nbr INT NOT NULL,
	incr_cate VARCHAR(128),
	incr_pgr VARCHAR(128),
	amt_adv DECIMAL(15,2),
	req_mth VARCHAR(10),
	calc_meth VARCHAR(1024)
)@

ALTER TABLE op.eligibility ADD CONSTRAINT eligibility_pk PRIMARY KEY
	(log_nbr)@