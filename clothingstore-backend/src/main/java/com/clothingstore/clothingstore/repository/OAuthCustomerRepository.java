package com.clothingstore.clothingstore.repository;

import com.clothingstore.clothingstore.domain.OAuthCustomer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OAuthCustomerRepository extends JpaRepository<OAuthCustomer,Long> {
    OAuthCustomer findByUsername(String username);
}
