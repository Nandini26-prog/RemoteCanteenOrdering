package com.snappickk.service;

import java.util.List;

import com.snappickk.model.Notification;
import com.snappickk.model.Order;
import com.snappickk.model.Restaurant;
import com.snappickk.model.Users;
import com.snappickk.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;

public interface NotificationService {

    public Notification sendOrderStatusNotification(Order order);
	public void sendRestaurantNotification(Restaurant restaurant, String message);
	public void sendPromotionalNotification(Users users, String message);
	//UserRepository userRepository;
	public List<Notification> findUsersNotification(Long userId);

}
