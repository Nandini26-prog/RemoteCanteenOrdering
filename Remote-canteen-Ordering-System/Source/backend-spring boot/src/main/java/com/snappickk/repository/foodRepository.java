package com.snappickk.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.snappickk.model.Food;

public interface foodRepository extends JpaRepository<Food, Long> {

	
//	List<Food> findByRestaurantId(Long restaurantId);
//
//	@Query("SELECT f FROM Food f WHERE " +
//			"(LOWER(f.name) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
//			"LOWER(f.foodCategory.name) LIKE LOWER(CONCAT('%', :keyword, '%'))) AND " +
//			"f.restaurant IS NOT NULL")
//	//List<Food> searchByNameOrCategory(@Param("keyword") String keyword);
//
//
//	List<Food> findByNameContainingIgnoreCaseOrFoodCategoryNameContainingIgnoreCase(String name, String categoryName);

	List<Food> findByRestaurantId(Long restaurantId);

	// Comprehensive search method with multiple search criteria
//	@Query("SELECT DISTINCT f FROM Food f " +
//			"LEFT JOIN f.foodCategory fc " +
//			"WHERE (" +
//			"   LOWER(f.name) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
//			"   LOWER(fc.name) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
//			"   LOWER(f.description) LIKE LOWER(CONCAT('%', :keyword, '%'))" +
//			") AND f.restaurant IS NOT NULL")
//	List<Food> searchByNameOrCategoryOrDescription(@Param("keyword") String keyword);

	// Comprehensive search method with multiple search criteria


	@Query(value = "SELECT DISTINCT f.* FROM food f " +
			"LEFT JOIN category c ON f.food_category_id = c.id " +
			"WHERE LOWER(f.name) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
			"LOWER(c.name) LIKE LOWER(CONCAT('%', :keyword, '%'))",
			nativeQuery = true)
	List<Food> searchByNameOrCategoryOrDescription(@Param("keyword") String keyword);


//	@Query("SELECT DISTINCT f FROM Food f " +
//			"LEFT JOIN f.foodCategory fc " +
//			"WHERE (" +
//			"   LOWER(f.name) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
//			"   LOWER(fc.name) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
//			"   LOWER(f.description) LIKE LOWER(CONCAT('%', :keyword, '%'))" +
//			") AND f.restaurant IS NOT NULL")
//	List<Food> searchByNameOrCategoryOrDescription(@Param("keyword") String keyword);

}
