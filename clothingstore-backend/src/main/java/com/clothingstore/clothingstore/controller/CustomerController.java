package com.clothingstore.clothingstore.controller;

import com.clothingstore.clothingstore.domain.Customer;
import com.clothingstore.clothingstore.domain.dto.CaptchaResponseDto;
import com.clothingstore.clothingstore.domain.dto.UpdatedCustomerDto;
import com.clothingstore.clothingstore.exceptions.CaptchaException;
import com.clothingstore.clothingstore.payload.JWTLoginSuccessResponse;
import com.clothingstore.clothingstore.payload.LoginRequest;
import com.clothingstore.clothingstore.security.JwtTokenProvider;
import com.clothingstore.clothingstore.service.CustomerService;
import com.clothingstore.clothingstore.validator.CustomerDtoValidator;
import com.clothingstore.clothingstore.validator.CustomerValidator;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

import java.util.Collections;

import static com.clothingstore.clothingstore.security.SecurityConstans.TOKEN_PREFIX;

@RestController
@RequestMapping("/customer")
@CrossOrigin
public class CustomerController {
    private static final String CAPTCHA_URL = "https://www.google.com/recaptcha/api/siteverify?secret=%s&response=%s";
    @Autowired
    private  ExceptionMapHandler exceptionMapHandler;
    @Autowired
    private CustomerService customerService;
    @Autowired
    private CustomerValidator validator;
    @Autowired
    private CustomerDtoValidator dtoValidator;
    @Autowired
    private JwtTokenProvider tokenProvider;
    @Autowired
    private AuthenticationManager authenticationManager;

    @PostMapping("/login")
    public ResponseEntity<?> authenticateCustomer(@Valid @RequestBody LoginRequest loginRequest,BindingResult result){
        ResponseEntity<?> errorMap = exceptionMapHandler.exceptionResponse(result);
        if (errorMap != null) return errorMap;

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getUsername(),
                        loginRequest.getPassword()
                )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = TOKEN_PREFIX + tokenProvider.generateToken(authentication);

        return ResponseEntity.ok(new JWTLoginSuccessResponse(true,jwt));

    }

    @PostMapping(value = "/register", consumes = {"multipart/form-data"})
    public ResponseEntity<?> createNewCustomer(@Valid @RequestPart("customer") Customer customer, BindingResult result,
                                               @RequestPart(value = "file",required = false) MultipartFile photo){
        validator.validate(customer,result);

        ResponseEntity<?> errorMap = exceptionMapHandler.exceptionResponse(result);
        if (errorMap != null) return errorMap;

        Customer saveCustomer = customerService.saveCustomer(customer,photo);
        return new ResponseEntity<>(saveCustomer, HttpStatus.CREATED);
    }

    @PutMapping(value="/edit", consumes = {"multipart/form-data"})
    public ResponseEntity<?> updateCustomer(@Valid @RequestPart("customer")UpdatedCustomerDto customerDto,BindingResult result,
                                            @RequestPart(value = "file",required = false) MultipartFile photo){
        dtoValidator.validate(customerDto,result);

        ResponseEntity<?> errorMap = exceptionMapHandler.exceptionResponse(result);
        if (errorMap != null) return errorMap;

        customerService.updateCustomer(customerDto,photo,customerDto.getId());

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/{username}")
    public ResponseEntity<?> getCustomerByUsername(@PathVariable String username){
        Customer customer = customerService.getCustomerByUsername(username);

        return new ResponseEntity<>(customer,HttpStatus.OK);
    }

    @GetMapping("/all")
    public ResponseEntity<?> getAllCustomers(@PageableDefault(sort = {"id"}, direction = Sort.Direction.DESC) Pageable pageable){
        return new ResponseEntity<>(customerService.getAllCustomers(pageable),HttpStatus.OK);
    }

    @GetMapping("/search/{customer}")
    public ResponseEntity<?> getCustomersBySearch(@PageableDefault(sort = {"id"}, direction = Sort.Direction.DESC) Pageable pageable,@PathVariable String customer){
        return new ResponseEntity<>(customerService.getCustomersBySearch(pageable,customer),HttpStatus.OK);
    }

}
