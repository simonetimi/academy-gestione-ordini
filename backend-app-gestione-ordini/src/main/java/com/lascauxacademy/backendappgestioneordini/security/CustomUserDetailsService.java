package com.lascauxacademy.backendappgestioneordini.security;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.lascauxacademy.backendappgestioneordini.entities.User;
import com.lascauxacademy.backendappgestioneordini.repositories.*;

import jakarta.transaction.Transactional;

import java.util.Set;
import java.util.stream.Collectors;

@Service
public class CustomUserDetailsService implements UserDetailsService {
	// this class implements UserDetailsService to define how to load user details
	// it's used by spring security to load user authentication information
    private UserRepository userRepository;

    public CustomUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // spring security calls this method to authenticate a user
    @Transactional
    @Override
    public UserDetails loadUserByUsername(String usernameOrEmail) throws UsernameNotFoundException {
          User user = userRepository.findByUsernameOrEmail(usernameOrEmail, usernameOrEmail)
                 .orElseThrow(() ->
                         new UsernameNotFoundException("User not found with username or email: " + usernameOrEmail));
          // convert the user's roles to a set of GrantedAuthority
          // grantedAuthority is the format spring security uses for roles
        Set<GrantedAuthority> authorities = user
                .getRoles()
                .stream()
                .map((role) -> new SimpleGrantedAuthority(role.getRoleName().toString())).collect(Collectors.toSet());
        // return a spring security User object with email, password, and roles (authorities)
        return new org.springframework.security.core.userdetails.User(user.getEmail(),
                user.getPassword(),
                authorities);
    }
    
//    la classe CustomUserDetailsService serve per caricare 
//    le informazioni di autenticazione di un utente per Spring Security. 
//    Il metodo loadUserByUsername viene chiamato per cercare l'utente tramite username o email, 
//    convertire i ruoli in un formato compatibile e restituire un oggetto User con email, 
//    password e ruoli, pronto per l'autenticazione.
}
