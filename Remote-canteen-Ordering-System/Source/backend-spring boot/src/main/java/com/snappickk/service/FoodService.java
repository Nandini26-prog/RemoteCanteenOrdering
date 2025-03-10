package com.snappickk.service;

import java.util.List;

import com.snappickk.Exception.FoodException;
import com.snappickk.Exception.RestaurantException;
import com.snappickk.model.Category;
import com.snappickk.model.Food;
import com.snappickk.model.Restaurant;
import com.snappickk.request.CreateFoodRequest;

public interface FoodService {

	public Food createFood(CreateFoodRequest req,Category category,
						   Restaurant restaurant) throws FoodException, RestaurantException;

	void deleteFood(Long foodId) throws FoodException;
	
	public List<Food> getRestaurantsFood(Long restaurantId,
			boolean isVegetarian, boolean isNonveg, boolean isSeasonal,String foodCategory) throws FoodException;
	
	public List<Food> searchFood(String keyword);
	
	public Food findFoodById(Long foodId) throws FoodException;

	public Food updateAvailibilityStatus(Long foodId) throws FoodException;
}
