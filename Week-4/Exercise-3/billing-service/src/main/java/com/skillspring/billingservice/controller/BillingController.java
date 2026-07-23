package com.skillspring.billingservice.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/invoices")
public class BillingController {

    @GetMapping
    public ResponseEntity<List<Map<String, Object>>> getInvoices() {
        return ResponseEntity.ok(Arrays.asList(
                Map.of("invoiceId", "INV-1001", "amount", 299.99, "status", "PAID"),
                Map.of("invoiceId", "INV-1002", "amount", 45.50, "status", "PENDING")
        ));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Map<String, Object>> getInvoiceById(@PathVariable String id) {
        return ResponseEntity.ok(Map.of("invoiceId", id, "amount", 150.00, "status", "PAID"));
    }
}
