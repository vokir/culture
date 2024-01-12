import axiosInstance from '@/services/api.js';

const getPremiseType = async () => {
  const params = new URLSearchParams();

  return await axiosInstance.get('/public/premise/type', {
    params
  });
};

const createPremise = async (data) => {
  return await axiosInstance.post('/private/premise/', data);
};

const getPremises = async (houseId) => {
  const params = new URLSearchParams();

  params.append('findWhereHas[house][id]', houseId);

  return await axiosInstance.get('/private/premise', {
    params
  });
};

export { getPremiseType, createPremise, getPremises };
