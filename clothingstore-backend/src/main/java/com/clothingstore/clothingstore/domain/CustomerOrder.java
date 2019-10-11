package com.clothingstore.clothingstore.domain;

import lombok.Data;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
public class CustomerOrder {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String uniqueId;
    private String customer;

    @ManyToMany()
    @JoinTable(name="order_clothes",
    joinColumns = @JoinColumn(name="order_id"),
    inverseJoinColumns = @JoinColumn(name="clothes_id"))
    @OrderBy(value = "id ASC")
    private List<Clothes> clothes = new ArrayList<>();

    @OneToOne(cascade = CascadeType.ALL,mappedBy = "customerOrder")
    private OrderDetails orderDetails;

    @OneToMany(cascade = CascadeType.ALL,mappedBy = "customerOrder")
    @OrderBy(value = "clothesId ASC")
    private List<OrderAdditionals> orderAdditionals = new ArrayList<>();

}
