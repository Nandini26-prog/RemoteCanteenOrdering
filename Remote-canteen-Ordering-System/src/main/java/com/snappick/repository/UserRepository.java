package com.snappick.repository;

import com.snappick.model.Users;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<Users, Long> {
    //this will provide methods for all CRUD operations.

    public Users findByEmail(String username);

}
