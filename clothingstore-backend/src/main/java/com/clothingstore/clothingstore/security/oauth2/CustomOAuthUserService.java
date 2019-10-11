package com.clothingstore.clothingstore.security.oauth2;

import com.clothingstore.clothingstore.domain.OAuthAuthority;
import com.clothingstore.clothingstore.domain.OAuthCustomer;
import com.clothingstore.clothingstore.service.OAuthCustomerService;
import com.clothingstore.clothingstore.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class CustomOAuthUserService extends DefaultOAuth2UserService {

    @Autowired
    private OAuthCustomerService oAuthCustomerService;
    @Autowired
    private OrderService orderService;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2User oauthUser = super.loadUser(userRequest);
        Map attributes = oauthUser.getAttributes();
        GoogleOAuth2UserInfo userInfo = new GoogleOAuth2UserInfo();
        userInfo.setEmail((String) attributes.get("email"));
        userInfo.setImageUrl((String) attributes.get("picture"));
        userInfo.setName((String) attributes.get("given_name"));
        userInfo.setProviderId(userRequest.getClientRegistration().getRegistrationId());
        updateUser(userInfo);
        return oauthUser;
    }

    private void updateUser(GoogleOAuth2UserInfo userInfo) {
        OAuthCustomer customer = oAuthCustomerService.getCustomerByUsername(userInfo.getEmail());
        if(customer == null) {
            customer = new OAuthCustomer();
            orderService.createNewOrderForCustomer(userInfo.getEmail());

            OAuthAuthority authority = new OAuthAuthority();
            authority.setOAuthCustomer(customer);
            authority.setAuthority("ROLE_USER");
            customer.setAuthority(authority);
        }

        customer.setUsername(userInfo.getEmail());
        customer.setPhoto(userInfo.getImageUrl());
        customer.setFirstName(userInfo.getName());
        customer.setIsOauthCustomer(true);
        customer.setProviderId(userInfo.getProviderId());
        oAuthCustomerService.saveOAuthcustomer(customer);
    }
}
