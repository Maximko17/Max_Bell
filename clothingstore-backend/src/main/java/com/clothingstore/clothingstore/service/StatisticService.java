package com.clothingstore.clothingstore.service;

import com.clothingstore.clothingstore.repository.CustomerRepository;
import com.clothingstore.clothingstore.repository.OrderDetailsReposiroty;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

@Service
public class StatisticService {

    @Autowired
    private OrderDetailsReposiroty orderDetailsReposiroty;
    @Autowired
    private CustomerRepository customerRepository;

    public Object getTotalPriceInOneDay(){
        Date date = new Date();
        LocalDate localDate = date.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
        int day = localDate.getDayOfMonth();
        List<Object> info= new ArrayList<>();
        for (int i = 0; i < 10 ; i++) {

            info.add(orderDetailsReposiroty.findTotalPriceInOneDay(day-i));
        }
        return info;
    }

    public List<Integer> findOnlineInOneWeek(){
        Integer mon = customerRepository.findOnlineInOneWeek(0);
        Integer tue = customerRepository.findOnlineInOneWeek(1);
        Integer wed = customerRepository.findOnlineInOneWeek(2);
        Integer thu = customerRepository.findOnlineInOneWeek(3);
        Integer fri = customerRepository.findOnlineInOneWeek(4);
        Integer sat = customerRepository.findOnlineInOneWeek(5);
        Integer sun = customerRepository.findOnlineInOneWeek(6);

        return Arrays.asList(mon,tue,wed,thu,fri,sat,sun);

    }
}
