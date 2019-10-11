package com.clothingstore.clothingstore.domain;

import com.fasterxml.jackson.annotation.JsonAlias;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Data
public class Clothes {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "This field must be required")
    private String name;
    @NotBlank(message = "This field must be required")
    @Column(name="en_name")
    @JsonProperty("en_name")
    private String enName;
    @NotBlank(message = "This field must be required")
    private String type;
    @NotBlank(message = "This field must be required")
    private String producer;
    private Integer popularity;
    @NotNull(message = "This field must be required")
    private Integer price;
    @NotNull(message = "This field must be required")
    private Integer en_price;
    @NotNull(message = "This field must be required")
    private String message;
    @NotNull(message = "This field must be required")
    private String en_message;
    @NotNull(message = "This field must be required")
    private String consist;
    @NotNull(message = "This field must be required")
    private String en_consist;
    @NotNull(message = "This field must be required")
    private Integer worldDelivery;
    @NotNull(message = "This field must be required")
    private Integer en_worldDelivery;
    @NotNull(message = "This field must be required")
    private Integer countryDelivery;
    @NotNull(message = "This field must be required")
    private Integer en_countryDelivery;
    private Integer totalLikes;

    @OneToMany(cascade = CascadeType.ALL,mappedBy = "clothes")
    private List<Images> images = new ArrayList<>();

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "clothes")
    private List<Size> sizes = new ArrayList<>();

    @ManyToMany(cascade = CascadeType.REFRESH, mappedBy = "clothes")
    @JsonIgnore
    private List<CustomerOrder> order = new ArrayList<>();

}
