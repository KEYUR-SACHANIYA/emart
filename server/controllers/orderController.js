import Cart from '../models/Cart.js';
import Order from '../models/Order.js';

export const processPayment = async (req, res) => {
    try {
        const { userId, paymentDetails } = req.body;
        // Get cart items for the user
        const cartItems = await Cart.find({ userId });
        console.log("userid", userId, paymentDetails, cartItems)

        // Process payment here (mock payment)
        // You can add actual payment processing logic here

        // Remove cart items and create orders
        for (const cartItem of cartItems) {
            const order = new Order({
                userId,
                productId: cartItem.productId,
                quantity: cartItem.quantity,
                paymentStatus: 'done',
            });

            await order.save();
            await cartItem.deleteOne();
        }

        res.status(201).json({ message: 'Payment successful' });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred' });
    }
}

export const getOrdersByUserId = async (req, res) => {
    try {
        const { userId } = req.params;
        const { startDate, endDate } = req.query;
        if (startDate && endDate) {
            const query = {
                userId,
                createdAt: {
                    $gte: new Date(startDate),
                    $lte: new Date(endDate),
                },
            };

            const orders = await Order.find(query).populate("productId");
            res.json(orders);
        } else {
            const orders = await Order.find({ userId }).populate("productId");
            res.json(orders);
        }
    } catch (error) {
        res.status(500).json({ error: 'An error occurred' });
    }
};