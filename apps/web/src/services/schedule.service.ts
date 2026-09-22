import { api } from '../lib/api';

export const scheduleService = {
  getAll: async (params?: { date?: string; picId?: string; page?: number; limit?: number }) => {
    const { data } = await api.get('/schedule', { params });
    return data;
  },
  getByDate: async (date: string) => {
    const { data } = await api.get(`/schedule/date/${date}`);
    return data;
  },
  create: async (payload: any) => {
    const { data } = await api.post('/schedule', payload);
    return data;
  },
  update: async (id: string, payload: any) => {
    const { data } = await api.put(`/schedule/${id}`, payload);
    return data;
  },
  delete: async (id: string) => {
    const { data } = await api.delete(`/schedule/${id}`);
    return data;
  }
};
