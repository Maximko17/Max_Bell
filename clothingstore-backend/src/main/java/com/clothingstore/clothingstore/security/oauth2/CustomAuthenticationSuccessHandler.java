package com.clothingstore.clothingstore.security.oauth2;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
public class CustomAuthenticationSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    @Autowired
    private OAuthJwtTokenProvider tokenProvider;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        if (response.isCommitted()) {
            return;
        }

        String token = tokenProvider.generateOAuthToken(authentication);
        System.out.println(token);


        Cookie cookie = new Cookie("auth_token",token);
        cookie.setPath("/");
        cookie.setMaxAge(30);
        response.addCookie(cookie);

        String redirectionUrl = UriComponentsBuilder.fromUriString("http://localhost:3000/login")
                .build().toUriString();
        getRedirectStrategy().sendRedirect(request, response, redirectionUrl);

    }

}
