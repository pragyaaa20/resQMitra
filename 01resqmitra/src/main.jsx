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
import History from './components/History/History.jsx'
import AdminPanel from './components/AdminPanel/AdminPanel.jsx'
import VolunteerPanel from './components/VolunteerPanel/VolunteerPanel.jsx'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute.jsx'
import { AuthProvider } from './contexts/AuthContext.jsx'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Navigate
} from 'react-router-dom'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Layout />}>
      <Route path='/' element={<Navigate to='/home' replace />} />
      <Route path='/home' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/about' element={<About />} />
      <Route path='/solution' element={<Solution />} />
      
      {/* Protected Routes */}
      <Route 
        path='/history' 
        element={
          <ProtectedRoute>
            <History />
          </ProtectedRoute>
        } 
      />
      
      {/* Admin Only Routes */}
      <Route 
        path='/admin' 
        element={
          <ProtectedRoute allowedRoles={['Admin']}>
            <AdminPanel />
          </ProtectedRoute>
        } 
      />
      
      {/* Volunteer Only Routes */}
      <Route 
        path='/volunteer' 
        element={
          <ProtectedRoute allowedRoles={['Volunteer']}>
            <VolunteerPanel />
          </ProtectedRoute>
        } 
      />

      <Route path='*' element={<Navigate to='/home' replace />} />
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </>,
)
