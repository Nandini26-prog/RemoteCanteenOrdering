package com.snappickk.request;

import lombok.Data;

@Data
public class CreateIngredientCategoryRequest {

    private Long restaurantId;
    private String name;
}
