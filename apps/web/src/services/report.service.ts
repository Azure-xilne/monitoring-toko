import { api } from '../lib/api';

export const reportService = {
  getDashboardStats: async () => {
    const { data } = await api.get('/reports/dashboard');
    return data;
  },
  getSalesChart: async (days?: number) => {
    const { data } = await api.get('/reports/sales-chart', { params: { days } });
    return data;
  },
  getProfitLoss: async (startDate: string, endDate: string) => {
    const { data } = await api.get('/reports/profit-loss', { params: { startDate, endDate } });
    return data;
  },
  getCategoryBreakdown: async (startDate: string, endDate: string) => {
    const { data } = await api.get('/reports/category-breakdown', { params: { startDate, endDate } });
    return data;
  }
};
