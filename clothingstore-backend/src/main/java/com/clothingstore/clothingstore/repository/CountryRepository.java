package com.clothingstore.clothingstore.repository;


import com.clothingstore.clothingstore.domain.Country;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CountryRepository extends JpaRepository<Country,Long> {

    @Query("select c.ruName from Country c")
    List<Country> getAllRuName();

    @Query("select c.enName from Country c")
    List<Country> getAllEnName();
}
