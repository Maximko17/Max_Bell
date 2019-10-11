package com.clothingstore.clothingstore.validator;

import com.clothingstore.clothingstore.domain.Customer;
import com.clothingstore.clothingstore.domain.dto.UpdatedCustomerDto;
import com.clothingstore.clothingstore.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

@Component
public class CustomerDtoValidator implements Validator {

    @Autowired
    private CustomerRepository customerRepository;

    @Override
    public boolean supports(Class<?> aClass) {
        return UpdatedCustomerDto.class.equals(aClass);
    }

    @Override
    public void validate(Object object, Errors errors) {
        UpdatedCustomerDto customer = (UpdatedCustomerDto) object;

        if (!customer.getNewPassword().equals(customer.getConfirmPassword())){
            errors.rejectValue("confirmPassword","Match","Password must match");
        }

        Customer validCustomer = customerRepository.findByUsername(customer.getUsername());
        if (validCustomer == null || validCustomer.getUsername().equals(customer.getPrevUsername())){
            customer.setUsername(customer.getUsername());
        }else{
            errors.rejectValue("username","Invalid","This email has already registered");
        }

    }
}
