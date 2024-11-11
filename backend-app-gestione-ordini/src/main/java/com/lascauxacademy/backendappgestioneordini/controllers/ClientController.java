package com.lascauxacademy.backendappgestioneordini.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.service.annotation.PutExchange;

import com.lascauxacademy.backendappgestioneordini.entities.Client;
import com.lascauxacademy.backendappgestioneordini.services.ClientService;

@RestController
@RequestMapping("/client")
public class ClientController {

	@Autowired
	private ClientService clientService;

	@PostMapping("")
	public ResponseEntity<?> postClient(@RequestBody Client client) {
		try {
			return ResponseEntity.ok(clientService.createClient(client));
		} catch (Exception e) {
			return new ResponseEntity(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@PutMapping("")
	public ResponseEntity<?> modifyClient(@RequestBody Client client) {
		try {
			return ResponseEntity.ok(clientService.modifyClient(client));
		} catch (Exception e) {
			return new ResponseEntity(e.getMessage(), HttpStatus.CONFLICT);
		}
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<String> deleteClient(@PathVariable long id){
		try {
			return ResponseEntity.ok(clientService.deleteClient(id));
		} catch (Exception e) {
			return new ResponseEntity<String>(e.getMessage(),HttpStatus.BAD_REQUEST);
		}
	}

}
