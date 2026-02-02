import './App.css'
import {Route, Routes} from "react-router-dom";
import Navbar from "./Layout/Navbar.tsx";
import CartProvider from "./Context/CartContext.tsx";
import AllProducts from "./Layout/AllProducts.tsx";

function App() {


  return (

    <CartProvider>
    <Navbar />
     <Routes>
         <Route path="/" element={<AllProducts />}  />
     </Routes>
      </CartProvider>

  )
}

export default App
