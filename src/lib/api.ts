import axios from 'axios';

const API_BASE_URL = '/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Products API
export const productsAPI = {
  getAll: () => apiClient.get('/products'),
  getById: (id: string) => apiClient.get(`/products/${id}`),
  getByCategory: (category: string) => apiClient.get(`/products/category/${category}`),
  create: (data: any) => apiClient.post('/products', data),
  update: (id: string, data: any) => apiClient.put(`/products/${id}`, data),
  delete: (id: string) => apiClient.delete(`/products/${id}`),
};

// Orders API
export const ordersAPI = {
  getAll: () => apiClient.get('/orders'),
  getById: (id: string) => apiClient.get(`/orders/${id}`),
  getByUserId: (userId: string) => apiClient.get(`/orders/user/${userId}`),
  create: (data: any) => apiClient.post('/orders', data),
  updateStatus: (id: string, status: string) => 
    apiClient.patch(`/orders/${id}/status`, { status }),
  update: (id: string, data: any) => apiClient.put(`/orders/${id}`, data),
  delete: (id: string) => apiClient.delete(`/orders/${id}`),
};

export default apiClient;
