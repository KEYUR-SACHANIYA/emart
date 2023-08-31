import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Typography,
  Divider,
  Button,
} from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import cartService from "../../features/cart/cartService";
import { setCarts } from "../../features/cart/cartSlice";
import Spinner from "../common/Spinner";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

const CartItem = ({ item }) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = React.useState(false);
  const user = useSelector((state) => state.auth);

  const addQuantity = async (cartId) => {
    try {
      setIsLoading(true);
      await cartService.increaseQuantity(cartId);
      const carts = await cartService.getCartsByUserId(user._id);
      dispatch(setCarts(carts));
    } catch (error) {
      console.error("Error", error);
    } finally {
      setIsLoading(false);
    }
  };

  const removeQuantity = async (cartId) => {
    try {
      setIsLoading(true);
      await cartService.decreaseQuantity(cartId);
      const carts = await cartService.getCartsByUserId(user._id);
      dispatch(setCarts(carts));
    } catch (error) {
      console.error("Error", error);
    } finally {
      setIsLoading(false);
    }
  };

  const removeCartItem = async (cartId) => {
    try {
      setIsLoading(true);
      await await cartService.removeCartItem(cartId);
      const carts = await cartService.getCartsByUserId(user._id);
      dispatch(setCarts(carts));
    } catch (error) {
      console.error("Error", error);
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <>
      <ListItem>
        {isLoading ? (
          <Spinner inline={true} />
        ) : (
          <>
            <Button sx={{ marginLeft: "-1rem" }} onClick={() => removeCartItem(item._id)}>
              <CloseRoundedIcon />
            </Button>
            <img
              src={item.productId.image}
              width="80px"
              height="80px"
              alt="product"
              style={{ marginRight: "1rem" }}
            />
            <ListItemText
              primary={item.productId.title}
              secondary={`Price: $${item.productId.price}`}
            />
            <ListItemSecondaryAction>
              <IconButton
                aria-label="remove"
                onClick={() => removeQuantity(item._id)}
                disabled={item.quantity <= 1}
              >
                <Remove />
              </IconButton>
              <Typography variant="body2" component="span">
                {item.quantity}
              </Typography>
              <IconButton
                aria-label="add"
                onClick={() => addQuantity(item._id)}
              >
                <Add />
              </IconButton>
            </ListItemSecondaryAction>
          </>
        )}
      </ListItem>
      <Divider />
    </>
  );
};

export default CartItem;
