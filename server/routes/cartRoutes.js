import { Router } from 'express';
import { addToCart, decreaseQuantity, getCartsByUserId, increaseQuantity, removeCartItem } from '../controllers/cartController.js';
const router = Router();

// Define route to add a product to the cart
router.get('/user/:userId', getCartsByUserId);
router.post('/add', addToCart);
router.post('/increaseQuantity', increaseQuantity);
router.post('/decreaseQuantity', decreaseQuantity);
router.delete('/remove/:cartId', removeCartItem);

export default router;