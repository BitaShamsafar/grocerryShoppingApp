export type Product ={
    id: string;
    name: string;
    category?: string;
    price: number;
    unit?: string;
    stock?: number;
    image?: string;
}

export type ProductCardProps = {
    product: Product;
    index: number
}
