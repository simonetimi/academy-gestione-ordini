package com.lascauxacademy.backendappgestioneordini.services;

import com.lascauxacademy.backendappgestioneordini.entities.Client;
import com.lascauxacademy.backendappgestioneordini.entities.Order;
import com.lascauxacademy.backendappgestioneordini.repositories.ClientRepository;
import com.lascauxacademy.backendappgestioneordini.repositories.OrderProductRepository;
import com.lascauxacademy.backendappgestioneordini.repositories.OrderRepository;
import com.lascauxacademy.backendappgestioneordini.repositories.ProductRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OrderService {

    private OrderRepository orderRepo;
    private ProductRepository productRepo;
    private ClientRepository clientRepo;
    private OrderProductRepository orderProductRepo;

    public OrderService(OrderRepository orderRepo,
                        ProductRepository productRepo,
                        ClientRepository clientRepo,
                        OrderProductRepository orderProductRepo) {
        this.orderRepo = orderRepo;
        this.productRepo = productRepo;
        this.clientRepo = clientRepo;
        this.orderProductRepo = orderProductRepo;
    }

    public List<Order> getAllOrders() {
        return orderRepo.findAll();
    }

    public Order postOrder(Order o, String clientId, ) throws Exception {
        Optional<Client> client = clientRepo.findById(clientId);
        if (client.isEmpty()) throw new EntityNotFoundException("Cliente con id " + clientId + " not found");

    }


}
