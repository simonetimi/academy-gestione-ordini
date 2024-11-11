package com.lascauxacademy.backendappgestioneordini.repositories;

import com.lascauxacademy.backendappgestioneordini.entities.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {
}
