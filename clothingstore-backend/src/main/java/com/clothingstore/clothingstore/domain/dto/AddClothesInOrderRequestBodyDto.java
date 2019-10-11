package com.clothingstore.clothingstore.domain.dto;

import com.clothingstore.clothingstore.domain.Clothes;
import com.clothingstore.clothingstore.domain.OrderAdditionals;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AddClothesInOrderRequestBodyDto {
    private Clothes clothes;
    private OrderAdditionals orderAdditionals;
}
