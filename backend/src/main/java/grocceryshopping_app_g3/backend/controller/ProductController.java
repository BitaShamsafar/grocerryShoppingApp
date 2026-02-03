package grocceryshopping_app_g3.backend.controller;

import lombok.RequiredArgsConstructor;
import grocceryshopping_app_g3.backend.model.Product;
import grocceryshopping_app_g3.backend.Service.ProductService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/products")
@RequiredArgsConstructor
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