import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://monitoring-toko-api.vercel.app',
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  // Pastikan semua request selalu memiliki awalan /api
  if (config.url && !config.url.startsWith('/api')) {
    config.url = '/api' + (config.url.startsWith('/') ? '' : '/') + config.url;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn('Unauthorized access. Please login.');
    }
    return Promise.reject(error);
  }
);
