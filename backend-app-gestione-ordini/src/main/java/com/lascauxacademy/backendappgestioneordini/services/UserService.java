package com.lascauxacademy.backendappgestioneordini.services;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import javax.security.auth.login.CredentialNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.lascauxacademy.backendappgestioneordini.config.JwtUtil;
import com.lascauxacademy.backendappgestioneordini.entities.Role;
import com.lascauxacademy.backendappgestioneordini.entities.User;
import com.lascauxacademy.backendappgestioneordini.models.AuthDTO;
import com.lascauxacademy.backendappgestioneordini.repositories.RoleRepository;
import com.lascauxacademy.backendappgestioneordini.repositories.UserRepository;

import jakarta.persistence.EntityExistsException;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;

@Service
public class UserService {

	private final UserRepository userRepository;

	private final PasswordEncoder passwordEncoder;

	private final RoleRepository roleRepository;

	private final JwtUtil jwt;

	public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder, RoleRepository roleRepository,
			JwtUtil jwt) {
		super();
		this.userRepository = userRepository;
		this.passwordEncoder = passwordEncoder;
		this.roleRepository = roleRepository;
		this.jwt = jwt;
	}

	@Transactional
	public User insertUser(User user) {
		return userRepository.save(user);
	}

	// registration method
	// checks if the users data is present and if alredy exists in db
	@Transactional
	public String signup(AuthDTO userAuthDto) throws Exception {
		if (userAuthDto.getPassword().isEmpty()) {
			throw new EntityNotFoundException("Password is needed!");
		}

		if (userAuthDto.getEmail().isEmpty()) {
			throw new EntityNotFoundException("Email is needed!");
		}

		if (userAuthDto.getUsername().isEmpty()) {
			throw new EntityNotFoundException("Username is needed!");
		}

		if (userRepository.existsByEmail(userAuthDto.getEmail())) {
			throw new EntityExistsException("Email: " + userAuthDto.getEmail() + " already exists in database!");
		}

		if (userRepository.existsByUsername(userAuthDto.getUsername())) {
			throw new EntityExistsException("Username: " + userAuthDto.getUsername() + " already exists in database!");
		}

		// encode password to store it in db
		userAuthDto.setPassword(passwordEncoder.encode(userAuthDto.getPassword()));

		// check if role is present in db
		if (!roleRepository.existsByCode("OPERATOR")) {
			throw new EntityNotFoundException("Role doesn't exist");
		}

		Role userRole = roleRepository.findByCode("OPERATOR");

		// creating new user with authdto data
		User newUser = new User();
		newUser.setEmail(userAuthDto.getEmail());
		newUser.setPassword(userAuthDto.getPassword());
		newUser.setUsername(userAuthDto.getUsername());
		newUser.getRoles().add(userRole);

		// save user
		userRepository.save(newUser);
		return "User: " + newUser.getUsername() + " registered successfully!";

	}

	@Transactional
	public AuthDTO signin(AuthDTO loginRequest) throws Exception {

		// check if username credential exists in db
		if (!userRepository.existsByUsername(loginRequest.getUsername())) {
			throw new EntityNotFoundException(
					"User with username: " + loginRequest.getUsername() + " is not registered!");
		}

		// retrieving the user by username
		User user = userRepository.findByUsername(loginRequest.getUsername());

//		  Verify the encoded password obtained from storage matches the submitted raw
//		  password after it too is encoded. Returns true if the passwords match, false if
//		  they do not. The stored password itself is never decoded.
		if (passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {

			// generatin new token for user
			String token = jwt.generateToken(user.getUsername());
			Object[] roles = user.getRoles().toArray();
			Set<Role> setRoles = user.getRoles();

			// adding data of user to authDto to return it
			loginRequest.setId(user.getId());
			loginRequest.setToken(token);
			loginRequest.setEmail(user.getEmail());
			loginRequest.setPassword(null);
			loginRequest.setUsername(user.getUsername());
			loginRequest.setTokenExpireDate(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 10));
			loginRequest.setRole(((Role) roles[0]).getCode());

			List<GrantedAuthority> authorities = new ArrayList<GrantedAuthority>();
			for (Object role : setRoles) {
				authorities.add(new SimpleGrantedAuthority(((Role) role).getCode()));
			}	
			loginRequest.setAuthorities(authorities);
			
			return loginRequest;
		} else {
			// if username or password don't match throw invalid credential error
			throw new CredentialNotFoundException("Invalid credentials!");
		}

	}

	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		if (!userRepository.existsByUsername(username)) {
			throw new EntityNotFoundException("User with username: " + username + " is not registered!");
		}
		User user = userRepository.findByUsername(username);
		Set<GrantedAuthority> authorities = user.getRoles().stream()
				.map(role -> new SimpleGrantedAuthority(role.getCode())).collect(Collectors.toSet());

		return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(),
				authorities);
	}

}
