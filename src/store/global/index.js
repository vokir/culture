import { defineStore } from 'pinia';
import { ref } from 'vue';
import { getDocuments, getImages, getPersonalAccountList, getTypes } from '@/store/global/api.js';
import { mapAccounts } from '@/store/global/map.js';

export const useGlobalStore = defineStore('global', () => {
  const images = ref([]);
  const documents = ref([]);
  const documentTypes = ref([]);
  const accountList = ref([]);

  const isLoadingDocuments = ref(true);
  const isLoadingImages = ref(true);
  const isLoadingAccounts = ref(true);

  const getDocumentsList = async () => {
    try {
      isLoadingDocuments.value = true;
      const res = await getDocuments();
      if (res.status === 200) {
        documents.value = res.data?.data ?? [];
      }
    } catch (e) {
      console.error(e);
    } finally {
      isLoadingDocuments.value = false;
    }
  };
  const getDocumentTypes = async () => {
    try {
      const res = await getTypes();
      if (res.status === 200) {
        documentTypes.value = res.data?.data ?? [];
      }
    } catch (e) {
      console.error(e);
    }
  };

  const getDocumentType = (id) => {
    return documentTypes.value.find((el) => el.realId === id);
  };

  const getImagesList = async () => {
    try {
      isLoadingImages.value = true;
      const res = await getImages();
      if (res.status === 200) {
        images.value = res.data?.data ?? [];
      }
    } catch (e) {
      console.error(e);
    } finally {
      isLoadingImages.value = false;
    }
  };

  const getAccountList = async () => {
    try {
      const res = await getPersonalAccountList();
      if (res.status === 200) {
        accountList.value = res.data.data.map(mapAccounts);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return {
    getDocumentsList,
    getAccountList,
    getImagesList,
    getDocumentTypes,
    getDocumentType,
    isLoadingAccounts,
    accountList,
    documentTypes,
    isLoadingDocuments,
    isLoadingImages,
    images,
    documents
  };
});
