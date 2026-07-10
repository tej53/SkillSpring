SET SERVEROUTPUT ON;

CREATE OR REPLACE FUNCTION CalculateAge(
    p_DOB IN DATE
) RETURN NUMBER IS
    v_Age NUMBER;
BEGIN
    IF p_DOB IS NULL THEN
        RETURN NULL;
    END IF;

    v_Age := TRUNC(MONTHS_BETWEEN(SYSDATE, p_DOB) / 12);
    RETURN v_Age;
EXCEPTION
    WHEN OTHERS THEN
        RETURN NULL;
END;
/

CREATE OR REPLACE FUNCTION CalculateMonthlyInstallment(
    p_LoanAmount IN NUMBER,
    p_InterestRate IN NUMBER,
    p_DurationYears IN NUMBER
) RETURN NUMBER IS
    v_MonthlyRate NUMBER;
    v_TotalMonths NUMBER;
    v_Installment NUMBER;
BEGIN

    IF p_LoanAmount IS NULL OR p_InterestRate IS NULL OR p_DurationYears IS NULL THEN
        RETURN NULL;
    END IF;
    IF p_LoanAmount <= 0 OR p_DurationYears <= 0 OR p_InterestRate < 0 THEN
        RETURN 0;
    END IF;

    v_TotalMonths := p_DurationYears * 12;

    IF p_InterestRate = 0 THEN
        RETURN ROUND(p_LoanAmount / v_TotalMonths, 2);
    END IF;

    v_MonthlyRate := p_InterestRate / 12 / 100;
    v_Installment := (p_LoanAmount * v_MonthlyRate * POWER(1 + v_MonthlyRate, v_TotalMonths)) /
                     (POWER(1 + v_MonthlyRate, v_TotalMonths) - 1);

    RETURN ROUND(v_Installment, 2);
EXCEPTION
    WHEN OTHERS THEN
        RETURN NULL;
END;
/

CREATE OR REPLACE FUNCTION HasSufficientBalance(
    p_AccountID IN NUMBER,
    p_Amount IN NUMBER
) RETURN BOOLEAN IS
    v_Balance NUMBER;
BEGIN

    IF p_Amount IS NULL OR p_Amount < 0 THEN
        RETURN FALSE;
    END IF;

    SELECT Balance INTO v_Balance
    FROM Accounts
    WHERE AccountID = p_AccountID;

    IF v_Balance >= p_Amount THEN
        RETURN TRUE;
    ELSE
        RETURN FALSE;
    END IF;
EXCEPTION
    WHEN NO_DATA_FOUND THEN

        RETURN FALSE;
    WHEN OTHERS THEN
        RETURN FALSE;
END;
/

PROMPT Demonstrating Function invocations...
DECLARE
    v_Age NUMBER;
    v_EMI NUMBER;
    v_HasBalance BOOLEAN;
BEGIN

    v_Age := CalculateAge(TO_DATE('1990-07-20', 'YYYY-MM-DD'));
    DBMS_OUTPUT.PUT_LINE('Test CalculateAge (DOB 1990-07-20): ' || v_Age || ' years');

    v_EMI := CalculateMonthlyInstallment(10000, 5, 3);
    DBMS_OUTPUT.PUT_LINE('Test CalculateMonthlyInstallment ($10000, 5%, 3yrs): $' || v_EMI || '/month');

    v_HasBalance := HasSufficientBalance(1, 500);
    IF v_HasBalance THEN
        DBMS_OUTPUT.PUT_LINE('Test HasSufficientBalance (Acc 1, $500): TRUE (Sufficient)');
    ELSE
        DBMS_OUTPUT.PUT_LINE('Test HasSufficientBalance (Acc 1, $500): FALSE (Insufficient)');
    END IF;
END;
/