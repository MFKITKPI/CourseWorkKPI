package com.example.searchservice.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@Entity
@Table(name = "feedback")
public class feedback {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name ="feedback_id", updatable = false, nullable = false)
    private Integer feedback_id;

    @Column(name ="body")
    private String body;

    @ManyToOne
    @JoinColumn(name = "client_id", nullable = false)
    private Clients clientid;

    @ManyToOne
    @JoinColumn(name = "food_id", nullable = false)
    private food foodid;

    @Column(name ="time", nullable = false)
    private String time;

    public feedback() {}
}
