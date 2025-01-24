package com.snappickk.service;

import java.util.List;

import com.stripe.exception.StripeException;
import com.snappickk.Exception.CartException;
import com.snappickk.Exception.OrderException;
import com.snappickk.Exception.RestaurantException;
import com.snappickk.Exception.UserException;
import com.snappickk.model.Order;
import com.snappickk.model.PaymentResponse;
import com.snappickk.model.Users;
import com.snappickk.request.CreateOrderRequest;

public interface OrderService {

	 public PaymentResponse createOrder(CreateOrderRequest order, Users users) throws UserException, RestaurantException, CartException, StripeException;

	 public Order updateOrder(Long orderId, String orderStatus) throws OrderException;

	 public void cancelOrder(Long orderId) throws OrderException;

	 public List<Order> getUserOrders(Long userId) throws OrderException;

	 public List<Order> getOrdersOfRestaurant(Long restaurantId,String orderStatus) throws OrderException, RestaurantException;


}
