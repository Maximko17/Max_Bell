package com.clothingstore.clothingstore.controller;

import com.clothingstore.clothingstore.domain.Review;
import com.clothingstore.clothingstore.domain.ReviewLikes;
import com.clothingstore.clothingstore.domain.ReviewReports;
import com.clothingstore.clothingstore.service.ReviewLikesService;
import com.clothingstore.clothingstore.service.ReviewReportsService;
import com.clothingstore.clothingstore.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.security.Principal;

@RestController
@CrossOrigin
@RequestMapping("/review")
public class ReviewController {

    @Autowired
    private ReviewService reviewService;
    @Autowired
    private ReviewLikesService reviewLikesService;
    @Autowired
    private ReviewReportsService reviewReportsService;

    @GetMapping("/clothes/{clothes_id}")
    public ResponseEntity<?> getClothesReviews(@PathVariable Long clothes_id,@PageableDefault(sort = "date",direction = Sort.Direction.DESC) Pageable pageable) {
        return new ResponseEntity<>(reviewService.getAllClothesReviews(clothes_id,pageable), HttpStatus.OK);
    }

    @PostMapping(value = "/add", consumes = {"multipart/form-data"})
    public ResponseEntity<?> addNewClothesReview(@Valid @RequestPart("review") Review review, BindingResult result,
                                                 @RequestPart(value = "file", required = false) MultipartFile[] images) {

        ResponseEntity<?> errorMap = new ExceptionMapHandler().exceptionResponse(result);
        if (errorMap != null) return errorMap;

        return new ResponseEntity<>(reviewService.addReview(review, images), HttpStatus.OK);
    }

    @PutMapping(value = "/edit", consumes = {"multipart/form-data"})
    public ResponseEntity<?> editClothesReview(@Valid @RequestPart("review") Review review, BindingResult result,
                                               @RequestPart(value = "file", required = false) MultipartFile[] images){
        ResponseEntity<?> errorMap = new ExceptionMapHandler().exceptionResponse(result);
        if (errorMap != null) return errorMap;

        return new ResponseEntity<>(reviewService.editReview(review, images), HttpStatus.OK);
    }
    @DeleteMapping("/delete/{review_id}")
    public ResponseEntity<?> deleteClothesReviews(@PathVariable Long review_id) {
        reviewService.deleteReview(review_id);
        reviewLikesService.deleteReviewLikes(review_id);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/likes/{clothes_id}")
    public ResponseEntity<?> getReviewsLikes(@PathVariable Long clothes_id, Principal principal) {
        return new ResponseEntity<>( reviewLikesService.getAllLikedReviews(clothes_id, principal.getName()), HttpStatus.OK);
    }

    @PostMapping("/like/add")
    public ResponseEntity<?> addReviewLike(@RequestBody ReviewLikes reviewLikes) {
        return new ResponseEntity<>(reviewLikesService.addReviewLike(reviewLikes), HttpStatus.OK);
    }

    @GetMapping("/reports/{clothes_id}")
    public ResponseEntity<?> getReviewsReports(@PathVariable Long clothes_id, Principal principal) {
        return new ResponseEntity<>( reviewReportsService.getReviewReports(clothes_id, principal.getName()), HttpStatus.OK);
    }

    @PostMapping("/report/add")
    public ResponseEntity<?> addReviewReport(@RequestBody ReviewReports reviewReports,Principal principal) {
        return new ResponseEntity<>(reviewReportsService.addReviewReport(reviewReports,principal.getName()), HttpStatus.OK);
    }

    @GetMapping("/reports/all")
    public ResponseEntity<?> getReviewsReportsDistinct(@PageableDefault(sort = "totalReports",direction = Sort.Direction.DESC) Pageable pageable) {
        return new ResponseEntity<>( reviewService.getAllReviewsOrderByTotalReports(pageable), HttpStatus.OK);
    }
}
