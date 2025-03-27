package com.snappickk.service;

import java.util.List;

import com.snappickk.model.*;
import com.snappickk.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;

public interface NotificationService {

    public Notification sendOrderStatusNotification(Order order);
	public void sendRestaurantNotification(Restaurant restaurant, String message);
	public void sendPromotionalNotification(Users users, String message);
	public List<Notification> findUsersNotification(Long userId);
	public Notification sendRestaurantOrderStatusNotification(RestaurantOrder restaurantOrder);
}
