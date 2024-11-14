package com.lascauxacademy.backendappgestioneordini.security;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class JwtAuthenticationEntryPoint implements AuthenticationEntryPoint {
	// this class is an entry point for handling unauthorized access to secured resources
	// it implements AuthenticationEntryPoint and is used in spring security to handle exceptions
    
	@Override
    // this method is triggered anyytime an unauthorized user tries to access a secured resource

    public void commence(HttpServletRequest request,
                         HttpServletResponse response,
                         AuthenticationException authException) throws IOException, ServletException {
        // send an HTTP 401 Unauthorized error response when access is denied
        response.sendError(HttpServletResponse.SC_UNAUTHORIZED, authException.getMessage());
    }
	
//	la classe JwtAuthenticationEntryPoint gestisce i tentativi di accesso non autorizzati, 
//	inviando una risposta di errore 401 Unauthorized
}
