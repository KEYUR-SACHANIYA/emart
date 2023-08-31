import { Router } from 'express';
import { loginUser, registerUser } from '../controllers/userControllers.js';
const router = Router();

// Define route to register and login user
router.post('/register', registerUser);
router.post('/login', loginUser);

export default router;