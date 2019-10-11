package com.clothingstore.clothingstore.controller;

import com.clothingstore.clothingstore.domain.Size;
import com.clothingstore.clothingstore.service.SizeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/size")
@CrossOrigin
public class SizeController {

    @Autowired
    private SizeService sizeService;

    @GetMapping("/all/{clothes_id}")
    public ResponseEntity<?> getAllProducers(@PathVariable Long clothes_id){
        List<Size> sizes = sizeService.getAllSizes(clothes_id);
        return new ResponseEntity<>(sizes, HttpStatus.OK);
    }


}
