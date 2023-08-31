import express from 'express';
import { connect } from 'mongoose';
import pkg from 'body-parser';
const { json } = pkg;
import userRoutes from './routes/userRoutes.js';
import productRoutes from './routes/productRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import orderRoutes from './routes/orderRoutes.js';

const app = express();
const PORT = 5000;
const DB_URL = 'mongodb+srv://keyurkingvision01:123@cluster0.dfjuo2t.mongodb.net/test';

// Connect to MongoDB
connect(DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // Replace with your frontend's URL if needed
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

// Middleware
app.use(json());

// Routes
app.use('/api/user', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});