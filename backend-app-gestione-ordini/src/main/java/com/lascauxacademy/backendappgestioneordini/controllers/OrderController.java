package com.lascauxacademy.backendappgestioneordini.controllers;

import com.lascauxacademy.backendappgestioneordini.entities.Order;
import com.lascauxacademy.backendappgestioneordini.models.OrderDTO;
import com.lascauxacademy.backendappgestioneordini.models.OrderState;
import com.lascauxacademy.backendappgestioneordini.models.StateDTO;
import com.lascauxacademy.backendappgestioneordini.services.OrderService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("orders")
public class OrderController {


    OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping("")
    public ResponseEntity<?> addOrder(@RequestBody OrderDTO orderDTO) {
        try {
            Order order = orderService.postOrder(orderDTO);
            return new ResponseEntity<>(order, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("{id}")
    public ResponseEntity<?> updateOrder(@PathVariable("id") String orderId, @RequestBody StateDTO status) {
        try {
            Order order = orderService.updateOrder(orderId, status);
            return new ResponseEntity<>(order, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }


}
