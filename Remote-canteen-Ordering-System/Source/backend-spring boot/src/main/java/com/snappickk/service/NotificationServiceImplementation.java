package com.snappickk.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.snappickk.model.Users;
import com.snappickk.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.snappickk.model.Notification;
import com.snappickk.model.Order;
import com.snappickk.model.Restaurant;
import com.snappickk.repository.NotificationRepository;

@Service
public class NotificationServiceImplementation implements NotificationService {

	@Autowired
	private NotificationRepository notificationRepository;
	
	@Override
	public Notification sendOrderStatusNotification(Order order) {
		Notification notification = new Notification();
		notification.setMessage("your order is "+order.getOrderStatus()+ " order id is - "+order.getId());
		notification.setCustomer(order.getCustomer());
		notification.setSentAt(new Date());
		
		return notificationRepository.save(notification);
	}

	@Override
	public void sendRestaurantNotification(Restaurant restaurant, String message) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void sendPromotionalNotification(Users users, String message) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public List<Notification> findUsersNotification(Long userId) {
		// TODO Auto-generated method stub
		return notificationRepository.findByCustomerId(userId);

	}
//@Override
//public List<Notification> findUsersNotification(Long userId) {
//	// Option 1: Get the user entity first, then find by entity
//	Users user = UserRepository.findById(userId).orElse(null);
//	if (user != null) {
//		return notificationRepository.findByCustomer(user);
//	}
//	return new ArrayList<>();

	// Option 2: If you updated the repository with @Query as shown above
	// return notificationRepository.findByCustomerId(userId);
}


