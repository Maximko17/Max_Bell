package com.clothingstore.clothingstore.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class CaptchaException extends RuntimeException{
    public CaptchaException(String message) {
    super(message);
    }
}
