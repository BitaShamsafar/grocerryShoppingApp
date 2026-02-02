import type { ProductCardProps} from "../Types/Product.ts";

const ProductCard = ({product, index}:ProductCardProps) => {
    const image = index <= 14 ? product.image : "error.png"
    return <div className="product-card">
        <img src={"src/assets/" + image} className="product-image"/>

        <h3 className="product-name">{product.name}</h3>
        <p className="product-price"><b>{product.price}€ </b> {product.unit}</p>

        <button className="add-btn">Add to Cart</button>
    </div>
}
export default ProductCard