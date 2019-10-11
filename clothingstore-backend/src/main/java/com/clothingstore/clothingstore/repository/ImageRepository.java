package com.clothingstore.clothingstore.repository;

import com.clothingstore.clothingstore.domain.Clothes;
import com.clothingstore.clothingstore.domain.Images;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ImageRepository extends JpaRepository<Images,Long> {

    List<Images> findByClothes(Clothes clothes);
}
