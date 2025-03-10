package com.snappick.model;
import jakarta.persistence.*;

import java.util.Set;

@Entity
@Table(name = "Canteen")
public class Canteen {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int canteenId;

    @Column(name = "Name", nullable = false, length = 100)
    private String name;

    @Column(name = "Location", nullable = true, length = 200, columnDefinition = "varchar(200) default 'Banasthali Vidyapith'")
    private String location;

    @OneToOne(mappedBy = "canteen")
    private CanteenStaff canteenStaff;

    @OneToMany(mappedBy = "canteen")
    private Set<Feedback> feedbacks;

    @OneToMany(mappedBy = "canteen")
    private Set<Menu> menus;
}