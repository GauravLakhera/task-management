import React, { createContext, useContext, useState, useEffect } from 'react'
import api from '../services/api'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Check if user is logged in on mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get('/user/') // endpoint to return current user
        setUser(res.data.user)
      } catch {
        setUser(null)
      } finally {
        setLoading(false)
      }
    }
    fetchUser()
  }, [])

  const login = async (email, password) => {
    try {
      const res = await api.post('/auth/login', { email, password })
      setUser(res.data.user)
      return { success: true }
    } catch (err) {
      return { success: false, error: err.response?.data?.message || err.message }
    }
  }

  const signup = async (userData) => {
    try {
      const res = await api.post('/auth/signup', userData)
      setUser(res.data.user)
      return { success: true }
    } catch (err) {
      return { success: false, error: err.response?.data?.message || err.message }
    }
  }

  const logout = async () => {
    try {
      await api.post('/auth/logout') // optional endpoint to clear cookie
      setUser(null)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: !!user,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}
