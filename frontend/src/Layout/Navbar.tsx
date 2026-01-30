import React from 'react';
import {useCart} from "../Context/CartContext.tsx";

export default function Navbar() {
    const { cartCount } = useCart();
    return (
        <div>
            <nav>
                <h2>🛒 Grocery App</h2>
                {/*Search field*/}
                <input
                    type="text"
                    placeholder="Search for products..."
                />
                {/* Login button */}
                <button>
                    Login
                </button>
                {/* Wishlist button */}
                <button>
                    ❤️ Wishlist
                </button>
                {/* Cart button with item count */}
                <button>
                    🛒 Cart ({cartCount})
                </button>
            </nav>
        </div>
    );
}

