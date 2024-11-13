package com.lascauxacademy.backendappgestioneordini.services;

import org.springframework.stereotype.Service;

import com.lascauxacademy.backendappgestioneordini.entities.Client;
import com.lascauxacademy.backendappgestioneordini.repositories.ClientRepository;

import jakarta.persistence.EntityExistsException;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ClientService {

    private final ClientRepository clientRepo;

    public ClientService(ClientRepository clientRepo) {
        this.clientRepo = clientRepo;
    }

    @Transactional(readOnly = true)
    public List<Client> getAllClients() {
        return clientRepo.findAll();
    }

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
    public String deleteClient(String id) throws Exception {
        if (!clientRepo.existsById(id)) {
            throw new EntityNotFoundException("Client doesn't exist in database!");
        }

        clientRepo.deleteById(id);

        return "Client deleted successfully!";
    }

}
