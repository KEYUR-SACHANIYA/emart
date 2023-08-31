import axios from 'axios'
import { API_BASE_URL } from '../../appConstant'

export const fetchProductsByCategory = async (category = '') => {
    const response = await axios.get(`${API_BASE_URL}/products/${category}`);
    return response.data.products;
};

export const fetchProductsByCategoryAndPrice = async (category = '', min = '1', max = '200') => {
    const response = await axios.get(`${API_BASE_URL}/products/${category}?min=${min}&max=${max}`);
    return response.data.products;
};

const productsService = {
    fetchProductsByCategory,
    fetchProductsByCategoryAndPrice
}
export default productsService