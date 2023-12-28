<template>
  <v-table-new
    :columns="store.columns"
    :loading="store.isLoading"
    :rows="store.complexes"
    prevent-cell-click
    @copy="onCopy"
    @delete="onDelete"
    @edit="onEdit"
    @on-array-delete="onArrayDelete"
  >
    <template #tableHeader="col">{{ col.title }}</template>
    <template #tableRow="{ row, col, selected }">
      <span v-if="col.id === 'icon'">
        <img v-if="row.avatar" :src="row.avatar" alt="" class="avatar" />
        <img v-else :src="placeholder" alt="" class="avatar" />
      </span>
      <span v-else-if="col.id === 'active'">
        <template v-if="selected.includes(row)">
          <v-select v-model="row.active" :options="['Да', 'Нет']" />
        </template>
        <template v-else>
          {{ row.active }}
        </template>
      </span>
      <span v-else-if="col.id === 'documents'">
        {{ row.documents.map((doc) => doc.title).join(', ') }}
      </span>
      <span v-else-if="col.id === 'address'">
        <template v-if="selected.includes(row)">
          <v-input v-model="row.address" name="Адресс" />
        </template>
        <template v-else>
          {{ row.address }}
        </template>
      </span>
      <span v-else-if="col.id === 'name'">
        <router-link :to="{ name: 'complexes-detail', params: { id: row.realId } }" class="link">
          {{ row.name }}
        </router-link>
      </span>
      <span v-else>{{ row[col.id] }}</span>
    </template>
  </v-table-new>
  <complexes-form
    v-if="isOpen"
    edit-mode
    title="Редактирование ЖК"
    @onSave="onSave"
    @close-modal="closeModal"
  />
  <table-pagination
    :current_page="store.pagination.current_page"
    :per_page="store.pagination.per_page"
    :total="store.pagination.total"
    @update="updateTable"
  />
</template>

<script setup>
import VInput from '@/components/ui/v-input/v-input.vue';
import VSelect from '@/components/ui/v-select/v-select.vue';
import TablePagination from '@/components/ui/v-table-new/table-pagination/table-pagination.vue';
import VTableNew from '@/components/ui/v-table-new/v-table-new.vue';
import ComplexesForm from '@/components/complexes/complexes-form/complexes-form.vue';
import useModal from '@/hooks/useModal.js';
import { useComplexStore } from '@/store/complex/index.js';
import placeholder from '@/assets/images/placeholder.png';

const { isOpen, closeModal, openModal } = useModal();

const store = useComplexStore();

const updateTable = (e) => {
  store.pagination.current_page = e.currentPage;
  store.pagination.per_page = e.perPage;
  store.getComplexList();
};

const onArrayDelete = (array) => {
  const promises = array.map((complex) => store.deleteComplex(complex.realId));

  Promise.allSettled(promises).then(() => {
    store.getComplexList();
  });
};

const onSave = async () => {
  await store.updateComplex();
  await store.getComplexList();
};

const onDelete = ({ id }) => {
  store.deleteComplex(id);
  store.getComplexList();
};
const onEdit = (complex) => {
  store.editComplex(complex);
  openModal();
};

const onCopy = (complex) => {
  store.createComplex(complex);
};
</script>

<style lang="scss" scoped src="./complexes-list.scss"></style>
