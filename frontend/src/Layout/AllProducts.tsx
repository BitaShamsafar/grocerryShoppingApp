import {useEffect, useRef, useState} from "react";
import type {Product} from "../Types/Product.ts";
import ProductCard from "../components/ProductCard.tsx";
import {api} from "../Services/api.ts";

const AllProducs = () => {
    const [allProducts, setAllProducts]=useState<Product[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [slicedData, setSlicedData] = useState<Product[]>([])
    const sliceIndex = useRef(12)
    const [isEndOfData, setIsEndOfData] = useState<boolean>(false)
    const loadMore = () => {
       if(sliceIndex.current >= allProducts.length){
           setIsEndOfData(true)
           return;
       }
       console.log("sliceIndex.current", sliceIndex.current)
       setSlicedData(prevState => [...prevState,
           ...(allProducts.slice(sliceIndex.current, sliceIndex.current+12))])
        sliceIndex.current = sliceIndex.current + 12
    }
    useEffect(() => {
        api.get('products')
          .then(response =>{
              setAllProducts(response.data)
              setSlicedData(response.data.slice(0,sliceIndex.current))
          })
          .catch(err => {
              throw new Error("error fetching data" + err)
          })
          .finally(() => setLoading(false))
    }, []);
  return(
    <div className="products_container">
    <div className="products-grid">
      {loading ? "Loading" :
          slicedData.map((product, index) =>
              <ProductCard key={product.id} index={index} product={product} />)
      }
    </div>
        {!isEndOfData && < button className="load-more-btn" onClick={() => loadMore()}>Load more</button>}
    </div>)
}

export default AllProducs