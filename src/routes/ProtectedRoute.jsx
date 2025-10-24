import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../store/AuthContext'


const ProtectedRoute = () => {
  const { isAuthenticated, loading } = useAuth()

  if (loading) return <div>loading</div>

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />
}

export default ProtectedRoute
