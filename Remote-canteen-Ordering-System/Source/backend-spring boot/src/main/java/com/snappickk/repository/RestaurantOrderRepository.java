package com.snappickk.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.snappickk.model.RestaurantOrder;

@Repository
public interface RestaurantOrderRepository extends JpaRepository<RestaurantOrder, Long> {
    List<RestaurantOrder> findByRestaurantId(Long restaurantId);
    List<RestaurantOrder> findByParentOrderId(Long orderId);
    List<RestaurantOrder> findByRestaurantIdAndOrderStatus(Long restaurantId, String status);
}