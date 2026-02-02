package org.example.backend.Product.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@AllArgsConstructor
@Document(collection = "products")
public class Product {

    @Id
    private String id;   // Mongo ObjectId

    private String name;
    private String category;
    private Double price;
    private String unit;
    private Integer stock;
    private String image;
}