<template>
  <layout-default>
    <page-header-detail action-text="ВЕРНУТЬСЯ К СПИСКУ ЖК" back-link="/master-system/complexes">
      <template #title>
        <div class="complex-title">
          <div class="complex-title__left">
            <img
              :src="currentComplex.icon?.url ? currentComplex.icon.url : placeholder"
              class="avatar"
            />
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
            @close-modal="closeModal"
            @on-save="onSave"
          />
        </div>
      </template>
    </page-header-detail>
    <complex-info />
    <transition mode="out-in" name="fade">
      <house-info v-if="currentHouse.realId" />
    </transition>
    <transition mode="out-in" name="fade">
      <entryway-info v-if="currentEntry.realId" />
    </transition>
  </layout-default>
</template>

<script setup>
import LayoutDefault from '@/layout/layout-default/layout-default.vue';
import PageHeaderDetail from '@/components/general/page-header-detail/page-header-detail.vue';
import VButtonDropdown from '@/components/ui/v-button-dropdown/v-button-dropdown.vue';
import VButtonDropdownItem from '@/components/ui/v-button-dropdown/v-button-dropdown-item/v-button-dropdown-item.vue';
import placeholder from '@/assets/images/placeholder.png';
import ComplexInfo from '@/components/complexes/complex-info/complex-info.vue';
import ComplexesForm from '@/components/complexes/complexes-form/complexes-form.vue';
import useModal from '@/hooks/useModal.js';
import { useComplexStore } from '@/store/complex/index.js';
import { provide, ref, watchEffect } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import HouseInfo from '@/components/complexes/house-info/house-info.vue';
import EntrywayInfo from '@/components/complexes/entryway-info/entryway-info.vue';

const store = useComplexStore();

const route = useRoute();
const router = useRouter();
const currentComplex = ref({});
const currentHouse = ref({});
const currentEntry = ref({});

watchEffect(async () => {
  currentComplex.value = await store.getComplexById(route.params.id);
  currentHouse.value = {};
  currentEntry.value = {};
});

const { isOpen, closeModal, openModal } = useModal();

const onEdit = () => {
  store.editComplex(currentComplex.value);
  openModal();
};

const onSave = async () => {
  await store.updateComplex();
  currentComplex.value = await store.getComplexById(route.params.id);
};

const onDelete = () => {
  store.deleteComplex(currentComplex.value.realId);
  router.push({ name: 'complexes' });
};

provide('complex', currentComplex);
provide('house', currentHouse);
provide('entry', currentEntry);
</script>

<style lang="scss" scoped src="./complexes-detail.scss"></style>
