package com.snappickk.repository;

import java.util.List;

import com.snappickk.model.RestaurantOrder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.snappickk.model.Order;

public interface OrderRepository extends JpaRepository<Order,Long> {
	//@Query("SELECT o FROM Order o WHERE o.customer.id = :userId")
	//@Query("SELECT ro.parentOrder FROM RestaurantOrder ro WHERE ro.parentOrder.customer.id = :userId")
//	@Query("SELECT o FROM Order o " +
//			"LEFT JOIN FETCH o.restaurantOrders ro " +
//			"WHERE o.customer.id = :userId")

//	@Query("SELECT o FROM Order o " +
//			"LEFT JOIN FETCH o.restaurantOrders ro " +
//			"WHERE o.customer.id = :userId " +
//			"AND o.id IN (SELECT ro.parentOrder.id FROM RestaurantOrder ro)")

	@Query("SELECT o FROM Order o " +
			"LEFT JOIN FETCH o.restaurantOrders ro " +
			"WHERE o.customer.id = :userId " +
			"AND o.id IN (SELECT ro.parentOrder.id FROM RestaurantOrder ro)")


	List<Order> findAllUserOrders(@Param("userId")Long userId);
    
//	@Query("SELECT o FROM Order o WHERE o.restaurant.id = :restaurantId")
//	List<Order> findOrdersByRestaurantId(@Param("restaurantId") Long restaurantId);
}
