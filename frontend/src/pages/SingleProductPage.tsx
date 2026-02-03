import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import type {Product} from "../Types/Product.ts";
import {api} from "../Services/api.ts";
import {useCart} from "../Context/CartContext.tsx";

const SingleProductPage = () =>{
    const { id } = useParams();
    const [product, setProduct] = useState<Product>()
    useEffect(() => {
            api.get("products/"+id)
                .then(response => setProduct(response.data))
                .catch(err => {
                    throw new Error("item not found" + err)
                })
    }, [id]);
    const {addItem} = useCart()
    const [quantity, setQuantity] = useState<number>(1)
    return (
                product ?
                    <div className="singleProduct_wrapper">
                        <div className="singleProduct_image">
                            <img
                                alt={product?.name}
                                src={"/assets/" + product?.image}
                                className="product-image"
                            />
                            {/*<div className="thumbnail-row">*/}
                            {/*    {product?.thumbnails?.map((thumb, index) => (*/}
                            {/*        <img*/}
                            {/*            key={index}*/}
                            {/*            src={"/assets/" + thumb}*/}
                            {/*            className="thumbnail"*/}
                            {/*            alt={`thumb-${index}`}*/}
                            {/*        />*/}
                            {/*    ))}*/}
                            {/*</div>*/}
                        </div>

                        <div className="singleProduct_details">
                            <h2 className="title">{product.name}</h2>
                            <div className="category">Category &gt; {product.category}</div>
                            <div className="price"><span>Price:</span> €{product.price}  <span>/ {product.unit}</span></div>
                            <div className="stock">
                                {
                                    (product?.stock > 0) ?
                                        product?.stock + " unit available in stock"
                                        : <span className="not_available">currently not available in stock</span>
                                }
                            </div>


                            <div className="quantity">
                                <button
                                    onClick={() => setQuantity(prev => Math.max(prev - 1, 1))}
                                    className="reduce"
                                >-</button>
                                <div className="quantity_input">{quantity}</div>
                                <button
                                    onClick={() => setQuantity(prev => prev + 1)}
                                    className="add"
                                >+</button>

                            </div>
                                <button
                                    onClick={() => addItem(product.id, quantity)}
                                    className={product?.stock > 0 ? "addToCart-btn addToCart-btn-available" : "addToCart-btn addToCart-disabled"}
                                    disabled={product?.stock <= 0}
                                >
                                    Add to Cart
                                </button>


                        </div>
                    </div>

                    // <div className="related-products">
                    //     <h3>Related Products</h3>
                    //     <div className="related-list">
                    //         {relatedProducts.map(item => (
                    //             <div key={item.id} className="related-item">
                    //                 <img src={"/assets/" + item.image} alt={item.name} />
                    //                 <div className="related-name">{item.name}</div>
                    //                 <div className="related-price">${item.price}</div>
                    //                 <button className="addToCart-btn">Add to Cart</button>
                    //             </div>
                    //         ))}
                    //     </div>
                    // </div>

:
                    <div>Loading</div>)



}
export default SingleProductPage;