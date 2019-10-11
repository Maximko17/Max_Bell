package com.clothingstore.clothingstore.domain;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import java.time.ZonedDateTime;
import java.util.Date;

@Entity
@Data
public class OrderDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "This field must be required")
    private String country;
    @NotBlank(message = "This field must be required")
    private String city;
    @NotBlank(message = "This field must be required")
    private String fio;
    @NotBlank(message = "This field must be required")
    private String address;
    @NotBlank(message = "This field must be required")
    private String postcode;
    @NotBlank(message = "This field must be required")
    private String phoneNumber;
    @NotBlank(message = "This field must be required")
    @Email
    private String email;
    private String orderWishes;
    private Integer totalPrice;
    private Integer totalPriceUSD;
    private String status;

    @JsonFormat(pattern = "yyyy-MM-dd | HH:mm:ss")
    private ZonedDateTime updated;

    @PreUpdate
    protected void onUpdate(){
        this.updated = ZonedDateTime.now();
    }

    @OneToOne
    @JsonIgnore
    @JoinColumn(name = "order_id")
    private CustomerOrder customerOrder;
}
