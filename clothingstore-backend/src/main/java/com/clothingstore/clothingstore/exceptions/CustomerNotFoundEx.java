package com.clothingstore.clothingstore.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class CustomerNotFoundEx extends RuntimeException{
    public CustomerNotFoundEx(String message) {
        super(message);
    }
}
