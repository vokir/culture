<template>
  <div class="complex-title">
    <div class="complex-title__left">
      <img :src="currentComplex.icon?.url ? currentComplex.icon.url : placeholder" class="avatar" />
      {{ currentComplex.name }}
    </div>
    <v-button-dropdown text="Редактировать">
      <v-button-dropdown-item @click="onEdit">Реадктировать ЖК</v-button-dropdown-item>
      <v-button-dropdown-item @click="onDelete">Удалить ЖК</v-button-dropdown-item>
    </v-button-dropdown>
    <complexes-form
      v-if="isOpen"
      edit-mode
      title="Редактирование ЖК"
      @onSave="onSave"
      @close-modal="closeModal"
    />
  </div>
</template>

<script setup>
import placeholder from '@/assets/images/placeholder.png';
import VButtonDropdown from '@/components/ui/v-button-dropdown/v-button-dropdown.vue';
import ComplexesForm from '@/components/complexes/complexes-form/complexes-form.vue';
import VButtonDropdownItem from '@/components/ui/v-button-dropdown/v-button-dropdown-item/v-button-dropdown-item.vue';
import { inject } from 'vue';
import useModal from '@/hooks/useModal.js';
import { useRoute, useRouter } from 'vue-router';
import { useComplexStore } from '@/store/complex/index.js';

const currentComplex = inject('complex');
const store = useComplexStore();
const route = useRoute();
const router = useRouter();

const { isOpen, closeModal, openModal } = useModal();

const onSave = async () => {
  await store.updateComplex();
  currentComplex.value = await store.getComplexById(route.params.id);
};

const onEdit = () => {
  store.editComplex(currentComplex.value);
  openModal();
};
const onDelete = () => {
  store.deleteComplex(currentComplex.value.realId);
  router.push({ name: 'complexes' });
};
</script>

<style lang="scss" scoped src="./complex-detail-header.scss"></style>
