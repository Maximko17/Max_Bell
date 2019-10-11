package com.clothingstore.clothingstore.service;

import com.clothingstore.clothingstore.domain.Review;
import com.clothingstore.clothingstore.domain.ReviewLikes;
import com.clothingstore.clothingstore.repository.ReviewLikesRepository;
import com.clothingstore.clothingstore.repository.ReviewRepository;
import com.nimbusds.jose.util.ArrayUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
public class ReviewService {

    @Autowired
    private ReviewRepository reviewRepository;
    @Autowired
    private ImageService imageService;

    public Page<Review> getAllClothesReviews(Long clothesId,Pageable pageable){
        return reviewRepository.findByClothesId(clothesId,pageable );
    }

    public Page<Review> getAllReviewsOrderByTotalReports(Pageable pageable){
        return reviewRepository.findAllByTotalReportsNotOrderByTotalReportsDesc(0,pageable);
    }

    public List<Review> addReview(Review review, MultipartFile[] images){
        if (images.length != 0){
        review.setReviewImages(imageService.saveReviewImage(images,review));
        }
        review.setTotalReports(0);
        review.setTotalDislikes(0);
        review.setTotalLikes(0);

        reviewRepository.save(review);

        return reviewRepository.findTop5ByClothesIdOrderByDateDesc(review.getClothesId());
    }

    @Transactional
    public Review editReview(Review review,MultipartFile[] images){
        Review editedReview = reviewRepository.findById(review.getId()).orElse(null);

        editedReview.setTitle(review.getTitle());
        editedReview.setText(review.getText());
        if (editedReview.getReviewImages().size() != review.getReviewImages().size() || images.length != 0){
            editedReview.setReviewImages(imageService.saveEditedReviewImages(images,editedReview,review));
        }
        reviewRepository.save(editedReview);

        return reviewRepository.findById(editedReview.getId()).orElse(null);
    }

    @Async("processExecutor")
    public void deleteReview(Long id){
        Review review = reviewRepository.findById(id).orElse(null);
        if(review.getReviewImages().size() != 0){
            imageService.deleteReviewsImagesFromAWS(review.getReviewImages());
        }
        reviewRepository.delete(review);
    }
}
