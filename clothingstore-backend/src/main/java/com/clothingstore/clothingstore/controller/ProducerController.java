package com.clothingstore.clothingstore.controller;

import com.clothingstore.clothingstore.domain.Producer;
import com.clothingstore.clothingstore.service.ProducerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/producer")
@CrossOrigin
public class ProducerController {

    @Autowired
    private ProducerService producerService;

    @GetMapping("/all")
    public ResponseEntity<?> getAllProducers(){
        List<Producer> producers = producerService.getAllProducers();
        return new ResponseEntity<>(producers, HttpStatus.OK);
    }


}
