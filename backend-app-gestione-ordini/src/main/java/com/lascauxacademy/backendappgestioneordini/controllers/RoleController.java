package com.lascauxacademy.backendappgestioneordini.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.lascauxacademy.backendappgestioneordini.entities.Role;
import com.lascauxacademy.backendappgestioneordini.services.RoleService;

@RestController
@RequestMapping("/role")
public class RoleController {
	
	private final RoleService roleService;
	
	public RoleController(RoleService roleService) {
		super();
		this.roleService = roleService;
	}



	@PostMapping("")
	public ResponseEntity<?> addRole(@RequestBody Role role){
		try {
			return ResponseEntity.ok(roleService.addRole(role));
		} catch (Exception e) {
			return new ResponseEntity<>(e.getMessage(),HttpStatus.BAD_REQUEST);
		}
	}
}
