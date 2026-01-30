import './App.css'
import {Route, Routes} from "react-router-dom";
import Navbar from "./Layout/Navbar.tsx";
import CartProvider from "./Context/CartContext.tsx";

function App() {


  return (

    <CartProvider>
    <Navbar />
     <Routes>
         <Route path="/" element={<h1>Hello!</h1>} />
     </Routes>
      </CartProvider>

  )
}

export default App
