import { defineStore } from 'pinia';
import { ref } from 'vue';
import { getPremiseType } from '@/store/premise/api.js';

export const usePremiseStore = defineStore('premise', () => {
  const form = ref({
    name: '',
    number: 0,
    typeId: 0,
    floorId: 0,
    attachedTo: 0,
    description: '',
    totalArea: 0,
    livingArea: 0,
    roomCount: 0,
    ceilingHeight: 0,
    windowCount: 0,
    hasPhone: true,
    hasInternet: true,
    hasBalcony: true,
    hasElevator: true,
    postalAddress: '',
    isMain: true,
    documents: [0]
  });
  const currentType = ref();
  const premiseTypes = ref([]);

  const getPremisesTypes = async () => {
    try {
      const res = await getPremiseType();
      if (res.status === 200) {
        premiseTypes.value = res.data?.data ?? [];
      }
    } catch (e) {
      console.error(e);
    }
  };

  return {
    form,
    premiseTypes,
    currentType,
    getPremisesTypes
  };
});
