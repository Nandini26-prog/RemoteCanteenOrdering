package com.snappickk.service;

import java.util.List;

import com.snappickk.Exception.ReviewException;
import com.snappickk.model.Review;
import com.snappickk.model.Users;
import com.snappickk.request.ReviewRequest;

public interface ReviewSerive {
	
    public Review submitReview(ReviewRequest review, Users users);
    public void deleteReview(Long reviewId) throws ReviewException;
    public double calculateAverageRating(List<Review> reviews);
}
