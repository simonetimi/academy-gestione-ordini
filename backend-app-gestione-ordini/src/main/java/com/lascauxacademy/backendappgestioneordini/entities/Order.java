package com.lascauxacademy.backendappgestioneordini.entities;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.lascauxacademy.backendappgestioneordini.models.OrderState;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
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
    @JsonManagedReference
    @Column(name = "products_list")
    private List<OrderProduct> orderProducts;

    @Column(name = "total_price")
    private double totalPrice;

    @ManyToOne
    @JoinColumn(name = "client_id")
    private Client client;
    
    @Column
    private LocalDateTime date;
    
    public String getDate() {
    	return date.format(DateTimeFormatter.ISO_LOCAL_DATE_TIME);
    }
}
