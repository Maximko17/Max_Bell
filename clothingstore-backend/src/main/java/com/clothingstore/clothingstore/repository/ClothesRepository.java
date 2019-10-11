package com.clothingstore.clothingstore.repository;

import com.clothingstore.clothingstore.domain.Clothes;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;


public interface ClothesRepository extends JpaRepository<Clothes,Long> {
    Page<Clothes> findAll(Pageable pageable);
    Page<Clothes> findByNameContainingOrTypeContainingOrProducerContaining(Pageable pageable,String name,String type,String producer);
    Page<Clothes> findByType(String type, Pageable pageable);
    Page<Clothes> findByEnNameContaining( String enName, Pageable pageable);

    List<Clothes> findTop5ByOrderByTotalLikesDesc();

    @Query("select c.type,sum(c.totalLikes) as total from Clothes c where c.type=:t order by total")
    String findTopClothesTypes(@Param("t") String type);

}
