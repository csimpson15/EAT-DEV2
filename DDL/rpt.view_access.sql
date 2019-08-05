--<ScriptOptions statementTerminator="@"/>

CREATE OR REPLACE VIEW "RPT"."VIEW_ACCESS" ("ETP_ID", "ETP_SEQ", "MOST_RECENT", "CNUM", "LEAD", "FA", "PRICER", "PRICER_MGR", "EXEC", "IA", "IM") AS
WITH
lead AS
(SELECT
	etp_id, etp_seq, lead_cnum cnum
FROM
	ref.etp_claim),
	
fa AS
(SELECT
	etp_id, etp_seq, fa_cnum cnum
FROM
	ref.etp_claim),
	
pricer AS
(SELECT
	etp_id, etp_seq, pricer_cnum cnum
FROM
	ref.etp_claim),
	
pricer_mgr AS
(SELECT
	etp_id, etp_seq, pricer_mgr_cnum cnum
FROM
	ref.etp_claim),
	
exec AS
(SELECT
	etp_id, etp_seq, exec_cnum cnum
FROM
	ref.etp_claim),
	
ia AS
(SELECT
	claim.etp_id, claim.etp_seq, sqd.cnum
FROM
	ref.etp_claim claim, ref.sqd_mbrs sqd
WHERE
	sqd.role_flag IN ('SM', 'IM')),
	
im AS
(SELECT
	claim.etp_id, claim.etp_seq, sqd.cnum
FROM
	ref.etp_claim claim, ref.sqd_mbrs sqd
WHERE
	sqd.role_flag = 'SL'),
	
ppl AS
(SELECT DISTINCT
	etp_id, etp_seq, lead_cnum AS cnum, most_recent
FROM
	ref.etp_claim
UNION ALL
SELECT DISTINCT
	etp_id, etp_seq, fa_cnum AS cnum, most_recent
FROM
	ref.etp_claim
UNION ALL
SELECT DISTINCT
	etp_id, etp_seq, pricer_cnum AS cnum, most_recent
FROM
	ref.etp_claim
UNION ALL
SELECT DISTINCT
	etp_id, etp_seq, pricer_mgr_cnum AS cnum, most_recent
FROM
	ref.etp_claim
UNION ALL
SELECT DISTINCT
	etp_id, etp_seq, exec_cnum AS cnum, most_recent
FROM
	ref.etp_claim
UNION ALL
SELECT DISTINCT
	claim.etp_id, claim.etp_seq, sqd.cnum, most_recent
FROM
	ref.etp_claim claim, ref.sqd_mbrs sqd)
	
SELECT DISTINCT
	ppl.etp_id,
	ppl.etp_seq,
	ppl.most_recent,
	ppl.cnum,
	DECODE(lead.cnum, NULL, 'N', 'Y') lead,
	DECODE(fa.cnum, NULL, 'N', 'Y') fa,
	DECODE(pricer.cnum, NULL, 'N', 'Y') pricer,
	DECODE(pricer_mgr.cnum, NULL, 'N', 'Y') pricer_mgr,
	DECODE(exec.cnum, NULL, 'N', 'Y') exec,
	DECODE(ia.cnum, NULL, 'N', 'Y') ia,
	DECODE(im.cnum, NULL, 'N', 'Y') im
FROM
	ppl
	LEFT OUTER JOIN
	lead ON
		ppl.etp_id = lead.etp_id AND
		ppl.etp_seq = lead.etp_seq AND
		ppl.cnum = lead.cnum
	LEFT OUTER JOIN
	fa ON
		ppl.etp_id = fa.etp_id AND
		ppl.etp_seq = fa.etp_seq AND
		ppl.cnum = fa.cnum
	LEFT OUTER JOIN
	pricer ON
		ppl.etp_id = pricer.etp_id AND
		ppl.etp_seq = pricer.etp_seq AND
		ppl.cnum = pricer.cnum
	LEFT OUTER JOIN
	pricer_mgr ON
		ppl.etp_id = pricer_mgr.etp_id AND
		ppl.etp_seq = pricer_mgr.etp_seq AND
		ppl.cnum = pricer_mgr.cnum
	LEFT OUTER JOIN
	exec ON
		ppl.etp_id = exec.etp_id AND
		ppl.etp_seq = exec.etp_seq AND
		ppl.cnum = exec.cnum
	LEFT OUTER JOIN
	ia ON
		ppl.etp_id = ia.etp_id AND
		ppl.etp_seq = ia.etp_seq AND
		ppl.cnum = ia.cnum
	LEFT OUTER JOIN
	im ON
		ppl.etp_id = im.etp_id AND	
		ppl.etp_seq = im.etp_seq AND
		ppl.cnum = im.cnum@