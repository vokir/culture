import axiosInstance from './api';

const setup = (events) => {
  axiosInstance.interceptors.request.use(
    (config) => {
      if (events.onSend) {
        events.onSend(config);
      }

      const token = localStorage.getItem('accessToken');

      if (token) {
        config.headers['Authorization'] = token;
      }

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  axiosInstance.interceptors.response.use(
    (response) => {
      if (events.onResult) {
        events.onResult(response);
      }
      if (events.onLoad) {
        events.onLoad(response);
      }
      return response;
    },
    (error) => {
      if (events.onError) {
        events.onError(error);
      }
      return Promise.reject(error);
    }
  );
};

export default setup;
