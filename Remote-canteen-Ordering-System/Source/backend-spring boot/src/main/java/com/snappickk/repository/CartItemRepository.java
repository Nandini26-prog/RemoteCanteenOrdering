package com.snappickk.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.snappickk.model.CartItem;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {


//    CartItem findByFoodIsContaining

}
