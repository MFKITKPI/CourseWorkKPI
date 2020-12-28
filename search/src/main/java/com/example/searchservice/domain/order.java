package com.example.searchservice.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@Entity
@Table(name = "orders")
public class order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name ="order_id", updatable = false, nullable = false)
    private Integer order_id;

    @ManyToOne
    @JoinColumn(name = "client_id", nullable = false)
    private Clients clientid;

    @ManyToOne
    @JoinColumn(name = "food_id", nullable = false)
    private food food_id;

    @Column(name ="time", nullable = false)
    private String time;

    public order() {}
}
