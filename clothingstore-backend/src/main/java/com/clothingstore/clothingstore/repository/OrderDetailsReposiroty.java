package com.clothingstore.clothingstore.repository;

import com.clothingstore.clothingstore.domain.OrderDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface OrderDetailsReposiroty extends JpaRepository<OrderDetails,Long> {

    @Query(value = "SELECT sum(total_price),DAYOFMONTH(updated),MONTH(updated),YEAR(updated) FROM clothingstore.order_details WHERE DAYOFMONTH(updated) = :days",nativeQuery = true)
    Object findTotalPriceInOneDay(@Param("days") Integer days);

}
