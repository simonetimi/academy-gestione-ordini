package com.lascauxacademy.backendappgestioneordini.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.lascauxacademy.backendappgestioneordini.entities.Role;

public interface RoleRepository extends JpaRepository<Role, String> {
	
	Role findByCode(String code);
	boolean existsByCode(String code);
}
