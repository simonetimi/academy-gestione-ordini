package com.lascauxacademy.backendappgestioneordini.entities;

import com.lascauxacademy.backendappgestioneordini.models.OrderState;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Table
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    long id;

    @Column
    OrderState state;

    // todo list aprodotti ordinati

    @Column(name = "total_price")
    int totalPrice;
}
