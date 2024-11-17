package com.lascauxacademy.backendappgestioneordini.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.lascauxacademy.backendappgestioneordini.models.JWTAuthResponse;
import com.lascauxacademy.backendappgestioneordini.models.LoginDto;
import com.lascauxacademy.backendappgestioneordini.models.RegisterDto;
import com.lascauxacademy.backendappgestioneordini.services.AuthService;

@RestController
@RequestMapping("/auth")
public class AuthController {

	private AuthService authService;

	public AuthController(AuthService authService) {
		this.authService = authService;
	}

	// Build Login REST API
	@PostMapping("/login")
	public ResponseEntity<JWTAuthResponse> login(@RequestBody LoginDto loginDto) {
		try {
			return ResponseEntity.ok(authService.login(loginDto));
		} catch (Exception e) {
			return new ResponseEntity(e.getMessage(), HttpStatus.BAD_REQUEST);
		}

	}

	// Build Register REST API
	@PostMapping("/signup")
	public ResponseEntity<String> signup(@RequestBody RegisterDto registerDto) {
		String response;
		try {
			response = authService.register(registerDto);
			return new ResponseEntity<>(response, HttpStatus.CREATED);
		} catch (Exception e) {
			return new ResponseEntity(e.getMessage(), HttpStatus.CONFLICT);
		}

	}

}
