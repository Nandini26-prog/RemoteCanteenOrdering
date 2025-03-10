package com.snappickk.service;

import java.util.List;

import com.snappickk.Exception.UserException;
import com.snappickk.model.Users;

public interface UserService {

	public Users findUserProfileByJwt(String jwt) throws UserException;
	
	public Users findUserByEmail(String email) throws UserException;

	public List<Users> findAllUsers();

	public List<Users> getPenddingRestaurantOwner();

	void updatePassword(Users users, String newPassword);

	void sendPasswordResetEmail(Users users);

}
