package com.example.authservice.controller;

import com.example.authservice.domain.Clients;
import com.example.authservice.repository.ClientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.context.config.annotation.RefreshScope;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RefreshScope
@RestController
@RequestMapping("/client")
public class ClientsController {
    @Autowired
    private ClientRepository clientRepository;

    @GetMapping("/getall")
    public Iterable<Clients> getAllUsers() { return clientRepository.findAll(); }

    @GetMapping("/getby/{id}")
    public Optional<Clients> getUserById(@PathVariable(name="id") int id) { return clientRepository.findById(id); }

    @GetMapping("/getby/name/{username}")
    public Clients getUserByName(@PathVariable(name="username") String username) { return clientRepository.findByUsername(username); }

    @PostMapping("/add")
    public Clients createUser(@RequestBody Clients client) {
        return clientRepository.save(client);
    }

    @DeleteMapping("/del/{id}")
    public void deleteUser(@PathVariable(name="id") int id) {
        clientRepository.deleteById(id);
    }
}
