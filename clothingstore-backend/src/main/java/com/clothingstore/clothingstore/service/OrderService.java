package com.clothingstore.clothingstore.service;

import com.clothingstore.clothingstore.domain.Clothes;
import com.clothingstore.clothingstore.domain.CustomerOrder;
import com.clothingstore.clothingstore.domain.OrderAdditionals;
import com.clothingstore.clothingstore.domain.OrderDetails;
import com.clothingstore.clothingstore.domain.dto.AddClothesInOrderRequestBodyDto;
import com.clothingstore.clothingstore.repository.OrderAdditionalsRepository;
import com.clothingstore.clothingstore.repository.OrderRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@Slf4j
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private OrderAdditionalsRepository orderAdditionalsRepository;

    public void createNewOrderForCustomer(String customerUsername) {
        CustomerOrder newOrder = new CustomerOrder();

        OrderDetails orderDetails = new OrderDetails();
        orderDetails.setCountry("-");
        orderDetails.setAddress("-");
        orderDetails.setCity("-");
        orderDetails.setFio("-");
        orderDetails.setAddress("-");
        orderDetails.setPostcode("-");
        orderDetails.setPhoneNumber("-");
        orderDetails.setEmail(customerUsername);
        orderDetails.setCustomerOrder(newOrder);

        newOrder.setCustomer(customerUsername);
        newOrder.setOrderDetails(orderDetails);


        orderRepository.save(newOrder);
    }

    public CustomerOrder addClothesInOrder(AddClothesInOrderRequestBodyDto clothesDto, String username) {
        CustomerOrder order = orderRepository.findByCustomerAndOrderDetails_Status(username, null);

        List<Clothes> clothesList = order.getClothes();
        clothesList.add(clothesDto.getClothes());

        List<OrderAdditionals> additionals = order.getOrderAdditionals();
        OrderAdditionals orderAdditionals = new OrderAdditionals();
        orderAdditionals.setCustomerOrder(order);
        orderAdditionals.setClothesId(clothesDto.getClothes().getId());
        orderAdditionals.setSize(clothesDto.getOrderAdditionals().getSize());
        orderAdditionals.setCount(clothesDto.getOrderAdditionals().getCount());
        additionals.add(orderAdditionals);


        order.setClothes(clothesList);
        order.setOrderAdditionals(additionals);

        orderRepository.save(order);
        return order;
    }

    public void saveOrderDetails(OrderDetails orderDetails, CustomerOrder customerOrder) {
        orderDetails.setId(customerOrder.getId());
        orderDetails.setCustomerOrder(customerOrder);
        orderDetails.setStatus("Принят");
        customerOrder.setOrderDetails(orderDetails);
        customerOrder.setUniqueId(String.valueOf(UUID.randomUUID()));

        orderRepository.save(customerOrder);
        createNewOrderForCustomer(customerOrder.getCustomer());
    }

    public CustomerOrder getOrder(String username) {
        return orderRepository.findByCustomerAndOrderDetails_Status(username, null);
    }

    public Page<CustomerOrder> getAllOrders(Pageable pageable) {
        return orderRepository.findAllByOrderDetails_StatusNotNull(pageable);
    }

    public Page<CustomerOrder> getOrdersBySearch(Pageable pageable,String order) {
        return orderRepository.findByOrderDetails_StatusNotNullAndUniqueIdContainingOrOrderDetails_StatusNotNullAndCustomerContaining(pageable,order,order);
    }

    public CustomerOrder getOrderByUniqueId(String username, String uniqueId) {
        return orderRepository.findByCustomerAndUniqueId(username, uniqueId);
    }

    public List<CustomerOrder> getAllCustomerOrders(String username) {
        return orderRepository.findByCustomerAndOrderDetails_StatusNotNull(username);
    }

    @Transactional
    public CustomerOrder deleteClothesFromOrder(CustomerOrder order, Long clothesId) {
        order.setClothes(order.getClothes()
                .stream()
                .filter(clothes -> !clothes.getId().equals(clothesId))
                .collect(Collectors.toList()));

        orderAdditionalsRepository.deleteByClothesIdAndCustomerOrder(clothesId,order);

        order.setOrderAdditionals(order.getOrderAdditionals()
                .stream()
                .filter(additionals -> !additionals.getClothesId().equals(clothesId))
                .collect(Collectors.toList()));

        order.getOrderAdditionals()
                 .forEach(additionals -> additionals.setCustomerOrder(order));

                OrderDetails details = order.getOrderDetails();
        details.setCustomerOrder(order);

        orderRepository.save(order);
        return order;
    }

    @Transactional
    public CustomerOrder deleteAllFromOrder(CustomerOrder order) {
        order.setClothes(new ArrayList<>());
        OrderDetails details = order.getOrderDetails();
        details.setCustomerOrder(order);

        orderAdditionalsRepository.deleteAllByCustomerOrder(order);
        order.setOrderAdditionals(new ArrayList<>());

        orderRepository.save(order);

        return order;
    }

}
