package grocceryshopping_app_g3.backend.Elements.Cart.controller;

import grocceryshopping_app_g3.backend.Elements.Cart.Service.CartService;
import grocceryshopping_app_g3.backend.Elements.Cart.model.Cart;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cart")
public class CartController {
    private final CartService cartService;

    public CartController(CartService cartService) {
        this.cartService = cartService;
    }

    // GET /
    @GetMapping
    public Cart getCart(@RequestParam String userId) {
        return cartService.getCart(userId);
    }
    //POST
    @PostMapping("/add")
    public Cart addItem(@RequestParam String userId,
                        @RequestParam String productId,
                        @RequestParam int quantity) {
        return cartService.addItem(userId, productId, quantity);
    }

    // PUT /update
    @PutMapping("/update")
    public Cart updateItem(@RequestParam String userId,
                           @RequestParam String productId,
                           @RequestParam int quantity) {
        return cartService.updateQuantity(userId, productId, quantity);
    }
    // DELETE /remove/{productId}
    @DeleteMapping("/remove/{productId}")
    public Cart removeItem(@RequestParam String userId,
                           @PathVariable String productId) {
        return cartService.removeItem(userId, productId);
    }

    // DELETE /clear
    @DeleteMapping("/clear")
    public Cart clearCart(@RequestParam String userId) {
        return cartService.clearCart(userId);
    }

}
