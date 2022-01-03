CREATE DEFINER=`YOUR_PASS_HERE`@`localhost` PROCEDURE `get_top_rated_services`(in number_of_results integer)
BEGIN
	SELECT *
	FROM SERVICE
    WHERE rating = (select MAX(RATING) FROM SERVICE)
	LIMIT number_of_results;
END