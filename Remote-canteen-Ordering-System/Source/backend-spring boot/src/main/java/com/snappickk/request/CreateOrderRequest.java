package com.snappickk.request;

import com.snappickk.model.Address;
import java.util.*;
import com.snappickk.model.CartItem;
import lombok.Data;

@Data
public class CreateOrderRequest {
 
	private Long restaurantId;
	
	private Address deliveryAddress;


	private String paymentMethod;
	private String paymentStatus;
	private String paymentId;
	private List<CartItem> cartItems;
    
}
