package com.clothingstore.clothingstore.service;


import com.clothingstore.clothingstore.domain.Authority;
import com.clothingstore.clothingstore.domain.Customer;
import com.clothingstore.clothingstore.domain.dto.UpdatedCustomerDto;
import com.clothingstore.clothingstore.exceptions.CustomerNotFoundEx;
import com.clothingstore.clothingstore.exceptions.MaxUploadFileSizeEx;
import com.clothingstore.clothingstore.exceptions.WrongPrevPassword;
import com.clothingstore.clothingstore.repository.CustomerRepository;
import com.clothingstore.clothingstore.validator.CustomerDtoValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MaxUploadSizeExceededException;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
public class CustomerService {

    @Autowired
    private CustomerRepository customerRepository;
    @Autowired
    private OrderService orderService;
    @Autowired
    private BCryptPasswordEncoder encoder;
    @Autowired
    private ImageService imageService;
    @Value("${upload.path}")
    private String uploadPath;

    public Customer saveCustomer(Customer customer,MultipartFile photo){

        customer.setPhoto(imageService.saveCustomerImage(photo, customer.getGender()));
        customer.setPassword(encoder.encode(customer.getPassword()));
        customer.setConfirmPassword("");
        orderService.createNewOrderForCustomer(customer.getUsername());

        Authority authority = new Authority();
        authority.setCustomer(customer);
        authority.setAuthority("ROLE_USER");
        customer.setAuthority(authority);

        return customerRepository.save(customer);
    }

    public Customer updateCustomer(UpdatedCustomerDto customerDto, MultipartFile photo, Long id){
            Customer customer = getCustomerById(id);
            customer.setId(customerDto.getId());
            customer.setFirstName(customerDto.getFirstName());
            customer.setAuthority(customer.getAuthority());
            customer.setGender(customerDto.getGender());
            customer.setUsername(customerDto.getUsername());

            if (customer.getPhoto().equals(customerDto.getPhoto())){
                customer.setPhoto(customerDto.getPhoto());
            }else{
                customer.setPhoto(imageService.saveCustomerImage(photo,customerDto.getGender()));
            }

            if (!customerDto.getNewPassword().equals("")){
                if (encoder.matches(customerDto.getPrevPassword(),customer.getPassword())){
                    customer.setPassword(encoder.encode(customerDto.getNewPassword()));
                }else{
                    throw new WrongPrevPassword("Your previous password is incorrect");
                }
            }else{
                customer.setPassword(customer.getPassword());
            }
            return customerRepository.save(customer);
    }

    public Customer getCustomerByUsername(String username){
        Customer customer = customerRepository.findByUsername(username);
        if (customer==null){
            throw new CustomerNotFoundEx("User with 'EMAIL:"+ username +"' not found");
        }

        return customer;
    }

    public Customer getCustomerById(Long id){
        Customer customer = customerRepository.findById(id).orElse(null);
        if (customer==null){
            throw new CustomerNotFoundEx("Customer with 'ID:"+ id +"' not found");
        }

        return customer;

    }

    public Page<Customer> getAllCustomers(Pageable pageable){
        return customerRepository.findAll(pageable);
    }

    public Page<Customer> getCustomersBySearch(Pageable pageable,String customer){
        return customerRepository.findByFirstNameContainingOrUsernameContaining(pageable,customer,customer);
    }
}
