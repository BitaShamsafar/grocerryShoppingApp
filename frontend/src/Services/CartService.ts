import {api} from "./api.ts";
import type {Cart} from "../Types/Cart.ts";

// GET cart
export const getCart = (userId: string) => {
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