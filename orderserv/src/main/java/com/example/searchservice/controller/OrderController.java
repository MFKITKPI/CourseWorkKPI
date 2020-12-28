package com.example.searchservice.controller;

import com.example.searchservice.client.ClientsClient;
import com.example.searchservice.client.FoodClient;
import com.example.searchservice.domain.Clients;
import com.example.searchservice.domain.food;
import com.example.searchservice.domain.order;
import com.example.searchservice.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.context.config.annotation.RefreshScope;
import org.springframework.web.bind.annotation.*;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.List;
import java.util.Optional;

@RefreshScope
@RestController
@RequestMapping("/order")
public class OrderController {

    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private ClientsClient clientsClient;
    @Autowired
    private FoodClient foodClient;

    @GetMapping("/getall")
    public Iterable<order> getAllOrders() { return orderRepository.findAll(); }

    @GetMapping("/getall/byclient/{client_name}")
    public List<order> getAllOrdersByUser(@PathVariable(name="client_name") String client_name) {
        Clients client = clientsClient.getUserByName(client_name);
        return orderRepository.findAllByClientid(client);
    }

    @GetMapping("/getby/{id}")
    public Optional<order> getOrderById(@PathVariable(name="id") int id) { return orderRepository.findById(id); }

    @GetMapping("/new/{client_name}/{food_id}")
    public order createOrder(@PathVariable(name="client_name") String client_name,
                             @PathVariable(name="food_id") Integer food_id) {
        order order = new order();
        Clients client = clientsClient.getUserByName(client_name);
        Optional<food> food = foodClient.getFoodById(food_id);
        if(food.isEmpty()) { return null; }
        order.setFood_id(food.get());
        order.setClientid(client);
        order.setTime(new SimpleDateFormat("dd/MM/yyyy HH:mm:ss").format(Calendar.getInstance().getTime()));
        return orderRepository.save(order);
    }

    @DeleteMapping("/del/{id}")
    public void deleteOrder(@PathVariable(name="id") int id) {
        orderRepository.deleteById(id);
    }
}
