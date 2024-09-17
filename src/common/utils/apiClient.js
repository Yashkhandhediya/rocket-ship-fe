import axios from 'axios';
import { toast } from 'react-toastify';
import { BACKEND_URL } from './env.config';

const apiClient = axios.create({
  baseURL: BACKEND_URL,
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    config.headers.Authorization = token ? `Bearer ${token}` : '';
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (err) => {
    if (err.response && err.response.status === 401) {
      toast.error('Session expired. Please login again.');
      localStorage.clear();
      setTimeout(() => {
        window.location.href = '/login';
      }, 500);
    } else {
      console.log('Error fetching data', err);
    }

    return Promise.reject(err);
  },
);

export default apiClient;
