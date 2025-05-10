package com.snappickk.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.snappickk.model.*;
import com.snappickk.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
	public Notification sendRestaurantOrderStatusNotification(RestaurantOrder restaurantOrder) {
		Notification notification = new Notification();

		// Set the customer
		notification.setCustomer(restaurantOrder.getParentOrder().getCustomer());

		// Set the restaurant
		notification.setRestaurant(restaurantOrder.getRestaurant());

		// Construct a detailed message
		notification.setMessage(String.format(
				"Your order from %s is now %s. Order details: Total items %d",
				restaurantOrder.getRestaurant().getName(),
				restaurantOrder.getOrderStatus(),
				restaurantOrder.getItems().size()

		));

		// Set sent timestamp
		notification.setSentAt(new Date());

		// Initially set as unread
		notification.setReadStatus(false);

		return notificationRepository.save(notification);
	}

//	public Notification sendRestaurantOrderStatusNotification(RestaurantOrder restaurantOrder) {
//		Notification notification = new Notification();
//		notification.setMessage("Your order from " + restaurantOrder.getRestaurant().getName() +
//				" is " + restaurantOrder.getOrderStatus() +
//				" (Order ID: " + restaurantOrder.getParentOrder().getId() +
//				"-" + restaurantOrder.getId() + ")");
//		notification.setCustomer(restaurantOrder.getParentOrder().getCustomer());
//		notification.setSentAt(new Date());
//		//notification.setRestaurantOrder(restaurantOrder); // Add this field to Notification entity
//
//		return notificationRepository.save(notification);
//	}

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


