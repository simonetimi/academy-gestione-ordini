package com.lascauxacademy.backendappgestioneordini.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.lascauxacademy.backendappgestioneordini.entities.Client;
import com.lascauxacademy.backendappgestioneordini.repositories.ClientRepository;

import jakarta.persistence.EntityExistsException;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;

@Service
public class ClientService {

	@Autowired
	private ClientRepository clientRepo;

	@Transactional
	public Client createClient(Client client) throws Exception {
		if (clientRepo.existsByCompanyName(client.getCompanyName())) {
			throw new EntityExistsException("Company already exists!");
		}
		return clientRepo.save(client);
	}

	@Transactional
	public Client modifyClient(Client client) throws Exception {
		if (!clientRepo.existsById(client.getId())) {
			throw new EntityNotFoundException("Client doesn't exist in database!");
		}

		return clientRepo.save(client);
	}

	@Transactional
	public String deleteClient(Client client) throws Exception {
		if (!clientRepo.existsById(client.getId())) {
			throw new EntityNotFoundException("Client doesn't exist in database!");
		}

		clientRepo.delete(client);

		return "Client deleted successfully!";
	}

}
