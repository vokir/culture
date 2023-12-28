import { defineStore } from 'pinia';
import { create, getList, remove, update } from '@/store/house/api.js';
import objectToFormData from '@/helpers/objectToFormData.js';
import { ref } from 'vue';

export const useHouseStore = defineStore('house', () => {
  const houses = ref([]);

  const getHousesList = async (complexId) => {
    try {
      const res = await getList(complexId);
      if (res.status === 200) {
        houses.value = res.data?.data ?? [];
      }
    } catch (e) {
      console.error(e);
    }
  };

  const createHouse = async (data, complexId) => {
    try {
      const formData = objectToFormData({ ...data, complexId });
      await create(formData);
    } catch (e) {
      console.error(e);
    }
  };

  const updateHouse = async (data) => {
    try {
      const formData = objectToFormData(data);
      return await update(data.realId, formData);
    } catch (e) {
      console.error(e);
    }
  };

  const deleteHouse = async (houseId) => {
    try {
      await remove(houseId);
    } catch (e) {
      console.error(e);
    }
  };

  return {
    createHouse,
    deleteHouse,
    updateHouse,
    getHousesList,
    houses
  };
});
