package com.lascauxacademy.backendappgestioneordini.models;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import com.lascauxacademy.backendappgestioneordini.entities.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class RegisterDto {

	private String email;

	private String username;

	private String password;

	private Set<String> roles;
}
