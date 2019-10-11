package com.clothingstore.clothingstore.controller;

import com.clothingstore.clothingstore.service.StatisticService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/statistic")
@CrossOrigin
public class StatisticController {

    @Autowired
    private StatisticService statisticService;

    @GetMapping("/total-price")
    public ResponseEntity getTotalPriceInOneDay(){
        return new ResponseEntity(statisticService.getTotalPriceInOneDay(), HttpStatus.OK);
    }

    @GetMapping("/week-online")
    public ResponseEntity getUsersOnline(){
        return new ResponseEntity(statisticService.findOnlineInOneWeek(),HttpStatus.OK);
    }
}
