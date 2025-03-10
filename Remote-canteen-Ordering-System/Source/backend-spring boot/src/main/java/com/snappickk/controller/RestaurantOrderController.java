package com.snappickk.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.snappickk.Exception.OrderException;
import com.snappickk.Exception.RestaurantException;
import com.snappickk.model.RestaurantOrder;
import com.snappickk.service.RestaurantOrderService;
//
//@RestController
//@RequestMapping("/api/restaurant-orders")
//public class RestaurantOrderController {
//
//    @Autowired
//    private RestaurantOrderService restaurantOrderService;
//
//    @GetMapping("/restaurant/{restaurantId}")
//    public ResponseEntity<List<RestaurantOrder>> getRestaurantOrders(
//            @PathVariable Long restaurantId,
//            @RequestParam(required = false) String orderStatus) throws RestaurantException {
//
//        List<RestaurantOrder> orders = restaurantOrderService.getRestaurantOrders(restaurantId, orderStatus);
//        return ResponseEntity.ok(orders);
//    }
//
//    @GetMapping("/{id}")
//    public ResponseEntity<RestaurantOrder> getRestaurantOrderById(
//            @PathVariable Long id) throws OrderException {
//
//        RestaurantOrder order = restaurantOrderService.findById(id);
//        return ResponseEntity.ok(order);
//    }
//
//    @PutMapping("/{id}/status")
//    public ResponseEntity<RestaurantOrder> updateRestaurantOrderStatus(
//            @PathVariable Long id,
//            @RequestParam String orderStatus) throws OrderException {
//
//        RestaurantOrder order = restaurantOrderService.updateRestaurantOrderStatus(id, orderStatus);
//        return ResponseEntity.ok(order);
//    }
//
//    @GetMapping("/parent-order/{parentOrderId}")
//    public ResponseEntity<List<RestaurantOrder>> getRestaurantOrdersByParentOrder(
//            @PathVariable Long parentOrderId) throws OrderException {
//
//        List<RestaurantOrder> orders = restaurantOrderService.getRestaurantOrdersByParentOrder(parentOrderId);
//        return ResponseEntity.ok(orders);
//    }
//}

@RestController
@RequestMapping("/api/restaurant-orders")
public class RestaurantOrderController {

    @Autowired
    private RestaurantOrderService restaurantOrderService;

//    @GetMapping("/restaurant/{restaurantId}")
//    public ResponseEntity<List<RestaurantOrder>> getRestaurantOrders(
//            @PathVariable Long restaurantId,
//            @RequestParam(required = false) String order_status) throws RestaurantException {
//
//        List<RestaurantOrder> orders = restaurantOrderService.getRestaurantOrders(restaurantId, order_status);
////        return ResponseEntity.ok(orders);
//        return ResponseEntity.ok().body(orders);
//    }
@GetMapping("/restaurant/{restaurantId}")
public ResponseEntity<List<RestaurantOrder>> getRestaurantOrders(
        @PathVariable Long restaurantId,
        @RequestParam(required = false, name = "order_status") String orderStatus) throws RestaurantException {
    List<RestaurantOrder> orders = restaurantOrderService.getRestaurantOrders(restaurantId, orderStatus);
    return ResponseEntity.ok().body(orders);
}

    @GetMapping("/{id}")
    public ResponseEntity<RestaurantOrder> getRestaurantOrderById(
            @PathVariable Long id) throws OrderException {

        RestaurantOrder order = restaurantOrderService.findById(id);
        return ResponseEntity.ok().body(order);
    }

//    @PutMapping("/{id}/status")
//    public ResponseEntity<RestaurantOrder> updateRestaurantOrderStatus(
//            @PathVariable Long id,
//            @RequestParam String order_status) throws OrderException {
//
//        RestaurantOrder order = restaurantOrderService.updateRestaurantOrderStatus(id, order_status);
//       // return ResponseEntity.ok(order);
//        return ResponseEntity.ok().body(order);
//
//    }
@PutMapping("/{id}/status")
public ResponseEntity<RestaurantOrder> updateRestaurantOrderStatus(
        @PathVariable Long id,
        @RequestParam(name = "order_status") String orderStatus) throws OrderException {
    RestaurantOrder order = restaurantOrderService.updateRestaurantOrderStatus(id, orderStatus);
    return ResponseEntity.ok(order);
}

    @GetMapping("/parent-order/{parentOrderId}")
    public ResponseEntity<List<RestaurantOrder>> getRestaurantOrdersByParentOrder(
            @PathVariable Long parentOrderId) throws OrderException {

        List<RestaurantOrder> orders = restaurantOrderService.getRestaurantOrdersByParentOrder(parentOrderId);
       // return ResponseEntity.ok(orders);
        return ResponseEntity.ok().body(orders);
    }
}