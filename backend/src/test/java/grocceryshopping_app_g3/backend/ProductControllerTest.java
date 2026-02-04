//package grocceryshopping_app_g3.backend;
//
//
//import org.example.backend.Product.model.Product;
//import org.example.backend.Product.service.ProductService;
//import org.junit.jupiter.api.BeforeEach;
//import org.junit.jupiter.api.Test;
//import org.mockito.Mockito;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
//import org.springframework.boot.test.mock.mockito.MockBean;
//import org.springframework.http.MediaType;
//import org.springframework.security.test.context.support.WithMockUser;
//import org.springframework.test.annotation.DirtiesContext;
//import org.springframework.test.web.servlet.MockMvc;
//
//import java.util.Arrays;
//import java.util.List;
//
//import static org.mockito.ArgumentMatchers.anyString;
//import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
//import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
//import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
//import com.fasterxml.jackson.databind.ObjectMapper;
//
//@WebMvcTest(ProductController.class)
//class ProductControllerTest {
//
//    @Autowired
//    private MockMvc mockMvc;
//
//    @MockBean
//    private ProductService service;
//
//    private final ObjectMapper objectMapper = new ObjectMapper();
//
//    private Product product1;
//    private Product product2;
//
//    @BeforeEach
//    void setup() {
//        product1 = new Product();
//        product1.setId("1");
//        product1.setName("Product 1");
//        product1.setCategory("Category A");
//
//        product2 = new Product();
//        product2.setId("2");
//        product2.setName("Product 2");
//        product2.setCategory("Category B");
//    }
//
//    @Test
//    @DirtiesContext
//    @WithMockUser
//    void getAllProducts() throws Exception {
//        List<Product> products = Arrays.asList(product1, product2);
//        Mockito.when(service.getAll()).thenReturn(products);
//
//        mockMvc.perform(get("/api/products")
//                        .contentType(MediaType.APPLICATION_JSON))
//                .andExpect(status().isOk())
//                .andExpect(content().json(objectMapper.writeValueAsString(products)));
//    }
//
//    @Test
//    @DirtiesContext
//    @WithMockUser
//    void getProductById() throws Exception {
//        Mockito.when(service.getById("1")).thenReturn(product1);
//
//        mockMvc.perform(get("/api/products/1")
//                        .contentType(MediaType.APPLICATION_JSON))
//                .andExpect(status().isOk())
//                .andExpect(content().json(objectMapper.writeValueAsString(product1)));
//    }
//
//    @Test
//    @DirtiesContext
//    @WithMockUser
//    void getProductsByCategory() throws Exception {
//        List<Product> categoryProducts = List.of(product1);
//        Mockito.when(service.getByCategory("Category A")).thenReturn(categoryProducts);
//
//        mockMvc.perform(get("/api/products/category/Category A")
//                        .contentType(MediaType.APPLICATION_JSON))
//                .andExpect(status().isOk())
//                .andExpect(content().json(objectMapper.writeValueAsString(categoryProducts)));
//    }
//
//    @Test
//    @DirtiesContext
//    @WithMockUser
//    void searchProducts() throws Exception {
//        List<Product> searchResults = List.of(product2);
//        Mockito.when(service.search("Product 2")).thenReturn(searchResults);
//
//        mockMvc.perform(get("/api/products/search")
//                        .param("q", "Product 2")
//                        .contentType(MediaType.APPLICATION_JSON))
//                .andExpect(status().isOk())
//                .andExpect(content().json(objectMapper.writeValueAsString(searchResults)));
//    }
//}
