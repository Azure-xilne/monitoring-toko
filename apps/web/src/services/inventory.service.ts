import { api } from '../lib/api';

export const inventoryService = {
  getAll: async () => {
    const { data } = await api.get('/inventory');
    return data;
  },
  getSummary: async () => {
    const { data } = await api.get('/inventory/summary');
    return data;
  },
  getLowStock: async () => {
    const { data } = await api.get('/inventory/low-stock');
    return data;
  },
  getMovements: async (params?: { productId?: string; page?: number; limit?: number }) => {
    const { data } = await api.get('/inventory/movements', { params });
    return data;
  },
  recordMovement: async (payload: { productId: string; type: 'IN' | 'OUT' | 'ADJUST'; quantity: number; reason?: string }) => {
    const { data } = await api.post('/inventory/movement', payload);
    return data;
  }
};
