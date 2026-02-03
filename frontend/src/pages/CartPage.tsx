import React from 'react';
import {useCart} from "../Context/CartContext.tsx";

export default function CartPage(props) {
    const { cart } = useCart();

    if (!cart) return <p>Loading cart...</p>;

    return (
        <div style={{ padding: "24px" }}>
            <h2>My Cart</h2>
            {cart.items.length === 0 ? (
                <p>Your cart is empty!</p>
            ) : (
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                    <tr>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Subtotal</th>
                    </tr>
                    </thead>
                    <tbody>
                    {cart.items.map((item) => (
                        <tr key={item.productId}>
                            <td>
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    style={{ width: "40px", marginRight: "8px" }}
                                />
                                {item.name}
                            </td>
                            <td>${item.price.toFixed(2)}</td>
                            <td>{item.quantity}</td>
                            <td>${(item.price * item.quantity).toFixed(2)}</td>
                        </tr>
                    ))}
                    <tr>
                        <td colSpan={3} style={{ textAlign: "right", fontWeight: "bold" }}>
                            Total:
                        </td>
                        <td style={{ fontWeight: "bold" }}>${cart.totalPrice.toFixed(2)}</td>
                    </tr>
                    </tbody>
                </table>
            )}
        </div>
    );
}

