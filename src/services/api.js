import axios from 'axios'

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api/v1'

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
  withCredentials: true, // ✅ send cookies along with every request
})

// Request interceptor - Add auth token if needed
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token') // optional fallback
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Response interceptor - Handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        // Unauthorized: redirect to login
        localStorage.removeItem('token')
        window.location.href = '/login'
      } else if (error.response.status === 403) {
        console.error('Access forbidden')
      }
    }
    return Promise.reject(error)
  }
)

export default api
