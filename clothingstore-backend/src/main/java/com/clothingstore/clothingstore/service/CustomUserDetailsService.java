package com.clothingstore.clothingstore.service;

import com.clothingstore.clothingstore.domain.Customer;
import com.clothingstore.clothingstore.domain.OAuthCustomer;
import com.clothingstore.clothingstore.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private CustomerService customerService;
    @Autowired
    private OAuthCustomerService oAuthCustomerService;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return customerService.getCustomerByUsername(username);
    }

    @Transactional
    public Customer loadById(Long id){
       return customerService.getCustomerById(id);
    }
    @Transactional
    public OAuthCustomer loadOauthById(Long id){
        return oAuthCustomerService.getCustomerById(id);
    }
}
