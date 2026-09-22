import { api } from '../lib/api';

export const productsService = {
  getAll: async (params?: { search?: string; category?: string; page?: number; limit?: number }) => {
    const { data } = await api.get('/products', { params });
    return data;
  },
  getById: async (id: string) => {
    const { data } = await api.get(`/products/${id}`);
    return data;
  },
  create: async (payload: any) => {
    const { data } = await api.post('/products', payload);
    return data;
  },
  update: async (id: string, payload: any) => {
    const { data } = await api.put(`/products/${id}`, payload);
    return data;
  },
  delete: async (id: string) => {
    const { data } = await api.delete(`/products/${id}`);
    return data;
  },
  getCategories: async () => {
    const { data } = await api.get('/products/categories');
    return data;
  },
  createCategory: async (payload: any) => {
    const { data } = await api.post('/products/categories', payload);
    return data;
  }
};
