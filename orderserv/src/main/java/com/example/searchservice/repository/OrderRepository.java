package com.example.searchservice.repository;

import com.example.searchservice.domain.Clients;
import com.example.searchservice.domain.order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<order, Integer> {
    List<order> findAllByClientid(Clients client);
}