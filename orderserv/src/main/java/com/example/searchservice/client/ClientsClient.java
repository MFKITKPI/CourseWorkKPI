package com.example.searchservice.client;

import com.example.searchservice.domain.Clients;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@FeignClient(value = "authentication")
@RequestMapping("/client")
public interface ClientsClient {
    @GetMapping("/getall")
    Iterable<Clients> getAllUsers();

    @GetMapping("/getby/{id}")
    Optional<Clients> getUserById(@PathVariable(name="id") int id);

    @GetMapping("/getby/name/{username}")
    Clients getUserByName(@PathVariable(name="username") String username);

    @PostMapping("/add")
    Clients createUser(@RequestBody Clients client);

    @DeleteMapping("/del/{id}")
    void deleteUser(@PathVariable(name="id") int id);
}
