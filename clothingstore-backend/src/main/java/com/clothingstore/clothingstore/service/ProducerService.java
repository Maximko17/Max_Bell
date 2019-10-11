package com.clothingstore.clothingstore.service;

import com.clothingstore.clothingstore.domain.Producer;
import com.clothingstore.clothingstore.repository.ProducerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProducerService {

    @Autowired
    private ProducerRepository producerRepository;

    public List<Producer> getAllProducers(){
        return producerRepository.findAll();
    }

}
