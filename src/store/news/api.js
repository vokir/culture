import axiosInstance from '@/services/api.js';

const getList = async (params) => {
  return await axiosInstance.get('/private/news', {
    params
  });
};

const getColumns = async (params) => {
  return await axiosInstance.get('/private/news/column', {
    params
  });
};
const getType = async (params) => {
  return await axiosInstance.get('/private/news/type', {
    params
  });
};
const create = async (data) => {
  return await axiosInstance.post('/private/news', data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};

const update = async (id, data) => {
  return await axiosInstance.put(`/private/news/${id}`, data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};

const remove = async (id) => {
  return await axiosInstance.delete(`/private/news/${id}`);
};

export { getList, create, update, remove, getColumns, getType };
