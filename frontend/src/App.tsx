import './App.css'
import {Route, Routes} from "react-router-dom";
import Navbar from "./Layout/Navbar.tsx";
import CartProvider from "./Context/CartContext.tsx";
import CartPage from "./pages/CartPage.tsx";
import AllProducts from "./Layout/AllProducts.tsx";
import SingleProductPage from "./Components/SingleProductPage.tsx";

function App() {


  return (
      <div className="main-grid">

    <CartProvider>
    <Navbar />
     <Routes>
         <Route path="/" element={<AllProducts />}/>
         <Route path="/getCart" element={<CartPage/>}/>
         <Route path="/product/:id" element={<SingleProductPage />}/>
     </Routes>
      </CartProvider>
      </div>

  )
}

export default App
