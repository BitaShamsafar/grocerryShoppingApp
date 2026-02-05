import {useState, useEffect, useContext} from 'react';
import {useCart} from "../Context/CartContext.tsx";
import {useNavigate} from "react-router-dom";
import {Link} from "react-router-dom";
import axios from "axios";
import {ProductsContext, type ProductsContextType} from "../Context/ProductsContext.tsx";

export default function Navbar() {
    const { cart, cartCount } = useCart();
    const [showCart, setShowCart] = useState(false);
    const {searchQuery, setSearchQuery} = useContext<ProductsContextType>(ProductsContext)

    // org.example.backend.BackendApplication

    const navigate = useNavigate();

    const goToCartPage = () => {
        setShowCart(false); // Dropdown schließen
        navigate("/getCart");
    };
    const [user, setUser] = useState<string | null>(null);
    function login(){
        const host:string=window.location.host === 'localhost:5173' ? 'http://localhost:8080': window.location.origin
        window.open(host + '/oauth2/authorization/github', '_self')
    }
    function logout(){
        const host:string=window.location.host === 'localhost:5173' ? 'http://localhost:8080': window.location.origin
        window.open(host + '/logout', '_self')
    }



    const loadUser = () => {
        axios.get('api/auth/me')
            .then(res => {setUser(res.data);
                // Redirect nach Login
                const redirect = sessionStorage.getItem("redirectAfterLogin");
                if (redirect) {
                    sessionStorage.removeItem("redirectAfterLogin");
                    navigate(redirect);}
                })
            .catch(() => setUser(null));
    }
        useEffect(() => {
            loadUser();
        }, []);
    return (
        <>
            <div onClick={() => setShowCart(false)}
                 className={showCart ? "popup-overlay" : "popup-overlay-none"}
            ></div>
        <div>
            <nav className="navbar">
                <Link className="link-item" to="/">
                <h2 className="navbar-title">We Make 🛒 Easy</h2></Link>
                {/*Search field*/}
                <div className="navbar-center">
                    <div className="search-container">
                        <span>🔍</span>
                    <input
                        type="text"
                        placeholder="Search for products..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    </div>
                </div>
                <div className="navbar-right">
                {/* Login Logout buttons */}
                    {user ? (
                        <>
                            <span className="user-name"> Hello {user} !</span>
                            <button className="logout-btn" onClick={logout}>
                                👤 Logout
                            </button>
                        </>
                    ) : (
                        <button className="login-btn" onClick={login}>
                            👤 Login
                        </button>
                    )}
                {/* Wishlist button
                <button className="wishlist-btn">
                    ❤️ Wishlist
                </button>*/}
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
                                <>
                                <ul className="cart-items">
                                    {cart.items.map((item) => (
                                        <li key={item.productId} className="cart-item">
                                            <img
                                                src={"/assets/" + item.image}
                                                alt={item.name}
                                                className="cart-item-image"
                                            />
                                            <span>
                                                {item.name}
                                            </span>
                                            <span>
                                                 {item.quantity} × {item.price.toFixed(2)} €
                                            </span>
                                        </li>
                                    ))}

                                </ul>
                                <div className="cart-total">
                                     Total: {cart.totalPrice.toFixed(2)}€
                                </div>
                                </>
                            )}
                            {/* View Cart Button */}
                            <button className="cart-btn" onClick={goToCartPage}>
                                View Cart
                            </button>
                        </div>
                    )}
                </div>
            </nav>
        </div>
            </>
    );
}

