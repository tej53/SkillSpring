package com.skillspring.orderservice.service;

import com.skillspring.orderservice.dto.OrderResponseDTO;
import com.skillspring.orderservice.dto.UserDTO;
import com.skillspring.orderservice.entity.Order;
import com.skillspring.orderservice.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.List;
import java.util.Optional;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final WebClient userWebClient;

    @Autowired
    public OrderService(OrderRepository orderRepository, WebClient userWebClient) {
        this.orderRepository = orderRepository;
        this.userWebClient = userWebClient;
    }

    public Order createOrder(Order order) {
        return orderRepository.save(order);
    }

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    public Optional<Order> getOrderById(Long id) {
        return orderRepository.findById(id);
    }

    public OrderResponseDTO getOrderWithUserDetails(Long orderId) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found with id: " + orderId));

        // Using WebClient (Spring WebFlux) to fetch user details from user-service
        UserDTO user = userWebClient.get()
                .uri("/users/{id}", order.getUserId())
                .retrieve()
                .bodyToMono(UserDTO.class)
                .onErrorResume(e -> Mono.just(new UserDTO(order.getUserId(), "Unknown User", "N/A", "N/A")))
                .block();

        return new OrderResponseDTO(order, user);
    }
}
