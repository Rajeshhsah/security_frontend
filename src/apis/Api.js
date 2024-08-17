import axios from "axios";

const Api = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json"
  }
});

// Configuration for axios
const config = {
  headers: {
    'authorization': `Bearer ${localStorage.getItem('token')}`
  }
};

// Creating test API
export const testApi = () => Api.get("/test");

// Creating register API
export const registerApi = (data) => Api.post("/api/user/create", data);

// Create login API
export const loginApi = (data) => Api.post("/api/user/login", data);

export const changePasswordApi = (data) => Api.post("/api/user/changepassword", data);

// Create product API
export const createProductApi = (formData) => Api.post('/api/product/create_product', formData, config);

// Get products API
export const getAllProductsApi = () => Api.get('/api/product/get_products');

// Get single product API
export const getSingleProductApi = (id) => Api.get(`/api/product/get_product/${id}`);

// Search products API
export const searchProductsApi = (query) => Api.get(`/api/product/search_products?query=${query}`);

// Add to cart API
export const addToCartApi = (data) => Api.post('/api/cart/addToCart', data, config);

// Get cart by ID API
export const getCartByIdApi = (id) => Api.get(`/api/cart/get_cart/${id}`, config);

// Delete product from cart API
export const deleteProductFromCartApi = (userId, productId) => Api.delete(`/api/cart/deleteFromCart/${userId}/${productId}`, config);

// Update product API
export const updateProductApi = (id, formData) => Api.put(`/api/product/update_product/${id}`, formData, config);

// Delete product API
export const deleteProductApi = (id) => Api.delete(`/api/product/delete_product/${id}`, config);

// Create order API
export const createOrderApi = (data) => Api.post('/api/order/addToOrder', data, config);
