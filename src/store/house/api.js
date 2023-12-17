import axiosInstance from '@/services/api.js';

const create = async (data) => {
  return await axiosInstance.post('/private/house', data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};

export { create };
