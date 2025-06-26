import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken');
  if (token) {
    config.headers.Authorization = token;
  }
  return config;
});

// Flower API calls
export const flowerAPI = {
  // Public endpoints
  getAllFlowers: () => api.get('/flowers'),
  getFlowerById: (id) => api.get(`/flowers/${id}`),
  
  // Admin endpoints
  createFlower: (flowerData) => api.post('/flowers', flowerData),
  updateFlower: (id, flowerData) => api.put(`/flowers/${id}`, flowerData),
  deleteFlower: (id) => api.delete(`/flowers/${id}`),
};

// Order API calls
export const orderAPI = {
  createOrder: (orderData) => api.post('/orders', orderData),
  getAllOrders: () => api.get('/orders'), // Admin only
};

// Admin API calls
export const adminAPI = {
  login: (password) => api.post('/admin/login', { password }),
};

export default api;
