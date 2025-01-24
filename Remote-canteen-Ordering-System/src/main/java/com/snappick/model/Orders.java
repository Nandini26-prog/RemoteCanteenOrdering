package com.snappick.model;


import jakarta.persistence.*;

import java.util.Set;

@Entity
@Table(name = "Orders")
public class Orders {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int orderId;

    @Column(name = "Order_date", nullable = false)
    private java.sql.Date orderDate;

    @Column(name = "Total_Amount", nullable = false, precision = 10, scale = 4)
    private double totalAmount;

    @ManyToOne
    @JoinColumn(name = "User_id", nullable = false)
    private Users user;

    @OneToMany(mappedBy = "order")
    private Set<OrderItem> orderItems;
}