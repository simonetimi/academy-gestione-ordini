package com.lascauxacademy.backendappgestioneordini.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.lascauxacademy.backendappgestioneordini.security.JwtAuthenticationEntryPoint;
import com.lascauxacademy.backendappgestioneordini.security.JwtAuthenticationFilter;

@Configuration
@EnableMethodSecurity(prePostEnabled = true)
public class SecurityConfig {

    private UserDetailsService userDetailsService;

    private JwtAuthenticationEntryPoint authenticationEntryPoint;

    private JwtAuthenticationFilter authenticationFilter;

    public SecurityConfig(UserDetailsService userDetailsService,
                          JwtAuthenticationEntryPoint authenticationEntryPoint,
                          JwtAuthenticationFilter authenticationFilter) {
        this.userDetailsService = userDetailsService;
        this.authenticationEntryPoint = authenticationEntryPoint;
        this.authenticationFilter = authenticationFilter;
    }

    // bean that returns a password encoder used to securely store passwords
	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

    // bean that provides the AuthenticationManager for the app
	// AuthenticationManager is needed for handling authentication in Spring Security
	@Bean
	public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception {
		return authConfig.getAuthenticationManager();
	}
	
	 @Bean
	    SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

	    	http.csrf(csrf -> csrf.disable()) //Cross-Site Request Forgery is disbled beacuse using JWT
	        .authorizeHttpRequests((authorize) -> authorize
	        		.requestMatchers("/auth/**").permitAll()
	                .requestMatchers("/role", "/role/**").permitAll()
	                .requestMatchers("/clients", "/clients/**").permitAll()
	                .requestMatchers("/orders", "/orders/**").permitAll()
	                .requestMatchers("/products", "/products/**").permitAll()
	                .anyRequest().authenticated())
	        // handle exceptions during authentication and provide an entry point for unauthorized access
	        .exceptionHandling( exception -> exception
	                .authenticationEntryPoint(authenticationEntryPoint)// set entry point for authentication failures
	                // configure session management, using stateless sessions as we're using JWT 
	        		).sessionManagement( session -> session
	                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)// stateless means no session is stored
	        );

	        // add custom JWT filter before the default username/password filter in the security chain , 
	    	//check token before authentication
	    	http.addFilterBefore(authenticationFilter, UsernamePasswordAuthenticationFilter.class);
	    	
	    	// build and return the configured security filter chain
	    	return http.build();
	    }

}
