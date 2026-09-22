import { api } from '../lib/api';

export const salesService = {
  startShift: async (payload: { startingCash: number }) => {
    const { data } = await api.post('/sales/shifts/start', payload);
    return data;
  },
  endShift: async (payload: { shiftId: string; endingCash: number }) => {
    const { data } = await api.post('/sales/shifts/end', payload);
    return data;
  },
  getActiveShift: async () => {
    const { data } = await api.get('/sales/shifts/active');
    return data;
  },
  createSale: async (payload: any) => {
    const { data } = await api.post('/sales', payload);
    return data;
  },
  getHistory: async (params?: { date?: string; cashierId?: string; page?: number; limit?: number }) => {
    const { data } = await api.get('/sales/history', { params });
    return data;
  },
  getSaleById: async (id: string) => {
    const { data } = await api.get(`/sales/${id}`);
    return data;
  }
};
