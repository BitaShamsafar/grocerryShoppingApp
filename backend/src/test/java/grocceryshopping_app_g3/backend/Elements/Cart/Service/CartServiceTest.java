package grocceryshopping_app_g3.backend.Elements.Cart.Service;

import grocceryshopping_app_g3.backend.Elements.Cart.model.Cart;
import grocceryshopping_app_g3.backend.Elements.Cart.model.CartItem;
import grocceryshopping_app_g3.backend.Elements.Cart.repository.CartRepo;
import grocceryshopping_app_g3.backend.Elements.Product.model.Product;
import grocceryshopping_app_g3.backend.Elements.Product.repository.ProductRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class CartServiceTest {
    @Mock
    CartRepo cartRepo;

    @Mock
    ProductRepository productRepository;

    @InjectMocks
    CartService cartService;

    @Test
    void getCart_shouldReturnEmptyCart_whenCartDoesNotExist() {
        // GIVEN
        String userId = "user1";
        Cart emptyCart = new Cart();
        emptyCart.setUserId(userId);

        when(cartRepo.findByUserId(userId))
                .thenReturn(Optional.empty());
        when(cartRepo.save(emptyCart))
                .thenReturn(emptyCart);

        // WHEN
        Cart actual = cartService.getCart(userId);

        // THEN
        assertEquals(userId, actual.getUserId());
        assertEquals(0, actual.getItems().size());
        assertEquals(0.0, actual.getTotalPrice());

    }

    @Test
    void addItem_shouldAddNewProductToCart() {
        // GIVEN
        String userId = "user1";
        String productId = "p1";

        Product product = new Product(
                productId,
                "Face Cream",
                "Household",
                8.7,
                "500ml",
                100,
                "face_cream.png"
        );

        Cart cart = new Cart();
        cart.setUserId(userId);

        when(cartRepo.findByUserId(userId))
                .thenReturn(Optional.of(cart));
        when(productRepository.findById(productId))
                .thenReturn(Optional.of(product));
        when(cartRepo.save(cart))
                .thenReturn(cart);

        // WHEN
        Cart actual = cartService.addItem(userId, productId, 1);

        // THEN
        assertEquals(1, actual.getItems().size());
        assertEquals("Face Cream", actual.getItems().get(0).getName());
        assertEquals(1, actual.getItems().get(0).getQuantity());
        assertEquals(8.7, actual.getTotalPrice());
    }

    @Test
    void updateQuantity_shouldUpdateQuantityAndTotal() {
        // GIVEN
        String userId = "user1";
        String productId = "prod1";

        Cart cart = new Cart();
        cart.setUserId(userId);

        cart.getItems().add(
                new CartItem(productId, "Face Cream", 10.0, 1, "img.png")
        );

        when(cartRepo.findByUserId(userId))
                .thenReturn(Optional.of(cart));
        when(cartRepo.save(cart))
                .thenReturn(cart);

        // WHEN
        Cart actual = cartService.updateQuantity(userId, productId, 3);

        // THEN
        assertEquals(1, actual.getItems().size());
        assertEquals(3, actual.getItems().get(0).getQuantity());
        assertEquals(30.0, actual.getTotalPrice());
    }

    @Test
    void removeItem_shouldRemoveProductFromCart() {
        // GIVEN
        String userId = "user1";
        String productId = "p1";

        Cart cart = new Cart();
        cart.setUserId(userId);
        cart.getItems().add(
                new grocceryshopping_app_g3.backend.Elements.Cart.model.CartItem(
                        productId, "Face Cream", 8.7, 1, "face_cream.png"
                )
        );

        when(cartRepo.findByUserId(userId))
                .thenReturn(Optional.of(cart));
        when(cartRepo.save(cart))
                .thenReturn(cart);

        // WHEN
        Cart actual = cartService.removeItem(userId, productId);

        // THEN
        assertEquals(0, actual.getItems().size());
        assertEquals(0.0, actual.getTotalPrice());
    }

    @Test
    void clearCart_shouldRemoveAllItems() {
        // GIVEN
        String userId = "user1";

        Cart cart = new Cart();
        cart.setUserId(userId);

        cart.getItems().add(
                new CartItem("prod1", "Face Cream", 10.0, 2, "img.png")
        );
        cart.setTotalPrice(20.0);

        when(cartRepo.findByUserId(userId))
                .thenReturn(Optional.of(cart));
        when(cartRepo.save(cart))
                .thenReturn(cart);

        // WHEN
        Cart actual = cartService.clearCart(userId);

        // THEN
        assertTrue(actual.getItems().isEmpty());
        assertEquals(0.0, actual.getTotalPrice());
    }
}