package com.snappickk.service;

import java.util.Collections;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.snappickk.Exception.CartException;
import com.snappickk.Exception.CartItemException;
import com.snappickk.Exception.FoodException;
import com.snappickk.Exception.UserException;
import com.snappickk.model.Cart;
import com.snappickk.model.CartItem;
import com.snappickk.model.Food;
import com.snappickk.model.Users;
import com.snappickk.repository.CartItemRepository;
import com.snappickk.repository.CartRepository;
import com.snappickk.repository.foodRepository;
import com.snappickk.request.AddCartItemRequest;
import java.util.List;
//import java.util.stream.Collectors;

@Service

public class CartServiceImplementation implements CartSerive {
	@Autowired
	private CartRepository cartRepository;
	@Autowired
	private UserService userService;
	@Autowired
	private CartItemRepository cartItemRepository;
	@Autowired
	private foodRepository menuItemRepository;

//public class CartServiceImplementation implements CartSerive {
//	@Autowired
//	private CartRepository cartRepository;
//	@Autowired
//	private UserService userService;
//	@Autowired
//	private CartItemRepository cartItemRepository;
//	@Autowired
//	private foodRepository menuItemRepository;

//	@Override
//	public CartItem addItemToCart(AddCartItemRequest req, String jwt) throws UserException, FoodException, CartException, CartItemException {
//
//		Users users = userService.findUserProfileByJwt(jwt);
//
//		Optional<Food> menuItem=menuItemRepository.findById(req.getMenuItemId());
//		if(menuItem.isEmpty()) {
//			throw new FoodException("Menu Item not exist with id "+req.getMenuItemId());
//		}
//
//		Cart cart = findCartByUserId(users.getId());
//
//		for (CartItem cartItem : cart.getItems()) {
//			if (cartItem.getFood().equals(menuItem.get())) {
//
//				int newQuantity = cartItem.getQuantity() + req.getQuantity();
//				return updateCartItemQuantity(cartItem.getId(),newQuantity);
//			}
//		}
//
//		CartItem newCartItem = new CartItem();
//		newCartItem.setFood(menuItem.get());
//		newCartItem.setQuantity(req.getQuantity());
//		newCartItem.setCart(cart);
//		newCartItem.setIngredients(req.getIngredients());
//		newCartItem.setTotalPrice(req.getQuantity()*menuItem.get().getPrice());
//
//		CartItem savedItem=cartItemRepository.save(newCartItem);
//		cart.getItems().add(savedItem);
//		cartRepository.save(cart);
//
//		return savedItem;
//
//	}
@Override
public CartItem addItemToCart(AddCartItemRequest req, String jwt) throws UserException, FoodException, CartException, CartItemException {

	Users users = userService.findUserProfileByJwt(jwt);

	Optional<Food> menuItem=menuItemRepository.findById(req.getMenuItemId());
	if(menuItem.isEmpty()) {
		throw new FoodException("Menu Item not exist with id "+req.getMenuItemId());
	}

	Cart cart = findCartByUserId(users.getId());

	List<String> sortedIngredients = req.getIngredients();
	Collections.sort(sortedIngredients);

	List<CartItem> existingCartItem = cartItemRepository.findByCartIdAndFoodIdAndIngredients(cart.getId(), menuItem.get().getId(), sortedIngredients);
	if(!existingCartItem.isEmpty()) {
		CartItem cartItem = existingCartItem.get(0);
		int newQuantity = cartItem.getQuantity() + req.getQuantity();
		return updateCartItemQuantity(cartItem.getId(), newQuantity);
	}

	CartItem newCartItem = new CartItem();
	newCartItem.setFood(menuItem.get());
	newCartItem.setQuantity(req.getQuantity());
	newCartItem.setCart(cart);
	newCartItem.setIngredients(req.getIngredients());
	newCartItem.setTotalPrice(req.getQuantity() * menuItem.get().getPrice());

	CartItem savedItem = cartItemRepository.save(newCartItem);
	cart.getItems().add(savedItem);
	cartRepository.save(cart);

	return savedItem;
}



@Override
	public CartItem updateCartItemQuantity(Long cartItemId,int quantity) throws CartItemException {
		Optional<CartItem> cartItem=cartItemRepository.findById(cartItemId);
		if(cartItem.isEmpty()) {
			throw new CartItemException("cart item not exist with id "+cartItemId);
		}
		cartItem.get().setQuantity(quantity);
		cartItem.get().setTotalPrice((cartItem.get().getFood().getPrice()*quantity));
		return cartItemRepository.save(cartItem.get());
	}

	@Override
	public Cart removeItemFromCart(Long cartItemId, String jwt) throws UserException,
	CartException, CartItemException {

		Users users = userService.findUserProfileByJwt(jwt);

		Cart cart = findCartByUserId(users.getId());

		Optional<CartItem> cartItem=cartItemRepository.findById(cartItemId);

		if(cartItem.isEmpty()) {
			throw new CartItemException("cart item not exist with id "+cartItemId);
		}

		cart.getItems().remove(cartItem.get());
		return cartRepository.save(cart);
	}

	@Override
	public Long calculateCartTotals(Cart cart) throws UserException {

		Long total = 0L;
		for (CartItem cartItem : cart.getItems()) {
			total += cartItem.getFood().getPrice() * cartItem.getQuantity();
		}
		return total;
	}

	@Override
	public Cart findCartById(Long id) throws CartException {
		Optional<Cart> cart = cartRepository.findById(id);
		if(cart.isPresent()) {
			return cart.get();
		}
		throw new CartException("Cart not found with the id "+id);
	}

	@Override
	public Cart findCartByUserId(Long userId) throws CartException, UserException {

		Optional<Cart> opt=cartRepository.findByCustomer_Id(userId);

		if(opt.isPresent()) {
			return opt.get();
		}
		throw new CartException("cart not found");

	}

	@Override
	public Cart clearCart(Long userId) throws CartException, UserException {
		Cart cart=findCartByUserId(userId);

		cart.getItems().clear();
		return cartRepository.save(cart);
	}



}
