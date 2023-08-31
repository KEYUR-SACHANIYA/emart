import { Schema, model } from 'mongoose';

const productSchema = new Schema({
  title: String,
  description: String,
  image: String,
  price: Number,
  category: String,
});

const Product = model('Product', productSchema);

export default Product;