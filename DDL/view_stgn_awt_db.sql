CREATE TABLE STGN.AWT_DB (
user_id INT NOT NULL,
log_nbr INT NOT NULL GENERATED ALWAYS AS IDENTITY (START WITH 1, INCREMENT BY 1),
submitter_notes_id NVARCHAR(1024),
manager_endorsement CHAR(10),
request_type NVARCHAR(1024),
plan_year_affected VARCHAR(10),
duration_affected VARCHAR(10),
implementation_date DATE,
brief_descr NVARCHAR(1024),
request_detail VARCHAR(1024),
geo CHAR(30),
market CHAR(30),
bus_unit VARCHAR(1024),
bus_unit_id VARCHAR(1024),
exec_nonexec CHAR(10),
no_affected_empl VARCHAR(30),
sn_affected_empl VARCHAR(1024),
empl_scope VARCHAR(30)
);

select * from stgn.awt_db

