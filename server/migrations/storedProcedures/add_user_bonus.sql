CREATE DEFINER=`YOUR_PASS_HERE`@`localhost` PROCEDURE `add_user_bonus`(in cout_of_reviews integer, last_login_period integer, in percent double)
BEGIN
	INSERT INTO TRANSACTION(credit, debit, amount, timestamp)
	(SELECT 'SYSTEM_IBAN', 
			user_id,
			(SELECT (percent/100)*SUM(AMOUNT) FROM TRANSACTION WHERE DEBIT = iban),
            current_timestamp()
            from user
            where user_id in ( SELECT u.user_id
							   FROM USER u
							   WHERE
							   last_logged_in >= DATE_SUB(current_date(), INTERVAL last_login_period MONTH)
							   AND (select count(*) 
									from review r
									where r.user_id = u.user_id
                                    ) > cout_of_reviews
							 )
	);
END