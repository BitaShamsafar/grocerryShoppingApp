package org.example.backend.Cart;


import org.example.backend.Product.model.Product;
import org.example.backend.Product.repository.ProductRepository;
import org.springframework.stereotype.Service;

@Service
public class CartService {
    private final CartRepo cartRepo;
    private final ProductRepository productRepo;

    public CartService(CartRepo cartRepo , ProductRepository productRepo) {
        this.cartRepo = cartRepo;
        this.productRepo = productRepo;
    }

    // Auxiliary function: get a Cart by user ID or create one for this user
    // Get or create cart
    private Cart getOrCreateCart(String userId) {
        return cartRepo.findByUserId(userId)
                .orElseGet(() -> {
                    Cart cart = new Cart();
                    cart.setUserId(userId);
                    return cartRepo.save(cart);
                });
    }
    //Calculate the total price
    private void calculateTotal(Cart cart) {
        double total = 0;
        for (CartItem item : cart.getItems()) {
            total += item.getPrice() * item.getQuantity();
        }
        cart.setTotalPrice(total);
    }

    // GET
    public Cart getCart(String userId) {
        Cart cart = getOrCreateCart(userId);
        calculateTotal(cart);
        return cartRepo.save(cart);
    }

    // POST
    public Cart addItem(String userId, String productId, int quantity) {
        //Get the cart
        Cart cart = getOrCreateCart(userId);

        // Get the product
        Product product = productRepo.findById(productId)
                .orElseThrow(() ->
                        new RuntimeException("Product not found: " + productId)
                );

        // Check if Produkt is already im cart
        for (CartItem item : cart.getItems()) {
            if (item.getProductId().equals(productId)) {
                item.setQuantity(item.getQuantity() + quantity);
                calculateTotal(cart);
                return cartRepo.save(cart);
            }
        }

        // Add a new CartItem
        CartItem newItem = new CartItem(
                product.getId(),
                product.getName(),
                product.getPrice(),
                quantity,
                product.getImage()
        );

        cart.getItems().add(newItem);
        calculateTotal(cart);
        return cartRepo.save(cart);
    }

    // PUT /update
    public Cart updateQuantity(String userId, String productId, int quantity) {
        Cart cart = getOrCreateCart(userId);

        cart.getItems().removeIf(item -> {
            if (item.getProductId().equals(productId)) {
                if (quantity <= 0) return true;
                item.setQuantity(quantity);
            }
            return false;
        });

        calculateTotal(cart);
        return cartRepo.save(cart);
    }
    // DELETE /remove/{productId}
    public Cart removeItem(String userId, String productId, int quantityToRemove) {
        Cart cart = getOrCreateCart(userId);

        for (CartItem item : cart.getItems()) {
            if (item.getProductId().equals(productId)) {
                int newQuantity = item.getQuantity() - quantityToRemove;
                if (newQuantity <= 0) {
                    // remove all
                    cart.getItems().remove(item);
                } else {
                    item.setQuantity(newQuantity);
                }
                break;
            }
        }
        calculateTotal(cart);
        return cartRepo.save(cart);
    }
    //delete all items
    public Cart clearCart(String userId) {
        // Get the cart (or create if not exists)
        Cart cart = getOrCreateCart(userId);

        // Empty items
        cart.getItems().clear();

        // Reset total
        cart.setTotalPrice(0);

        // Save the cart
        return cartRepo.save(cart);
    }

/*
    // DELETE /clear the cart
    public void clearCart(String userId) {
        cartRepo.deleteByUserId(userId);
    }*/
}


