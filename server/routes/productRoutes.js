import { Router } from 'express';
import { getProducts, getProductsByCategory } from '../controllers/productController.js';
const router = Router();

// Define route to get products
router.get('/', getProducts);
router.get('/:category', getProductsByCategory);

export default router;