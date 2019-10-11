package com.clothingstore.clothingstore.service;

import com.clothingstore.clothingstore.domain.Type;
import com.clothingstore.clothingstore.repository.TypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TypeService {

    @Autowired
    private TypeRepository typeRepository;

    public List<Type> getAllRuTypes(){
        return typeRepository.findAll();
    }

}
