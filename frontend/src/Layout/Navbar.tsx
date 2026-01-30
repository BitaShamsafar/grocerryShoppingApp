import React from 'react';

export default function Navbar(props) {
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
                    🛒 Cart ({props.cartCount ?? 0})
                </button>
            </nav>
        </div>
    );
}

