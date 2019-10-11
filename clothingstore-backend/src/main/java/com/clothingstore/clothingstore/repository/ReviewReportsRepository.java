package com.clothingstore.clothingstore.repository;

import com.clothingstore.clothingstore.domain.ReviewReports;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReviewReportsRepository extends JpaRepository<ReviewReports,Long> {

    List<ReviewReports> findByClothesIdAndUserName(Long clothesId,String username);
    ReviewReports findByReviewIdAndUserName(Long reviewId,String username);
    void deleteByReviewIdAndUserName(Long reviewId,String username);
}
