package com.lascauxacademy.backendappgestioneordini.entities;

import java.util.List;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    long id;

    @Column
    double price;

    @Column
    String name;
    
    @Column
    private int vat = 22;
    
    @OneToMany(mappedBy = "product")
    @Column
    private List<OrderProduct> orderProducts; 

}
