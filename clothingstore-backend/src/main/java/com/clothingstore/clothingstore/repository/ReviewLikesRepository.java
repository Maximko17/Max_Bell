package com.clothingstore.clothingstore.repository;

import com.clothingstore.clothingstore.domain.ReviewLikes;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReviewLikesRepository extends JpaRepository<ReviewLikes,Long> {

    List<ReviewLikes> findByClothesIdAndUserName(Long clothesId,String username);
    ReviewLikes findByUserNameAndReviewId(String username,Long reviewId);
    void deleteByReviewId(Long reviewId);
}
