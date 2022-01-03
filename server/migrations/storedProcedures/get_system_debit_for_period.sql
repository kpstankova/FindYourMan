CREATE DEFINER=`root`@`localhost` PROCEDURE `get_system_debit_for_period`(in from_date date, in period_in_months integer)
BEGIN
	SELECT SUM(AMOUNT) 
	FROM TRANSACTION
	WHERE DEBIT = 'SYSTEM_IBAN'
	AND TIMESTAMP BETWEEN CURRENT_TIMESTAMP() 
    AND DATE_SUB(from_date, INTERVAL period_in_months MONTH);
END