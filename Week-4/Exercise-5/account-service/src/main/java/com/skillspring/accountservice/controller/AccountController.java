package com.skillspring.accountservice.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/accounts")
public class AccountController {

    @GetMapping
    public List<Map<String, Object>> getAccounts() {
        return Arrays.asList(
                Map.of("id", "ACC123", "type", "Savings", "balance", 5000.0),
                Map.of("id", "ACC456", "type", "Checking", "balance", 12000.5)
        );
    }
}
