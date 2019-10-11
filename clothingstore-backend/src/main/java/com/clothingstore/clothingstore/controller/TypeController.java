package com.clothingstore.clothingstore.controller;

import com.clothingstore.clothingstore.domain.Type;
import com.clothingstore.clothingstore.service.TypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/type")
@CrossOrigin
public class TypeController {

    @Autowired
    private TypeService typeService;

    @GetMapping("/all")
    public ResponseEntity<?> getAllTypes(){
        List<Type> ru_types = typeService.getAllRuTypes();
        return new ResponseEntity<>(ru_types, HttpStatus.OK);
    }
}
