package com.clothingstore.clothingstore.service;

import com.clothingstore.clothingstore.domain.Clothes;
import com.clothingstore.clothingstore.domain.Likes;
import com.clothingstore.clothingstore.repository.ClothesRepository;
import com.clothingstore.clothingstore.repository.LikesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class LikesService {

    @Autowired
    private LikesRepository likesRepository;
    @Autowired
    private ClothesRepository clothesRepository;

    public List<Long> getLikedClothes(Long customer_id){
        return likesRepository.findAllByCustomerId(customer_id).stream().map(Likes::getClothesId).collect(Collectors.toList());
    }

    public List<Long> newLike(Long customer_id,Long clothes_id){
        Likes like = new Likes();
        like.setCustomerId(customer_id);
        like.setClothesId(clothes_id);

        likesRepository.save(like);

        Clothes clothes = clothesRepository.findById(clothes_id).orElse(null);
        clothes.setTotalLikes(clothes.getTotalLikes()+1);
        clothesRepository.save(clothes);

        return getLikedClothes(customer_id);
    }

    @Transactional
    public List<Long> deleteLikeFromClothes(Long customer_id,Long clothes_id){
        likesRepository.deleteByCustomerIdAndClothesId(customer_id,clothes_id);

        Clothes clothes = clothesRepository.findById(clothes_id).orElse(null);
        clothes.setTotalLikes(clothes.getTotalLikes()-1);
        clothesRepository.save(clothes);

        return getLikedClothes(customer_id);
    }

}
