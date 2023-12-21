import { defineStore } from 'pinia';
import { ref } from 'vue';
import getBool from '@/helpers/getBool.js';
import { mapComplex } from '@/store/complex/map.js';
import { create, getById, getColumns, getList, remove, update } from '@/store/complex/api.js';
import objectToFormData from '@/helpers/objectToFormData.js';
import { mapColumns } from '@/store/global/map.js';

export const useComplexStore = defineStore('complex', () => {
  const form = ref({
    name: '',
    active: 'Да',
    visibility: 'Все',
    order: 1,
    address: '',
    phone: '',
    coords: '',
    icon: null,
    documents: [],
    rules: []
  });
  const complexes = ref([]);
  const isLoading = ref(true);
  const pagination = ref({
    total: 100,
    per_page: 15,
    current_page: 1
  });

  const columns = ref([]);

  const getComplexColumns = async () => {
    try {
      const res = await getColumns();
      if (res.status === 200) {
        columns.value = res.data.data.map(mapColumns);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const getComplexList = async () => {
    try {
      isLoading.value = true;
      const res = await getList({
        page: pagination.value.current_page,
        per_page: pagination.value.per_page,
        include: 'icon, documents',
        paginate: 1
      });
      if (res.status === 200) {
        complexes.value = await Promise.all(res.data.data.map(mapComplex));

        const { current_page, total } = res.data.meta.pagination;
        pagination.value.current_page = current_page;
        pagination.value.total = total;
      }
    } catch (e) {
      console.error(e);
    } finally {
      isLoading.value = false;
    }
  };

  const createComplex = async (complex) => {
    try {
      const formData = objectToFormData(complex);
      formData.set('active', getBool(complex.active));
      formData.append('lat', '1235');
      formData.append('long', '321');
      formData.append('description', '123');
      await create(formData);
      await getComplexList();
    } catch (e) {
      console.error(e);
    }
  };

  const updateComplex = async () => {
    try {
      const formData = objectToFormData(form.value);

      formData.set('active', getBool(form.value.active));
      formData.append('lat', '1235');
      formData.append('long', '321');
      formData.append('description', '123');

      await update(form.value.id, formData);
    } catch (e) {
      console.error(e);
    }
  };

  const deleteComplex = async (id) => {
    try {
      await remove(id);
    } catch (e) {
      console.error(e);
    }
  };

  const clearForm = () => {
    form.value = {
      name: '',
      active: 'Да',
      visibility: 'Все',
      order: 1,
      address: '',
      phone: '',
      coords: '',
      documents: [],
      rules: [],
      icon: null
    };
  };

  const editComplex = (complex) => {
    form.value = {
      id: complex.realId,
      name: complex.name,
      active: complex.active,
      address: complex.address,
      icon: complex.icon,
      documents: complex.documents,
      phone: '',
      coords: '',
      visibility: 'Все',
      order: 1
    };
  };

  const getComplexById = async (id) => {
    try {
      const res = await getById(id);
      if (res.status === 200) {
        return await mapComplex(res.data.data[0]);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return {
    form,
    pagination,
    isLoading,
    columns,
    complexes,
    clearForm,
    getComplexById,
    editComplex,
    getComplexList,
    getComplexColumns,
    createComplex,
    updateComplex,
    deleteComplex
  };
});
