package org.example.backend.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
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