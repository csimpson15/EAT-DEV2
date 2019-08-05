CREATE TABLE op.awt_history (
	history_id INT NOT NULL GENERATED ALWAYS AS IDENTITY (START WITH 1, INCREMENT BY 1), 
	log_nbr INT,
	approver_id SMALLINT,
	role_level SMALLINT,
	comments VARCHAR(256),
	status VARCHAR(8),
	date TIMESTAMP
)@

ALTER TABLE op.awt_history ADD CONSTRAINT awthistory_pk PRIMARY KEY
	(history_id)@