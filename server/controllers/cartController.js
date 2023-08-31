import Cart from '../models/Cart.js';

export const addToCart = async (req, res) => {
    const { userId, productId } = req.body;

    try {
        const cartItem = new Cart({
            userId,
            productId
        });

        const savedCartItem = await cartItem.save();
        res.status(201).json(savedCartItem);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred' });
    }
}

export const getCartsByUserId = async (req, res) => {
    const { userId } = req.params;

    try {
        const carts = await Cart.find({ userId }).populate('productId');
        res.json(carts);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred' });
    }
};

export const increaseQuantity = async (req, res) => {
    try {
        const { cartId } = req.body;
        let cartItem = await Cart.findOne({ _id: cartId });

        if (!cartItem) {
            cartItem = new Cart({
                userId,
                productId,
            });
        } else {
            cartItem.quantity += 1;
        }

        const savedCartItem = await cartItem.save();

        res.status(201).json(savedCartItem);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred' });
    }
};

export const decreaseQuantity = async (req, res) => {
    try {
        const { cartId } = req.body;
        let cartItem = await Cart.findOne({ _id: cartId });

        if (!cartItem) {
            cartItem = new Cart({
                userId,
                productId,
            });
        } else {
            cartItem.quantity -= 1;
        }

        const savedCartItem = await cartItem.save();

        res.status(201).json(savedCartItem);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred' });
    }
};

export const removeCartItem = async (req, res) => {
    try {
        const { cartId } = req.params;
        const removedCartItem = await Cart.findByIdAndRemove(cartId);

        if (!removedCartItem) {
            return res.status(404).json({ error: 'Cart item not found' });
        }

        res.json({ message: 'Cart item removed successfully' });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred' });
    }
};