SET SERVEROUTPUT ON;

CREATE OR REPLACE PROCEDURE ProcessMonthlyInterest IS
    v_RowsUpdated NUMBER;
BEGIN

    UPDATE Accounts
    SET Balance = Balance * 1.01,
        LastModified = SYSDATE
    WHERE AccountType = 'Savings';

    v_RowsUpdated := SQL%ROWCOUNT;
    COMMIT;
    DBMS_OUTPUT.PUT_LINE('SUCCESS: Processed monthly interest of 1% for ' || v_RowsUpdated || ' Savings accounts.');
EXCEPTION
    WHEN OTHERS THEN
        ROLLBACK;
        DBMS_OUTPUT.PUT_LINE('ERROR: Failed to process monthly interest. ' || SQLERRM);
END;
/

CREATE OR REPLACE PROCEDURE UpdateEmployeeBonus(
    p_Department IN VARCHAR2,
    p_BonusPercentage IN NUMBER
) IS
    v_RowsUpdated NUMBER;
BEGIN

    IF p_BonusPercentage IS NULL OR p_BonusPercentage < 0 THEN
        RAISE_APPLICATION_ERROR(-20001, 'Bonus percentage must be zero or positive.');
    END IF;

    UPDATE Employees
    SET Salary = Salary * (1 + p_BonusPercentage / 100)
    WHERE Department = p_Department;

    v_RowsUpdated := SQL%ROWCOUNT;
    COMMIT;
    DBMS_OUTPUT.PUT_LINE('SUCCESS: Applied ' || p_BonusPercentage || '% bonus to ' || v_RowsUpdated || ' employees in ' || p_Department || ' department.');
EXCEPTION
    WHEN OTHERS THEN
        ROLLBACK;
        RAISE;
END;
/

CREATE OR REPLACE PROCEDURE TransferFunds(
    p_SrcAccID IN NUMBER,
    p_DestAccID IN NUMBER,
    p_Amount IN NUMBER
) IS
    v_SrcBal NUMBER;
    v_TransID NUMBER;
BEGIN

    IF p_Amount <= 0 THEN
        RAISE_APPLICATION_ERROR(-20002, 'Transfer amount must be greater than zero.');
    END IF;

    IF p_SrcAccID = p_DestAccID THEN
        RAISE_APPLICATION_ERROR(-20003, 'Source and destination accounts must be different.');
    END IF;

    BEGIN
        SELECT Balance INTO v_SrcBal FROM Accounts WHERE AccountID = p_SrcAccID FOR UPDATE;
    EXCEPTION
        WHEN NO_DATA_FOUND THEN
            RAISE_APPLICATION_ERROR(-20004, 'Source account ID ' || p_SrcAccID || ' does not exist.');
    END;

    DECLARE
        v_Dummy NUMBER;
    BEGIN
        SELECT 1 INTO v_Dummy FROM Accounts WHERE AccountID = p_DestAccID;
    EXCEPTION
        WHEN NO_DATA_FOUND THEN
            RAISE_APPLICATION_ERROR(-20005, 'Destination account ID ' || p_DestAccID || ' does not exist.');
    END;

    IF v_SrcBal < p_Amount THEN
        RAISE_APPLICATION_ERROR(-20006, 'Insufficient balance. Account ' || p_SrcAccID ||
                                ' has $' || v_SrcBal || '. Transfer amount requested: $' || p_Amount);
    END IF;

    UPDATE Accounts
    SET Balance = Balance - p_Amount, LastModified = SYSDATE
    WHERE AccountID = p_SrcAccID;

    UPDATE Accounts
    SET Balance = Balance + p_Amount, LastModified = SYSDATE
    WHERE AccountID = p_DestAccID;

    SELECT NVL(MAX(TransactionID), 0) + 1 INTO v_TransID FROM Transactions;
    INSERT INTO Transactions (TransactionID, AccountID, TransactionDate, Amount, TransactionType)
    VALUES (v_TransID, p_SrcAccID, SYSDATE, p_Amount, 'Withdrawal');

    SELECT NVL(MAX(TransactionID), 0) + 1 INTO v_TransID FROM Transactions;
    INSERT INTO Transactions (TransactionID, AccountID, TransactionDate, Amount, TransactionType)
    VALUES (v_TransID, p_DestAccID, SYSDATE, p_Amount, 'Deposit');

    COMMIT;
    DBMS_OUTPUT.PUT_LINE('SUCCESS: Transferred $' || p_Amount || ' from Account ' || p_SrcAccID || ' to Account ' || p_DestAccID);
EXCEPTION
    WHEN OTHERS THEN
        ROLLBACK;
        RAISE;
END;
/