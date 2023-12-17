import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: '/api/v1/',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    common: {
      'X-Requested-With': 'XMLHttpRequest'
    }
  }
});

export default axiosInstance;
