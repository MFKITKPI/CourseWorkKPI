package com.example.searchservice.repository;

import com.example.searchservice.domain.food;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FoodRepository extends JpaRepository<food, Integer> { }