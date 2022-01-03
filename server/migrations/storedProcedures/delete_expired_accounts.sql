CREATE DEFINER=`YOUR_PASS_HERE`@`localhost` PROCEDURE `delete_expired_accounts`()
BEGIN
	SET SQL_SAFE_UPDATES = 0;

	DELETE 
	FROM user
	WHERE 
	last_logged_in is not null 
	and current_date() < DATE_ADD(last_logged_in, INTERVAL 24 MONTH);
    commit;
END