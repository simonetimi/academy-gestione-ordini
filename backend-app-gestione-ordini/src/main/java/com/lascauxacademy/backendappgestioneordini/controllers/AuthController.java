package com.lascauxacademy.backendappgestioneordini.controllers;

import java.util.Date;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.lascauxacademy.backendappgestioneordini.entities.User;
import com.lascauxacademy.backendappgestioneordini.models.JWTAuthResponse;
import com.lascauxacademy.backendappgestioneordini.models.LoginDto;
import com.lascauxacademy.backendappgestioneordini.models.RegisterDto;
import com.lascauxacademy.backendappgestioneordini.repositories.UserRepository;
import com.lascauxacademy.backendappgestioneordini.services.AuthService;

import jakarta.persistence.EntityNotFoundException;

@RestController
@RequestMapping("/auth")
public class AuthController {

	private AuthService authService;

	private UserRepository userRepository;

	public AuthController(AuthService authService, UserRepository userRepository) {
		this.authService = authService;
		this.userRepository = userRepository;
	}

	// Build Login REST API
	@PostMapping(value = { "/login", "/signin" })
	public ResponseEntity<JWTAuthResponse> login(@RequestBody LoginDto loginDto) throws Exception {

		User user = userRepository.findByUsername(loginDto.getUsername())
				.orElseThrow(() -> new EntityNotFoundException("User doesnìt exists!"));
		String role;
		String token = authService.login(loginDto);
		try {
			role = authService.userRole(loginDto.getUsername());

			JWTAuthResponse jwtAuthResponse = new JWTAuthResponse();
			jwtAuthResponse.setUsername(user.getUsername());
			jwtAuthResponse.setToken(token);
			jwtAuthResponse.setEmail(user.getEmail());
			jwtAuthResponse.setId(user.getId());
			jwtAuthResponse.setRole(role);
			jwtAuthResponse.setTokenExpireDate(System.currentTimeMillis() + 1000 * 60 * 60 * 10); // 10 hours in millis

			return ResponseEntity.ok(jwtAuthResponse);
		} catch (Exception e) {
			return new ResponseEntity(e.getMessage(), HttpStatus.BAD_REQUEST);
		}

	}

	// Build Register REST API
	@PostMapping(value = { "/register", "/signup" })
	public ResponseEntity<String> register(@RequestBody RegisterDto registerDto) {
		String response;
		try {
			response = authService.register(registerDto);
			return new ResponseEntity<>(response, HttpStatus.CREATED);
		} catch (Exception e) {
			return new ResponseEntity(e.getMessage(), HttpStatus.CONFLICT);
		}

	}

}
