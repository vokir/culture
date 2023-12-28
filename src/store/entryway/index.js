import { defineStore } from 'pinia';
import { create, getList, getRequestList, remove, update } from '@/store/entryway/api.js';
import objectToFormData from '@/helpers/objectToFormData.js';
import { ref } from 'vue';

export const useEntrywayStore = defineStore('entryway', () => {
  const entryways = ref([]);
  const floors = ref([[], [], [], [], []]);
  const premises = ref({});
  const requestList = ref([]);

  const getEntrywayList = async (houseId) => {
    try {
      const res = await getList(houseId);
      if (res.status === 200) {
        entryways.value = res.data?.data ?? [];
        floors.value = [[], [], [], [], []];
        premises.value = {};

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
                realId: premise.realId
              });
            });
          });
        });
      }
    } catch (e) {
      console.error(e);
    }
  };

  const getEntryRequestList = async (entryId) => {
    try {
      const res = await getRequestList(entryId);

      if (res.status === 200) {
        requestList.value = res.data.data;
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

  const updateEntryway = async (data, houseId) => {
    try {
      const formData = objectToFormData(data);
      formData.append('houseId', houseId);

      return await update(data.realId, formData);
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
    getEntryRequestList,
    requestList,
    entryways,
    floors,
    premises
  };
});
