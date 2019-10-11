package com.clothingstore.clothingstore.domain;

import lombok.Data;
import javax.persistence.*;

@Entity
@Data
public class ReviewLikes {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Boolean like_dislike;
    private Long clothesId;
    private String userName;
    private Long reviewId;
}
