package grocceryshopping_app_g3.backend.Service;

import lombok.RequiredArgsConstructor;
import grocceryshopping_app_g3.backend.model.Product;
import grocceryshopping_app_g3.backend.repository.ProductRepository;
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