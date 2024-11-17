package com.lascauxacademy.backendappgestioneordini.services;

import java.util.HashSet;
import java.util.Set;

import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.lascauxacademy.backendappgestioneordini.entities.Role;
import com.lascauxacademy.backendappgestioneordini.entities.User;
import com.lascauxacademy.backendappgestioneordini.models.ERole;
import com.lascauxacademy.backendappgestioneordini.models.JWTAuthResponse;
import com.lascauxacademy.backendappgestioneordini.models.LoginDto;
import com.lascauxacademy.backendappgestioneordini.models.RegisterDto;
import com.lascauxacademy.backendappgestioneordini.repositories.RoleRepository;
import com.lascauxacademy.backendappgestioneordini.repositories.UserRepository;
import com.lascauxacademy.backendappgestioneordini.security.JwtTokenProvider;

import jakarta.persistence.EntityExistsException;
import jakarta.persistence.EntityNotFoundException;

@Service
public class AuthService {
	private AuthenticationManager authenticationManager;
	private UserRepository userRepository;
	private RoleRepository roleRepository;
	PasswordEncoder passwordEncoder;
	private JwtTokenProvider jwtTokenProvider;

	public AuthService(AuthenticationManager authenticationManager, UserRepository userRepository,
			RoleRepository roleRepository, PasswordEncoder passwordEncoder, JwtTokenProvider jwtTokenProvider) {
		this.authenticationManager = authenticationManager;
		this.userRepository = userRepository;
		this.roleRepository = roleRepository;
		this.passwordEncoder = passwordEncoder;
		this.jwtTokenProvider = jwtTokenProvider;
	}

	public JWTAuthResponse login(LoginDto loginDto) throws Exception {
		User user = userRepository.findByUsername(loginDto.getUsername())
				.orElseThrow(() -> new EntityNotFoundException("User doesnìt exists!"));

		// create an authentication token using the provided username and password
		Authentication authentication = authenticationManager
				.authenticate(new UsernamePasswordAuthenticationToken(loginDto.getUsername(), loginDto.getPassword()));

		// set the authentication in the security context
		SecurityContextHolder.getContext().setAuthentication(authentication);

		// generate a JWT token for the authenticated user
		String token = jwtTokenProvider.generateToken(authentication);

		// create an instance of the response, jwtAuthResponse
		JWTAuthResponse jwtAuthResponse = new JWTAuthResponse();

		// get the role from the user
		String role = this.userRole(loginDto.getUsername());

		// set the information for the response
		jwtAuthResponse.setUsername(user.getUsername());
		jwtAuthResponse.setToken(token);
		jwtAuthResponse.setEmail(user.getEmail());
		jwtAuthResponse.setId(user.getId());
		jwtAuthResponse.setRole(role);
		jwtAuthResponse.setTokenExpireDate(System.currentTimeMillis() + 1000 * 60 * 60 * 10); // 10 hours in millis

		// return it
		return jwtAuthResponse;
	}

	public String register(RegisterDto registerDto) throws Exception {

		if (userRepository.existsByUsername(registerDto.getUsername())) {
			throw new EntityExistsException("username_exists");
		}

		if (userRepository.existsByEmail(registerDto.getEmail())) {
			throw new EntityExistsException("email_exists");
		}

		User user = new User();
		user.setUsername(registerDto.getUsername());
		user.setEmail(registerDto.getEmail());

		// encode the user's password before saving
		user.setPassword(passwordEncoder.encode(registerDto.getPassword()));

		Set<Role> roles = new HashSet<>();

		// if roles are provided in the registration data, find and add them to the
		// user's roles
		if (registerDto.getRoles() != null && registerDto.getRoles().contains("admin")) {
			Role userRole = roleRepository.findByRoleName(ERole.ROLE_ADMIN).get();
			roles.add(userRole);
		} else {
			Role userRole = roleRepository.findByRoleName(ERole.ROLE_OPERATOR).get();
			roles.add(userRole);
		}

		user.setRoles(roles);
		userRepository.save(user);

		return "User registered successfully!.";
	}

	// method to retrieve the role of a user based on their username
	public String userRole(String username) throws Exception {
		User user = userRepository.findByUsername(username).orElseThrow(() -> new Exception("User not found"));

		Set<Role> roles = user.getRoles();
		if (roles.isEmpty()) {
			throw new Exception("No roles found for the user");
		}

		// return the name of the first role in the user's role set as a string
		Role role = roles.iterator().next();
		return role.getRoleName().name();
	}

}
