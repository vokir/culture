import axiosInstance from '@/services/api.js';

const getFloor = async (complexId) => {
  const params = new URLSearchParams();

  params.append('findWhere[complex_id]', complexId);
  params.append('include', 'entryway');

  return await axiosInstance.get('/private/floor', {
    params
  });
};

const create = async (data) => {
  return await axiosInstance.post('/private/floor', data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};

const remove = async (id) => {
  return await axiosInstance.delete(`/private/floor/${id}`, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};

const update = async (id, data) => {
  return await axiosInstance.put(`/private/floor/${id}`, data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    params: {
      include: 'documents'
    }
  });
};

export { getFloor, create, remove, update };
