package com.snappickk.model;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name = "restaurant_orders")
public class RestaurantOrder {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Order parentOrder;

    @ManyToOne
    private Restaurant restaurant;

    @OneToMany
    private List<OrderItem> items = new ArrayList<>();

    private Long subtotalAmount;

    private String orderStatus;

    @Temporal(TemporalType.TIMESTAMP)
    private Date pickupTime;

    @Temporal(TemporalType.TIMESTAMP)
    private Date createdAt;

    private String restaurantPaymentStatus;
}