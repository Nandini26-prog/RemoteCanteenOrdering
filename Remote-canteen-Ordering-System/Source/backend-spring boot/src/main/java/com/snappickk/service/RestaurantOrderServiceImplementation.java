package com.snappickk.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.snappickk.Exception.OrderException;
import com.snappickk.Exception.RestaurantException;
import com.snappickk.model.Notification;
import com.snappickk.model.RestaurantOrder;
import com.snappickk.repository.RestaurantOrderRepository;
import com.snappickk.repository.RestaurantRepository;

@Service
public class RestaurantOrderServiceImplementation implements RestaurantOrderService {

    @Autowired
    private RestaurantOrderRepository restaurantOrderRepository;

    @Autowired
    private RestaurantRepository restaurantRepository;

    @Autowired
    private NotificationService notificationService;

    @Override
    public RestaurantOrder findById(Long id) throws OrderException {
        Optional<RestaurantOrder> opt = restaurantOrderRepository.findById(id);
        if(opt.isPresent()) {
            return opt.get();
        }
        throw new OrderException("Restaurant order not found with id " + id);
    }

    @Override
    public List<RestaurantOrder> getRestaurantOrders(Long restaurantId, String orderStatus) throws RestaurantException {
        if(restaurantRepository.findById(restaurantId).isEmpty()) {
            throw new RestaurantException("Restaurant not found with id " + restaurantId);
        }

        if(orderStatus != null && !orderStatus.isEmpty()) {
            return restaurantOrderRepository.findByRestaurantIdAndOrderStatus(restaurantId, orderStatus);
        }

        return restaurantOrderRepository.findByRestaurantId(restaurantId);
    }

    @Override
    public RestaurantOrder updateRestaurantOrderStatus(Long restaurantOrderId, String orderStatus) throws OrderException {
        RestaurantOrder restaurantOrder = findById(restaurantOrderId);

        if(orderStatus.equals("OUT_FOR_DELIVERY") || orderStatus.equals("DELIVERED")
                || orderStatus.equals("COMPLETED") || orderStatus.equals("PENDING")) {
            restaurantOrder.setOrderStatus(orderStatus);

            // Optional: Send notification
            // Notification notification = notificationService.sendOrderStatusNotification(restaurantOrder);

            return restaurantOrderRepository.save(restaurantOrder);
        }
        else throw new OrderException("Please Select A Valid Order Status");
    }

    @Override
    public List<RestaurantOrder> getRestaurantOrdersByParentOrder(Long parentOrderId) throws OrderException {
        return restaurantOrderRepository.findByParentOrderId(parentOrderId);
    }
}