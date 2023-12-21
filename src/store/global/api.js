import axiosInstance from '@/services/api.js';

const getDocuments = async (params) => {
  return await axiosInstance.get('/private/document', {
    params
  });
};

const getTypes = async (params) => {
  return await axiosInstance.get('/private/document/type', {
    params
  });
};

const getImages = async (params) => {
  return await axiosInstance.get('/private/gallery/image', {
    params
  });
};

export { getDocuments, getImages, getTypes };
