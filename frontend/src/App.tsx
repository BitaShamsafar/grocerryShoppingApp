import './App.css'
import {Route, Routes} from "react-router-dom";
import Navbar from "./Layout/Navbar.tsx";
import CartProvider from "./Context/CartContext.tsx";
import AllProducts from "./Layout/AllProducts.tsx";
import SingleProductPage from "./components/SingleProductPage.tsx";
import ProductContextProvider from "./Context/ProductsContext.tsx";

function App() {


  return (

    <div className="main-grid">
        <ProductContextProvider>
            <CartProvider>
                <Navbar />
                <Routes>
                    <Route path="/" element={<AllProducts />}  />
                    <Route path="/product/:id" element={<SingleProductPage />}  />
                </Routes>
            </CartProvider>
        </ProductContextProvider>
    </div>

  )
}

export default App
