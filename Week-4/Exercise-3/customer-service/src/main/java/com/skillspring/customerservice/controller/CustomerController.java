package com.skillspring.customerservice.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/profile")
public class CustomerController {

    @GetMapping
    public ResponseEntity<List<Map<String, Object>>> getCustomers() {
        return ResponseEntity.ok(Arrays.asList(
                Map.of("id", 1, "name", "John Doe", "tier", "GOLD"),
                Map.of("id", 2, "name", "Jane Smith", "tier", "PLATINUM")
        ));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Map<String, Object>> getCustomerById(@PathVariable Long id) {
        return ResponseEntity.ok(Map.of("id", id, "name", "Customer #" + id, "tier", "SILVER"));
    }
}
