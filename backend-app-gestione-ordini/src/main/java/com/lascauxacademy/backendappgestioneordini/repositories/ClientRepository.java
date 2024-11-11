package com.lascauxacademy.backendappgestioneordini.repositories;

import com.lascauxacademy.backendappgestioneordini.entities.Client;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClientRepository extends JpaRepository<Client, Long> {
	boolean existsByCompanyName(String companyName);
}
