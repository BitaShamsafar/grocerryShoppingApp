import React from 'react';
import {useCart} from "../Context/CartContext.tsx";
import "../Styles/CartPage.css";

export default function CartPage() {
    const { cart, updateItem } = useCart();

    if (!cart) return <p>Loading cart...</p>;

    return (

        <div className="cart-page">
            <h2 className="cart-title">My Cart</h2>

            {cart.items.length === 0 ? (
                <p className="cart-empty">Your cart is empty!</p>
            ) : (
                <table className="cart-table">
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
                                <div className="cart-product">
                                    <img
                                        src={"/assets/" + item.image}
                                        alt={item.name}
                                    />
                                    <span>{item.name}</span>
                                </div>
                            </td>
                            <td>{item.price.toFixed(2)}€</td>
                            <td>
                                <div className="quantity">
                                    <button
                                        className="reduce"
                                        onClick={() =>
                                            updateItem(item.productId, Math.max(item.quantity - 1, 1))
                                        }
                                    >
                                        -
                                    </button>

                                    <div className="quantity_input">{item.quantity}</div>

                                    <button
                                        className="add"
                                        onClick={() =>
                                            updateItem(item.productId, item.quantity + 1)
                                        }
                                    >
                                        +
                                    </button>
                                </div>
                            </td>
                            <td>{(item.price * item.quantity).toFixed(2)}€</td>
                        </tr>
                    ))}

                    <tr className="cart-total-row">
                        <td colSpan={3} className="cart-total-label">
                            Total:
                        </td>
                        <td>{cart.totalPrice.toFixed(2)}€</td>
                    </tr>
                    </tbody>
                </table>
            )}
        </div>
    );
}

