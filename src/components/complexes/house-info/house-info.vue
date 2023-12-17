<template>
  <div class="complex-info">
    <div class="complex-info__left">
      <div class="complex-info__left-inner">
        <div class="house-header">
          <div class="house-header__name">Дом №{{ store.currentHouse.number }}</div>
        </div>
        <v-tabs link-title>
          <v-tab title="Информация">
            <info-block :info="houseInfo" />
          </v-tab>
          <v-tab title="Документы">
            <document-block :documents="store.currentHouse.documents" />
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
import VTabs from '@/components/ui/v-tabs/v-tabs.vue';
import VTab from '@/components/ui/v-tabs/v-tab/v-tab.vue';
import InfoBlock from '@/components/complexes/info-block/info-block.vue';
import DocumentBlock from '@/components/complexes/document-block/document-block.vue';
import ChangesBlock from '@/components/complexes/changes-block/changes-block.vue';
import { useHouseStore } from '@/store/house/index.js';
import { computed } from 'vue';
import createInfo from '@/helpers/createInfo.js';

const store = useHouseStore();

const houseInfo = computed(() => {
  const fields = {
    realId: 'ID',
    active: 'Активность',
    houses: 'Домов',
    address: 'Адрес',
    phone: 'Телефон'
  };
  return createInfo(store.currentHouse, fields);
});
</script>

<style lang="scss" scoped src="./house-info.scss"></style>
