package com.lascauxacademy.backendappgestioneordini.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

	// this filter checks the JWT token in every HTTP request to ensure the user is authenticated
	// it extends OncePerRequestFilter, so it only runs once per request
	
    private JwtTokenProvider jwtTokenProvider;

    private UserDetailsService userDetailsService;

    public JwtAuthenticationFilter(JwtTokenProvider jwtTokenProvider, UserDetailsService userDetailsService) {
        this.jwtTokenProvider = jwtTokenProvider;
        this.userDetailsService = userDetailsService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {

        // get JWT token from http request
        String token = getTokenFromRequest(request);

        // validate token
        if(StringUtils.hasText(token) && jwtTokenProvider.validateToken(token)){

            // get username from token
            String username = jwtTokenProvider.extractUsername(token);

            // load the user associated with token
            UserDetails userDetails = userDetailsService.loadUserByUsername(username);
            
            // create an authentication object with the user's details and roles
            UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                userDetails,
                null,
                userDetails.getAuthorities()
            );
            
            // set additional authentication details using the current request
            authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

         // set the authentication object in the security context
            SecurityContextHolder.getContext().setAuthentication(authenticationToken);

        }

        // pass the request to the next filter in the filter chain
        filterChain.doFilter(request, response);
    }

    // helper method to extract the JWT token from the "Authorization" header of the HTTP request
    private String getTokenFromRequest(HttpServletRequest request){

    	// get the Authorization header from the request
        String bearerToken = request.getHeader("Authorization");

        // check if the header contains text and starts with "Bearer "
        if(StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")){
        	// return the token by removing "Bearer " prefix
            return bearerToken.substring(7, bearerToken.length());
        }

     // if there's no token, return null
        return null;
    }
    
//    la classe JwtAuthenticationFilter controlla ogni richiesta HTTP per verificare 
   // se contiene un token JWT valido. Se il token è valido, carica i dettagli 
   // dell'utente e imposta l'utente autenticato nel contesto di sicurezza.

}
