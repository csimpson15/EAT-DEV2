CREATE OR REPLACE VIEW "RPT"."WORKFLOW_ACCESS" ("LOG_NBR","APP") AS
WITH	
ppl AS 
(SELECT 
	log_nbr, cnum AS app
FROM 
	op.workflow wf
	INNER JOIN 
	op.approver_info ai ON 
		wf.approver1 = ai.id
UNION ALL

SELECT  
	log_nbr, cnum AS app
FROM
	op.workflow wf
	INNER JOIN 
	op.approver_info ai ON 
		wf.approver2 = ai.id
UNION ALL

SELECT  
	log_nbr, submitter_cnum AS app
FROM
	op.workflow)

SELECT 
	ppl.log_nbr,
	ppl.app
	
FROM
	ppl@
	
