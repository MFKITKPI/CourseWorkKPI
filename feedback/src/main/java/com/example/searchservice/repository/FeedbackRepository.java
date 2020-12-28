package com.example.searchservice.repository;

import com.example.searchservice.domain.Clients;
import com.example.searchservice.domain.feedback;
import com.example.searchservice.domain.food;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FeedbackRepository extends JpaRepository<feedback, Integer> {
    List<feedback> findAllByClientid(Clients client);
    List<feedback> findAllByFoodid(food food);
}