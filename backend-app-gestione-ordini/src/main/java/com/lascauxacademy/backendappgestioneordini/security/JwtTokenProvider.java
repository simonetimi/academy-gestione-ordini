package com.lascauxacademy.backendappgestioneordini.security;

import java.util.Date;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;
import io.jsonwebtoken.*;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtTokenProvider {

	// this class provides methods to create, extract information from, and validate
	// JWT tokens
	// it uses a secret key for signing and validating the tokens

	// the secret key used to sign JWT tokens, injected from application properties
	@Value("${app.jwt-secret}")
	
	private String jwtSecret;
	// token expiration time in milliseconds, injected from application properties
    //not working
	@Value("${app.jwt-expiration-milliseconds}")
	private long jwtExpirationDate;

    // generates a JWT token for a given user based on their authentication information
	public String generateToken(Authentication authentication) {
		String username = authentication.getName();

		// build and return the JWT token with the username as the subject, 
		//current date as issue date,
        // expiration date, and sign it with the secret key
		 // return a new JWT token with specified claims, issue date, expiration, and a digital signature
        return Jwts.builder()
                // set the username as the subject (primary identifier) of the token
                .setSubject(username)
                // set the current date and time as the token's issued date
                .setIssuedAt(new Date())
                // set the expiration date by adding the expiration period to the current time
                .setExpiration(new Date(System.currentTimeMillis() + jwtExpirationDate))
                // sign the token with the secret key to ensure authenticity
                .signWith(key())
                .compact(); // convert to a compact, URL-safe string format

	}

    // generates and returns a SecretKey object using the jwtSecret for signing the token
	private SecretKey key() {
		// decode the Base64-encoded secret and use it to create the signing key
		return Keys.hmacShaKeyFor(Decoders.BASE64.decode(jwtSecret));
	}

	public String extractUsername(String token) {
        // parse the token and extract the claims (data payload)
		Claims claims = Jwts.parserBuilder()
				// set the key for verifying the token's signature
				.setSigningKey(key())
				.build()
				.parseClaimsJws(token)
				.getBody();
        // get the username (subject) from claims
		String username = claims.getSubject();
		return username;
	}

    // validates if the provided token is signed correctly and hasn't expired
	public boolean validateToken(String token) {
        // parse the token with the secret key an exception will be thrown if invalid
		Jwts.parserBuilder().setSigningKey(key())
		.build()
		.parse(token);
		return true;
	}
	
//	la classe JwtTokenProvider genera, valida e analizza i token JWT. 
//	Il metodo generateToken crea il token, extractUsername estrae il nome utente dal token,
//	e validateToken verifica la validità del token.

}
