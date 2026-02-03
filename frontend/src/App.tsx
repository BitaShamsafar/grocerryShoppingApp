import './App.css'
import {Route, Routes} from "react-router-dom";
import Navbar from "./Layout/Navbar.tsx";
import CartProvider from "./Context/CartContext.tsx";
import CartPage from "./pages/CartPage.tsx";

function App() {


  return (

    <CartProvider>
    <Navbar />
     <Routes>
         <Route path="/" element={<h1>Hello!</h1>} />
         <Route path="/getCart" element={<CartPage />} />
     </Routes>
      </CartProvider>

  )
}

export default App
