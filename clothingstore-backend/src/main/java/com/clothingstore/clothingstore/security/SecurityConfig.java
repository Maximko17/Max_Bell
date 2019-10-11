package com.clothingstore.clothingstore.security;

import com.clothingstore.clothingstore.security.oauth2.CustomAuthenticationSuccessHandler;
import com.clothingstore.clothingstore.security.oauth2.CustomOAuthUserService;
import com.clothingstore.clothingstore.security.oauth2.OAuthJwtAuthenticationFilter;
import com.clothingstore.clothingstore.service.CustomUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.BeanIds;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.oauth2.client.web.AuthorizationRequestRepository;
import org.springframework.security.oauth2.client.web.HttpSessionOAuth2AuthorizationRequestRepository;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import static com.clothingstore.clothingstore.security.SecurityConstans.*;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(
        securedEnabled = true,
        jsr250Enabled = true,
        prePostEnabled = true
)
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private JwtAuthenticationEntryPoint authenticationEntryPoint;
    @Autowired
    private CustomOAuthUserService oauthUserService;
    @Autowired
    private CustomAuthenticationSuccessHandler successHandler;
    @Autowired
    private CustomUserDetailsService detailsService;
    @Autowired
    private BCryptPasswordEncoder encoder;

    @Bean
    public JwtAuthenticationFilter authenticationFilter(){return new JwtAuthenticationFilter();}
    @Bean
    public OAuthJwtAuthenticationFilter oAuthAuthenticationFilter(){return new OAuthJwtAuthenticationFilter();}
    @Bean
    public AuthorizationRequestRepository customAuthorizationRequestRepository() {
        return new HttpSessionOAuth2AuthorizationRequestRepository();
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth
                .userDetailsService(detailsService)
                .passwordEncoder(encoder);
    }

    @Override
    @Bean(BeanIds.AUTHENTICATION_MANAGER)
    protected AuthenticationManager authenticationManager() throws Exception {
        return super.authenticationManager();
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.cors().and().csrf().disable()
                .exceptionHandling().authenticationEntryPoint(authenticationEntryPoint).and()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .authorizeRequests().antMatchers(
                "/",
                "/favicon.ico",
                "/**/*.png",
                "/**/*.gif",
                "/**/*.svg",
                "/**/*.jpg",
                "/**/*.html",
                "/**/*.css",
                "/**/*.js"
                 ).permitAll()
                .antMatchers("/oauth2/**").permitAll()
                .antMatchers(HttpMethod.PUT,USER_EDIT).hasAnyRole("ADMIN","USER")
                .antMatchers(ORDER_URLS,LIKES).hasAnyRole("ADMIN","USER")
                .antMatchers(HttpMethod.DELETE,LIKES_DELETE).hasAnyRole("ADMIN","USER")
                .antMatchers(ORDER_ALL,STATISTIC).hasRole("ADMIN")
                .antMatchers(HttpMethod.PUT,CATALOG_UPDATE).hasRole("ADMIN")
                .antMatchers(HttpMethod.POST,CATALOG_POST).hasRole("ADMIN")
                .antMatchers(HttpMethod.DELETE,CATALOG_DELETE).hasRole("ADMIN")
                .antMatchers(HttpMethod.GET,CATALOG_GET).hasRole("ADMIN")
                .antMatchers(HttpMethod.GET,USER_GET).hasRole("ADMIN")
                .antMatchers(USER_URLS,RU_COUNTRIES_URL,EN_COUNTRIES_URL,SIZES_URL,REVIEWS).permitAll()
                .antMatchers(CATALOG_URLS).permitAll()
                .anyRequest()
                .authenticated()
                .and()
                .oauth2Login()
                    .authorizationEndpoint()
                    .baseUri("/oauth2/authorize")
                    .authorizationRequestRepository(customAuthorizationRequestRepository())
                .and()
                    .redirectionEndpoint()
                    .baseUri("/oauth2/callback/google")
                .and()
                    .userInfoEndpoint()
                    .userService(oauthUserService)
                .and()
                    .successHandler(successHandler);

        http
                .addFilterBefore(authenticationFilter(), UsernamePasswordAuthenticationFilter.class);

        http
                .addFilterBefore(oAuthAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class);
    }
}
