package com.lascauxacademy.backendappgestioneordini.services;

import com.lascauxacademy.backendappgestioneordini.entities.Client;
import com.lascauxacademy.backendappgestioneordini.entities.Order;
import com.lascauxacademy.backendappgestioneordini.entities.OrderProduct;
import com.lascauxacademy.backendappgestioneordini.entities.Product;
import com.lascauxacademy.backendappgestioneordini.models.OrderDTO;
import com.lascauxacademy.backendappgestioneordini.models.OrderProductDTO;
import com.lascauxacademy.backendappgestioneordini.repositories.ClientRepository;
import com.lascauxacademy.backendappgestioneordini.repositories.OrderProductRepository;
import com.lascauxacademy.backendappgestioneordini.repositories.OrderRepository;
import com.lascauxacademy.backendappgestioneordini.repositories.ProductRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

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

    @Transactional(readOnly = true)
    public List<Order> getAllOrders() {
        return orderRepo.findAll();
    }

    @Transactional
    public Order postOrder(OrderDTO orderDTO) throws Exception {
        // creates new order
        Order order = orderRepo.save(new Order());

        // gets client
        Optional<Client> clientOptional = clientRepo.findById(orderDTO.getClientId());
        if (clientOptional.isEmpty()) throw new EntityNotFoundException("Client with id " + orderDTO.getClientId() +
                " not found");

        double priceTotal = 0;
        List<OrderProduct> orderProductList = new ArrayList<>();

        // create OrderProduct (list) for every element in the list coming from the DTO (frontend)
        for (OrderProductDTO orderProductDTO : orderDTO.getOrderProductList()) {
            Optional<Product> productOptional = productRepo.findById(orderProductDTO.getProductId());
            if (productOptional.isEmpty())
                throw new EntityNotFoundException("Product with id " + orderProductDTO.getProductId() + " not found");
            Product product = productOptional.get();
            OrderProduct orderProduct = orderProductRepo.save(new OrderProduct(UUID.randomUUID().toString(), product,
                    order,
                    orderProductDTO.getQuantity()));

            // add the OrderProduct to an order product list, then set to order
            orderProductList.add(orderProduct);

            // saves the total price (product price * quantity)
            priceTotal += orderProductDTO.getQuantity() * product.getPrice();
        }

        order.setClient(clientOptional.get());
        order.setTotalPrice(priceTotal);
        order.setOrderProducts(orderProductList);

        //todo prezzo totale
        return orderRepo.save(order);
    }


}
