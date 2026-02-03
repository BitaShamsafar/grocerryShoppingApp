
import type {Cart} from "../Types/Cart.ts";
import {createContext, useContext, useEffect, useMemo, useState} from "react";
import {addToCart, getCart} from "../Services/CartService.ts";

// Define the type of the context
type CartContextType ={
    cart: Cart | null;
    cartCount: number;
    addItem: (productId: string, quantity: number) => void;
}
// Create the context
const CartContext = createContext<CartContextType | null>(null);

export default function CartProvider({ children }: { children: React.ReactNode }) {
    const [cart, setCart] = useState<Cart | null>(null);
    const USER_ID = "65f101a1bc001";// Hardcoded for now

    const addItem = (productId: string, quantity: number) => {
        addToCart(USER_ID, productId, quantity).then((updatedCart) => {
            if (updatedCart) {
                setCart(updatedCart)
            }
        });
    };

    // Load cart from backend
    useEffect(() => {
        getCart(USER_ID).then(setCart);
    }, []);
    // calculate the number of items
    const cartCount:number = cart ? cart.items.reduce((sum, item) => sum + item.quantity, 0) : 0;
    const value = useMemo(() => {
        return {cart, cartCount, addItem}
    }, [
        cart,
        cartCount,
    ])
    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
}

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) throw new Error("useCart must be used inside CartProvider");
    return context;
};


