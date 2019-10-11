package com.clothingstore.clothingstore.controller;

import com.clothingstore.clothingstore.domain.Clothes;
import com.clothingstore.clothingstore.domain.Images;
import com.clothingstore.clothingstore.repository.ClothesRepository;
import com.clothingstore.clothingstore.service.ClothesService;
import com.clothingstore.clothingstore.service.ImageService;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.io.File;
import java.io.IOException;
import java.security.Principal;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/catalog")
@CrossOrigin
public class ClothesController {

    @Autowired
    private ClothesService clothesService;
    @Autowired
    private ImageService imageService;
    @Autowired
    private ExceptionMapHandler exceptionMapHandler;


    @GetMapping("/all")
    public ResponseEntity<?> getAllClothes(@PageableDefault(sort = {"id"}, direction = Sort.Direction.DESC) Pageable pageable) {
        return new ResponseEntity<>(clothesService.getAllClothes(pageable), HttpStatus.OK);
    }

    @GetMapping("/top/names")
    public ResponseEntity<?> getAllTopClothesNames() {
        return new ResponseEntity<>(clothesService.getTopClothesNames(), HttpStatus.OK);
    }

    @GetMapping("/top/likes")
    public ResponseEntity<?> getAllTopClothesLikes() {
        return new ResponseEntity<>(clothesService.getTopClothesLikes(), HttpStatus.OK);
    }

    @GetMapping("/top/types")
    public ResponseEntity<?> getAllTopTypesNames() {
        return new ResponseEntity<>(clothesService.getTopClothesTypes(), HttpStatus.OK);
    }

    @GetMapping("/{clothes_type}")
    public ResponseEntity<?> getClothesByType(@PathVariable String clothes_type, @PageableDefault(sort = {"id"}, direction = Sort.Direction.DESC) Pageable pageable) {
        Page<Clothes> newClothes = clothesService.getClothesByType(clothes_type.toUpperCase(), pageable);
        return new ResponseEntity<>(newClothes, HttpStatus.OK);
    }

    @GetMapping("/search/{clothes}")
    public ResponseEntity<?> getClothesBySearch(@PathVariable String clothes, @PageableDefault Pageable pageable) {
        Page<Clothes> foundClothes = clothesService.getClothesBySearch(clothes, pageable);
        return new ResponseEntity<>(foundClothes, HttpStatus.OK);
    }


    @GetMapping("/full/{clothes_id}")
    public ResponseEntity<?> getClothesById(@PathVariable Long clothes_id, Principal principal) {
        Clothes clothes = clothesService.getClothesById(clothes_id);
        return new ResponseEntity<>(clothes, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<?> createNewClothes(@Valid @RequestBody Clothes clothes, BindingResult result) {
        ResponseEntity<?> errorMap = exceptionMapHandler.exceptionResponse(result);
        if (errorMap != null) return errorMap;

        Clothes newClothes = clothesService.saveOrUpdate(clothes, null);
        return new ResponseEntity<>(newClothes, HttpStatus.CREATED);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateClothes(@Valid @RequestBody Clothes clothes, BindingResult result, @PathVariable Long id) {
        ResponseEntity<?> errorMap = exceptionMapHandler.exceptionResponse(result);
        if (errorMap != null) return errorMap;

        return new ResponseEntity<>(clothesService.saveOrUpdate(clothes, id), HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteClothes(@PathVariable Long id) {
        clothesService.deleteClothing(id);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/save/images/{clothes_id}")
    public ResponseEntity<?> uploadClothesImage(@RequestParam("file") MultipartFile[] files, @PathVariable Long clothes_id) throws IOException {
        return new ResponseEntity<>(imageService.saveClothesImage(files, clothes_id),HttpStatus.OK);
    }

    @GetMapping("/images/{clothes_id}")
    public ResponseEntity<?> getClothesImage(@PathVariable Long clothes_id) {
        List<Images> images = imageService.getClothesImages(clothesService.getClothesById(clothes_id));

        return new ResponseEntity<>(images, HttpStatus.OK);
    }

    @DeleteMapping("/images/{image_id}")
    public ResponseEntity<?> deleteClothesImage(@PathVariable Long image_id) {
        imageService.deleteClothesImage(image_id);

        return new ResponseEntity<>( HttpStatus.OK);
    }

}
