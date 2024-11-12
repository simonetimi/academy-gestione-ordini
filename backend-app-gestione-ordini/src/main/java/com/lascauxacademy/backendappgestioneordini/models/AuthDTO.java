package com.lascauxacademy.backendappgestioneordini.models;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.security.core.GrantedAuthority;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.lascauxacademy.backendappgestioneordini.entities.Role;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class AuthDTO {

	private String id;
	
	private String email;
	
	private String username;
	
	private String password;
	
	private String token;

	private Date tokenExpireDate;
	
	private List<GrantedAuthority> authorities = new ArrayList<>();
	
	private String role;
}
