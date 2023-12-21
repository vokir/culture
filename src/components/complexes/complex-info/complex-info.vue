<template>
  <div class="complex-info">
    <div class="complex-info__left">
      <div class="complex-info__left-inner">
        <v-tabs link-title>
          <v-tab title="Информация">
            <info-block :info="complexInfo" />
          </v-tab>
          <v-tab title="Документы">
            <document-block :documents="currentComplex.documents" />
          </v-tab>
          <v-tab title="История изменений">
            <changes-block />
          </v-tab>
        </v-tabs>
      </div>
      <div class="complex-info__left-rules">
        <a class="complex-info__left-link" download="" href="#">
          <v-icon height="16" name="clip" width="14" />
          Правила проживания.pdf
        </a>
      </div>
    </div>
    <div class="complex-info__right">
      <complex-houses />
    </div>
  </div>
</template>

<script setup>
import VTabs from '@/components/ui/v-tabs/v-tabs.vue';
import VTab from '@/components/ui/v-tabs/v-tab/v-tab.vue';
import VIcon from '@/components/ui/v-icon/v-icon.vue';
import InfoBlock from '@/components/complexes/info-block/info-block.vue';
import DocumentBlock from '@/components/complexes/document-block/document-block.vue';
import ChangesBlock from '@/components/complexes/changes-block/changes-block.vue';
import ComplexHouses from '@/components/complexes/complex-houses/complex-houses.vue';
import { computed, inject } from 'vue';
import createInfo from '@/helpers/createInfo.js';

const currentComplex = inject('complex');

const complexInfo = computed(() => {
  const fields = {
    realId: 'ID',
    active: 'Активность',
    houses: 'Домов',
    address: 'Адрес',
    phone: 'Телефон'
  };
  return createInfo(currentComplex.value, fields);
});
</script>

<style lang="scss" scoped src="./complex-info.scss"></style>
