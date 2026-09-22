import { api } from '../lib/api';

export const purchaseService = {
  getAllPOs: async (params?: { page?: number; limit?: number }) => {
    const { data } = await api.get('/purchases', { params });
    return data;
  },
  getPOById: async (id: string) => {
    const { data } = await api.get(`/purchases/${id}`);
    return data;
  },
  createPO: async (payload: { id: string; supplierId: string; items: any[] }) => {
    const { data } = await api.post('/purchases', payload);
    return data;
  },
  receivePO: async (id: string) => {
    const { data } = await api.post(`/purchases/${id}/receive`);
    return data;
  },
  getSuppliers: async () => {
    const { data } = await api.get('/purchases/suppliers');
    return data;
  },
  createSupplier: async (payload: any) => {
    const { data } = await api.post('/purchases/suppliers', payload);
    return data;
  }
};
