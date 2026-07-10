SET SERVEROUTPUT ON;

CREATE OR REPLACE TRIGGER UpdateCustomerLastModified
BEFORE UPDATE ON Customers
FOR EACH ROW
BEGIN
    :NEW.LastModified := SYSDATE;
END;
/

CREATE OR REPLACE TRIGGER LogTransaction
AFTER INSERT ON Transactions
FOR EACH ROW
BEGIN
    INSERT INTO AuditLog (
        TransactionID,
        AccountID,
        TransactionDate,
        Amount,
        TransactionType,
        ActionDate
    ) VALUES (
        :NEW.TransactionID,
        :NEW.AccountID,
        :NEW.TransactionDate,
        :NEW.Amount,
        :NEW.TransactionType,
        SYSDATE
    );
END;
/

CREATE OR REPLACE TRIGGER CheckTransactionRules
BEFORE INSERT ON Transactions
FOR EACH ROW
DECLARE
    v_Balance NUMBER;
BEGIN

    IF :NEW.TransactionType = 'Deposit' THEN
        IF :NEW.Amount <= 0 THEN
            RAISE_APPLICATION_ERROR(-20010, 'Transaction Rule Violation: Deposit amount must be positive. Amount: $' || :NEW.Amount);
        END IF;
    END IF;

    IF :NEW.TransactionType = 'Withdrawal' THEN
        IF :NEW.Amount <= 0 THEN
            RAISE_APPLICATION_ERROR(-20011, 'Transaction Rule Violation: Withdrawal amount must be positive. Amount: $' || :NEW.Amount);
        END IF;

        SELECT Balance INTO v_Balance
        FROM Accounts
        WHERE AccountID = :NEW.AccountID;

        IF v_Balance < :NEW.Amount THEN
            RAISE_APPLICATION_ERROR(-20012, 'Transaction Rule Violation: Withdrawal exceeds balance. Account balance is $' ||
                                    v_Balance || '. Attempted withdrawal: $' || :NEW.Amount);
        END IF;
    END IF;
END;
/