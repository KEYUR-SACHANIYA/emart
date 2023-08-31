import axios from 'axios'
import { API_BASE_URL } from '../../appConstant'

// Register user
const register = async (userData) => {
  const response = await axios.post(`${API_BASE_URL}/user/register`, userData)
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data.user || {}))
  }

  return response.data
}

// Login user
const login = async (userData) => {
  const response = await axios.post(`${API_BASE_URL}/user/login`, userData)

  if (response.data && response.status === 200) {
    localStorage.setItem('user', JSON.stringify(response.data.user || {}))
  }
  
  return response.data
}

// Logout user
const logout = () => {
  localStorage.removeItem('user')
}

const authService = {
  register,
  logout,
  login,
}

export default authService
