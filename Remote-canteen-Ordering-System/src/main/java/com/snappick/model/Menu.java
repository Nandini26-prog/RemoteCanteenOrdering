package com.snappick.model;


import jakarta.persistence.*;

import java.util.Set;

@Entity
@Table(name = "Menu")
public class Menu {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int menuId;

    @Column(name = "Item_name", nullable = false, length = 100)
    private String itemName;

    @Column(name = "Description", length = 1000)
    private String description;

    @Column(name = "Price", nullable = false, precision = 10, scale = 4)
    private double price;

    @Column(name = "Availability", nullable = false)
    private boolean availability;

    @ManyToOne
    @JoinColumn(name = "Canteen_id", nullable = false)
    private Canteen canteen;

    @OneToMany(mappedBy = "menu")
    private Set<OrderItem> orderItems;

    @ManyToMany(mappedBy = "menus")
    private Set<Users> users;
}