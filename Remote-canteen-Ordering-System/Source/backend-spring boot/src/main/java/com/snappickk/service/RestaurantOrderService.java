package com.snappickk.service;

import java.util.Date;
import java.util.List;

import com.snappickk.Exception.OrderException;
import com.snappickk.Exception.RestaurantException;
import com.snappickk.model.RestaurantOrder;
import com.snappickk.model.Users;

public interface RestaurantOrderService {
    RestaurantOrder findById(Long id) throws OrderException;
    List<RestaurantOrder> getRestaurantOrders(Long restaurantId, String orderStatus) throws RestaurantException;
    RestaurantOrder updateRestaurantOrderStatus(Long restaurantOrderId, String orderStatus) throws OrderException;
    List<RestaurantOrder> getRestaurantOrdersByParentOrder(Long parentOrderId) throws OrderException;
    RestaurantOrder updatePickupTime(Long restaurantOrderId, Date pickupTime) throws OrderException;

}