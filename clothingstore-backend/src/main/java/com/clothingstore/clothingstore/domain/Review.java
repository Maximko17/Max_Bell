package com.clothingstore.clothingstore.domain;

import lombok.Data;
import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Data
public class Review {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Title field must be required")
    @Size(max = 50)
    private String title;
    @NotBlank(message = "Text field must be required")
    @Size(max = 250)
    private String text;
    private Byte stars;
    private String userEmail;
    private String userName;
    private String userImage;
    private Long clothesId;
    private Integer totalLikes;
    private Integer totalDislikes;
    private Integer totalReports;

    private Long date;
    @PrePersist
    protected void onCreate(){
        this.date = new Date().getTime();
    }

    @OneToMany(cascade = CascadeType.ALL,fetch=FetchType.EAGER,mappedBy = "review")
    private List<ReviewImages> reviewImages = new ArrayList<>();

}
