package com.clothingstore.clothingstore.exceptions;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
public class CaptchaExceptionResponse {

    private String captcha;
}
