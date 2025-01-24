package com.snappick.model;
import jakarta.persistence.*;

@Entity
@Table(name = "Order_item")
public class OrderItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int orderItemId;

    @Column(name = "Quantity", nullable = false)
    private int quantity;

    @Column(name = "Description", length = 1000)
    private String description;

    @Column(name = "SubTotal", nullable = false, precision = 10, scale = 4)
    private double subTotal;

    @ManyToOne
    @JoinColumn(name = "Canteen_id", nullable = false)
    private Canteen canteen;

    @ManyToOne
    @JoinColumn(name = "Order_id", nullable = false)
    private Orders order;

    @ManyToOne
    @JoinColumn(name = "Menu_id", nullable = false)
    private Menu menu;
}

