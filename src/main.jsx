import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'

import { AuthProvider } from './context/AuthContext.jsx'
import { Projectprovider } from './context/ProjectContext.jsx'
import { TaskProvider } from './context/TaskContext.jsx'

import ProtectedRoute from './components/ProtectedRoute.jsx'

// Routes
import App from './App.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Dashboard from './pages/Dashboard.jsx'
import ForgotPassword from './pages/ForgotPassword.jsx'
import ProjectDetails from './pages/ProjectDetails.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />
  },

  {
    path: '/login',
    element: <Login />
  },

  {
    path: '/register',
    element: <Register />
  },

  {
    path: '/forgot-password',
    element: <ForgotPassword />
  },

  {
    path: '/dashboard',
    element: (
        <Dashboard />
      // <ProtectedRoute>
      // </ProtectedRoute>
  )
  },

  {
    path: '/projects/:projectId',
    element: <ProjectDetails />
  }

])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <Projectprovider>
        <TaskProvider>
          <RouterProvider router={router}/>
        </TaskProvider>        
      </Projectprovider>
    </AuthProvider>
  </StrictMode>,
)
