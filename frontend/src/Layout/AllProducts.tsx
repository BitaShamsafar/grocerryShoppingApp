import {type ReactElement, useContext, useEffect, useRef, useState} from "react";
import type {Product} from "../Types/Product.ts";
import ProductCard from "../Components/ProductCard.tsx";
import {ProductsContext, type ProductsContextType} from "../Context/ProductsContext.tsx";

const AllProducs = () => {

    const [loading, setLoading] = useState<boolean>(true)
    const [slicedData, setSlicedData] = useState<Product[]>([])
    const sliceIndex = useRef(15)
    const [isEndOfData, setIsEndOfData] = useState<boolean>(false)
    //const { allProducts, errorMessage } =useContext<ProductsContextType>(ProductsContext)
    const context:ProductsContextType|null = useContext(ProductsContext);        // <- useContext aufrufen
    if (!context) throw new Error("ProductsContext not available"); // <- Null-Prüfung

    const { allProducts, errorMessage } = context;

    const loadMore = () => {
       if(sliceIndex.current >= allProducts.length){
           setIsEndOfData(true)
           return;
       }
       setSlicedData(prevState => [...prevState,
           ...(allProducts.slice(sliceIndex.current, sliceIndex.current+15))])
        sliceIndex.current = sliceIndex.current + 15
    }
    useEffect(() => {
        if(allProducts){

            setSlicedData(allProducts.slice(0,sliceIndex.current))
            setLoading(false)
        }
    }, [allProducts]);

  return errorMessage ? <div  className="products-grid">
      <img className="error-img" alt="not found" src="../assets/error.png" />
  </div> : ( <div className="products_container">
      <div className="products-grid">
          {loading ? "Loading" :
              slicedData.map((product: Product, index: number): ReactElement =>
                  <ProductCard key={product.id} index={index} product={product}/>)
          }
      </div>
      {!isEndOfData && < button className="load-more-btn" onClick={() => loadMore()}>Load more</button>}
  </div>)

}

export default AllProducs