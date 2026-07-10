SET SERVEROUTPUT ON;

CREATE OR REPLACE PROCEDURE LogError(
    p_ProcedureName IN VARCHAR2,
    p_ErrorMessage IN VARCHAR2
) IS
    PRAGMA AUTONOMOUS_TRANSACTION;
BEGIN
    INSERT INTO ErrorLog (ProcedureName, ErrorMessage, LogTimestamp)
    VALUES (p_ProcedureName, p_ErrorMessage, SYSTIMESTAMP);
    COMMIT;
END;
/

CREATE OR REPLACE PROCEDURE SafeTransferFunds(
    p_SrcAccID IN NUMBER,
    p_DestAccID IN NUMBER,
    p_Amount IN NUMBER
) IS
    v_SrcBal NUMBER;
    v_DestBal NUMBER;
    v_TransID NUMBER;
    ex_insufficient_funds EXCEPTION;
    ex_invalid_amount EXCEPTION;
    ex_account_not_found EXCEPTION;
BEGIN

    IF p_Amount <= 0 THEN
        RAISE ex_invalid_amount;
    END IF;

    BEGIN
        SELECT Balance INTO v_SrcBal FROM Accounts WHERE AccountID = p_SrcAccID FOR UPDATE;
    EXCEPTION
        WHEN NO_DATA_FOUND THEN
            RAISE ex_account_not_found;
    END;

    BEGIN
        SELECT Balance INTO v_DestBal FROM Accounts WHERE AccountID = p_DestAccID FOR UPDATE;
    EXCEPTION
        WHEN NO_DATA_FOUND THEN
            RAISE ex_account_not_found;
    END;

    IF v_SrcBal < p_Amount THEN
        RAISE ex_insufficient_funds;
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
    WHEN ex_invalid_amount THEN
        ROLLBACK;
        LogError('SafeTransferFunds', 'Transfer failed: Transfer amount must be positive. Amount: ' || p_Amount);
        DBMS_OUTPUT.PUT_LINE('ERROR: Transfer amount must be positive.');
    WHEN ex_account_not_found THEN
        ROLLBACK;
        LogError('SafeTransferFunds', 'Transfer failed: One or both accounts (' || p_SrcAccID || ', ' || p_DestAccID || ') do not exist.');
        DBMS_OUTPUT.PUT_LINE('ERROR: One or both accounts do not exist.');
    WHEN ex_insufficient_funds THEN
        ROLLBACK;
        LogError('SafeTransferFunds', 'Transfer failed: Insufficient funds in account ' || p_SrcAccID || '. Available: ' || v_SrcBal || ', Requested: ' || p_Amount);
        DBMS_OUTPUT.PUT_LINE('ERROR: Insufficient funds in source account.');
    WHEN OTHERS THEN
        ROLLBACK;
        LogError('SafeTransferFunds', 'Transfer failed due to system error: ' || SQLERRM);
        DBMS_OUTPUT.PUT_LINE('ERROR: Transfer failed due to unexpected error: ' || SQLERRM);
END;
/

CREATE OR REPLACE PROCEDURE UpdateSalary(
    p_EmpID IN NUMBER,
    p_Percentage IN NUMBER
) IS
    v_EmpName VARCHAR2(100);
    v_OldSalary NUMBER;
    ex_employee_not_found EXCEPTION;
    ex_invalid_percentage EXCEPTION;
BEGIN

    IF p_Percentage < -100 THEN
        RAISE ex_invalid_percentage;
    END IF;

    BEGIN
        SELECT Name, Salary INTO v_EmpName, v_OldSalary FROM Employees WHERE EmployeeID = p_EmpID FOR UPDATE;
    EXCEPTION
        WHEN NO_DATA_FOUND THEN
            RAISE ex_employee_not_found;
    END;

    UPDATE Employees
    SET Salary = Salary * (1 + p_Percentage / 100)
    WHERE EmployeeID = p_EmpID;

    COMMIT;
    DBMS_OUTPUT.PUT_LINE('SUCCESS: Salary for employee ' || v_EmpName || ' (ID: ' || p_EmpID ||
                         ') increased by ' || p_Percentage || '%. New salary: $' || (v_OldSalary * (1 + p_Percentage / 100)));

EXCEPTION
    WHEN ex_employee_not_found THEN
        ROLLBACK;
        LogError('UpdateSalary', 'Salary update failed: Employee ID ' || p_EmpID || ' not found.');
        DBMS_OUTPUT.PUT_LINE('ERROR: Employee ID ' || p_EmpID || ' does not exist.');
    WHEN ex_invalid_percentage THEN
        ROLLBACK;
        LogError('UpdateSalary', 'Salary update failed: Invalid percentage: ' || p_Percentage);
        DBMS_OUTPUT.PUT_LINE('ERROR: Salary reduction percentage cannot exceed 100%.');
    WHEN OTHERS THEN
        ROLLBACK;
        LogError('UpdateSalary', 'Salary update failed for employee ID ' || p_EmpID || ' due to error: ' || SQLERRM);
        DBMS_OUTPUT.PUT_LINE('ERROR: Unexpected error occurred: ' || SQLERRM);
END;
/

CREATE OR REPLACE PROCEDURE AddNewCustomer(
    p_CustID IN NUMBER,
    p_Name IN VARCHAR2,
    p_DOB IN DATE,
    p_Balance IN NUMBER
) IS
    ex_negative_balance EXCEPTION;
BEGIN

    IF p_Balance < 0 THEN
        RAISE ex_negative_balance;
    END IF;

    INSERT INTO Customers (CustomerID, Name, DOB, Balance, LastModified, IsVIP)
    VALUES (p_CustID, p_Name, p_DOB, p_Balance, SYSDATE, 'FALSE');

    COMMIT;
    DBMS_OUTPUT.PUT_LINE('SUCCESS: Customer ' || p_Name || ' (ID: ' || p_CustID || ') added successfully.');

EXCEPTION
    WHEN DUP_VAL_ON_INDEX THEN
        ROLLBACK;
        LogError('AddNewCustomer', 'Insertion failed: Customer ID ' || p_CustID || ' already exists.');
        DBMS_OUTPUT.PUT_LINE('ERROR: A customer with ID ' || p_CustID || ' already exists.');
    WHEN ex_negative_balance THEN
        ROLLBACK;
        LogError('AddNewCustomer', 'Insertion failed: Customer ID ' || p_CustID || ' balance cannot be negative ($' || p_Balance || ').');
        DBMS_OUTPUT.PUT_LINE('ERROR: Opening balance cannot be negative.');
    WHEN OTHERS THEN
        ROLLBACK;
        LogError('AddNewCustomer', 'Insertion failed for customer ID ' || p_CustID || ' due to error: ' || SQLERRM);
        DBMS_OUTPUT.PUT_LINE('ERROR: Unexpected error: ' || SQLERRM);
END;
/