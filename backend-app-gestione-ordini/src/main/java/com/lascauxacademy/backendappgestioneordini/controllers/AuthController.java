package com.lascauxacademy.backendappgestioneordini.controllers;

import java.net.http.HttpClient;
import java.time.LocalDate;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.lascauxacademy.backendappgestioneordini.config.JwtUtil;
import com.lascauxacademy.backendappgestioneordini.entities.Role;
import com.lascauxacademy.backendappgestioneordini.entities.User;
import com.lascauxacademy.backendappgestioneordini.models.AuthDTO;
import com.lascauxacademy.backendappgestioneordini.repositories.RoleRepository;
import com.lascauxacademy.backendappgestioneordini.repositories.UserRepository;
import com.lascauxacademy.backendappgestioneordini.services.UserService;

import jakarta.persistence.EntityNotFoundException;

@RestController
@RequestMapping("/auth")
public class AuthController {

	private final UserService userService;

	public AuthController(UserService userService) {
		super();
		this.userService = userService;
	}

	@PostMapping("/signup")
	public ResponseEntity<?> signup(@RequestBody AuthDTO userAuthDto) {
		try {
			userService.signup(userAuthDto);
			return ResponseEntity.ok("User registered successfully");
		} catch (Exception e) {
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@PostMapping("/signin")
	public ResponseEntity<?> signin(@RequestBody AuthDTO loginRequest) {
		try {
			return ResponseEntity.ok(userService.signin(loginRequest));
		} catch (Exception e) {
			return new ResponseEntity<>(e.getMessage(), HttpStatus.UNAUTHORIZED);
		}

	}

}
