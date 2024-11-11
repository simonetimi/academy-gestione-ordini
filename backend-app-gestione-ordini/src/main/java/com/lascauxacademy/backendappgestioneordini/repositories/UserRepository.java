package com.lascauxacademy.backendappgestioneordini.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.lascauxacademy.backendappgestioneordini.entities.User;

public interface UserRepository extends JpaRepository<User, String> {

	User findByUsername(String username);
	boolean existsByUsername(String username);
	boolean existsByEmail(String email);

}
