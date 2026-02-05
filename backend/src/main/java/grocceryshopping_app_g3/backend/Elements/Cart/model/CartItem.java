package grocceryshopping_app_g3.backend.Elements.Cart.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CartItem {
    private String productId;
    private String name;
    private double price;
    private int quantity;
    private String image;
}
