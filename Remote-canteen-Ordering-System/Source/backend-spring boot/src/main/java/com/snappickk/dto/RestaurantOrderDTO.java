package com.snappickk.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import com.snappickk.model.Address;
import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Data
@AllArgsConstructor
public class RestaurantOrderDTO {
    private Long restaurantId;
    private String restaurantName;
    private String orderStatus;
    private Long subtotalAmount;
    private Date pickupTime;
    //private List<OrderItemDTO> items = new ArrayList<>();

//    public void addOrderItem(OrderItemDTO item) {
//        this.items.add(item);
//    }
}
