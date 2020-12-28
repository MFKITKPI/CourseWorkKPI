package com.example.searchservice.controller;

import com.example.searchservice.domain.food;
import com.example.searchservice.repository.FoodRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.context.config.annotation.RefreshScope;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RefreshScope
@RestController
@RequestMapping("/food")
public class FoodController {

    @Autowired
    private FoodRepository foodRepository;

    @GetMapping("/getall")
    public Iterable<food> getAllFood() { return foodRepository.findAll(); }

    @GetMapping("/getby/{id}")
    public Optional<food> getFoodById(@PathVariable(name="id") int id) { return foodRepository.findById(id); }

    @PostMapping("/add")
    public food createFood(@RequestBody food food) {
        return foodRepository.save(food);
    }

    @DeleteMapping("/del/{id}")
    public void deleteFood(@PathVariable(name="id") int id) {
        foodRepository.deleteById(id);
    }
}
