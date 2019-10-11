package com.clothingstore.clothingstore.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import org.springframework.security.core.GrantedAuthority;

import javax.persistence.*;

@Entity
@Data
public class OAuthAuthority implements GrantedAuthority {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String authority;

    @OneToOne()
    @JoinColumn(name = "oAuthCustomer_id")
    @JsonIgnore
    private OAuthCustomer oAuthCustomer;

    @Override
    public String getAuthority() {
        return authority;
    }
}