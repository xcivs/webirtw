import axios from 'axios'

const http = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
})


http.interceptors.request.use(config => { 
  return config
})


http.interceptors.response.use(
  response => response.data,
  error => {
    console.error('API Error:', error.response?.status, error.message)
    return Promise.reject(error)
  }
)

export default http
