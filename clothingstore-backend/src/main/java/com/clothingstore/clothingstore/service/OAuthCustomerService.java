package com.clothingstore.clothingstore.service;

import com.clothingstore.clothingstore.domain.OAuthCustomer;
import com.clothingstore.clothingstore.exceptions.CustomerNotFoundEx;
import com.clothingstore.clothingstore.repository.OAuthCustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OAuthCustomerService {

    @Autowired
    private OAuthCustomerRepository oAuthCustomerRepository;

    public void saveOAuthcustomer(OAuthCustomer customer){
      oAuthCustomerRepository.save(customer);
    }

    public OAuthCustomer getCustomerByUsername(String username){
        return oAuthCustomerRepository.findByUsername(username);
    }

    public OAuthCustomer getCustomerById(Long id){
        OAuthCustomer customer = oAuthCustomerRepository.findById(id).orElse(null);
        if (customer==null){
            throw new CustomerNotFoundEx("Customer with 'ID:"+ id +"' not found");
        }

        return customer;
    }
}
