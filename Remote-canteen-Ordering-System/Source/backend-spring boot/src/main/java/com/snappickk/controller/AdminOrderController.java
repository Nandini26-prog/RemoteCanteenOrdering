package com.snappickk.controller;

import java.util.List;

import com.snappickk.model.RestaurantOrder;
import com.snappickk.service.RestaurantOrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.snappickk.Exception.OrderException;
import com.snappickk.Exception.RestaurantException;
import com.snappickk.model.Order;
import com.snappickk.service.OrderService;
import com.snappickk.service.UserService;

@RestController
@RequestMapping("/api/admin")
public class AdminOrderController {

	@Autowired
	private OrderService orderService;

	@Autowired
	private RestaurantOrderService restaurantOrderService;

	@Autowired
	private UserService userService;


    @DeleteMapping("/order/{orderId}")
    public ResponseEntity<String> deleteOrder(@PathVariable Long orderId) throws OrderException{
    	if(orderId!=null) {
    		orderService.cancelOrder(orderId);
    	return ResponseEntity.ok("Order deleted with id)"+orderId);
    }else return new ResponseEntity<String>(HttpStatus.BAD_REQUEST) ;
    }


    @GetMapping("/order/restaurant/{restaurantId}")
    public ResponseEntity<List<RestaurantOrder>> getAllRestaurantOrders(
    		@PathVariable Long restaurantId,
    		@RequestParam(required = false) String order_status) throws OrderException, RestaurantException{

    		List<RestaurantOrder> orders = restaurantOrderService.
					getRestaurantOrders(restaurantId,order_status);

//    		System.out.println("ORDER STATUS----- "+orderStatus);
    		//return ResponseEntity.ok(orders);
		return ResponseEntity.ok().body(orders);



    }

    @PutMapping("/orders/{orderId}/{orderStatus}")
    public ResponseEntity<Order> updateOrders(@PathVariable Long orderId,@PathVariable String orderStatus) throws OrderException, RestaurantException{

    		Order orders = orderService.updateOrder(orderId, orderStatus);
    		return ResponseEntity.ok(orders);

    }

}
