CREATE DEFINER=`YOUR_PASS_HERE`@`localhost` PROCEDURE `get_top_rated_services_by_category`(in number_of_results integer, in category varchar(128))
BEGIN
	SELECT *
	FROM SERVICE
	WHERE rating = (select MAX(RATING) FROM SERVICE)
    AND category LIKE ('%' || category || '%')
	LIMIT number_of_results;
END