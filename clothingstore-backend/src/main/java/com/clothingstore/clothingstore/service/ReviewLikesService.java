package com.clothingstore.clothingstore.service;

import com.clothingstore.clothingstore.domain.Review;
import com.clothingstore.clothingstore.domain.ReviewLikes;
import com.clothingstore.clothingstore.repository.ReviewLikesRepository;
import com.clothingstore.clothingstore.repository.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ReviewLikesService {

    @Autowired
    private ReviewLikesRepository reviewLikesRepository;
    @Autowired
    private ReviewRepository reviewRepository;

    public List<ReviewLikes> getAllLikedReviews(Long clothes_id, String username){
        return reviewLikesRepository.findByClothesIdAndUserName(clothes_id,username);
    }

    public ReviewLikes getOneLikedReview(Long reviewId){
        return reviewLikesRepository.findById(reviewId).orElse(null);
    }
    public ReviewLikes addReviewLike(ReviewLikes reviewLikes){
        Review review = reviewRepository.findById(reviewLikes.getReviewId()).orElse(null);
        ReviewLikes saveReviewLike  = reviewLikesRepository.findByUserNameAndReviewId(reviewLikes.getUserName(),reviewLikes.getReviewId());
        if (saveReviewLike == null){
            saveReviewLike = new ReviewLikes();
            saveReviewLike.setLike_dislike(reviewLikes.getLike_dislike());
            saveReviewLike.setUserName(reviewLikes.getUserName());
            saveReviewLike.setClothesId(reviewLikes.getClothesId());
            saveReviewLike.setReviewId(reviewLikes.getReviewId());

            if(reviewLikes.getLike_dislike()){
                review.setTotalLikes(review.getTotalDislikes()+1);
            }else{
                review.setTotalDislikes(review.getTotalDislikes()+1);
            }
            reviewRepository.save(review);
            reviewLikesRepository.save(saveReviewLike);
        }else{
            if (saveReviewLike.getLike_dislike() != reviewLikes.getLike_dislike()) {
                saveReviewLike.setLike_dislike(reviewLikes.getLike_dislike());

                if (reviewLikes.getLike_dislike()){
                    if (review.getTotalDislikes() != 0) {
                        review.setTotalDislikes(review.getTotalDislikes() - 1);
                    }
                    review.setTotalLikes(review.getTotalLikes() + 1);
                }else{
                    if (review.getTotalLikes() != 0) {
                        review.setTotalLikes(review.getTotalLikes() - 1);
                    }
                    review.setTotalDislikes(review.getTotalDislikes() + 1);
                }
                reviewLikesRepository.save(saveReviewLike);
            }else {
                return null;
            }
        }
        return getOneLikedReview(saveReviewLike.getId());
    }

    @Transactional
    @Async("processExecutor")
    public void deleteReviewLikes(Long reviewId){
        reviewLikesRepository.deleteByReviewId(reviewId);
    }

}
