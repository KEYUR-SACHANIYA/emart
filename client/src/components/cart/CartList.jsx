import React from 'react';
import {
  List,
} from '@mui/material';
import CartItem from './CartItem';

const CartList = ({ cartItems }) => {
  return (
    <List sx={{ marginTop: 2 }}>
      {cartItems.map((item) => (
        <CartItem item={item} key={item.id} />
      ))}
    </List>
  );
};

export default CartList;