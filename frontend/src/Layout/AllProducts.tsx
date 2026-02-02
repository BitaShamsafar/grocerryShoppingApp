import {useEffect, useRef, useState} from "react";
import type {Product} from "../Types/Product.ts";
import ProductCard from "../components/ProductCard.tsx";

const AllProducs = () => {
    const [allProducts, setAllProducts]=useState<Product[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [slicedData, setSlicedData] = useState<Product[]>([])
    const sliceIndex = useRef(15)
    const loadMore = () => {
       setSlicedData(prevState => [...prevState,
           ...(allProducts.slice(sliceIndex.current, sliceIndex.current+12))])
    }
    useEffect(() => {
      fetch('http://localhost:8080/products')
          .then(response => response.json())
          .then(products => {
              setAllProducts(products)
              setSlicedData(products.slice(0,sliceIndex.current))
          })
          .catch(err => {
              throw new Error("error fetching data" + err)
          })
          .finally(() => setLoading(false))
    }, []);
  return(
    <>
    <div className="products-grid">
      {loading ? "Loading" :
          slicedData.map((product, index) =>
              <ProductCard key={product.id} index={index} product={product} />)
      }
    </div>
        <button className="load-more-btn" onClick={() => loadMore()}>Load more...</button>
    </>)
}

export default AllProducs