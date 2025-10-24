import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../store/AuthContext'

const PublicRoute = () => {
  const { isAuthenticated, loading } = useAuth()

  if (loading) return null // or <Loader />

  return isAuthenticated ? <Navigate to="/dashboard" replace /> : <Outlet />
}

export default PublicRoute
