package com.snappickk.dto;

public class OrderItemDTO {
    private Long id;
    private String productName;
    private Integer quantity;
    private Long totalPrice;

    // Constructor, getters, setters
    public OrderItemDTO(Long id, String productName, Integer quantity, Long totalPrice) {
        this.id = id;
        this.productName = productName;
        this.quantity = quantity;
        this.totalPrice = totalPrice;
    }
}
