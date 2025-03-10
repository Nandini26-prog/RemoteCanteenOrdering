package com.snappickk.controller;

import com.snappickk.model.Users;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import com.snappickk.Exception.UserException;
import com.snappickk.model.PasswordResetToken;
import com.snappickk.request.ResetPasswordRequest;
import com.snappickk.response.ApiResponse;
import com.snappickk.service.PasswordResetTokenService;
import com.snappickk.service.UserService;


public class ResetPasswordController {

    @Autowired
    private PasswordResetTokenService passwordResetTokenService;

    @Autowired
    private UserService userService;

    @PostMapping
    public ResponseEntity<ApiResponse> resetPassword(
    		
    		@RequestBody ResetPasswordRequest req) throws UserException {
        
        PasswordResetToken resetToken = passwordResetTokenService.findByToken(req.getToken());

        if (resetToken == null ) {
        	throw new UserException("token is required...");
        }
        if(resetToken.isExpired()) {
        	passwordResetTokenService.delete(resetToken);
        	throw new UserException("token get expired...");
        
        }

        // Update user's password
        Users users = resetToken.getUsers();
        userService.updatePassword(users, req.getPassword());

        // Delete the token
        passwordResetTokenService.delete(resetToken);
        
        ApiResponse res=new ApiResponse();
        res.setMessage("Password updated successfully.");
        res.setStatus(true);

        return ResponseEntity.ok(res);
    }
    
    @PostMapping("/reset")
    public ResponseEntity<ApiResponse> resetPassword(@RequestParam("email") String email) throws UserException {
        Users users = userService.findUserByEmail(email);
        System.out.println("ResetPasswordController.resetPassword()");

        if (users == null) {
        	throw new UserException("user not found");
        }

        userService.sendPasswordResetEmail(users);

        ApiResponse res=new ApiResponse();
        res.setMessage("Password reset email sent successfully.");
        res.setStatus(true);

        return ResponseEntity.ok(res);
    }
    
}

