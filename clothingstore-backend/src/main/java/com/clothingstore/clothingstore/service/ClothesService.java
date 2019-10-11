package com.clothingstore.clothingstore.service;

import com.clothingstore.clothingstore.domain.Clothes;
import com.clothingstore.clothingstore.domain.CustomerOrder;
import com.clothingstore.clothingstore.domain.Images;
import com.clothingstore.clothingstore.exceptions.ClothesNotFoundEx;
import com.clothingstore.clothingstore.repository.ClothesRepository;
import com.clothingstore.clothingstore.repository.OrderAdditionalsRepository;
import com.clothingstore.clothingstore.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.validation.constraints.NotBlank;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
public class ClothesService {

    @Autowired
    private ClothesRepository clothesRepository;
    @Autowired
    @Lazy
    private ImageService imageService;
    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private OrderAdditionalsRepository additionalsRepository;

    public Clothes saveOrUpdate(Clothes clothes, Long id) {
        if (id != null) {
            clothes.setId(id);
            List<Images> images = imageService.getClothesImages(getClothesById(clothes.getId()));
            images.forEach(image -> image.setClothes(clothes));
            clothes.setImages(images);
            clothes.setTotalLikes(clothes.getTotalLikes());
        } else {
            List<Images> images = imageService.getClothesImages(getClothesById(999999L));
            images.forEach(image -> image.setClothes(clothes));
            clothes.setImages(images);
            clothes.setTotalLikes(0);
        }
        clothes.getSizes().forEach(size -> size.setClothes(clothes));
        return clothesRepository.save(clothes);
    }

    public Page<Clothes> getAllClothes(Pageable pageable) {
        return clothesRepository.findAll(pageable);
    }

    public Clothes getClothesById(Long id) {
        Clothes clothes = clothesRepository.findById(id).orElse(null);
        if (clothes == null) {
            throw new ClothesNotFoundEx("Clothes with 'ID:" + id + "' not found");
        }

        return clothes;
    }

    public Page<Clothes> getClothesBySearch(String clothes, Pageable pageable) {
        Page<Clothes> ruclothes = clothesRepository.findByNameContainingOrTypeContainingOrProducerContaining(pageable, clothes, clothes, clothes);
        if (ruclothes.getTotalElements() == 0) {
            Page<Clothes> enclothes = clothesRepository.findByEnNameContaining(clothes, pageable);
            if (enclothes.getTotalElements() == 0) {
                throw new ClothesNotFoundEx("Clothes with 'NAME:" + enclothes + "' not found");
            }
            return enclothes;

        }

        return ruclothes;
    }

    public Stream<String> getTopClothesNames() {
        return clothesRepository.findTop5ByOrderByTotalLikesDesc().stream().map(Clothes::getName);
    }

    public Stream<Integer> getTopClothesLikes() {
        return clothesRepository.findTop5ByOrderByTotalLikesDesc().stream().map(Clothes::getTotalLikes);
    }

    public List<String> getTopClothesTypes() {
        String a = clothesRepository.findTopClothesTypes("HOODIE");
        String b = clothesRepository.findTopClothesTypes("CAP");
        String c = clothesRepository.findTopClothesTypes("HAT");
        return Arrays.asList(a, b, c);
    }

    public Page<Clothes> getClothesByType(String type, Pageable pageable) {
        Page<Clothes> clothes = clothesRepository.findByType(type.toUpperCase(), pageable);
        if (clothes.getNumberOfElements() == 0) {
            throw new ClothesNotFoundEx("Clothes with 'TYPE:" + type + "' not found");
        }
        return clothes;
    }

    @Transactional
    public void deleteClothing(Long id) {
        List<CustomerOrder> orderList = orderRepository.findAll();
        orderList.forEach(order -> {
            order.setClothes(order.getClothes().stream()
                    .filter(clothes -> !clothes.getId().equals(id))
                    .collect(Collectors.toList()));
            orderRepository.save(order);
        });
        additionalsRepository.deleteAllByClothesId(id);

        clothesRepository.deleteById(id);
    }

}
