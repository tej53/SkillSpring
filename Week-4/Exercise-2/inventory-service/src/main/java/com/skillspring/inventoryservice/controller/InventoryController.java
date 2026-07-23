package com.skillspring.inventoryservice.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/inventory")
public class InventoryController {

    private final Map<Long, Integer> stockMap = new HashMap<>();

    public InventoryController() {
        // Initial dummy inventory stock
        stockMap.put(101L, 50);
        stockMap.put(102L, 20);
        stockMap.put(103L, 0);
    }

    @GetMapping("/{productId}")
    public ResponseEntity<Map<String, Object>> getStock(@PathVariable Long productId) {
        Integer stock = stockMap.getOrDefault(productId, 0);
        Map<String, Object> response = new HashMap<>();
        response.put("productId", productId);
        response.put("stock", stock);
        response.put("inStock", stock > 0);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/{productId}/update")
    public ResponseEntity<Map<String, Object>> updateStock(@PathVariable Long productId, @RequestParam Integer quantity) {
        stockMap.put(productId, quantity);
        Map<String, Object> response = new HashMap<>();
        response.put("productId", productId);
        response.put("updatedStock", quantity);
        return ResponseEntity.ok(response);
    }
}
