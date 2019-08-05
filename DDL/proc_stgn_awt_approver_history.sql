CREATE OR REPLACE PROCEDURE STGN.APPROVER_HISTORY(IN p_log_nbr INT, IN p_actor_cnum VARCHAR(9), IN p_comments VARCHAR(256), IN p_status VARCHAR(8)) 
BEGIN

	DECLARE v_approver_id SMALLINT;
	DECLARE v_count1, v_count2 SMALLINT;
	DECLARE v_role_level SMALLINT;
	
	SELECT id INTO v_approver_id FROM op.approver_info WHERE cnum = p_actor_cnum;

	IF(v_approver_id IS NOT NULL) THEN 
		SELECT COUNT(*) INTO v_count1 FROM op.workflow WHERE log_nbr = p_log_nbr AND approver1 = v_approver_id;

		SELECT COUNT(*) INTO v_count2 FROM op.workflow WHERE log_nbr = p_log_nbr AND approver2 = v_approver_id;
		
		IF(v_count1 = 1 AND v_count2 = 0) THEN 
			SET	v_role_level = 1;
		ELSEIF (v_count2 = 1) THEN	
			SET	v_role_level = 2;
		END IF;
		
		IF(v_count1 = 1 OR v_count2 = 1) THEN 
			INSERT INTO op.awt_history(log_nbr, approver_id, role_level, comments, status, date) VALUES (p_log_nbr, v_approver_id, v_role_level, p_comments, p_status, CURRENT_TIMESTAMP);
		END IF;

	END IF;
END@
