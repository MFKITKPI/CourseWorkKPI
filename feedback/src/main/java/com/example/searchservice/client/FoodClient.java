package com.example.searchservice.client;

import com.example.searchservice.domain.food;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@FeignClient(value = "search")
@RequestMapping("/food")
public interface FoodClient {
    @GetMapping("/getall")
    Iterable<food> getAllFood();

    @GetMapping("/getby/{id}")
    Optional<food> getFoodById(@PathVariable(name = "id") int id);

    @PostMapping("/add")
    food createFood(@RequestBody food food);

    @DeleteMapping("/del/{id}")
    void deleteFood(@PathVariable(name = "id") int id);
}
