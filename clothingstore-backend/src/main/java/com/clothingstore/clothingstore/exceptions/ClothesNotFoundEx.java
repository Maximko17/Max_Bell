package com.clothingstore.clothingstore.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class ClothesNotFoundEx extends RuntimeException{
    public ClothesNotFoundEx(String message) {
        super(message);
    }
}
