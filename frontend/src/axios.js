import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://127.0.0.1:8000/api/',
  headers: {
    Authorization: `Bearer ${localStorage.getItem('access_token')}`,
  }
});

// Interceptor to add token to headers
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
