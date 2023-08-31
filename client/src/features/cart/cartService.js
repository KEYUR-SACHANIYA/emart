import axios from 'axios';
import { API_BASE_URL } from '../../appConstant'

export const addToCart = async (userId, productId) => {
    console.log("product")
    const response = await axios.post(`${API_BASE_URL}/cart/add`, {
        userId,
        productId,
    });
    return response.data;
};

export const getCartsByUserId = async (userId) => {
    const response = await axios.get(`${API_BASE_URL}/cart/user/${userId}`);
    return response.data;
};

export const increaseQuantity = async (cartId) => {
    const response = await axios.post(`${API_BASE_URL}/cart/increaseQuantity`, { cartId });
    return response.data;
}

export const decreaseQuantity = async (cartId) => {
    const response = await axios.post(`${API_BASE_URL}/cart/decreaseQuantity`, { cartId });
    return response.data;
}

export const removeCartItem = async (cartId) => {
    const response = await axios.delete(`${API_BASE_URL}/cart/remove/${cartId}`);
    return response.data;
}

const cartService = {
    addToCart,
    getCartsByUserId,
    increaseQuantity,
    decreaseQuantity,
    removeCartItem
}
export default cartService