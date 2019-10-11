package com.clothingstore.clothingstore.payload;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
public class LoginRequest {

    @NotBlank(message = "This field must be required")
    private String username;
    @NotBlank(message = "This field must be required")
    private String password;
}
