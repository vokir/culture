import axiosInstance from '@/services/api.js';

const getList = async (params) => {
  return await axiosInstance.get('/private/complex', {
    params
  });
};
const getById = async (id) => {
  const params = new URLSearchParams();
  params.append('include', 'documents, icon, accommodationPolicy');
  params.append('findWhere[id]', id);

  return await axiosInstance.get('/private/complex', {
    params
  });
};

const getColumns = async (params) => {
  return await axiosInstance.get('/private/complex/column', {
    params
  });
};

const create = async (data) => {
  return await axiosInstance.post('/private/complex', data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};

const update = async (id, data) => {
  return await axiosInstance.put(`/private/complex/${id}`, data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};

const remove = async (id) => {
  return await axiosInstance.delete(`/private/complex/${id}`);
};

export { getList, create, update, remove, getColumns, getById };
