SET SERVEROUTPUT ON;

PROMPT Running Scenario 1: Apply interest rate discounts...
DECLARE
    CURSOR c_senior_loans IS
        SELECT c.CustomerID, c.Name, l.LoanID, l.InterestRate,
               TRUNC(MONTHS_BETWEEN(SYSDATE, c.DOB) / 12) AS Age
        FROM Customers c
        JOIN Loans l ON c.CustomerID = l.CustomerID
        WHERE TRUNC(MONTHS_BETWEEN(SYSDATE, c.DOB) / 12) > 60;
BEGIN
    FOR r_loan IN c_senior_loans LOOP
        UPDATE Loans
        SET InterestRate = InterestRate - 1
        WHERE LoanID = r_loan.LoanID;

        DBMS_OUTPUT.PUT_LINE('Customer: ' || r_loan.Name || ' (Age: ' || r_loan.Age ||
                             '), Loan ID: ' || r_loan.LoanID ||
                             ' - Interest Rate reduced from ' || r_loan.InterestRate ||
                             '% to ' || (r_loan.InterestRate - 1) || '%');
    END LOOP;
    COMMIT;
END;
/

PROMPT Running Scenario 2: Promoting high balance customers to VIP...
DECLARE
    CURSOR c_customers IS
        SELECT CustomerID, Name, Balance, IsVIP
        FROM Customers;
BEGIN
    FOR r_cust IN c_customers LOOP
        IF r_cust.Balance > 10000 THEN
            UPDATE Customers
            SET IsVIP = 'TRUE'
            WHERE CustomerID = r_cust.CustomerID;
            DBMS_OUTPUT.PUT_LINE('Customer ' || r_cust.Name || ' (ID: ' || r_cust.CustomerID ||
                                 ') promoted to VIP. Balance: $' || r_cust.Balance);
        ELSE
            DBMS_OUTPUT.PUT_LINE('Customer ' || r_cust.Name || ' (ID: ' || r_cust.CustomerID ||
                                 ') remains regular. Balance: $' || r_cust.Balance);
        END IF;
    END LOOP;
    COMMIT;
END;
/

PROMPT Running Scenario 3: Generating loan due reminders...
DECLARE
    CURSOR c_due_loans IS
        SELECT c.Name, l.LoanID, l.EndDate
        FROM Loans l
        JOIN Customers c ON l.CustomerID = c.CustomerID
        WHERE l.EndDate BETWEEN SYSDATE AND SYSDATE + 30;
    v_found BOOLEAN := FALSE;
BEGIN
    FOR r_loan IN c_due_loans LOOP
        v_found := TRUE;
        DBMS_OUTPUT.PUT_LINE('REMINDER: Dear ' || r_loan.Name ||
                             ', your loan (ID: ' || r_loan.LoanID ||
                             ') is due on ' || TO_CHAR(r_loan.EndDate, 'YYYY-MM-DD') ||
                             '. Please ensure sufficient balance for repayment.');
    END LOOP;

    IF NOT v_found THEN
        DBMS_OUTPUT.PUT_LINE('No loans are due within the next 30 days.');
    END IF;
END;
/