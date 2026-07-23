package com.skillspring.paymentservice.service;

import com.skillspring.paymentservice.client.ThirdPartyPaymentGateway;
import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class PaymentService {

    private static final Logger logger = LoggerFactory.getLogger(PaymentService.class);
    private final ThirdPartyPaymentGateway paymentGateway;

    @Autowired
    public PaymentService(ThirdPartyPaymentGateway paymentGateway) {
        this.paymentGateway = paymentGateway;
    }

    @CircuitBreaker(name = "paymentService", fallbackMethod = "paymentFallback")
    public Map<String, Object> executePayment(Double amount, boolean simulateFailure) {
        logger.info("Executing payment attempt for amount: {}", amount);
        String txnId = paymentGateway.processPayment(amount, simulateFailure);

        Map<String, Object> result = new HashMap<>();
        result.put("status", "SUCCESS");
        result.put("transactionId", txnId);
        result.put("amount", amount);
        result.put("message", "Payment processed via primary gateway");
        return result;
    }

    // Fallback logic executed when third-party API is slow, throws an exception, or circuit breaker is OPEN
    public Map<String, Object> paymentFallback(Double amount, boolean simulateFailure, Throwable throwable) {
        logger.warn("[FALLBACK EVENT] Payment Service fallback triggered! Reason: {}", throwable.getMessage());

        Map<String, Object> fallbackResult = new HashMap<>();
        fallbackResult.put("status", "FALLBACK_QUEUED");
        fallbackResult.put("transactionId", "FALLBACK_TXN_" + System.currentTimeMillis());
        fallbackResult.put("amount", amount);
        fallbackResult.put("message", "Primary payment gateway is currently unavailable or slow. Payment request queued for offline processing.");
        fallbackResult.put("errorCause", throwable.getClass().getSimpleName() + ": " + throwable.getMessage());
        return fallbackResult;
    }
}
