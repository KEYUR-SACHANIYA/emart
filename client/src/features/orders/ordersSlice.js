import { createSlice } from '@reduxjs/toolkit';

const initialState = []; // Start with a single dummy product

const ordersSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setOrders: (state, action) => {
      return action.payload || []
    },
  },
});

export const { setOrders } = ordersSlice.actions;

export default ordersSlice.reducer;