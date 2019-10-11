package com.clothingstore.clothingstore.security.oauth2;

import com.clothingstore.clothingstore.domain.Customer;
import com.clothingstore.clothingstore.domain.OAuthCustomer;
import com.clothingstore.clothingstore.security.JwtTokenProvider;
import com.clothingstore.clothingstore.service.CustomUserDetailsService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Collection;
import java.util.Collections;

import static com.clothingstore.clothingstore.security.SecurityConstans.HEADER_STRING;
import static com.clothingstore.clothingstore.security.SecurityConstans.TOKEN_PREFIX;

@Slf4j
public class OAuthJwtAuthenticationFilter extends OncePerRequestFilter {

    @Autowired
    private OAuthJwtTokenProvider tokenProvider;
    @Autowired
    private CustomUserDetailsService customUserDetailsService;

    @Override
    protected void doFilterInternal(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, FilterChain filterChain) throws ServletException, IOException {

        try {
            String clearJwt = httpServletRequest.getHeader(HEADER_STRING);

            if (StringUtils.hasText(clearJwt) && tokenProvider.validateToken(clearJwt)){

                Long customerId = tokenProvider.getUserIdFromJWT(clearJwt);
                OAuthCustomer customer = customUserDetailsService.loadOauthById(customerId);
                Collection authority = Collections.singleton(customer.getAuthority());

                UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                        customer,null, authority);

                authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(httpServletRequest));
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
        }catch (Exception ex){
            log.error("Could not set user authentication",ex);
        }

        filterChain.doFilter(httpServletRequest,httpServletResponse);
    }
}
