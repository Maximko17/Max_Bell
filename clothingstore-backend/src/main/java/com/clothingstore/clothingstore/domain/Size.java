package com.clothingstore.clothingstore.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Data
public class Size {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String sizeName;
    private Integer remaining;

    @ManyToOne()
    @JsonIgnore
    private Clothes clothes;

}
