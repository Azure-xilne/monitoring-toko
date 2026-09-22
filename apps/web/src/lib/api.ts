import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://monitoring-toko-api.vercel.app/api',
  withCredentials: true, // Required for better-auth to send session cookies
});

// Interceptor to handle global errors (e.g., 401 Unauthorized)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Optional: Handle unauthorized state globally
      console.warn('Unauthorized access. Please login.');
    }
    return Promise.reject(error);
  }
);
