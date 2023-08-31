import { Schema, model } from 'mongoose';

const orderSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  productId: { type: Schema.Types.ObjectId, ref: 'Product' },
  quantity: Number,
  paymentStatus: String,
  createdAt: { type: Date, default: Date.now } 
});

const Order = model('Order', orderSchema);

export default Order;