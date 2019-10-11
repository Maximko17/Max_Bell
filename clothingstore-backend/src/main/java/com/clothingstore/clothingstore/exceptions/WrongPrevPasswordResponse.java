package com.clothingstore.clothingstore.exceptions;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class WrongPrevPasswordResponse {

    private String prevPassword;
}
