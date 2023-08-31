import { Router } from 'express';
import { processPayment, getOrdersByUserId } from '../controllers/orderController.js';
const router = Router();

// Define route to process payment and get orders history
router.post('/', processPayment);
router.get('/user/:userId', getOrdersByUserId);

export default router;