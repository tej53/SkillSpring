package com.skillspring.paymentservice.client;

import org.springframework.stereotype.Component;

import java.util.Random;

@Component
public class ThirdPartyPaymentGateway {

    private final Random random = new Random();

    public String processPayment(Double amount, boolean simulateFailure) {
        if (simulateFailure) {
            throw new RuntimeException("Third-party payment gateway exception: Connection timeout / Gateway unavailable");
        }

        // Simulate random slow delay
        try {
            int delay = random.nextInt(1000);
            Thread.sleep(delay);
        } catch (InterruptedException ignored) {}

        return "PAYMENT_SUCCESS_TXN_" + System.currentTimeMillis();
    }
}
