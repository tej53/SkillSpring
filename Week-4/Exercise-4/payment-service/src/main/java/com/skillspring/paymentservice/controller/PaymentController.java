package com.skillspring.paymentservice.controller;

import com.skillspring.paymentservice.service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/payments")
public class PaymentController {

    private final PaymentService paymentService;

    @Autowired
    public PaymentController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    @PostMapping("/process")
    public ResponseEntity<Map<String, Object>> processPayment(
            @RequestParam Double amount,
            @RequestParam(defaultValue = "false") boolean simulateFailure) {
        Map<String, Object> response = paymentService.executePayment(amount, simulateFailure);
        return ResponseEntity.ok(response);
    }
}
