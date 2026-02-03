import {useState} from 'react';
import {useCart} from "../Context/CartContext.tsx";
import {Link} from "react-router-dom";

export default function Navbar() {
    const { cart, cartCount } = useCart();
    const [showCart, setShowCart] = useState(false);
    return (
        <>
            <div onClick={() => setShowCart(false)}
                 className={showCart ? "popup-overlay" : "popup-overlay-none"}
            ></div>
        <div>
            <nav className="navbar">
                <Link to="/">
                <h2 className="navbar-title">🛒 Grocery App</h2></Link>
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
                {/*<button className="login-btn">*/}
                {/*    👤Login*/}
                {/*</button>*/}

                <button className="wishlist-btn">
                    ❤️
                </button>

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
                                <>
                                <ul className="cart-items">
                                    {cart.items.map((item) => (
                                        <li key={item.productId} className="cart-item">
                                            <img
                                                src={"/assets/" + item.image}
                                                alt={item.name}
                                                className="cart-item-image"
                                            />
                                            <span>{item.name}</span>
                                            <span>
                        {item.quantity} × ${item.price.toFixed(2)}
                      </span>
                                        </li>
                                    ))}

                                </ul>
                                <div className="cart-total">
                                     Total: ${cart.totalPrice.toFixed(2)}
                                </div>
                                </>
                            )}
                        </div>
                    )}
                </div>
            </nav>
        </div></>
    );
}

