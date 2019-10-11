package com.clothingstore.clothingstore.repository;

import com.clothingstore.clothingstore.domain.Customer;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;


public interface CustomerRepository extends JpaRepository<Customer,Long> {
    Customer findByUsername(String username);

    Page<Customer> findAll(Pageable pageable);
    Page<Customer> findByFirstNameContainingOrUsernameContaining(Pageable pageable,String customer_name,String customer_email);

    @Query(value = "SELECT count(*) FROM clothingstore.customer where WEEKDAY(login_time) =:weekday and login_time >= DATE(NOW()) - INTERVAL 7 DAY",nativeQuery = true)
    Integer findOnlineInOneWeek(@Param("weekday") Integer weekday);
}
