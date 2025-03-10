package com.snappick.model;

import jakarta.persistence.*;
import java.util.Set;

@Entity
@Table(name = "Users")
public class Users {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private USER_ROLE role;
    @Column(name = "Name", nullable = false, length = 100)
    private String name;

    @Column(name = "Email", nullable = false, unique = true, length = 100)
    private String email;

    @Column(name = "Password", nullable = false, length = 20)
    private String password;

    @ManyToMany(mappedBy = "users")
    private Set<Orders> orders;

    @ManyToMany
    @JoinTable(
        name = "User_Menu",
        joinColumns = @JoinColumn(name = "user_id"),
        inverseJoinColumns = @JoinColumn(name = "menu_id")
    )
    private Set<Menu> menus;

    @ManyToMany
    @JoinTable(
        name = "User_Feedback",
        joinColumns = @JoinColumn(name = "user_id"),
        inverseJoinColumns = @JoinColumn(name = "feedback_id")
    )
    private Set<Feedback> feedbacks;
    
}
