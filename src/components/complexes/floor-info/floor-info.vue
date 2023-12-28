<template>
  <div class="complex-info">
    <div class="complex-info__left">
      <div class="complex-info__left-inner">
        <div class="house-header">
          <div class="house-header__name">{{ currentFloor.name }}</div>
          <v-button variant="link" @click="openModal">
            <v-icon height="11" name="pen" width="11" />
            Редактировать
          </v-button>
        </div>
        <v-tabs link-title>
          <v-tab title="Информация">
            <info-block :info="floorInfo" />
          </v-tab>
          <v-tab title="Документы">
            <document-block :documents="currentFloor.documents" />
          </v-tab>
          <v-tab title="История изменений">
            <changes-block />
          </v-tab>
        </v-tabs>
      </div>
    </div>
    <div class="complex-info__right">
      <entryway-requests />
    </div>
    <floor-form
      v-if="isOpen"
      :title="`Новый этаж / ${currentHouse.name} / ${currentComplex.name}`"
      edit-mode
      @close-modal="closeModal"
    />
  </div>
</template>
<script setup>
import VTab from '@/components/ui/v-tabs/v-tab/v-tab.vue';
import DocumentBlock from '@/components/complexes/document-block/document-block.vue';
import VTabs from '@/components/ui/v-tabs/v-tabs.vue';
import ChangesBlock from '@/components/complexes/changes-block/changes-block.vue';
import VButton from '@/components/ui/v-button/v-button.vue';
import VIcon from '@/components/ui/v-icon/v-icon.vue';
import InfoBlock from '@/components/complexes/info-block/info-block.vue';
import { computed, inject } from 'vue';
import createInfo from '@/helpers/createInfo.js';
import EntrywayRequests from '@/components/complexes/entryway-requests/entryway-requests.vue';
import FloorForm from '@/components/complexes/floor-form/floor-form.vue';
import useModal from '@/hooks/useModal.js';
import { useFloorStore } from '@/store/floor/index.js';

const currentFloor = inject('floor');
const { isOpen, closeModal, openModal } = useModal();
const floorStore = useFloorStore();
const currentHouse = inject('house');
const currentComplex = inject('complex');

const onSave = async (data) => {
  const res = await floorStore.updateFloor(data, currentHouse.value.realId);
  if (res.status === 200) {
    currentFloor.value = res.data.data;
  }
};

const floorInfo = computed(() => {
  const fields = {
    realId: 'ID',
    premisesCount: 'Помещений'
  };
  return createInfo(currentFloor.value, fields);
});
</script>

<style lang="scss" scoped src="./floor-info.scss"></style>
