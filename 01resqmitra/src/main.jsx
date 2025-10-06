import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Layout from './Layout.jsx'
import Login from './components/Login/Login.jsx'
import Register from './components/Register/Register.jsx'
import Home from './components/Home/Home.jsx'
import About from './components/About/About.jsx'
import Solution from './components/Solution/Solution.jsx'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/'element={<Layout/>}>;
     <Route path='/Home' element={<Home  />}/> 
      <Route path='/Login' element={<Login  />}/>  
      <Route path='/Register' element={<Register  />}/> 
      <Route path='/About' element={<About  />}/> 
      <Route path='/Solution' element={<Solution  />}/> 
      
    </Route>
  )
)


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
