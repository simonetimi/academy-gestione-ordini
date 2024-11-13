package com.lascauxacademy.backendappgestioneordini.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.lascauxacademy.backendappgestioneordini.entities.User;

public interface UserRepository extends JpaRepository<User, String> {

	Optional<User> findByUsername(String username);
	boolean existsByUsername(String username);
	boolean existsByEmail(String email);
    Optional<User> findByUsernameOrEmail(String username, String email);

}
