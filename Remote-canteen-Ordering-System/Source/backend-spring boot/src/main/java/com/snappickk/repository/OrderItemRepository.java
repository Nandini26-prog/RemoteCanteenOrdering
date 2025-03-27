package com.snappickk.repository;

import lombok.Data;
import org.springframework.data.jpa.repository.JpaRepository;

import com.snappickk.model.OrderItem;

import java.util.List;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {

}


