package grocceryshopping_app_g3.backend.repository;

import grocceryshopping_app_g3.backend.model.Product;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductRepository
        extends MongoRepository<Product, String> {

    Optional<Product> findById(String id);
    List<Product> findByCategoryIgnoreCase(String category);

    List<Product> findByNameContainingIgnoreCase(String name);
}