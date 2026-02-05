import {api} from "./api.ts";
import type {Cart} from "../Types/Cart.ts";

// GET cart
export const getCart = (userId: string) => {
    console.log('check', api)
    return api
        .get<Cart>("/cart", { params: { userId } })
        .then((res) => res.data)
        .catch((err) => {
            console.error("Failed to load cart!", err);
            return null;
        });
};

// POST: add item to cart
export const addToCart = (
    userId: string,
    productId: string,
    quantity: number
): Promise<Cart | null> => {
    return api
        .post<Cart>("/cart/add", null, {
            params: { userId, productId, quantity }
        })
        .then(res => res.data)
        .catch(err => {
            console.error("Failed to add item to cart!", err);
            return null;
        });
};

// UPDATE quantity
export const updateCartItem = (
    userId: string,
    productId: string,
    quantity: number
) => {
    return api
        .put<Cart>("/cart/update", null, {
            params: { userId, productId, quantity }
        })
        .then(res => res.data)
        .catch(err => {
            console.error("Failed to update cart item!", err);
            return null;
        });
};
//Remove Item
export const removeCartItem = (
    userId: string,
    productId: string
) => {
    return api
        .delete<Cart>(`/cart/remove/${productId}`, {
            params: { userId }
        })
        .then(res => res.data)
        .catch(err => {
            console.error("Failed to remove item!", err);
            return null;
        });
};
// DELETE: clear cart
export const clearCartApi = (userId: string) => {
    return api
        .delete("/cart/clear", { params: { userId } })
        .then(res => res.data)
        .catch(err => {
            console.error("Failed to clear cart", err);
            return null;
        });
};


