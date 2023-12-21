<template>
  <div class="complex-info">
    <div class="complex-info__left">
      <div class="complex-info__left-inner">
        <div class="house-header">
          <div class="house-header__name">{{ currentHouse.name }}</div>
          <v-button variant="link" @click="openModal">
            <v-icon height="11" name="pen" width="11" />
            Редактировать
          </v-button>
        </div>
        <v-tabs link-title>
          <v-tab title="Информация">
            <info-block :info="houseInfo" />
          </v-tab>
          <v-tab title="Документы">
            <document-block :documents="currentHouse.documents" />
          </v-tab>
          <v-tab title="История изменений">
            <changes-block />
          </v-tab>
        </v-tabs>
      </div>
    </div>
    <div class="complex-info__right">
      <house-plan />
    </div>
    <complex-house-form
      v-if="isOpen"
      :title="`${currentHouse.name} / ${complex.name}`"
      edit-mode
      @closeModal="closeModal"
    />
  </div>
</template>

<script setup>
import VTabs from '@/components/ui/v-tabs/v-tabs.vue';
import VTab from '@/components/ui/v-tabs/v-tab/v-tab.vue';
import InfoBlock from '@/components/complexes/info-block/info-block.vue';
import DocumentBlock from '@/components/complexes/document-block/document-block.vue';
import ChangesBlock from '@/components/complexes/changes-block/changes-block.vue';
import { useHouseStore } from '@/store/house/index.js';
import { computed, inject } from 'vue';
import createInfo from '@/helpers/createInfo.js';
import HousePlan from '@/components/complexes/house-plan/house-plan.vue';
import ComplexHouseForm from '@/components/complexes/complex-house-form/complex-house-form.vue';
import useModal from '@/hooks/useModal.js';
import VIcon from '@/components/ui/v-icon/v-icon.vue';
import VButton from '@/components/ui/v-button/v-button.vue';

const { isOpen, closeModal, openModal } = useModal();
const complex = inject('complex');
const currentHouse = inject('house');

const store = useHouseStore();
const houseInfo = computed(() => {
  const fields = {
    realId: 'ID',
    entrywaysCount: 'Подъездов',
    floorsCount: 'Этажей',
    address: 'Адрес',
    phone: 'Телефон'
  };
  return createInfo(currentHouse.value, fields);
});
</script>

<style lang="scss" scoped src="./house-info.scss"></style>
