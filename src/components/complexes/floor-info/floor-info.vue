<template>
  <div class="complex-info">
    <div class="complex-info__left">
      <div class="complex-info__left-inner">
        <div class="house-header">
          <div class="house-header__name">{{ currentFloor.name }}</div>
          <v-button variant="link" @click="">
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
    <div class="complex-info__right"></div>
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

const currentFloor = inject('floor');

const floorInfo = computed(() => {
  const fields = {
    realId: 'ID',
    premisesCount: 'Помещений'
  };
  return createInfo(currentFloor.value, fields);
});
</script>

<style lang="scss" scoped src="./floor-info.scss"></style>
