import { defineStore } from 'pinia';
import { ref } from 'vue';
import { createPremise, getPremises, getPremiseType } from '@/store/premise/api.js';
import objectToFormData from '@/helpers/objectToFormData.js';
import getBool from '@/helpers/getBool.js';

export const usePremiseStore = defineStore('premise', () => {
  const premises = ref([]);

  const form = ref({
    entryway: null,
    active: 'Да',
    name: '',
    number: 0,
    typeId: 0,
    floorId: 0,
    attachedTo: null,
    description: '',
    totalArea: 0,
    livingArea: 0,
    roomCount: '1',
    ceilingHeight: 0,
    windowCount: '1',
    hasPhone: 1,
    hasInternet: 'Да',
    hasBalcony: 'Да',
    hasElevator: 'Да',
    postalAddress: '',
    isMain: 1,
    documents: [],
    personalAccounts: []
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

  const getPremise = async (houseId) => {
    try {
      const res = await getPremises(houseId);
      if (res.status === 200) {
        premises.value = res.data.data;
      }
    } catch (e) {
      console.error(e);
    }
  };

  const createPremiseFunc = async () => {
    try {
      const mappedData = {
        ...form.value,
        hasInternet: getBool(form.value.hasInternet),
        hasBalcony: getBool(form.value.hasBalcony),
        hasElevator: getBool(form.value.hasElevator),
        typeId: currentType.value.realId,
        attachedTo: form.value.attachedTo?.realId,
        entrywayId: form.value.entryway.realId,
        floorId: form.value.floorId.realId
      };

      const formData = objectToFormData(mappedData);

      await createPremise(formData);
    } catch (e) {
      console.error(e);
    }
  };

  return {
    form,
    premiseTypes,
    currentType,
    premises,
    createPremiseFunc,
    getPremise,
    getPremisesTypes
  };
});
