package com.lascauxacademy.backendappgestioneordini.models;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class JWTAuthResponse {
	private String id;
	private String username;
	private String email;
	private String token;
	private String tokenType = "Bearer";
	private long tokenExpireDate;
	private String role;

}