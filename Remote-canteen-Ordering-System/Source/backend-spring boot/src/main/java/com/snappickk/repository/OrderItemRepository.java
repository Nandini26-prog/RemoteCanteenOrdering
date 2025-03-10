package com.snappickk.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.snappickk.model.OrderItem;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {

}
