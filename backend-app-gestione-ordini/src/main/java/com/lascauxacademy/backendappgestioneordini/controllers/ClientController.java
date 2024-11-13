package com.lascauxacademy.backendappgestioneordini.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.lascauxacademy.backendappgestioneordini.entities.Client;
import com.lascauxacademy.backendappgestioneordini.services.ClientService;

@RestController
@RequestMapping("/client")
public class ClientController {

    private final ClientService clientService;

    public ClientController(ClientService clientService) {
        this.clientService = clientService;
    }

    @PostMapping("")
    @PreAuthorize("hasRole('ROLE_OPERATOR')")
    public ResponseEntity<?> postClient(@RequestBody Client client) {
        try {
            return ResponseEntity.ok(clientService.createClient(client));
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("")
    @PreAuthorize("hasRole('ROLE_OPERATOR')")
    public ResponseEntity<?> modifyClient(@RequestBody Client client) {
        try {
            return ResponseEntity.ok(clientService.modifyClient(client));
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.CONFLICT);
        }
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_OPERATOR')")
    public ResponseEntity<String> deleteClient(@PathVariable String id) {
        try {
            return ResponseEntity.ok(clientService.deleteClient(id));
        } catch (Exception e) {
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

}
