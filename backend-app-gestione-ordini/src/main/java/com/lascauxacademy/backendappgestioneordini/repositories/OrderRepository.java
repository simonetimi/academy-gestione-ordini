package com.lascauxacademy.backendappgestioneordini.repositories;

import com.lascauxacademy.backendappgestioneordini.entities.Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Order, Long> {
}
