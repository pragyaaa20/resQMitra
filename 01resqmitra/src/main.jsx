import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Layout from './Layout.jsx'
import Login from './components/Login/Login.jsx'
import Register from './components/Register/Register.jsx'
import Home from './components/Home/Home.jsx'
import About from './components/About/About.jsx'
import Solution from './components/Solution/Solution.jsx'
import ProtectedRoute from './ProtectedRoute/ProtectedRoute.jsx'
import { AuthProvider } from './contexts/AuthContext.jsx'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Navigate
} from 'react-router-dom'
import VolunteerIncidents from './components/Volunteer/VolunteerIncidents.jsx'
import VolunteerHome from './components/Volunteer/VolunteerHome.jsx'
import VolunteerProfile from './components/Volunteer/VolunteerProfile.jsx'
import AdminHome from './components/Admin/AdminHome.jsx'
import AdminIncidents from './components/Admin/AdminIncidents.jsx'
import AdminVolunteers from './components/Admin/AdminVolunteers.jsx'
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Layout />}>
      <Route path='/' element={<Navigate to='/home' replace />} />
      <Route path='/home' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/about' element={<About />} />
      <Route path='/solution' element={<Solution />} />

      {/* Admin Only Routes */}
      <Route path='/admin/home' element={
        <ProtectedRoute allowedRoles={['Admin']}>
          <AdminHome />
        </ProtectedRoute>
      } />
      <Route path='/admin/incidents' element={
        <ProtectedRoute allowedRoles={['Admin']}>
          <AdminIncidents />
        </ProtectedRoute>
      } />
      <Route path='/admin/volunteers' element={
        <ProtectedRoute allowedRoles={['Admin']}>
          <AdminVolunteers />
        </ProtectedRoute>
      } />
      
      {/* Volunteer Only Routes */}
      <Route path='/volunteer/home' element={
        <ProtectedRoute allowedRoles={['Volunteer']}>
          <VolunteerHome />
        </ProtectedRoute>
      } />
      <Route path='/volunteer/profile' element={
        <ProtectedRoute allowedRoles={['Volunteer']}>
          <VolunteerProfile />
        </ProtectedRoute>
      } />
      <Route path='/volunteer/incidents' element={
        <ProtectedRoute allowedRoles={['Volunteer']}>
          <VolunteerIncidents />
        </ProtectedRoute>
      } />

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
