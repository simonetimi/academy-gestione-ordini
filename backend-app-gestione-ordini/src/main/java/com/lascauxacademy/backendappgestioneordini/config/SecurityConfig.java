package com.lascauxacademy.backendappgestioneordini.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableMethodSecurity
public class SecurityConfig {

	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

//	@Bean
//	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
//		http.csrf(csrf -> csrf.disable())
//				.authorizeHttpRequests(requests -> requests 
//				.requestMatchers("/auth/**").permitAll()
//				.requestMatchers("/**").hasAnyAuthority("ROLE_OPERATOR","ROLE_ADMIN"));
//		return http.build();
//	}
//	
	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		http.csrf(csrf -> csrf.disable())
				.authorizeHttpRequests(requests -> requests
						.requestMatchers("/auth/**").permitAll()
						.requestMatchers("/role","/role/**").permitAll()
						.requestMatchers("/client","/client/**").permitAll()
						.requestMatchers("/orders","/orders/**").permitAll()
						.requestMatchers("/products","/products/**").permitAll());
						//.requestMatchers("/product","/product/**").hasAnyAuthority("ADMIN")
		return http.build();
	}


}
