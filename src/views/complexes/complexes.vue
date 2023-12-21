<template>
  <layout-default>
    <div class="complexes">
      <page-header
        :fields="[]"
        action-text="ДОБАВИТЬ КОМПЛЕКС"
        title="Жилые комплексы"
        @buttonAction="onOpenModal"
      />
      <complexes-list />
      <complexes-form v-if="isOpen" @closeModal="closeModal" @onSave="onSave" />
    </div>
  </layout-default>
</template>

<script setup>
import LayoutDefault from '@/layout/layout-default/layout-default.vue';
import PageHeader from '@/components/general/page-header/page-header.vue';
import ComplexesList from '@/components/complexes/complexes-list/complexes-list.vue';
import useModal from '@/hooks/useModal.js';
import ComplexesForm from '@/components/complexes/complexes-form/complexes-form.vue';
import { useComplexStore } from '@/store/complex/index.js';

const { isOpen, closeModal, openModal } = useModal();
const store = useComplexStore();

store.getComplexColumns();
store.getComplexList();

const onOpenModal = () => {
  store.clearForm();
  openModal();
};
const onSave = () => {
  store.createComplex(store.form);
  store.getComplexList();
};
</script>

<style lang="scss" scoped src="./complexes.scss"></style>
