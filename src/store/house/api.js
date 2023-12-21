import axiosInstance from '@/services/api.js';

const getList = async (complexId) => {
  const params = new URLSearchParams();

  params.append('findWhere[complex_id]', complexId);
  params.append('include', 'documents');

  return await axiosInstance.get('/private/house', {
    params
  });
};

const create = async (data) => {
  return await axiosInstance.post('/private/house', data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};

const remove = async (id) => {
  return await axiosInstance.delete(`/private/house/${id}`, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};

const update = async (id, data) => {
  return await axiosInstance.put(`/private/house/${id}`, data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    params: {
      include: 'documents'
    }
  });
};

export { getList, create, remove, update };
