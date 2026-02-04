import type { ProductCardProps} from "../Types/Product.ts";
import {useCart} from "../Context/CartContext.tsx";
import {Link} from "react-router-dom";

const ProductCard = ({product, index}:ProductCardProps) => {
    const {addItem} = useCart()
    return <div className="product-card">
        <Link to={"/product/"+product.id} className="link-item">
            <img alt={product.image} src={"/assets/" + product.image} className="product-image"/>

            <h3 className="product-name">{product.name}</h3>
            <p className="product-price"><b>{product.price}€ </b> / {product.unit}</p>
        </Link>


            <button onClick={
                () => addItem(product.id, 1)
            } className="addToCart-btn">Add to Cart</button>

    </div>
}
export default ProductCard