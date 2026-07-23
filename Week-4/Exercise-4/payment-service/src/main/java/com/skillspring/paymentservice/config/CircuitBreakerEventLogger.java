package com.skillspring.paymentservice.config;

import io.github.resilience4j.circuitbreaker.CircuitBreakerRegistry;
import jakarta.annotation.PostConstruct;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class CircuitBreakerEventLogger {

    private static final Logger logger = LoggerFactory.getLogger(CircuitBreakerEventLogger.class);
    private final CircuitBreakerRegistry circuitBreakerRegistry;

    @Autowired
    public CircuitBreakerEventLogger(CircuitBreakerRegistry circuitBreakerRegistry) {
        this.circuitBreakerRegistry = circuitBreakerRegistry;
    }

    @PostConstruct
    public void registerEventListeners() {
        circuitBreakerRegistry.circuitBreaker("paymentService").getEventPublisher()
                .onSuccess(event -> logger.info("[CB EVENT - SUCCESS] Call succeeded: {}", event))
                .onError(event -> logger.error("[CB EVENT - ERROR] Call failed: {}", event))
                .onStateTransition(event -> logger.info("[CB EVENT - STATE TRANSITION] State changed: {}", event))
                .onCallNotPermitted(event -> logger.warn("[CB EVENT - REJECTED] Call rejected due to OPEN Circuit Breaker: {}", event));
    }
}
