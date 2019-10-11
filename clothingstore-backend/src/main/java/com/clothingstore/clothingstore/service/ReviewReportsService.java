package com.clothingstore.clothingstore.service;

import com.clothingstore.clothingstore.domain.Review;
import com.clothingstore.clothingstore.domain.ReviewReports;
import com.clothingstore.clothingstore.repository.ReviewReportsRepository;
import com.clothingstore.clothingstore.repository.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ReviewReportsService {

    @Autowired
    private ReviewReportsRepository reviewReportsRepository;
    @Autowired
    private ReviewRepository reviewRepository;

    public List<ReviewReports> getReviewReports(Long clothesId, String username) {
        return reviewReportsRepository.findByClothesIdAndUserName(clothesId, username);
    }

    @Transactional
    public List<ReviewReports> addReviewReport(ReviewReports reviewReports, String currentUser) {
        Review review = reviewRepository.findById(reviewReports.getReviewId()).orElse(null);

        if (reviewReportsRepository.findByReviewIdAndUserName(reviewReports.getReviewId(), currentUser) != null) {
            reviewReportsRepository.deleteByReviewIdAndUserName(reviewReports.getReviewId(), reviewReports.getUserName());
            review.setTotalReports(review.getTotalReports() - 1);
            reviewRepository.save(review);

        } else {
            reviewReportsRepository.save(reviewReports);
            review.setTotalReports(review.getTotalReports() + 1);
            reviewRepository.save(review);
        }

        return getReviewReports(reviewReports.getClothesId(), reviewReports.getUserName());
    }

}
