package com.snappick.model;

import jakarta.persistence.*;

@Entity
@Table(name = "Canteen_Staff")
public class CanteenStaff {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int staffId;

    @Column(name = "Name", nullable = false, length = 100)
    private String name;

    @Column(name = "Email", nullable = false, unique = true, length = 100)
    private String email;

    @Column(name = "Password", nullable = false, length = 20)
    private String password;

    @OneToOne
    @JoinColumn(name = "Canteen_id", nullable = false)
    private Canteen canteen;
}
