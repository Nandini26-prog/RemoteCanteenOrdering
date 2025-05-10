package com.snappickk.dto;

import com.snappickk.model.Address;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderDTO {
    private Long id;
    private Date createdAt;
    private Long totalAmount;
    private Integer totalItems;
    private Address deliveryAddress;
    private List<RestaurantOrderDTO> restaurantOrders = new ArrayList<>();

    // Updated constructor to match the class structure
    public OrderDTO(Long id, Date createdAt, Long totalAmount, Integer totalItems, Address deliveryAddress) {
        this.id = id;
        this.createdAt = createdAt;
        this.totalAmount = totalAmount;
        this.totalItems = totalItems;
        this.deliveryAddress = deliveryAddress;
        this.restaurantOrders = new ArrayList<>();
    }

    public void addRestaurantOrder(RestaurantOrderDTO restaurantOrder) {
        this.restaurantOrders.add(restaurantOrder);
    }
}




