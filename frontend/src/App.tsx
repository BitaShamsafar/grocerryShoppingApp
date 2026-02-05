import './Styles/App.css'
import {Route, Routes} from "react-router-dom";
import Navbar from "./Layout/Navbar.tsx";
import CartProvider from "./Context/CartContext.tsx";
import CartPage from "./pages/CartPage.tsx";
import AllProducts from "./Layout/AllProducts.tsx";
import ProductContextProvider from "./Context/ProductsContext.tsx";
import SingleProductPage from "./pages/SingleProductPage.tsx";

function App() {


  return (
      <div className="main-grid">
        <ProductContextProvider>
            <CartProvider>
                <Navbar />
                 <Routes>
                     <Route path="/" element={<AllProducts/>}/>
                     <Route path="/product/:id" element={<SingleProductPage/>}/>
                     <Route path="/getCart" element={<CartPage/>}/>
                 </Routes>
            </CartProvider>
          </ProductContextProvider>
      </div>

  )
}

export default App
