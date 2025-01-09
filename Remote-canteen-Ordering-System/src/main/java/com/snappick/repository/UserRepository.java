package com.snappick.repository;

import com.snappick.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User,Long> {
    //this will provide methods for all CRUD operations.

    public User findByEmail(String username);

}
