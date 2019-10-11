package com.clothingstore.clothingstore.domain.dto;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Transient;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Getter
@Setter
public class UpdatedCustomerDto {

    private Long id;

    @NotBlank(message = "This field must be required")
    private String firstName;
    private String prevUsername;
    @Email
    @NotBlank(message = "This field must be required")
    private String username;
    private String photo;
    private String gender;

    private String prevPassword;
    private String newPassword;
    private String confirmPassword;

}
