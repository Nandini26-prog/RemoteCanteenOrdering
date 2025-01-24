package com.snappick.model;


import jakarta.persistence.*;
@Entity
@Table(name = "Feedback")
public class Feedback {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int feedbackId;

    @Column(name = "Reviews", length = 1000)
    private String reviews;

    @Column(name = "Rating")
    private int rating;

    @ManyToOne
    @JoinColumn(name = "User_id", nullable = false)
    private Users user;

    @ManyToOne
    @JoinColumn(name = "Canteen_id", nullable = false)
    private Canteen canteen;
}