import {createContext, useEffect, useState} from "react";
import useFetch from "../Hooks/useFetch.tsx";
import type {Product} from "../Types/Product.ts";
export type ProductsContextType = {
    searchQuery: string,
    setSearchQuery: (state: string) => void
    allProducts: Product[] | null
    errorMessage?: string
}

export const ProductsContext = createContext<ProductsContextType | null>(null)

const ProductContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [allProducts, setAllProducts]=useState<Product[]>([])
    const [searchQuery, setSearchQuery] = useState<string>('')
    const [errorMessage, setErrorMessage]= useState<string>()
    const data: Product[] | null = useFetch(searchQuery ? `products/search?q=${searchQuery}` : "products")
    useEffect(() => {
        if(data && data?.length > 0) {
            setAllProducts(data)
            setErrorMessage(undefined)
        }
        else setErrorMessage('No Product Found')
    }, [data])
    return <ProductsContext.Provider value={{
        searchQuery,
        setSearchQuery,
        allProducts,
        errorMessage,
    }}>
        {children}
    </ProductsContext.Provider>
}
export default ProductContextProvider