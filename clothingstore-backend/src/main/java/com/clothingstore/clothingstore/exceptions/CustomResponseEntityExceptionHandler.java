package com.clothingstore.clothingstore.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;

@ControllerAdvice
@RestController
public class CustomResponseEntityExceptionHandler {

    @ExceptionHandler(CustomerNotFoundEx.class)
    public ResponseEntity<?> notFoundEx(CustomerNotFoundEx ex){
        CustomerExceptionResponse response = new CustomerExceptionResponse(ex.getMessage());
        return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(ClothesNotFoundEx.class)
    public ResponseEntity<?> notFoundEx(ClothesNotFoundEx ex){
        ClothesExceptionResponse response = new ClothesExceptionResponse(ex.getMessage());
        return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(CaptchaException.class)
    public ResponseEntity<?> badCaptchaStatus(Exception ex){
        CaptchaExceptionResponse response = new CaptchaExceptionResponse(ex.getMessage());
        return new ResponseEntity<>(response,HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(WrongPrevPassword.class)
    public ResponseEntity<?> badPrevPassword(Exception ex){
        WrongPrevPasswordResponse response = new WrongPrevPasswordResponse(ex.getMessage());
        return new ResponseEntity<>(response,HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(MaxUploadFileSizeEx.class)
    public ResponseEntity<?> uploadFileSizeEx(Exception ex){
        MaxUploadFileSizeExResponse response = new MaxUploadFileSizeExResponse(ex.getMessage());
        return new ResponseEntity<>(response,HttpStatus.BAD_REQUEST);
    }


    @ExceptionHandler()
    public ResponseEntity<?> badRequest(Exception ex){
        CustomerExceptionResponse response = new CustomerExceptionResponse(ex.getMessage());
        return new ResponseEntity<>(response,HttpStatus.BAD_REQUEST);
    }

}
