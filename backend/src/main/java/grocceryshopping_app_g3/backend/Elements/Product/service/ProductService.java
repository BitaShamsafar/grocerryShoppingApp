package grocceryshopping_app_g3.backend.Elements.Product.service;


import grocceryshopping_app_g3.backend.Elements.Product.model.Product;
import grocceryshopping_app_g3.backend.Elements.Product.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository repo;

    public List<Product> getAll() {
        return repo.findAll();   // 👈 Reads from MongoDB
    }

    public Product getById(String id) {
        return repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Product Not Found"));
    }
    // Get by category
    public List<Product> getByCategory(String category) {
        return repo.findByCategoryIgnoreCase(category);
    }

    // Search by name
    public List<Product> search(String query) {
        return repo.findByNameContainingIgnoreCase(query);
    }
}