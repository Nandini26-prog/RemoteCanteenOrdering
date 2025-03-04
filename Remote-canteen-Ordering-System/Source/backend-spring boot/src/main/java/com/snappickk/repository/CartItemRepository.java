package com.snappickk.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.snappickk.model.CartItem;
import java.util.List;
public interface CartItemRepository extends JpaRepository<CartItem, Long> {

    List<CartItem> findByCartIdAndFoodIdAndIngredients(Long cartId, Long foodId, List<String> ingredients);
//    CartItem findByFoodIsContaining

}
