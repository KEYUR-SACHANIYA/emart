import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useDispatch, useSelector } from 'react-redux';
import { setCarts } from '../../features/cart/cartSlice';
import cartService from '../../features/cart/cartService';
import Spinner from '../common/Spinner';

export default function ProductCard({ product }) {
  const dispatch = useDispatch();
  const cartProducts = useSelector((state) => state.cart);
  const user = useSelector((state) => state.auth);
  const isCart = cartProducts.some(item => product._id === item.productId._id)
  const [isLoading, setIsLoading] = React.useState(false)

  const addProductToCart = async () => {
    try {
      setIsLoading(true)
      await cartService.addToCart(user._id, product._id);
      const carts = await cartService.getCartsByUserId(user._id);
      dispatch(setCarts(carts));
    } catch (error) {
      console.error('Error adding to cart:', error);
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={`${product.image}`}
          alt="green iguana"
          sx={{ objectFit: "contain", marginTop: 2 }}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {product.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {product.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions sx={{ display: "flex", justifyContent: "space-between", alignContent: "center" }}>
        <Button color="primary">
          $ {product.price}
        </Button>
        {isLoading ? 
          <Spinner inline={true} /> :
          <Button size="small" color="primary" disabled={isCart} onClick={addProductToCart}>
            {isCart ? <ShoppingCartIcon /> : <ShoppingCartOutlinedIcon />}
          </Button>
        }
      </CardActions>
    </Card>
  );
}