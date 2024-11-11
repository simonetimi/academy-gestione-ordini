package com.lascauxacademy.backendappgestioneordini.controllers;

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
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@Autowired
	private RoleRepository roleRepository;
	
	@Autowired
	private JwtUtil jwt;
	
	@PostMapping("/signup")
	public ResponseEntity<?> signup(@RequestBody AuthDTO userAuthDto) throws Exception {
		if(userAuthDto.getPassword().isEmpty()) {
			throw new EntityNotFoundException("Password is needed!");
		}
		
		userAuthDto.setPassword(passwordEncoder.encode(userAuthDto.getPassword()));
		
		if(!roleRepository.existsByCode("ROLE_OPERATOR")) {
			throw new EntityNotFoundException("Role doesn't exist");
		}

		Role userRole = roleRepository.findByCode("ROLE_OPERATOR");
		
		User newUser = new User();
		newUser.setEmail(userAuthDto.getEmail());
		newUser.setPassword(userAuthDto.getPassword());
		newUser.setUsername(userAuthDto.getUsername());
		newUser.getRoles().add(userRole);

		userService.insertUser(newUser);
		return ResponseEntity.ok("User registered successfully");
		
	}

	@PostMapping("/signin")
	public ResponseEntity<?> signin(@RequestBody AuthDTO loginRequest) throws Exception {
		
		if(!userRepository.existsByUsername(loginRequest.getUsername())) {
			throw new EntityNotFoundException("User doesn't exist!");
		}
		
		User user = userRepository.findByUsername(loginRequest.getUsername());

		if (passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
			
			String token = jwt.generateToken(user.getUsername());
			Object[] roles = user.getRoles().toArray();
			loginRequest.setId(user.getId());
			loginRequest.setToken(token);
			loginRequest.setEmail(user.getEmail());
			loginRequest.setPassword(null);
			loginRequest.setUsername(user.getUsername());
			loginRequest.setTokenExpireDate(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 10));
			loginRequest.setRole(((Role) roles[0]).getCode());
		
			
			return ResponseEntity.ok(loginRequest);
		} else {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
		}
	}

}
