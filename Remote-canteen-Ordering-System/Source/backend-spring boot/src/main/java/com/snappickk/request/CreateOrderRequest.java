package com.snappickk.request;

import com.snappickk.model.Address;
import java.util.*;
import com.snappickk.model.CartItem;
import lombok.Data;

@Data
public class CreateOrderRequest {
	// Remove single restaurantId, cart will contain items from multiple restaurants

	//private Long restaurantId;
	
	private Address deliveryAddress;


	private String paymentMethod;
	private String paymentStatus;
	private String paymentId;
	//private List<CartItem> cartItems;
	// No need to modify cartItems as they will already have restaurant info through food items

}
