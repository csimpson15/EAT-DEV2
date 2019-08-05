CREATE OR REPLACE PROCEDURE STGN.TESTING_APPROVER(p_log_nbr INT, p_level SMALLINT) 
BEGIN

	DECLARE v_bus_unit VARCHAR(50);
	DECLARE v_geo VARCHAR(15);
	DECLARE v_market VARCHAR(30); 
	DECLARE v_role, v_appr_type VARCHAR(256); 
	DECLARE v_count SMALLINT;
	DECLARE v_approver_id SMALLINT;
	
	SELECT geo, bus_unit, appr_type, market INTO v_geo, v_bus_unit, v_appr_type, v_market FROM op.workflow WHERE log_nbr = p_log_nbr;

	SELECT roles INTO v_role FROM op.approver_level WHERE approval_category = v_appr_type AND level = p_level; 

	SELECT COUNT(*) INTO v_count FROM op.approver_info WHERE role = v_role;  
	
	IF(v_count = 1) THEN 
		SELECT id INTO v_approver_id FROM op.approver_info WHERE role = v_role;
	
	ELSE 
	
		SELECT approver_id INTO v_approver_id FROM op.approver_orgassignment WHERE business_unit = v_bus_unit AND geo = v_geo AND market = v_market AND role = v_role; 
	
	END IF;
	
	IF (p_level = '1') THEN 
		UPDATE op.workflow SET approver1 = v_approver_id WHERE log_nbr = p_log_nbr;
	
	ELSE
		UPDATE op.workflow SET approver2 = v_approver_id WHERE log_nbr = p_log_nbr;
	
	END IF;
END@