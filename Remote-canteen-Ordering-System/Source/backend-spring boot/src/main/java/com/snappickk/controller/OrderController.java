package com.snappickk.controller;

import java.util.Date;
import java.util.List;

import com.snappickk.dto.OrderDTO;
import com.snappickk.service.RestaurantOrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.stripe.exception.StripeException;
import com.snappickk.Exception.CartException;
import com.snappickk.Exception.OrderException;
import com.snappickk.Exception.RestaurantException;
import com.snappickk.Exception.UserException;
import com.snappickk.model.Order;
import com.snappickk.model.RestaurantOrder;
import com.snappickk.model.PaymentResponse;
import com.snappickk.model.Users;
import com.snappickk.request.CreateOrderRequest;
import com.snappickk.service.OrderService;
import com.snappickk.service.UserService;

@RestController
@RequestMapping("/api")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @Autowired
    private RestaurantOrderService restaurantOrderService;

    @Autowired
    private UserService userService;

    @PostMapping("/order")
    public ResponseEntity<PaymentResponse> createOrder(
            @RequestBody CreateOrderRequest order,
            @RequestHeader("Authorization") String jwt)
            throws UserException, RestaurantException,
            CartException,
            StripeException,
            OrderException {
        Users user = userService.findUserProfileByJwt(jwt);
        System.out.println("Request user: " + user.getEmail());
        if (order != null) {
            PaymentResponse res = orderService.createOrder(order, user);
            return ResponseEntity.ok(res);
        } else throw new OrderException("Please provide a valid request body");
    }
    @CrossOrigin(origins = "http://localhost:3000")
    @PutMapping("/{id}/pickup-time")
    public ResponseEntity<RestaurantOrder> updatePickupTime(
            @PathVariable Long id,
            @RequestHeader("Authorization") String jwt,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) Date pickupTime) throws OrderException {

        RestaurantOrder order = restaurantOrderService.updatePickupTime(id, pickupTime);
        return ResponseEntity.ok(order);
    }

    @GetMapping("/order/user")
    public ResponseEntity<List<OrderDTO>> getAllUserOrders(
            @RequestHeader("Authorization") String jwt) throws OrderException, UserException {
        Users user = userService.findUserProfileByJwt(jwt);
        if (user.getId() != null) {
            List<OrderDTO> userOrders = orderService.getUserOrders(user.getId());
            return ResponseEntity.ok(userOrders);
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
}


//Ye neeche wala chl rha hai sahi , bs restaurant ke alg alg detials sahi nhi de rha.

//@RestController
//@RequestMapping("/api")
//public class OrderController {
//
//	@Autowired
//	private OrderService orderService;
//
//	@Autowired
//	private RestaurantOrderService restaurantOrderService;
//
//	@Autowired
//	private UserService userService;
//
//	@PostMapping("/order")
//	public ResponseEntity<PaymentResponse> createOrder(
//			@RequestBody CreateOrderRequest order,
//			@RequestHeader("Authorization") String jwt)
//			throws UserException, RestaurantException,
//			CartException,
//			StripeException,
//			OrderException {
//		Users user = userService.findUserProfileByJwt(jwt);
//		System.out.println("Request user: " + user.getEmail());
//		if (order != null) {
//			PaymentResponse res = orderService.createOrder(order, user);
//			return ResponseEntity.ok(res);
//		} else throw new OrderException("Please provide a valid request body");
//	}
//
//	@GetMapping("/order/user")
//	public ResponseEntity<List<OrderDTO>> getAllUserOrders(
//			@RequestHeader("Authorization") String jwt) throws OrderException, UserException {
//		Users user = userService.findUserProfileByJwt(jwt);
//		if (user.getId() != null) {
//			List<OrderDTO> userOrders = orderService.getUserOrders(user.getId());
//			return ResponseEntity.ok(userOrders);
//		} else {
//			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
//		}
//	}
//}
//@RestController
//@RequestMapping("/api")
//public class OrderController {
//	@Autowired
//	private OrderService orderService;
//	@Autowired
//	private RestaurantOrderService restaurantOrderService;
//	@Autowired
//	private UserService userService;
//
//
//    @PostMapping("/order")
//	public ResponseEntity<PaymentResponse>  createOrder(@RequestBody CreateOrderRequest order,
//			@RequestHeader("Authorization") String jwt)
//					throws UserException, RestaurantException,
//					CartException,
//					StripeException,
//					OrderException{
//		Users user =userService.findUserProfileByJwt(jwt);
//		System.out.println("req user "+user.getEmail());
//    	if(order!=null) {
//			PaymentResponse res = orderService.createOrder(order,user);
//			return ResponseEntity.ok(res);
//
//    	}else throw new OrderException("Please provide valid request body");
//
//    }
//
//
//
//    @GetMapping("/order/user")
//    public ResponseEntity<List<Order>> getAllUserOrders(@RequestHeader("Authorization") String jwt) throws OrderException, UserException{
//
//    	Users user =userService.findUserProfileByJwt(jwt);
//
//    	if(user.getId()!=null) {
//    	List<Order> userOrders = orderService.getUserOrders(user.getId());
//    	return ResponseEntity.ok(userOrders);
//    	}else {
//    		return new ResponseEntity<List<Order>>(HttpStatus.BAD_REQUEST);
//    	}
//
//    }
//
//
//}
