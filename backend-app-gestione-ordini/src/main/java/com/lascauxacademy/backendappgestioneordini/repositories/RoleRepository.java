package com.lascauxacademy.backendappgestioneordini.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.lascauxacademy.backendappgestioneordini.entities.Role;
import com.lascauxacademy.backendappgestioneordini.models.ERole;

public interface RoleRepository extends JpaRepository<Role, String> {
	
	Optional<Role> findByRoleName(ERole roleName);
	boolean existsByRoleName(ERole roleName);
}
