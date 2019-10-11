package com.clothingstore.clothingstore.service;

import com.clothingstore.clothingstore.domain.Size;
import com.clothingstore.clothingstore.repository.SizeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SizeService {

    @Autowired
    private SizeRepository sizeRepository;

    public List<Size> getAllSizes(Long id){
        return sizeRepository.findAllByClothes_Id(id);
    }

}
