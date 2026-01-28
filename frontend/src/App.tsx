import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {Link, Route, Routes} from "react-router-dom";
import ShoppingLists from "./components/ShoppingLists.tsx";

function App() {

  return (
    <>
        <nav>
            <Link to="/">Home</Link> | <Link to="/lists"> My Shopping Lists </Link>
        </nav>

     <Routes>
         <Route path="/" element={<h1>Grocery Shopping App</h1>} />
         <Route path="/lists" element={<ShoppingLists />} />
     </Routes>
    </>
  )
}

export default App
