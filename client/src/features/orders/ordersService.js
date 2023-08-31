import axios from 'axios'
import { API_BASE_URL } from '../../appConstant'

export const fetchOrdersByUserId = async (userId = '') => {
    const response = await axios.get(`${API_BASE_URL}/orders/user/${userId}`);
    return response.data;
};

export const fetchOrdersByDate = async (userId = '', startDate = '', endDate = '') => {
    const response = await axios.get(`${API_BASE_URL}/orders/user/${userId}?startDate=${startDate}&endDate=${endDate}`);
    return response.data;
};

export const makePayment = async (userId = '') => {
    const response = await axios.post(`${API_BASE_URL}/orders`, { userId });
    return response.data;
};

const ordersService = {
    fetchOrdersByUserId,
    fetchOrdersByDate,
    makePayment
}
export default ordersService