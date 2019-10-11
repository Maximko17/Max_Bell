package com.clothingstore.clothingstore.validator;

import com.clothingstore.clothingstore.domain.Customer;
import com.clothingstore.clothingstore.repository.CustomerRepository;
import com.clothingstore.clothingstore.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

@Component
public class CustomerValidator implements Validator {

    @Autowired
    private CustomerRepository customerRepository;

    @Override
    public boolean supports(Class<?> aClass) {
        return Customer.class.equals(aClass);
    }

    @Override
    public void validate(Object object, Errors errors) {
        Customer customer = (Customer) object;

        if (!customer.getPassword().equals(customer.getConfirmPassword())){
            errors.rejectValue("confirmPassword","Match","Password must match");
        }

        Customer validCustomer = customerRepository.findByUsername(customer.getUsername());
        if (validCustomer == null){
            customer.setUsername(customer.getUsername());
        }else{
            errors.rejectValue("username","Invalid","This email has already registered");
        }

    }
}
