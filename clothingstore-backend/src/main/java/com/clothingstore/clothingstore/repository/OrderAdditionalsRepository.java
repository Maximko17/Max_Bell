package com.clothingstore.clothingstore.repository;

import com.clothingstore.clothingstore.domain.CustomerOrder;
import com.clothingstore.clothingstore.domain.OrderAdditionals;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderAdditionalsRepository extends JpaRepository<OrderAdditionals,Long> {

    void deleteAllByCustomerOrder(CustomerOrder order);

    void deleteAllByClothesId(Long clothesId);
    void deleteByClothesIdAndCustomerOrder(Long id,CustomerOrder order);


}
