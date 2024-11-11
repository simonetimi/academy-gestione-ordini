package com.lascauxacademy.backendappgestioneordini.repositories;

import com.lascauxacademy.backendappgestioneordini.entities.OrderProduct;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderProductRepository extends JpaRepository<OrderProduct, String> {
}
