import { defineStore } from 'pinia';
import { create, getList, remove, update } from '@/store/house/api.js';
import objectToFormData from '@/helpers/objectToFormData.js';
import { ref } from 'vue';

export const useHouseStore = defineStore('house', () => {
  const currentHouse = ref({});
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
      const formData = objectToFormData(data);
      formData.append('complexId', complexId);
      formData.append('name', `Дом №${data.number}`);
      await create(formData);
    } catch (e) {
      console.error(e);
    }
  };

  const updateHouse = async (data) => {
    try {
      const formData = objectToFormData(data);

      const res = await update(data.realId, formData);
      if (res.status === 200) {
        currentHouse.value = res.data.data;
      }
    } catch (e) {
      console.error(e);
    }
  };

  const deleteHouse = async () => {
    try {
      await remove(currentHouse.value.realId);
    } catch (e) {
      console.error(e);
    }
  };

  return {
    createHouse,
    deleteHouse,
    updateHouse,
    getHousesList,
    currentHouse,
    houses
  };
});
