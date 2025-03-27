package com.snappickk.controller;

import java.util.List;

import com.snappickk.repository.NotificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.snappickk.Exception.UserException;
import com.snappickk.model.Notification;
import com.snappickk.model.Users;
import com.snappickk.service.NotificationService;
import com.snappickk.service.UserService;

@RestController
@RequestMapping("/api")
public class NotificationController {

	@Autowired
	private NotificationService notificationSerivce;
	@Autowired
	private UserService userService;
	@Autowired
	private NotificationRepository notificationRepository;

	@GetMapping("/notifications")
	public ResponseEntity<List<Notification>> findUsersNotification(
			@RequestHeader("Authorization") String jwt) throws UserException{
		Users user =userService.findUserProfileByJwt(jwt);

		List<Notification> notifications=notificationSerivce.findUsersNotification(user.getId());
		return new ResponseEntity<List<Notification>>(notifications,HttpStatus.ACCEPTED);
	}
	@PutMapping("/notifications/{notificationId}/read")
	public ResponseEntity<Notification> markNotificationAsRead(
			@PathVariable Long notificationId,
			@RequestHeader("Authorization") String jwt
	) throws Exception {
		Users user = userService.findUserProfileByJwt(jwt);

		// Find the specific notification
		Notification notification = notificationRepository.findById(notificationId)
				.orElseThrow(() -> new Exception("Notification not found"));

		// Ensure the notification belongs to the user
		if (!notification.getCustomer().getId().equals(user.getId())) {
			throw new Exception("You are not authorized to modify this notification");
		}

		// Toggle read status
		notification.setReadStatus(!notification.isReadStatus());

		// Save the updated notification
		Notification updatedNotification = notificationRepository.save(notification);

		return ResponseEntity.ok(updatedNotification);
	}

}
//
//
//package com.snappickk.controller;
//
//import java.util.List;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.RequestHeader;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//import com.snappickk.Exception.UserException;
//import com.snappickk.model.Notification;
//import com.snappickk.model.Users;
//import com.snappickk.service.NotificationService;
//import com.snappickk.service.UserService;
//
//@RestController
//@RequestMapping("/api")
//public class NotificationController {
//
//    @Autowired
//    private NotificationService notificationSerivce;
//    @Autowired
//    private UserService userService;
//
//    @GetMapping("/notifications")
//    public ResponseEntity<List<Notification>> findUsersNotification(
//            @RequestHeader(value = "Authorization", required = false) String jwt) throws UserException {
//
//        if (jwt == null || jwt.isEmpty()) {
//            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
//        }
//
//        try {
//            Users user = userService.findUserProfileByJwt(jwt);
//            List<Notification> notifications = notificationSerivce.findUsersNotification(user.getId());
//            return new ResponseEntity<>(notifications, HttpStatus.OK);
//        } catch (UserException e) {
//            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
//        }
//    }
//}

//package com.snappickk.controller;
//
//import java.util.List;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.security.core.Authentication;
//import org.springframework.security.core.context.SecurityContextHolder;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//import com.snappickk.Exception.UserException;
//import com.snappickk.model.Notification;
//import com.snappickk.model.Users;
//import com.snappickk.service.NotificationService;
//import com.snappickk.service.UserService;
//
//@RestController
//@RequestMapping("/api")
//public class NotificationController {
//
//    @Autowired
//    private NotificationService notificationService;
//
//    @Autowired
//    private UserService userService;
//
//    @GetMapping("/notifications")
//    public ResponseEntity<List<Notification>> findUsersNotification() {
//        try {
//            // Get the current authenticated user
//            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//            String email = authentication.getName();
//
//            // Find the user by email
//            Users user = userService.findUserByEmail(email);
//
//            if (user == null) {
//                return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
//            }
//
//            // Get notifications for the user
//            List<Notification> notifications = notificationService.findUsersNotification(user.getId());
//            return new ResponseEntity<>(notifications, HttpStatus.OK);
//
//        } catch (Exception e) {
//            e.printStackTrace();
//            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
//        }
//    }
//}