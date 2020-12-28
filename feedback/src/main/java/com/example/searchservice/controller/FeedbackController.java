package com.example.searchservice.controller;

import com.example.searchservice.client.ClientsClient;
import com.example.searchservice.client.FoodClient;
import com.example.searchservice.client.OrderClient;
import com.example.searchservice.domain.Clients;
import com.example.searchservice.domain.feedback;
import com.example.searchservice.domain.food;
import com.example.searchservice.repository.FeedbackRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.context.config.annotation.RefreshScope;
import org.springframework.web.bind.annotation.*;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.List;
import java.util.Optional;

@RefreshScope
@RestController
@RequestMapping("/feedback")
public class FeedbackController {

    @Autowired
    private ClientsClient clientsClient;
    @Autowired
    private FoodClient foodClient;
    @Autowired
    private FeedbackRepository feedbackRepository;
    @Autowired
    private OrderClient orderClient;

    @GetMapping("/getall")
    public Iterable<feedback> getAllFeedback() { return feedbackRepository.findAll(); }

    @GetMapping("/getall/{client_name}")
    public List<feedback> getAllFeedbackByUser(@PathVariable(name="client_name") String client_name) {
        Clients client = clientsClient.getUserByName(client_name);
        return feedbackRepository.findAllByClientid(client);
    }

    @GetMapping("/getall/feed/{food_id}")
    public List<feedback> getAllFeedbackByFood(@PathVariable(name="food_id") Integer food_id) {
        Optional<food> food = foodClient.getFoodById(food_id);
        if(food.isEmpty()) { return null; }
        return feedbackRepository.findAllByFoodid(food.get());
    }

    @GetMapping("/getby/{id}")
    public Optional<feedback> getFeedbackById(@PathVariable(name="id") int id) { return feedbackRepository.findById(id); }

    @PostMapping("/new/{client_name}/{order_id}")
    public feedback createFeedback(@PathVariable(name="client_name") String client_name,
                                   @PathVariable(name="order_id") Integer order_id,
                                   @RequestBody String body) {
        feedback feedback = new feedback();
        Clients client = clientsClient.getUserByName(client_name);
        food food = orderClient.getOrderById(order_id).get().getFood_id();
        feedback.setFoodid(food);
        feedback.setClientid(client);
        feedback.setBody(body);
        feedback.setTime(new SimpleDateFormat("dd/MM/yyyy HH:mm:ss").format(Calendar.getInstance().getTime()));
        return feedbackRepository.save(feedback);
    }

    @DeleteMapping("/del/{id}")
    public void deleteFeedback(@PathVariable(name="id") int id) {
        feedbackRepository.deleteById(id);
    }
}
