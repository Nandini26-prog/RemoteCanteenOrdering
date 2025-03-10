//package com.snappickk.service;
//
//import java.util.List;
//
//import com.stripe.exception.StripeException;
//import com.snappickk.Exception.CartException;
//import com.snappickk.Exception.OrderException;
//import com.snappickk.Exception.RestaurantException;
//import com.snappickk.Exception.UserException;
//import com.snappickk.model.Order;
//import com.snappickk.model.PaymentResponse;
//import com.snappickk.model.Users;
//import com.snappickk.request.CreateOrderRequest;
//
//public interface OrderService {
//
//	 public PaymentResponse createOrder(CreateOrderRequest order, Users users) throws UserException, RestaurantException, CartException, StripeException;
//
//	 public Order updateOrder(Long orderId, String orderStatus) throws OrderException;
//
//	 public void cancelOrder(Long orderId) throws OrderException;
//
//	 public List<Order> getUserOrders(Long userId) throws OrderException;
//
//	 public List<Order> getOrdersOfRestaurant(Long restaurantId,String orderStatus) throws OrderException, RestaurantException;
//
//
//}

package com.snappickk.service;

import java.util.List;

import com.stripe.exception.StripeException;
import com.snappickk.Exception.CartException;
import com.snappickk.Exception.OrderException;
import com.snappickk.Exception.RestaurantException;
import com.snappickk.Exception.UserException;
import com.snappickk.model.Order;
import com.snappickk.model.PaymentResponse;
import com.snappickk.model.RestaurantOrder;
import com.snappickk.model.Users;
import com.snappickk.request.CreateOrderRequest;

public interface OrderService {
	public PaymentResponse createOrder(CreateOrderRequest order, Users user) throws UserException, RestaurantException, CartException, StripeException;
	public void cancelOrder(Long orderId) throws OrderException;
	public Order findOrderById(Long orderId) throws OrderException;
	public List<Order> getUserOrders(Long userId) throws OrderException;
	public Order updateOrder(Long orderId, String orderStatus) throws OrderException;
	// No need for getOrdersOfRestaurant here as that will be handled by RestaurantOrderService
}
