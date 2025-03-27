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

//	@Query("SELECT o FROM Order o " +
//			"LEFT JOIN FETCH o.restaurantOrders ro " +
//			"WHERE o.customer.id = :userId " +
//			"AND o.id IN (SELECT ro.parentOrder.id FROM RestaurantOrder ro)")

	//@Query("SELECT o FROM Order o LEFT JOIN FETCH o.restaurantOrders ro WHERE o.customer.id = :userId ORDER BY o.createdAt DESC")
	@Query("SELECT DISTINCT o FROM Order o " +
			"LEFT JOIN FETCH o.customer c " +
			"LEFT JOIN FETCH o.restaurantOrders ro " +
			"LEFT JOIN FETCH ro.restaurant r " +
			"WHERE o.customer.id = :userId " +
			"ORDER BY o.createdAt DESC")
	List<Order> findAllUserOrders(@Param("userId")Long userId);

//
@Query("SELECT o.id, COALESCE(ro.createdAt, o.createdAt), " +
		"o.totalAmount, o.totalItem, d, " +
		"r.id, r.name, " +
		"COALESCE(ro.orderStatus, 'PENDING'), COALESCE(ro.subtotalAmount, 0), " +
		"ro.pickupTime " +
		"FROM Order o " +
		"JOIN o.restaurantOrders ro " +  // Changed from LEFT JOIN to JOIN
		"JOIN ro.restaurant r " +
		"LEFT JOIN o.deliveryAddress d " +
		"WHERE o.customer.id = :userId " +
		"AND ro.id IS NOT NULL " +  // Ensure only mapped orders are fetched
		"ORDER BY COALESCE(ro.createdAt, o.createdAt) DESC")
List<Object[]> findOrdersWithRestaurantDetails(@Param("userId") Long userId);

//	@Query("SELECT " +
//			"o.id, " +
//			"COALESCE(ro.createdAt, o.createdAt), " +
//			"o.totalAmount, " +
//			"o.totalItem, " +
//			"d, " +
//			"r.id, " +
//			"r.name, " +
//			"COALESCE(ro.orderStatus, 'PENDING'), " +
//			"COALESCE(ro.subtotalAmount, 0), " +
//			"ro.pickupTime, " +
//			"roi.id, " +       // Order Item ID
//			"roi.product.name, " +  // Product Name
//			"roi.quantity, " +      // Quantity
//			"roi.totalPrice " +     // Total Price of Item
//			"FROM Order o " +
//			"JOIN o.restaurantOrders ro " +
//			"JOIN ro.restaurant r " +
//			"LEFT JOIN o.deliveryAddress d " +
//			"LEFT JOIN ro.orderItems roi " +  // Join Order Items
//			"WHERE o.customer.id = :userId " +
//			"AND ro.id IS NOT NULL " +
//			"ORDER BY COALESCE(ro.createdAt, o.createdAt) DESC")




}




