import type {CartItem} from "./CartItem.ts";

export type Cart ={
    id: string;
    userId: string;
    items: CartItem[];
    totalPrice: number;
}