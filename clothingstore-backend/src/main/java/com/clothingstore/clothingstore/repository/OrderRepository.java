package com.clothingstore.clothingstore.repository;

import com.clothingstore.clothingstore.domain.CustomerOrder;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderRepository extends JpaRepository<CustomerOrder,Long> {

    CustomerOrder findByCustomerAndOrderDetails_Status(String username,String status);

    CustomerOrder findByCustomerAndUniqueId(String username,String uniqueId);

    List<CustomerOrder> findByCustomerAndOrderDetails_StatusNotNull(String username);

    Page<CustomerOrder> findAllByOrderDetails_StatusNotNull(Pageable pageable);

    Page<CustomerOrder> findByOrderDetails_StatusNotNullAndUniqueIdContainingOrOrderDetails_StatusNotNullAndCustomerContaining(Pageable pageable,String uniqId,String customer);
}
