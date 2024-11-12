package com.lascauxacademy.backendappgestioneordini.services;

import java.beans.Transient;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.lascauxacademy.backendappgestioneordini.entities.Role;
import com.lascauxacademy.backendappgestioneordini.repositories.RoleRepository;

import jakarta.persistence.EntityExistsException;
import jakarta.transaction.Transactional;

@Service
public class RoleService {

	private final RoleRepository roleRepository;

	public RoleService(RoleRepository roleRepository) {
		super();
		this.roleRepository = roleRepository;
	}

	@Transactional
	public Role addRole(Role role) throws Exception {
		if (roleRepository.existsByCode(role.getCode())) {
			throw new EntityExistsException("Role already exists by provided code!");
		}

		return roleRepository.save(role);
	}
}
