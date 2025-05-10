package com.snappickk.controller;

import java.util.Date;
import java.util.List;

import com.snappickk.Exception.OrderException;
import com.snappickk.model.RestaurantOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.snappickk.Exception.RestaurantException;
import com.snappickk.Exception.UserException;
import com.snappickk.dto.RestaurantDto;
import com.snappickk.model.Restaurant;
import com.snappickk.model.Users;
import com.snappickk.service.RestaurantService;
import com.snappickk.service.RestaurantOrderService;
import com.snappickk.service.UserService;

@RestController
@RequestMapping("/api/restaurants")
public class RestaurantController {
	
	@Autowired
	private RestaurantService restaurantService;
	
	@Autowired
	private UserService userService;
	@Autowired
	private RestaurantOrderService restaurantOrderService;

	@GetMapping("/search")
	public ResponseEntity<List<Restaurant>> findRestaurantByName(
			@RequestParam String keyword) {
		List<Restaurant> restaurant = restaurantService.searchRestaurant(keyword);

		return ResponseEntity.ok(restaurant);
	}


	@GetMapping()
	public ResponseEntity<List<Restaurant>> getAllRestaurants() {

		List<Restaurant> restaurants = restaurantService.getAllRestaurant();
		
		
		return ResponseEntity.ok(restaurants);
	}
	
	
	@GetMapping("/{id}")
	public ResponseEntity<Restaurant> findRestaurantById(
			@PathVariable Long id) throws RestaurantException {

			Restaurant restaurant = restaurantService.findRestaurantById(id);
			return ResponseEntity.ok(restaurant);

	}
	
	@PutMapping("/{id}/add-favorites")
	public ResponseEntity<RestaurantDto> addToFavorite(
			@RequestHeader("Authorization") String jwt,
			@PathVariable Long id) throws RestaurantException, UserException {
		
			Users user = userService.findUserProfileByJwt(jwt);
			RestaurantDto restaurant = restaurantService.addToFavorites(id, user);
			return ResponseEntity.ok(restaurant);

	}

	
	


}
