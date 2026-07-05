import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Basic retry interceptor
api.interceptors.response.use(undefined, (err) => {
  const { config, message } = err;
  if (!config || !config.retry) return Promise.reject(err);
  
  // Check if it's a network error or connection refused
  if (message === 'Network Error' || err.code === 'ECONNABORTED') {
    config.retryCount = config.retryCount || 0;
    if (config.retryCount < config.retry) {
      config.retryCount += 1;
      const backoff = new Promise((resolve) => {
        setTimeout(() => resolve(true), config.retryDelay || 1000);
      });
      return backoff.then(() => api(config));
    }
  }
  return Promise.reject(err);
});
