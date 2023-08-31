import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppBar, Button, IconButton, Toolbar, Typography } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import CartList from "../components/cart/CartList";
import CheckOutModal from "../components/cart/CheckOutModal";
import cartService from "../features/cart/cartService";
import { setCarts } from "../features/cart/cartSlice"
import Spinner from "../components/common/Spinner";

const Cart = () => {
  const dispatch = useDispatch();
  const cartProducts = useSelector((state) => state.cart);
  const user = useSelector((state) => state.auth);
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true)

  const handleOpen = () => {
    setOpen(true);
  };

  useEffect(() => {
    const fetchCarts = async () => {
      try {
        const carts = await cartService.getCartsByUserId(user._id);
        dispatch(setCarts(carts));
      } catch (error) {
        console.error(error)
        toast.error(error.response.data.error || "Something went wrong")
      } finally {
        setIsLoading(false)
      }
    }
    fetchCarts()
  }, [dispatch, user._id]);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: "lightskyblue" }}>
        <Toolbar>
          <Link to="/">
            <IconButton edge="start" color="white">
              <ArrowBack />
            </IconButton>
          </Link>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Cart
          </Typography>
        </Toolbar>
      </AppBar>
      {isLoading ? <Spinner /> : <>
        {cartProducts.length ? (
          <>
            <CartList cartItems={cartProducts} />
            <Button variant="outlined" onClick={handleOpen} sx={{ marginTop: 2 }}>
              CheckOut
            </Button>
          </>
        ) : (
          <h2>Your cart is empty.</h2>
        )}
      </>}
      <CheckOutModal
        open={open}
        handleClose={handleClose}
        cartItems={cartProducts}
      />
    </>
  );
};

export default Cart;
