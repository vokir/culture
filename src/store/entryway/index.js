import { defineStore } from 'pinia';
import { create, getList, remove, update } from '@/store/entryway/api.js';
import objectToFormData from '@/helpers/objectToFormData.js';
import { ref } from 'vue';

export const useEntrywayStore = defineStore('entryway', () => {
  const entryways = ref([]);
  const floors = ref([[], [], [], [], []]);
  const premises = ref({});

  const currentEntryWay = ref({});

  const getEntrywayList = async (houseId) => {
    try {
      const res = await getList(houseId);
      if (res.status === 200) {
        entryways.value = res.data?.data ?? [];
        entryways.value.forEach((entry) => {
          premises.value[entry.realId] = [];
          entry.floors.forEach((floor, idx) => {
            floors.value[idx].push({
              realId: floor.realId,
              number: floor.number,
              name: floor.name,
              entryId: entry.realId
            });

            floor.premises.forEach((premise) => {
              premises.value[entry.realId].push({
                floorId: premise.floorId,
                number: premise.number,
                name: premise.name,
                id: premise.realId
              });
            });
          });
        });
      }
    } catch (e) {
      console.error(e);
    }
  };

  const createEntryway = async (data, houseId) => {
    try {
      const formData = objectToFormData(data);
      formData.append('houseId', houseId);
      await create(formData);
    } catch (e) {
      console.error(e);
    }
  };

  const updateEntryway = async (data) => {
    try {
      const formData = objectToFormData(data);
      await update(data.realId, formData);
    } catch (e) {
      console.error(e);
    }
  };

  const deleteEntryway = async (id) => {
    try {
      await remove(id);
    } catch (e) {
      console.error(e);
    }
  };

  return {
    createEntryway,
    deleteEntryway,
    updateEntryway,
    getEntrywayList,
    entryways,
    currentEntryWay,
    floors,
    premises
  };
});
