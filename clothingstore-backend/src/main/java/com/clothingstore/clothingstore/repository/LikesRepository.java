package com.clothingstore.clothingstore.repository;

import com.clothingstore.clothingstore.domain.Likes;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LikesRepository extends JpaRepository<Likes,Long> {
    List<Likes> findAllByCustomerId(Long customerId);
    void deleteByCustomerIdAndClothesId(Long customerId,Long clothesId);

}
