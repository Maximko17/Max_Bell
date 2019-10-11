package com.clothingstore.clothingstore.repository;

import com.clothingstore.clothingstore.domain.Size;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SizeRepository extends JpaRepository<Size,Long> {

    List<Size> findAllByClothes_Id(Long id);
}
