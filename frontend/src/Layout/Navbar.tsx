import {useState} from 'react';
import {useCart} from "../Context/CartContext.tsx";

export default function Navbar() {
    const { cart, cartCount } = useCart();
    const [showCart, setShowCart] = useState(false);
    return (
        <div>
            <nav className="navbar">
                <h2 className="navbar-title">🛒 Grocery App</h2>
                {/*Search field*/}
                <div className="navbar-center">
                    <div className="search-container">
                        <span>🔍</span>
                    <input
                        type="text"
                        placeholder="Search for products..."
                    />
                    </div>
                </div>
                <div className="navbar-right">
                {/* Login button */}
                <button className="login-btn">
                    👤Login
                </button>
                {/* Wishlist button */}
                <button className="wishlist-btn">
                    ❤️ Wishlist
                </button>
                {/* Cart button with item count */}
                <button  className="cart-btn" onClick={() => setShowCart(!showCart)}>
                    🛒 Cart ({cartCount})
                </button>
                    {/* Cart Dropdown */}
                    {showCart && cart && (
                        <div className="cart-dropdown">
                            {/* Header */}
                            <h3 className="cart-dropdown-title">My Cart</h3>
                            {cart.items.length === 0 ? (
                                <p className="empty-cart">Your cart is empty!</p>
                            ) : (
                                <ul className="cart-items">
                                    {cart.items.map((item) => (
                                        <li key={item.productId} className="cart-item">
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="cart-item-image"
                                            />
                                            <span>{item.name}</span>
                                            <span>
                        {item.quantity} × ${item.price.toFixed(2)}
                      </span>
                                        </li>
                                    ))}
                                    <li className="cart-total">
                                        Total: ${cart.totalPrice.toFixed(2)}
                                    </li>
                                </ul>
                            )}
                        </div>
                    )}
                </div>
            </nav>
        </div>
    );
}

