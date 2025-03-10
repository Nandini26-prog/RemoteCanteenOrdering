package com.snappickk.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.snappickk.model.Users;

public interface UserRepository extends JpaRepository<Users, Long> {
	
	
	
	@Query("SELECT u FROM Users u Where u.status='PENDING'")
	public List<Users> getPenddingRestaurantOwners();
	
	public Users findByEmail(String username);

}
