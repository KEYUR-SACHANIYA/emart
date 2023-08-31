import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const cartSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setCarts: (state, action) => {
      return action.payload
    }
  },
});

export const { setCarts } = cartSlice.actions;

export default cartSlice.reducer;