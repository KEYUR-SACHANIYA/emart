import Product from '../models/Product.js';

export const getProducts = async (req, res) => {
    try {
        const minPrice = parseFloat(req.query.min);
        const maxPrice = parseFloat(req.query.max);

        if (minPrice && maxPrice) {
            const products = await Product.find({
                price: { $gte: minPrice, $lte: maxPrice },
            });
            res.json({ products });
        } else {
            const products = await Product.find();
            res.json({ products });
        }
    } catch (error) {
        res.status(500).json({ error: 'An error occurred' });
    }
}

export const getProductsByCategory = async (req, res) => {
    try {
        const { category } = req.params;
        const minPrice = parseFloat(req.query.min);
        const maxPrice = parseFloat(req.query.max);
        if (minPrice && maxPrice) {
            const products = await Product.find({
                category,
                price: { $gte: minPrice, $lte: maxPrice },
            });
            res.json({ products });
        } else {
            const products = await Product.find({ category });
            res.json({ products });
        }
    } catch (error) {
        res.status(500).json({ error: 'An error occurred' });
    }
};