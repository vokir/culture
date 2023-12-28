import { defineStore } from 'pinia';
import { ref } from 'vue';
import { create, getFloor, remove, update } from '@/store/floor/api.js';
import objectToFormData from '@/helpers/objectToFormData.js';

export const useFloorStore = defineStore('floor', () => {
  const form = ref({
    type: 0,
    entranceNumber: 1,
    floorNumber: 1,
    rules: []
  });

  const currentFloor = ref({});
  const floors = ref([]);

  const getFloorList = async (complexId) => {
    try {
      const res = await getFloor(complexId);
      if (res.status === 200) {
        floors.value = res.data?.data ?? [];
      }
    } catch (e) {
      console.error(e);
    }
  };

  const createFloor = async (data, houseId) => {
    try {
      const formData = objectToFormData(data);
      formData.append('houseId', houseId);
      await create(formData);
    } catch (e) {
      console.error(e);
    }
  };

  const updateFloor = async (data) => {
    try {
      const formData = objectToFormData(data);

      const res = await update(data.realId, formData);
      if (res.status === 200) {
        currentFloor.value = res.data.data;
      }
    } catch (e) {
      console.error(e);
    }
  };

  const deleteFloor = async () => {
    try {
      await remove(currentFloor.value.realId);
    } catch (e) {
      console.error(e);
    }
  };

  const clearForm = () => {
    form.value = {
      type: 'Жилой',
      entranceNumber: '2',
      floorNumber: 18
    };
  };

  return {
    form,
    currentFloor,
    floors,
    getFloorList,
    createFloor,
    updateFloor,
    deleteFloor,
    clearForm
  };
});
