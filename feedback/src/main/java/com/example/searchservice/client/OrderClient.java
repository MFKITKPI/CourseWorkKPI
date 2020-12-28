package com.example.searchservice.client;

import com.example.searchservice.domain.order;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;
import java.util.Optional;

@FeignClient(value = "orderserv")
@RequestMapping("/order")
public interface OrderClient {
    @GetMapping("/getall")
    Iterable<order> getAllOrders();

    @GetMapping("/getall/byclient/{client_name}")
    List<order> getAllOrdersByUser(@PathVariable(name="client_name") String client_name);

    @GetMapping("/getby/{id}")
    Optional<order> getOrderById(@PathVariable(name="id") int id);

    @GetMapping("/new/{client_name}/{food_id}")
    order createOrder(@PathVariable(name="client_name") String client_name,
                             @PathVariable(name="food_id") Integer food_id);

    @DeleteMapping("/del/{id}")
    void deleteOrder(@PathVariable(name="id") int id);
}
