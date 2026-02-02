package grocceryshopping_app_g3.backend.Cart;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.Optional;

@Repository
public interface CartRepo extends MongoRepository<Cart,String> {
    Optional<Cart> findByUserId(String userId);
    void deleteByUserId(String userId);
}
