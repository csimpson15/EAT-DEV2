CREATE TABLE op.approver_info (
	id VARCHAR(3),
	name VARCHAR(128),
	cnum VARCHAR(128),
	intranet_id VARCHAR(128), 
	role VARCHAR(50),
	role_code CHAR(3)
)@


CREATE JAVA layer for access view 
JAVA LAYER (look at APV,ETP) pass submitter cnum to view 
view will generate logs of only ones they have access to


My view access table is op.workflow 
so mapping needs to be done in workflowDAO folder.

ETP DAOFacade.java line 74, lines 249-250
							@PostConstruct
							private void init() {
								super.initFacade();
ETP ViewAccessDAO.java line 26, addUIDPredicate(root.get.("cnum"));
							}