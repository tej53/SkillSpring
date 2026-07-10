SET SERVEROUTPUT ON;

PROMPT Running Scenario 1: Generating monthly statements...
DECLARE

    CURSOR GenerateMonthlyStatements IS
        SELECT c.Name AS CustomerName,
               a.AccountID,
               t.TransactionID,
               t.TransactionDate,
               t.Amount,
               t.TransactionType
        FROM Customers c
        JOIN Accounts a ON c.CustomerID = a.CustomerID
        JOIN Transactions t ON a.AccountID = t.AccountID
        WHERE t.TransactionDate >= TRUNC(SYSDATE, 'MM')
          AND t.TransactionDate < ADD_MONTHS(TRUNC(SYSDATE, 'MM'), 1)
        ORDER BY c.CustomerID, a.AccountID, t.TransactionDate;

    v_PrevAccount NUMBER := -1;
BEGIN
    FOR r_trans IN GenerateMonthlyStatements LOOP

        IF v_PrevAccount != r_trans.AccountID THEN
            IF v_PrevAccount != -1 THEN
                DBMS_OUTPUT.PUT_LINE('
            END IF;
            DBMS_OUTPUT.PUT_LINE('Statement for Customer: ' || r_trans.CustomerName || ' (Account ID: ' || r_trans.AccountID || ')');
            v_PrevAccount := r_trans.AccountID;
        END IF;

        DBMS_OUTPUT.PUT_LINE('  TxID: ' || r_trans.TransactionID ||
                             ' | Date: ' || TO_CHAR(r_trans.TransactionDate, 'YYYY-MM-DD') ||
                             ' | Type: ' || RPAD(r_trans.TransactionType, 10) ||
                             ' | Amount: $' || r_trans.Amount);
    END LOOP;

    IF v_PrevAccount != -1 THEN
        DBMS_OUTPUT.PUT_LINE('
    ELSE
        DBMS_OUTPUT.PUT_LINE('No transactions found for the current month.');
    END IF;
END;
/

PROMPT Running Scenario 2: Deducting annual maintenance fee...
DECLARE
    v_Fee CONSTANT NUMBER := 20.00;

    CURSOR ApplyAnnualFee IS
        SELECT AccountID, Balance
        FROM Accounts
        FOR UPDATE OF Balance;
BEGIN
    FOR r_acc IN ApplyAnnualFee LOOP
        UPDATE Accounts
        SET Balance = Balance - v_Fee,
            LastModified = SYSDATE
        WHERE CURRENT OF ApplyAnnualFee;

        DBMS_OUTPUT.PUT_LINE('Account ID: ' || r_acc.AccountID ||
                             ' - Deducted $' || TO_CHAR(v_Fee, '99.99') ||
                             '. Old Balance: $' || r_acc.Balance ||
                             ', New Balance: $' || (r_acc.Balance - v_Fee));
    END LOOP;
    COMMIT;
    DBMS_OUTPUT.PUT_LINE('Annual fee deduction processing completed.');
EXCEPTION
    WHEN OTHERS THEN
        ROLLBACK;
        DBMS_OUTPUT.PUT_LINE('ERROR: Failed to apply annual fee. ' || SQLERRM);
END;
/

PROMPT Running Scenario 3: Updating interest rates based on new policy...
DECLARE

    v_ThresholdRate CONSTANT NUMBER := 6.00;
    v_RateHike CONSTANT NUMBER := 0.50;

    CURSOR UpdateLoanInterestRates IS
        SELECT LoanID, CustomerID, InterestRate
        FROM Loans
        FOR UPDATE OF InterestRate;

    v_NewRate NUMBER;
    v_UpdatedCount NUMBER := 0;
BEGIN
    FOR r_loan IN UpdateLoanInterestRates LOOP
        IF r_loan.InterestRate < v_ThresholdRate THEN
            v_NewRate := r_loan.InterestRate + v_RateHike;

            UPDATE Loans
            SET InterestRate = v_NewRate
            WHERE CURRENT OF UpdateLoanInterestRates;

            v_UpdatedCount := v_UpdatedCount + 1;
            DBMS_OUTPUT.PUT_LINE('Loan ID: ' || r_loan.LoanID ||
                                 ' (Customer: ' || r_loan.CustomerID || ') interest rate bumped from ' ||
                                 r_loan.InterestRate || '% to ' || v_NewRate || '%');
        ELSE
            DBMS_OUTPUT.PUT_LINE('Loan ID: ' || r_loan.LoanID ||
                                 ' interest rate at ' || r_loan.InterestRate ||
                                 '% (exempt from policy rate adjustment)');
        END IF;
    END LOOP;
    COMMIT;
    DBMS_OUTPUT.PUT_LINE('Interest rate policy adjustment complete. Total updated: ' || v_UpdatedCount);
EXCEPTION
    WHEN OTHERS THEN
        ROLLBACK;
        DBMS_OUTPUT.PUT_LINE('ERROR: Failed to update loan interest rates. ' || SQLERRM);
END;
/