package com.clothingstore.clothingstore.repository;

import com.clothingstore.clothingstore.domain.Review;
import com.clothingstore.clothingstore.domain.ReviewImages;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReviewImagesRepository extends JpaRepository<ReviewImages,Long> {

    void deleteAllByReview(Review review);
}
