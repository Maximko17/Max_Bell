package com.clothingstore.clothingstore.controller;

import com.clothingstore.clothingstore.service.LikesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/likes")
@CrossOrigin
public class LikesController {

    @Autowired
    private LikesService likesService;

    @GetMapping("/customer/{customer_id}")
    public ResponseEntity<?> getCustomerLikes(@PathVariable Long customer_id){
        return new ResponseEntity<>(likesService.getLikedClothes(customer_id), HttpStatus.OK);
    }

    @PostMapping("/new/customer/{customer_id}/clothes/{clothes_id}")
    public ResponseEntity<?> newLike(@PathVariable Long customer_id,@PathVariable Long clothes_id){
        return new ResponseEntity<>(likesService.newLike(customer_id,clothes_id), HttpStatus.OK);
    }

    @DeleteMapping("/delete/customer/{customer_id}/clothes/{clothes_id}")
    public ResponseEntity<?> deleteLike(@PathVariable Long customer_id,@PathVariable Long clothes_id){
        return new ResponseEntity<>(likesService.deleteLikeFromClothes(customer_id,clothes_id),HttpStatus.OK);
    }
}
