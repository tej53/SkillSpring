SET SERVEROUTPUT ON;

PROMPT Creating Package CustomerManagement...
CREATE OR REPLACE PACKAGE CustomerManagement AS

    PROCEDURE AddCustomer(
        p_CustomerID IN NUMBER,
        p_Name IN VARCHAR2,
        p_DOB IN DATE,
        p_InitialBalance IN NUMBER
    );

    PROCEDURE UpdateCustomerDetails(
        p_CustomerID IN NUMBER,
        p_Name IN VARCHAR2 DEFAULT NULL,
        p_DOB IN DATE DEFAULT NULL
    );

    FUNCTION GetCustomerBalance(
        p_CustomerID IN NUMBER
    ) RETURN NUMBER;
END CustomerManagement;
/

CREATE OR REPLACE PACKAGE BODY CustomerManagement AS
    PROCEDURE AddCustomer(
        p_CustomerID IN NUMBER,
        p_Name IN VARCHAR2,
        p_DOB IN DATE,
        p_InitialBalance IN NUMBER
    ) IS
    BEGIN
        IF p_InitialBalance < 0 THEN
            RAISE_APPLICATION_ERROR(-20021, 'Initial balance cannot be negative.');
        END IF;

        INSERT INTO Customers (CustomerID, Name, DOB, Balance, LastModified, IsVIP)
        VALUES (p_CustomerID, p_Name, p_DOB, p_InitialBalance, SYSDATE, 'FALSE');

        COMMIT;
        DBMS_OUTPUT.PUT_LINE('Customer ' || p_Name || ' (ID: ' || p_CustomerID || ') added successfully.');
    EXCEPTION
        WHEN DUP_VAL_ON_INDEX THEN
            ROLLBACK;
            RAISE_APPLICATION_ERROR(-20022, 'Customer ID ' || p_CustomerID || ' already exists.');
        WHEN OTHERS THEN
            ROLLBACK;
            RAISE;
    END AddCustomer;

    PROCEDURE UpdateCustomerDetails(
        p_CustomerID IN NUMBER,
        p_Name IN VARCHAR2 DEFAULT NULL,
        p_DOB IN DATE DEFAULT NULL
    ) IS
    BEGIN
        UPDATE Customers
        SET Name = NVL(p_Name, Name),
            DOB = NVL(p_DOB, DOB),
            LastModified = SYSDATE
        WHERE CustomerID = p_CustomerID;

        IF SQL%ROWCOUNT = 0 THEN
            RAISE_APPLICATION_ERROR(-20020, 'Customer ID ' || p_CustomerID || ' not found.');
        END IF;

        COMMIT;
        DBMS_OUTPUT.PUT_LINE('Customer ID ' || p_CustomerID || ' updated successfully.');
    EXCEPTION
        WHEN OTHERS THEN
            ROLLBACK;
            RAISE;
    END UpdateCustomerDetails;

    FUNCTION GetCustomerBalance(
        p_CustomerID IN NUMBER
    ) RETURN NUMBER IS
        v_Balance NUMBER;
    BEGIN
        SELECT Balance INTO v_Balance
        FROM Customers
        WHERE CustomerID = p_CustomerID;

        RETURN v_Balance;
    EXCEPTION
        WHEN NO_DATA_FOUND THEN
            RETURN NULL;
        WHEN OTHERS THEN
            RAISE;
    END GetCustomerBalance;
END CustomerManagement;
/

PROMPT Creating Package EmployeeManagement...
CREATE OR REPLACE PACKAGE EmployeeManagement AS

    PROCEDURE HireEmployee(
        p_EmployeeID IN NUMBER,
        p_Name IN VARCHAR2,
        p_Position IN VARCHAR2,
        p_Salary IN NUMBER,
        p_Department IN VARCHAR2,
        p_HireDate IN DATE DEFAULT NULL
    );

    PROCEDURE UpdateEmployeeDetails(
        p_EmployeeID IN NUMBER,
        p_Name IN VARCHAR2 DEFAULT NULL,
        p_Position IN VARCHAR2 DEFAULT NULL,
        p_Salary IN NUMBER DEFAULT NULL,
        p_Department IN VARCHAR2 DEFAULT NULL
    );

    FUNCTION CalculateAnnualSalary(
        p_EmployeeID IN NUMBER
    ) RETURN NUMBER;
END EmployeeManagement;
/

CREATE OR REPLACE PACKAGE BODY EmployeeManagement AS
    PROCEDURE HireEmployee(
        p_EmployeeID IN NUMBER,
        p_Name IN VARCHAR2,
        p_Position IN VARCHAR2,
        p_Salary IN NUMBER,
        p_Department IN VARCHAR2,
        p_HireDate IN DATE DEFAULT NULL
    ) IS
    BEGIN
        IF p_Salary < 0 THEN
            RAISE_APPLICATION_ERROR(-20031, 'Salary cannot be negative.');
        END IF;

        INSERT INTO Employees (EmployeeID, Name, Position, Salary, Department, HireDate)
        VALUES (p_EmployeeID, p_Name, p_Position, p_Salary, p_Department, NVL(p_HireDate, SYSDATE));

        COMMIT;
        DBMS_OUTPUT.PUT_LINE('Employee ' || p_Name || ' (ID: ' || p_EmployeeID || ') hired successfully.');
    EXCEPTION
        WHEN DUP_VAL_ON_INDEX THEN
            ROLLBACK;
            RAISE_APPLICATION_ERROR(-20032, 'Employee ID ' || p_EmployeeID || ' already exists.');
        WHEN OTHERS THEN
            ROLLBACK;
            RAISE;
    END HireEmployee;

    PROCEDURE UpdateEmployeeDetails(
        p_EmployeeID IN NUMBER,
        p_Name IN VARCHAR2 DEFAULT NULL,
        p_Position IN VARCHAR2 DEFAULT NULL,
        p_Salary IN NUMBER DEFAULT NULL,
        p_Department IN VARCHAR2 DEFAULT NULL
    ) IS
    BEGIN
        UPDATE Employees
        SET Name = NVL(p_Name, Name),
            Position = NVL(p_Position, Position),
            Salary = NVL(p_Salary, Salary),
            Department = NVL(p_Department, Department)
        WHERE EmployeeID = p_EmployeeID;

        IF SQL%ROWCOUNT = 0 THEN
            RAISE_APPLICATION_ERROR(-20030, 'Employee ID ' || p_EmployeeID || ' not found.');
        END IF;

        COMMIT;
        DBMS_OUTPUT.PUT_LINE('Employee ID ' || p_EmployeeID || ' details updated successfully.');
    EXCEPTION
        WHEN OTHERS THEN
            ROLLBACK;
            RAISE;
    END UpdateEmployeeDetails;

    FUNCTION CalculateAnnualSalary(
        p_EmployeeID IN NUMBER
    ) RETURN NUMBER IS
        v_Salary NUMBER;
    BEGIN
        SELECT Salary INTO v_Salary
        FROM Employees
        WHERE EmployeeID = p_EmployeeID;

        RETURN v_Salary * 12;
    EXCEPTION
        WHEN NO_DATA_FOUND THEN
            RETURN NULL;
        WHEN OTHERS THEN
            RAISE;
    END CalculateAnnualSalary;
END EmployeeManagement;
/

PROMPT Creating Package AccountOperations...
CREATE OR REPLACE PACKAGE AccountOperations AS

    PROCEDURE OpenAccount(
        p_AccountID IN NUMBER,
        p_CustomerID IN NUMBER,
        p_AccountType IN VARCHAR2,
        p_InitialBalance IN NUMBER
    );

    PROCEDURE CloseAccount(
        p_AccountID IN NUMBER
    );

    FUNCTION GetTotalBalance(
        p_CustomerID IN NUMBER
    ) RETURN NUMBER;
END AccountOperations;
/

CREATE OR REPLACE PACKAGE BODY AccountOperations AS
    PROCEDURE OpenAccount(
        p_AccountID IN NUMBER,
        p_CustomerID IN NUMBER,
        p_AccountType IN VARCHAR2,
        p_InitialBalance IN NUMBER
    ) IS
        v_CustExists NUMBER;
    BEGIN

        SELECT COUNT(*) INTO v_CustExists FROM Customers WHERE CustomerID = p_CustomerID;
        IF v_CustExists = 0 THEN
            RAISE_APPLICATION_ERROR(-20041, 'Customer ID ' || p_CustomerID || ' does not exist.');
        END IF;

        IF p_AccountType NOT IN ('Savings', 'Checking') THEN
            RAISE_APPLICATION_ERROR(-20042, 'Invalid Account Type. Must be Savings or Checking.');
        END IF;

        IF p_InitialBalance < 0 THEN
            RAISE_APPLICATION_ERROR(-20043, 'Initial balance cannot be negative.');
        END IF;

        INSERT INTO Accounts (AccountID, CustomerID, AccountType, Balance, LastModified)
        VALUES (p_AccountID, p_CustomerID, p_AccountType, p_InitialBalance, SYSDATE);

        COMMIT;
        DBMS_OUTPUT.PUT_LINE('Account ID ' || p_AccountID || ' opened successfully for Customer ID ' || p_CustomerID);
    EXCEPTION
        WHEN DUP_VAL_ON_INDEX THEN
            ROLLBACK;
            RAISE_APPLICATION_ERROR(-20044, 'Account ID ' || p_AccountID || ' already exists.');
        WHEN OTHERS THEN
            ROLLBACK;
            RAISE;
    END OpenAccount;

    PROCEDURE CloseAccount(
        p_AccountID IN NUMBER
    ) IS
        v_AccountExists NUMBER;
    BEGIN

        SELECT COUNT(*) INTO v_AccountExists FROM Accounts WHERE AccountID = p_AccountID;
        IF v_AccountExists = 0 THEN
            RAISE_APPLICATION_ERROR(-20040, 'Account ID ' || p_AccountID || ' not found.');
        END IF;

        DELETE FROM Transactions WHERE AccountID = p_AccountID;

        DELETE FROM Accounts WHERE AccountID = p_AccountID;

        COMMIT;
        DBMS_OUTPUT.PUT_LINE('Account ID ' || p_AccountID || ' closed (and associated transactions removed) successfully.');
    EXCEPTION
        WHEN OTHERS THEN
            ROLLBACK;
            RAISE;
    END CloseAccount;

    FUNCTION GetTotalBalance(
        p_CustomerID IN NUMBER
    ) RETURN NUMBER IS
        v_TotalBalance NUMBER;
    BEGIN

        SELECT SUM(Balance) INTO v_TotalBalance
        FROM Accounts
        WHERE CustomerID = p_CustomerID;

        RETURN NVL(v_TotalBalance, 0);
    EXCEPTION
        WHEN OTHERS THEN
            RETURN 0;
    END GetTotalBalance;
END AccountOperations;
/