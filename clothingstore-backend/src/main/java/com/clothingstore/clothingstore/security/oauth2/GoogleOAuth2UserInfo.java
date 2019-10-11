package com.clothingstore.clothingstore.security.oauth2;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class GoogleOAuth2UserInfo {

    private String name;
    private String email;
    private String authority;
    private String imageUrl;
    private String providerId;
    private Boolean isOauthCustomer;

}
