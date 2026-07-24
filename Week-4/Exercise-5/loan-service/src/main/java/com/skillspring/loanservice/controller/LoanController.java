package com.skillspring.loanservice.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/loans")
public class LoanController {

    @GetMapping
    public List<Map<String, Object>> getLoans() {
        return Arrays.asList(
                Map.of("id", "LOAN789", "amount", 250000.0, "type", "Home Loan", "interestRate", 6.8),
                Map.of("id", "LOAN101", "amount", 15000.0, "type", "Car Loan", "interestRate", 8.5)
        );
    }
}
