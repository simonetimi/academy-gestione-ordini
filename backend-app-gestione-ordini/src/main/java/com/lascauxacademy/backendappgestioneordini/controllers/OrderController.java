package com.lascauxacademy.backendappgestioneordini.controllers;

import com.lascauxacademy.backendappgestioneordini.entities.Order;
import com.lascauxacademy.backendappgestioneordini.models.OrderDTO;
import com.lascauxacademy.backendappgestioneordini.models.StateDTO;
import com.lascauxacademy.backendappgestioneordini.services.OrderService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/orders")
public class OrderController {


    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @GetMapping("")
    public ResponseEntity<List<Order>> getAllOrders() {
        List<Order> orders = this.orderService.getAllOrders();
        return new ResponseEntity<>(orders, HttpStatus.OK);
    }

    @PostMapping("")
    @PreAuthorize("hasRole('ROLE_OPERATOR')")
    public ResponseEntity<?> addOrder(@RequestBody OrderDTO orderDTO) {
        try {
            Order order = orderService.postOrder(orderDTO);
            return new ResponseEntity<>(order, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("{id}")
    @PreAuthorize("hasRole('ROLE_OPERATOR')")
    public ResponseEntity<?> updateOrder(@PathVariable("id") String orderId, @RequestBody StateDTO status) {
        try {
            Order order = orderService.updateOrder(orderId, status);
            return new ResponseEntity<>(order, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }


}
