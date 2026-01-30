import React from 'react';
import {useCart} from "../Context/CartContext.tsx";

export default function Navbar() {
    const { cartCount } = useCart();
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
                <button  className="cart-btn">
                    🛒 Cart ({cartCount})
                </button>
                </div>
            </nav>
        </div>
    );
}

