package grocceryshopping_app_g3.backend.Elements.Cart.controller;

import grocceryshopping_app_g3.backend.Elements.Cart.model.Cart;
import grocceryshopping_app_g3.backend.Elements.Cart.repository.CartRepo;
import grocceryshopping_app_g3.backend.Elements.Product.model.Product;
import grocceryshopping_app_g3.backend.Elements.Product.repository.ProductRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import static org.junit.jupiter.api.Assertions.*;
@SpringBootTest
@AutoConfigureMockMvc
class CartControllerTest {
    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private CartRepo repo;
    @Autowired
    private ProductRepository productRepository;
    // Before each Test clean the test database
    @BeforeEach
    void cleanTestDb() {
        repo.deleteAll();
        productRepository.deleteAll();
    }
    @Test
    void getCartTest() throws Exception{
        //GIVEN
        Cart cart = new Cart();
        cart.setUserId("65f101a1bc001");
        repo.save(cart);
        //WHEN
        mockMvc.perform(MockMvcRequestBuilders
                        .get("/api/cart")
                        .param("userId", "65f101a1bc001"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.userId")
                        .value("65f101a1bc001"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.items").isArray())
                .andExpect(MockMvcResultMatchers.jsonPath("$.totalPrice")
                        .value(0.0));
    }

    @Test
    void addItemTest() throws Exception{
        // GIVEN: Product
        Product product = new Product();
        product.setId("6978a4a2790ef024626e4593");
        product.setName("Face Cream");
        product.setPrice(8.7);
        product.setStock(100);
        product.setImage("face_cream.png");

        productRepository.save(product);
        //WHEN
        mockMvc.perform(
                        MockMvcRequestBuilders.post("/api/cart/add")
                                .param("userId", "65f101a1bc001")
                                .param("productId", "6978a4a2790ef024626e4593")
                                .param("quantity", "1")
                )
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.userId")
                        .value("65f101a1bc001"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.items[0].productId")
                        .value("6978a4a2790ef024626e4593"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.items[0].name")
                        .value("Face Cream"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.items[0].quantity")
                        .value(1))
                .andExpect(MockMvcResultMatchers.jsonPath("$.totalPrice")
                        .value(8.7));
    }

    @Test
    void updateItemTest()throws Exception {
        Product product = new Product();
        product.setId("6978a4a2790ef024626e4593");
        product.setName("Face Cream");
        product.setPrice(8.0);
        product.setStock(100);
        product.setImage("face_cream.png");

        productRepository.save(product);

        // AND: Product added to the cart
        mockMvc.perform(
                MockMvcRequestBuilders.post("/api/cart/add")
                        .param("userId", "65f101a1bc001")
                        .param("productId", "6978a4a2790ef024626e4593")
                        .param("quantity", "1")
        ).andExpect(MockMvcResultMatchers.status().isOk());

        // WHEN: Quantity changed
        mockMvc.perform(
                        MockMvcRequestBuilders.put("/api/cart/update")
                                .param("userId", "65f101a1bc001")
                                .param("productId", "6978a4a2790ef024626e4593")
                                .param("quantity", "2")
                )
                // THEN
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.items[0].quantity")
                        .value(2))
                .andExpect(MockMvcResultMatchers.jsonPath("$.totalPrice")
                        .value(16.0));
    }

    @Test
    void removeItemTest()throws Exception {
        // GIVEN: Product
        Product product = new Product();
        product.setId("6978a4a2790ef024626e4593");
        product.setName("Face Cream");
        product.setPrice(8.7);
        product.setStock(100);
        product.setImage("face_cream.png");

        productRepository.save(product);

        // AND: Product is in the Cart
        mockMvc.perform(
                MockMvcRequestBuilders.post("/api/cart/add")
                        .param("userId", "65f101a1bc001")
                        .param("productId", "6978a4a2790ef024626e4593")
                        .param("quantity", "2")
        ).andExpect(MockMvcResultMatchers.status().isOk());

        // WHEN: Item will be removed
        mockMvc.perform(
                        MockMvcRequestBuilders.delete("/api/cart/remove/{productId}",
                                        "6978a4a2790ef024626e4593")
                                .param("userId", "65f101a1bc001")
                )
                // THEN
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.userId")
                        .value("65f101a1bc001"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.items").isEmpty())
                .andExpect(MockMvcResultMatchers.jsonPath("$.totalPrice")
                        .value(0.0));
    }

    @Test
    void clearCartTest() throws Exception{
        // GIVEN: 2 products
        Product product1 = new Product();
        product1.setId("6978a4a2790ef024626e4593");
        product1.setName("Face Cream");
        product1.setPrice(8.7);
        product1.setStock(100);
        product1.setImage("face_cream.png");

        Product product2 = new Product();
        product2.setId("6978a4a2790ef024626e4594");
        product2.setName("Shampoo");
        product2.setPrice(4.3);
        product2.setStock(50);
        product2.setImage("shampoo.png");

        productRepository.save(product1);
        productRepository.save(product2);

        // AND: add them to the cart
        mockMvc.perform(
                MockMvcRequestBuilders.post("/api/cart/add")
                        .param("userId", "65f101a1bc001")
                        .param("productId", product1.getId())
                        .param("quantity", "2")
        ).andExpect(MockMvcResultMatchers.status().isOk());

        mockMvc.perform(
                MockMvcRequestBuilders.post("/api/cart/add")
                        .param("userId", "65f101a1bc001")
                        .param("productId", product2.getId())
                        .param("quantity", "1")
        ).andExpect(MockMvcResultMatchers.status().isOk());

        // WHEN: Cart has to be empty
        mockMvc.perform(
                        MockMvcRequestBuilders.delete("/api/cart/clear")
                                .param("userId", "65f101a1bc001")
                )
                // THEN
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.userId")
                        .value("65f101a1bc001"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.items").isEmpty())
                .andExpect(MockMvcResultMatchers.jsonPath("$.totalPrice")
                        .value(0.0));
    }
}