package com.clothingstore.clothingstore.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.time.ZonedDateTime;
import java.util.Collection;
import java.util.Date;

@Entity
@Data
public class Customer implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "This field must be required")
    private String firstName;
    @Email
    @NotBlank(message = "This field must be required")
    private String username;
    private String photo;

    @NotBlank(message = "This field must be required")
    @Size(min = 6,message = "Password must be 6 characters minimum")
    private String password;
    private String gender;

    @Transient
    private String confirmPassword;

    @OneToOne(cascade = CascadeType.ALL,mappedBy = "customer")
    private Authority authority;

    private Date login_time;

//    UserDetails methods
    @Override
    @JsonIgnore
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }

    @Override
    @JsonIgnore
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    @JsonIgnore
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    @JsonIgnore
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    @JsonIgnore
    public boolean isEnabled() {
        return true;
    }
}
