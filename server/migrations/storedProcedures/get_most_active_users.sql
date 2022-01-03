CREATE DEFINER=`YOUR_PASS_HERE`@`localhost` PROCEDURE `get_most_active_users`(in cout_of_reviews integer, last_login_period integer)
BEGIN
	SELECT *
    FROM USER u
    WHERE
    last_logged_in >= DATE_SUB(current_date(), INTERVAL last_login_period MONTH)
	and (
	select count(*) 
    from review r
    where r.user_id = u.user_id) > cout_of_reviews;
END