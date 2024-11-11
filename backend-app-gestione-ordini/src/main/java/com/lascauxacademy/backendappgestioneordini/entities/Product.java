package com.lascauxacademy.backendappgestioneordini.entities;

import jakarta.persistence.*;

@Entity
@Table
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    long id;

    @Column
    double price;

    @Column
    String name;


}
