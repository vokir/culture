import axiosInstance from '@/services/api.js';

const getList = async (houseId) => {
  const params = new URLSearchParams();

  params.append('findWhere[house_id]', houseId);
  params.append('include', 'documents, floors, floors.premises');

  return await axiosInstance.get('/private/entryway', {
    params
  });
};

const getRequestList = async (entryId) => {
  const params = new URLSearchParams();

  params.append('findWhere[entryway_id]', entryId);

  return await axiosInstance.get('/public/request', {
    params
  });
};

const create = async (data) => {
  return await axiosInstance.post('/private/entryway', data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};

const remove = async (id) => {
  return await axiosInstance.delete(`/private/entryway/${id}`, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};

const update = async (id, data) => {
  return await axiosInstance.put(`/private/entryway/${id}`, data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    params: {
      include: 'documents'
    }
  });
};

export { getList, create, remove, update, getRequestList };
