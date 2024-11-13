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
import com.lascauxacademy.backendappgestioneordini.models.LoginDto;
import com.lascauxacademy.backendappgestioneordini.models.RegisterDto;
import com.lascauxacademy.backendappgestioneordini.repositories.RoleRepository;
import com.lascauxacademy.backendappgestioneordini.repositories.UserRepository;
import com.lascauxacademy.backendappgestioneordini.security.JwtTokenProvider;

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

	public String login(LoginDto loginDto) {

		Authentication authentication = authenticationManager
				.authenticate(new UsernamePasswordAuthenticationToken(loginDto.getUsername(), loginDto.getPassword()));
		System.out.println(authentication);
		SecurityContextHolder.getContext().setAuthentication(authentication);

		String token = jwtTokenProvider.generateToken(authentication);
		System.out.println(token);
		return token;
	}

	public String register(RegisterDto registerDto) {

		User user = new User();
		user.setUsername(registerDto.getUsername());
		user.setEmail(registerDto.getEmail());
		user.setPassword(passwordEncoder.encode(registerDto.getPassword()));

		Set<Role> roles = new HashSet<>();

		if (registerDto.getRoles() != null) {
			registerDto.getRoles().forEach(role -> {
				Role userRole = roleRepository.findByRoleName(getRole(role)).get();
				roles.add(userRole);
			});
		} else {
			Role userRole = roleRepository.findByRoleName(ERole.ROLE_OPERATOR).get();
			roles.add(userRole);
		}

		user.setRoles(roles);
		System.out.println(user);
		userRepository.save(user);

		return "User registered successfully!.";
	}

	public ERole getRole(String role) {
		if (role.equals("ADMIN"))
			return ERole.ROLE_ADMIN;
		else
			return ERole.ROLE_OPERATOR;
	}

	public String userRole(String username) throws Exception {
		User user = userRepository.findByUsername(username).orElseThrow(() -> new Exception("User not found"));

		Set<Role> roles = user.getRoles();
		if (roles.isEmpty()) {
			throw new Exception("No roles found for the user");
		}

		Role role = roles.iterator().next();
		return role.getRoleName().name();
	}

}
