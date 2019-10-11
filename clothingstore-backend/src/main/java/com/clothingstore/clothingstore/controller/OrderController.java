package com.clothingstore.clothingstore.controller;

import com.clothingstore.clothingstore.domain.CustomerOrder;
import com.clothingstore.clothingstore.domain.OrderDetails;
import com.clothingstore.clothingstore.domain.dto.AddClothesInOrderRequestBodyDto;
import com.clothingstore.clothingstore.repository.OrderRepository;
import com.clothingstore.clothingstore.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/order")
@CrossOrigin
public class OrderController {

    @Autowired
    private  ExceptionMapHandler exceptionMapHandler;
    @Autowired
    private OrderService orderService;
    @Autowired
    private OrderRepository orderRepository;

    @PostMapping("/addInOrder")
    public ResponseEntity<?> addInOrder(@RequestBody AddClothesInOrderRequestBodyDto clothesDTO, Principal principal) {

        CustomerOrder customerOrder = orderService.addClothesInOrder(clothesDTO, principal.getName());

        return new ResponseEntity<>(customerOrder, HttpStatus.OK);
    }

    @PostMapping("/saveOrderDetails")
    public ResponseEntity<?> saveOrderDetails(@Valid @RequestBody OrderDetails orderDetails, BindingResult result, Principal principal) {
        ResponseEntity <?> errorMap = exceptionMapHandler.exceptionResponse(result);
        if (errorMap!=null) return errorMap;

        CustomerOrder order = orderRepository.findByCustomerAndOrderDetails_Status(principal.getName(),null);
        orderService.saveOrderDetails(orderDetails, order);

        return new ResponseEntity<>(HttpStatus.OK);

    }

    @PostMapping("/createNewOrder")
    public ResponseEntity<?> createNewOrder(Principal principal) {
        orderService.createNewOrderForCustomer(principal.getName());

        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<?> getOrder(Principal principal) {
        CustomerOrder customerOrder = orderService.getOrder(principal.getName());

        return new ResponseEntity<>(customerOrder, HttpStatus.OK);
    }

    @GetMapping("/customer/all")
    public ResponseEntity<?> getAllCustomerOrders(Principal principal){
        List<CustomerOrder> orders = orderService.getAllCustomerOrders(principal.getName());

        return new ResponseEntity<>(orders, HttpStatus.OK);
    }

    @GetMapping("/all")
    public ResponseEntity<?> getAllOrders(@PageableDefault(sort = {"id"}, direction = Sort.Direction.DESC) Pageable pageable){
        return new ResponseEntity<>(orderService.getAllOrders(pageable), HttpStatus.OK);
    }

    @GetMapping("/search/{order}")
    public ResponseEntity<?> getOrdersBySearch(@PageableDefault(sort = {"id"}, direction = Sort.Direction.DESC) Pageable pageable,@PathVariable String order){
        return new ResponseEntity<>(orderService.getOrdersBySearch(pageable,order), HttpStatus.OK);
    }

    @GetMapping("{uniqueId}")
    public ResponseEntity<?> getOrderByUniqueId(Principal principal,@PathVariable String uniqueId){
        CustomerOrder order = orderService.getOrderByUniqueId(principal.getName(),uniqueId);

        return new ResponseEntity<>(order, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{clothesid}")
    public ResponseEntity<?> deleteOneClothesFromOrder(@RequestBody CustomerOrder order, @PathVariable Long clothesid) {

        return new ResponseEntity<>(orderService.deleteClothesFromOrder(order, clothesid), HttpStatus.OK);
    }

    @DeleteMapping("/delete/all")
    public ResponseEntity<?> deleteAllClothesFromOrder(@RequestBody CustomerOrder order) {

        return new ResponseEntity<>(orderService.deleteAllFromOrder(order), HttpStatus.OK);
    }
}
