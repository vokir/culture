<template>
  <layout-default>
    <page-header-detail action-text="ВЕРНУТЬСЯ К СПИСКУ ЖК" back-link="/master-system/complexes">
      <template #title>
        <complex-detail-header />
      </template>
    </page-header-detail>
    <complex-info />
    <transition mode="out-in" name="fade">
      <house-info v-if="currentHouse.realId" />
    </transition>
    <transition mode="out-in" name="fade">
      <entryway-info v-if="currentEntry.realId && !currentFloor.realId" />
    </transition>
    <transition mode="out-in" name="fade">
      <floor-info v-if="currentEntry.realId && currentFloor.realId && !currentPremise.realId" />
    </transition>
    <transition mode="out-in" name="fade">
      <premise-info v-if="currentFloor.realId && currentPremise.realId" />
    </transition>
  </layout-default>
</template>

<script setup>
import LayoutDefault from '@/layout/layout-default/layout-default.vue';
import PageHeaderDetail from '@/components/general/page-header-detail/page-header-detail.vue';
import ComplexInfo from '@/components/complexes/complex-info/complex-info.vue';
import { useComplexStore } from '@/store/complex/index.js';
import { provide, ref, watchEffect } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import HouseInfo from '@/components/complexes/house-info/house-info.vue';
import EntrywayInfo from '@/components/complexes/entryway-info/entryway-info.vue';
import ComplexDetailHeader from '@/components/complexes/complex-detail-header/complex-detail-header.vue';
import FloorInfo from '@/components/complexes/floor-info/floor-info.vue';
import PremiseInfo from '@/components/complexes/premise-info/premise-info.vue';

const store = useComplexStore();

const route = useRoute();
const router = useRouter();

const currentComplex = ref({});
const currentHouse = ref({});
const currentEntry = ref({});
const currentFloor = ref({});
const currentPremise = ref({});

watchEffect(async () => {
  currentComplex.value = await store.getComplexById(route.params.id);
  currentHouse.value = {};
  currentEntry.value = {};
});

provide('complex', currentComplex);
provide('house', currentHouse);
provide('entry', currentEntry);
provide('floor', currentFloor);
provide('premise', currentPremise);
</script>

<style lang="scss" scoped src="./complexes-detail.scss"></style>
