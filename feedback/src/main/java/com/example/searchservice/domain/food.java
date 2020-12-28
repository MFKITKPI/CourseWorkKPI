package com.example.searchservice.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@Entity
@Table(name = "food")
public class food {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name ="food_id", updatable = false, nullable = false)
    private Integer food_id;

    @Column(name ="food_name", nullable = false)
    private String food_name;

    @Column(name ="restaurant", nullable = false)
    private String restaurant;

    @Column(name ="cooktime", nullable = false)
    private Integer cooktime;

    @Column(name ="ingredients", nullable = false)
    private String ingredients;

    @Column(name ="price", nullable = false)
    private Integer price;

    public food() {}
}
