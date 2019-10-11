package com.clothingstore.clothingstore.controller;

import com.clothingstore.clothingstore.domain.Country;
import com.clothingstore.clothingstore.service.CountryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin
public class CountryController {

    @Autowired
    private CountryService countryService;

    @GetMapping("/country/all")
    public ResponseEntity<?> getAllRuCountries(){
        List<Country> ru_countries = countryService.getAllRuCountries();
        return new ResponseEntity<>(ru_countries, HttpStatus.OK);
    }

    @GetMapping("/en/country/all")
    public ResponseEntity<?> getAllEnCountries(){
        List<Country> en_countries = countryService.getAllEnCountries();
        return new ResponseEntity<>(en_countries, HttpStatus.OK);
    }
}
