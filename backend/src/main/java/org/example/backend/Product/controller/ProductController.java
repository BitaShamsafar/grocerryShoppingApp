package org.example.backend.Product.controller;

import lombok.RequiredArgsConstructor;
import org.example.backend.Product.model.Product;
import org.example.backend.Product.service.ProductService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/products")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class ProductController {

    private final ProductService service;

    @GetMapping
    public List<Product> getAll() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public Product getById(@PathVariable String id) {
        return service.getById(id);
    }

    @GetMapping("/category/{name}")
    public List<Product> getByCategory(@PathVariable String name) {
        return service.getByCategory(name);
    }

    @GetMapping("/search")
    public List<Product> search(@RequestParam String q) {
        return service.search(q);
    }
}