import { defineStore } from 'pinia';
import { create } from '@/store/house/api.js';
import objectToFormData from '@/helpers/objectToFormData.js';
import { ref } from 'vue';

export const useHouseStore = defineStore('house', () => {
  const currentHouse = ref({});

  const createHouse = async (data, complexId) => {
    try {
      const formData = objectToFormData(data);
      formData.append('complexId', complexId);
      await create(formData);
    } catch (e) {
      console.error(e);
    }
  };

  return {
    createHouse,
    currentHouse
  };
});
