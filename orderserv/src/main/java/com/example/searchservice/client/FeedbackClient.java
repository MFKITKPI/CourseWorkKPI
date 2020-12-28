package com.example.searchservice.client;

import com.example.searchservice.domain.feedback;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@FeignClient(value = "feedback")
@RequestMapping("/feedback")
public interface FeedbackClient {
    @GetMapping("/getall")
    public Iterable<feedback> getAllFeedback();

    @GetMapping("/getall/{client_name}")
    public List<feedback> getAllFeedbackByUser(@PathVariable(name = "client_name") String client_name);

    @GetMapping("/getall/feed/{food_id}")
    public List<feedback> getAllFeedbackByFood(@PathVariable(name = "food_id") Integer food_id);

    @GetMapping("/getby/{id}")
    public Optional<feedback> getFeedbackById(@PathVariable(name = "id") int id);

    @PostMapping("/new/{client_name}/{order_id}")
    public feedback createFeedback(@PathVariable(name = "client_name") String client_name,
                                   @PathVariable(name = "order_id") Integer order_id,
                                   @RequestBody String body);

    @DeleteMapping("/del/{id}")
    public void deleteFeedback(@PathVariable(name = "id") int id);
}