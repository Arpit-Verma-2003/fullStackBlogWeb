import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes,Route } from 'react-router-dom';
import Layout from './pages/Layout';
import Home from './pages/home';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout/>}>
            <Route path='/' element={<Home/>}></Route>
          </Route>
        </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
