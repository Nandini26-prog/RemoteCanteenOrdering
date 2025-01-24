package com.snappickk.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.snappickk.model.Review;

public interface ReviewRepository extends JpaRepository<Review, Long> {

}
