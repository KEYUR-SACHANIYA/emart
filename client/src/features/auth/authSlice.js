import { createSlice } from '@reduxjs/toolkit'

// Get user from localStorage
const user = JSON.parse(localStorage.getItem('user'))

const initialState = user ? user : null;

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      return action.payload
    },
    resetUser: (state) => {
      localStorage.removeItem('user')
      return null
    }
  }
})

export const { setUser, resetUser } = authSlice.actions
export default authSlice.reducer
