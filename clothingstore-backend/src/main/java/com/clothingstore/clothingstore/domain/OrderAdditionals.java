package com.clothingstore.clothingstore.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;

@Entity
@Data
public class OrderAdditionals {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long clothesId;
    private String size;
    private Integer count;

    @ManyToOne
    @JsonIgnore
    private CustomerOrder customerOrder;
}
