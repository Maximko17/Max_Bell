package com.clothingstore.clothingstore.service;

import com.clothingstore.clothingstore.domain.Country;
import com.clothingstore.clothingstore.repository.CountryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CountryService {

    @Autowired
    private CountryRepository countryRepository;

    public List<Country> getAllRuCountries(){
        return countryRepository.getAllRuName();
    }

    public List<Country> getAllEnCountries(){
        return countryRepository.getAllEnName();
    }
}
