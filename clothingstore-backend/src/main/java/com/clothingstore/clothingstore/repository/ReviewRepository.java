package com.clothingstore.clothingstore.repository;

import com.clothingstore.clothingstore.domain.Review;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface ReviewRepository extends JpaRepository<Review,Long> {

    Page<Review> findByClothesId(Long clothesId,Pageable pageable);

    List<Review> findTop5ByClothesIdOrderByDateDesc(Long clothesId);

    Page<Review> findAllByTotalReportsNotOrderByTotalReportsDesc(Integer totalReports,Pageable pageable);
}
