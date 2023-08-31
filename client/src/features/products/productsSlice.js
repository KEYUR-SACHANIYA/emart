import { createSlice } from '@reduxjs/toolkit';

const initialState = []; // Start with a single dummy product

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action) => {
      return action.payload || []
    },
  },
});

export const { setProducts } = productsSlice.actions;

export default productsSlice.reducer;