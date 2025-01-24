package com.snappickk.service;

import com.snappickk.Exception.CartException;
import com.snappickk.Exception.CartItemException;
import com.snappickk.Exception.FoodException;
import com.snappickk.Exception.UserException;
import com.snappickk.model.Cart;
import com.snappickk.model.CartItem;
import com.snappickk.request.AddCartItemRequest;

public interface CartSerive {

	public CartItem addItemToCart(AddCartItemRequest req, String jwt) throws UserException, FoodException, CartException, CartItemException;

	public CartItem updateCartItemQuantity(Long cartItemId,int quantity) throws CartItemException;

	public Cart removeItemFromCart(Long cartItemId, String jwt) throws UserException, CartException, CartItemException;

	public Long calculateCartTotals(Cart cart) throws UserException;
	
	public Cart findCartById(Long id) throws CartException;
	
	public Cart findCartByUserId(Long userId) throws CartException, UserException;
	
	public Cart clearCart(Long userId) throws CartException, UserException;
	

	

}
