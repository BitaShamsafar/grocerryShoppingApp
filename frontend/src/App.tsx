import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {Route, Routes} from "react-router-dom";

function App() {


  return (
    <>
     <Routes>
         <Route path="/" element={<h1>Grocery Shopping App</h1>} />
     </Routes>
    </>
  )
}

export default App
