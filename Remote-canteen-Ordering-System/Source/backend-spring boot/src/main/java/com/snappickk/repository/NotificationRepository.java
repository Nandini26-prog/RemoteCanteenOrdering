//package com.snappickk.repository;
//
//import java.util.List;
//
//import org.springframework.data.jpa.repository.JpaRepository;
//
//import com.snappickk.model.Notification;
//
//public interface NotificationRepository extends JpaRepository<Notification, Long> {
//
//	public List<Notification> findByCustomerId(Long userId);
//	public List<Notification> findByRestaurantId(Long restaurantId);
//
//}


//package com.snappickk.repository;

//import java.util.List;
//import org.springframework.data.jpa.repository.JpaRepository;
//import com.snappickk.model.Notification;
//import com.snappickk.model.Users;
//import com.snappickk.model.Restaurant;
//import org.springframework.data.jpa.repository.Query;
//import org.springframework.data.repository.query.Param;
//
//public interface NotificationRepository extends JpaRepository<Notification, Long> {
//	// Change to use the entity relationship instead of an ID
//	//public List<Notification> findByCustomer(Users customer);
//	public List<Notification> findByRestaurant(Restaurant restaurant);
//
//	// Or use a query to find by customer.id
//	 @Query("SELECT n FROM Notification n WHERE n.customer.id = :userId")
//	 public List<Notification> findByCustomerId(@Param("userId") Long userId);
//}


package com.snappickk.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.snappickk.model.Notification;
import com.snappickk.model.Users;

public interface NotificationRepository extends JpaRepository<Notification, Long> {
	// Find notifications by customer entity
	List<Notification> findByCustomer(Users customer);

	// Or use a JPQL query to find by customer.id
	@Query("SELECT n FROM Notification n WHERE n.customer.id = :userId")
	List<Notification> findByCustomerId(@Param("userId") Long userId);
}