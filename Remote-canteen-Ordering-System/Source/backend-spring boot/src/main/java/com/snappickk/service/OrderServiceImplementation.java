package com.snappickk.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.stripe.exception.StripeException;
import com.snappickk.Exception.CartException;
import com.snappickk.Exception.OrderException;
import com.snappickk.Exception.RestaurantException;
import com.snappickk.Exception.UserException;
import com.snappickk.model.Address;
import com.snappickk.model.Cart;
import com.snappickk.model.CartItem;
import com.snappickk.model.Notification;
import com.snappickk.model.Order;
import com.snappickk.model.OrderItem;
import com.snappickk.model.PaymentResponse;
import com.snappickk.model.Restaurant;
import com.snappickk.model.RestaurantOrder;
import com.snappickk.model.Users;
import com.snappickk.model.RestaurantOrder;
import com.snappickk.repository.AddressRepository;
import com.snappickk.repository.OrderItemRepository;
import com.snappickk.repository.OrderRepository;
import com.snappickk.repository.RestaurantOrderRepository;
import com.snappickk.repository.RestaurantRepository;
import com.snappickk.repository.UserRepository;
import com.snappickk.request.CreateOrderRequest;

@Service
public class OrderServiceImplementation implements OrderService {

	@Autowired
	private AddressRepository addressRepository;

	@Autowired
	private CartSerive cartService;

	@Autowired
	private OrderItemRepository orderItemRepository;

	@Autowired
	private OrderRepository orderRepository;

	@Autowired
	private RestaurantRepository restaurantRepository;

	@Autowired
	private RestaurantOrderRepository restaurantOrderRepository;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private PaymentService paymentSerive;

	@Autowired
	private NotificationService notificationService;

	@Override
	public PaymentResponse createOrder(CreateOrderRequest orderRequest, Users users)
			throws UserException, RestaurantException, CartException, StripeException {

		// Handle delivery address
		Address shippAddress = orderRequest.getDeliveryAddress();
		Address savedAddress = addressRepository.save(shippAddress);

		if(!users.getAddresses().contains(savedAddress)) {
			users.getAddresses().add(savedAddress);
		}
		userRepository.save(users);

		// Create main order
		Order mainOrder = new Order();
		mainOrder.setCustomer(users);
		mainOrder.setDeliveryAddress(savedAddress);
		mainOrder.setCreatedAt(new Date());
		mainOrder.setOrderStatus("PENDING");

		// Get user's cart
		Cart cart = cartService.findCartByUserId(users.getId());

		// Group cart items by restaurant
		Map<Long, List<CartItem>> restaurantItemsMap = new HashMap<>();

		for (CartItem item : cart.getItems()) {
			Long restaurantId = item.getFood().getRestaurant().getId();

			if (!restaurantItemsMap.containsKey(restaurantId)) {
				restaurantItemsMap.put(restaurantId, new ArrayList<>());
			}

			restaurantItemsMap.get(restaurantId).add(item);
		}

		// Process each restaurant's items
		List<OrderItem> allOrderItems = new ArrayList<>();
		List<RestaurantOrder> restaurantOrders = new ArrayList<>();
		Long totalAmount = 0L;

		for (Map.Entry<Long, List<CartItem>> entry : restaurantItemsMap.entrySet()) {
			Long restaurantId = entry.getKey();
			List<CartItem> restaurantItems = entry.getValue();

			// Get restaurant
			Optional<Restaurant> optRestaurant = restaurantRepository.findById(restaurantId);
			if (optRestaurant.isEmpty()) {
				throw new RestaurantException("Restaurant not found with id " + restaurantId);
			}
			Restaurant restaurant = optRestaurant.get();

			// Create restaurant-specific order
			RestaurantOrder restaurantOrder = new RestaurantOrder();
			restaurantOrder.setRestaurant(restaurant);
			restaurantOrder.setOrderStatus("PENDING");
			restaurantOrder.setRestaurantPaymentStatus("PENDING");
			restaurantOrder.setCreatedAt(new Date());

			// Process items for this restaurant
			List<OrderItem> restaurantOrderItems = new ArrayList<>();
			Long subtotal = 0L;

			for (CartItem cartItem : restaurantItems) {
				OrderItem orderItem = new OrderItem();
				orderItem.setFood(cartItem.getFood());
				orderItem.setIngredients(cartItem.getIngredients());
				orderItem.setQuantity(cartItem.getQuantity());
				orderItem.setTotalPrice(cartItem.getFood().getPrice() * cartItem.getQuantity());

				OrderItem savedOrderItem = orderItemRepository.save(orderItem);
				restaurantOrderItems.add(savedOrderItem);
				allOrderItems.add(savedOrderItem);

				subtotal += savedOrderItem.getTotalPrice();
			}

			restaurantOrder.setItems(restaurantOrderItems);
			restaurantOrder.setSubtotalAmount(subtotal);

			totalAmount += subtotal;
			restaurantOrders.add(restaurantOrder);
		}

		// Save main order
		mainOrder.setItems(allOrderItems);
		mainOrder.setTotalAmount(totalAmount);
		mainOrder.setTotalItem(allOrderItems.size());
		mainOrder.setTotalPrice(totalAmount.intValue());
		Order savedMainOrder = orderRepository.save(mainOrder);

		// Save restaurant orders with reference to main order
		for (RestaurantOrder ro : restaurantOrders) {
			ro.setParentOrder(savedMainOrder);
			RestaurantOrder savedRo = restaurantOrderRepository.save(ro);

			// Add to restaurant's orders list
			Restaurant restaurant = ro.getRestaurant();
			restaurant.getRestaurantOrders().add(savedRo);
			restaurantRepository.save(restaurant);
		}

		// Clear the cart after successful order creation
		cartService.clearCart(cart.getId());

		// Generate payment link for the complete order
		PaymentResponse res = paymentSerive.generatePaymentLink(savedMainOrder);
		return res;
	}

	@Override
	public void cancelOrder(Long orderId) throws OrderException {
		Order order = findOrderById(orderId);

		// First delete all associated restaurant orders
		List<RestaurantOrder> restaurantOrders = restaurantOrderRepository.findByParentOrderId(orderId);
		for (RestaurantOrder ro : restaurantOrders) {
			restaurantOrderRepository.delete(ro);
		}

		// Then delete the main order
		orderRepository.delete(order);
	}

	@Override
	public Order findOrderById(Long orderId) throws OrderException {
		Optional<Order> order = orderRepository.findById(orderId);
		if(order.isPresent()) return order.get();

		throw new OrderException("Order not found with the id " + orderId);
	}

	@Override
	public List<Order> getUserOrders(Long userId) throws OrderException {
		List<Order> orders = orderRepository.findAllUserOrders(userId);
		return orders;
	}

	@Override
	public Order updateOrder(Long orderId, String orderStatus) throws OrderException {
		Order order = findOrderById(orderId);

		if(orderStatus.equals("OUT_FOR_DELIVERY") || orderStatus.equals("DELIVERED")
				|| orderStatus.equals("COMPLETED") || orderStatus.equals("PENDING")) {
			order.setOrderStatus(orderStatus);

			// Update status for all associated restaurant orders
			List<RestaurantOrder> restaurantOrders = restaurantOrderRepository.findByParentOrderId(orderId);
			for (RestaurantOrder ro : restaurantOrders) {
				ro.setOrderStatus(orderStatus);
				restaurantOrderRepository.save(ro);
			}

			// Send notification
			Notification notification = notificationService.sendOrderStatusNotification(order);
			return orderRepository.save(order);
		}
		else throw new OrderException("Please Select A Valid Order Status");
	}
}



// package com.snappickk.service;
//
//import java.util.ArrayList;
//import java.util.Date;
//import java.util.List;
//import java.util.Optional;
//import java.util.stream.Collectors;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//import com.stripe.exception.StripeException;
//import com.snappickk.Exception.CartException;
//import com.snappickk.Exception.OrderException;
//import com.snappickk.Exception.RestaurantException;
//import com.snappickk.Exception.UserException;
//import com.snappickk.model.Address;
//import com.snappickk.model.Cart;
//import com.snappickk.model.CartItem;
//import com.snappickk.model.Notification;
//import com.snappickk.model.Order;
//import com.snappickk.model.OrderItem;
//import com.snappickk.model.PaymentResponse;
//import com.snappickk.model.Restaurant;
//import com.snappickk.model.Users;
//import com.snappickk.repository.AddressRepository;
//import com.snappickk.repository.OrderItemRepository;
//import com.snappickk.repository.OrderRepository;
//import com.snappickk.repository.RestaurantRepository;
//import com.snappickk.repository.UserRepository;
//import com.snappickk.request.CreateOrderRequest;
//@Service
//public class OrderServiceImplementation implements OrderService {
//
//	@Autowired
//	private AddressRepository addressRepository;
//	@Autowired
//	private CartSerive cartService;
//	@Autowired
//	private OrderItemRepository orderItemRepository;
//	@Autowired
//	private OrderRepository orderRepository;
//	@Autowired
//	private RestaurantRepository restaurantRepository;
//
//	@Autowired
//	private UserRepository userRepository;
//
//	@Autowired
//	private PaymentService paymentSerive;
//
//	@Autowired
//	private NotificationService notificationService;
//
//
//
//
//	@Override
//	public PaymentResponse createOrder(CreateOrderRequest order, Users users) throws UserException, RestaurantException, CartException, StripeException {
//
//	    Address shippAddress = order.getDeliveryAddress();
//
//
//	    Address savedAddress = addressRepository.save(shippAddress);
//
//	    if(!users.getAddresses().contains(savedAddress)) {
//	    	users.getAddresses().add(savedAddress);
//	    }
//
//
//		System.out.println("user addresses --------------  "+users.getAddresses());
//
//		 userRepository.save(users);
//
//	    Optional<Restaurant> restaurant = restaurantRepository.findById(order.getRestaurantId());
//	    if(restaurant.isEmpty()) {
//	    	throw new RestaurantException("Restaurant not found with id "+order.getRestaurantId());
//	    }
//
//	    Order createdOrder = new Order();
//
//	    createdOrder.setCustomer(users);
//	    createdOrder.setDeliveryAddress(savedAddress);
//	    createdOrder.setCreatedAt(new Date());
//	    createdOrder.setOrderStatus("PENDING");
//	    createdOrder.setRestaurant(restaurant.get());
//
//        Cart cart = cartService.findCartByUserId(users.getId());
//
//	    List<OrderItem> orderItems = new ArrayList<>();
//
//	    for (CartItem cartItem : cart.getItems()) {
//	        OrderItem orderItem = new OrderItem();
//	       orderItem.setFood(cartItem.getFood());
//	       orderItem.setIngredients(cartItem.getIngredients());
//	       orderItem.setQuantity(cartItem.getQuantity());
//	        orderItem.setTotalPrice(cartItem.getFood().getPrice()* cartItem.getQuantity());
//
//	        OrderItem savedOrderItem = orderItemRepository.save(orderItem);
//	        orderItems.add(savedOrderItem);
//	    }
//
//	     Long totalPrice = cartService.calculateCartTotals(cart);
//
//	    createdOrder.setTotalAmount(totalPrice);
//	    createdOrder.setRestaurant(restaurant.get());
//
//	    createdOrder.setItems(orderItems);
//	    Order savedOrder = orderRepository.save(createdOrder);
//
//	   restaurant.get().getOrders().add(savedOrder);
//
//	   restaurantRepository.save(restaurant.get());
//
//
//
//	   PaymentResponse res=paymentSerive.generatePaymentLink(savedOrder);
//	   return res;
//
//	}
//
////	@Override
////	public PaymentResponse createOrder(CreateOrderRequest order, Users users) throws UserException, RestaurantException, CartException, StripeException {
////		// Validate and save delivery address
////		Address shippAddress = order.getDeliveryAddress();
////		Address savedAddress = addressRepository.save(shippAddress);
////
////		// Add address to user if not already present
////		if (!users.getAddresses().contains(savedAddress)) {
////			users.getAddresses().add(savedAddress);
////			userRepository.save(users);
////		}
////
////		// Validate restaurant
////		Restaurant restaurant = restaurantRepository.findById(order.getRestaurantId())
////				.orElseThrow(() -> new RestaurantException("Restaurant not found with id " + order.getRestaurantId()));
////
////		// Create new order
////		Order createdOrder = new Order();
////		createdOrder.setCustomer(users);
////		createdOrder.setDeliveryAddress(savedAddress);
////		createdOrder.setCreatedAt(new Date());
////		createdOrder.setOrderStatus("PENDING");
////		createdOrder.setRestaurant(restaurant);
////
////		// Set payment-related details
////		createdOrder.setPaymentMethod(order.getPaymentMethod());
////		createdOrder.setPaymentStatus(order.getPaymentStatus());
////		createdOrder.setPaymentId(order.getPaymentId());
////
////		// Create order items from provided cart items
////		List<OrderItem> orderItems = order.getCartItems().stream()
////				.map(cartItem -> {
////					OrderItem orderItem = new OrderItem();
////					orderItem.setFood(cartItem.getFood());
////					orderItem.setQuantity(cartItem.getQuantity());
////					orderItem.setTotalPrice(cartItem.getFood().getPrice() * cartItem.getQuantity());
////					orderItem.setOrder(createdOrder);
////					return orderItemRepository.save(orderItem);
////				})
////				.collect(Collectors.toList());
////
////		// Calculate and set total amount
////		Long totalPrice = orderItems.stream()
////				.mapToLong(OrderItem::getTotalPrice)
////				.sum();
////		createdOrder.setTotalAmount(totalPrice);
////		createdOrder.setItems(orderItems);
////
////		// Save order and update restaurant
////		Order savedOrder = orderRepository.save(createdOrder);
////		restaurant.getOrders().add(savedOrder);
////		restaurantRepository.save(restaurant);
////
////		// Generate payment link
////		return paymentSerive.generatePaymentLink(savedOrder);
////	}
//
//	@Override
//	public void cancelOrder(Long orderId) throws OrderException {
//           Order order =findOrderById(orderId);
//           if(order==null) {
//        	   throw new OrderException("Order not found with the id "+orderId);
//           }
//
//		    orderRepository.deleteById(orderId);
//
//	}
//
//	public Order findOrderById(Long orderId) throws OrderException {
//		Optional<Order> order = orderRepository.findById(orderId);
//		if(order.isPresent()) return order.get();
//
//		throw new OrderException("Order not found with the id "+orderId);
//	}
//
//	@Override
//	public List<Order> getUserOrders(Long userId) throws OrderException {
//		List<Order> orders=orderRepository.findAllUserOrders(userId);
//		return orders;
//	}
//
//	@Override
//	public List<Order> getOrdersOfRestaurant(Long restaurantId,String orderStatus) throws OrderException, RestaurantException {
//
//			List<Order> orders = orderRepository.findOrdersByRestaurantId(restaurantId);
//
//			if(orderStatus!=null) {
//				orders = orders.stream()
//						.filter(order->order.getOrderStatus().equals(orderStatus))
//						.collect(Collectors.toList());
//			}
//
//			return orders;
//	}
////    private List<MenuItem> filterByVegetarian(List<MenuItem> menuItems, boolean isVegetarian) {
////    return menuItems.stream()
////            .filter(menuItem -> menuItem.isVegetarian() == isVegetarian)
////            .collect(Collectors.toList());
////}
//
//
//
//	@Override
//	public Order updateOrder(Long orderId, String orderStatus) throws OrderException {
//		Order order=findOrderById(orderId);
//
//		System.out.println("--------- "+orderStatus);
//
//		if(orderStatus.equals("OUT_FOR_DELIVERY") || orderStatus.equals("DELIVERED")
//				|| orderStatus.equals("COMPLETED") || orderStatus.equals("PENDING")) {
//			order.setOrderStatus(orderStatus);
//			Notification notification=notificationService.sendOrderStatusNotification(order);
//			return orderRepository.save(order);
//		}
//		else throw new OrderException("Please Select A Valid Order Status");
//
//
//	}
//
//
//
//}
