package com.lascauxacademy.backendappgestioneordini.entities;

import com.lascauxacademy.backendappgestioneordini.models.OrderState;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Table(name = "orders")
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String id;

    @Column
    @Enumerated(EnumType.STRING)
    private OrderState state = OrderState.IN_PROGRESS;

    @OneToMany(mappedBy = "order")
    @Column(name = "products_list")
    private List<OrderProduct> orderProducts;

    @Column(name = "total_price")
    private int totalPrice;

    @ManyToOne
    @JoinColumn(name = "client_id")
    private Client client;
}
