<template>
  <div class="house">
    <house-edit @update-entry="entryWayStore.getEntrywayList(currentHouse.value.realId)" />
    <div v-if="entryWayStore.floors.length" class="house__template">
      <div class="template-floors">
        <div class="template-floors__item"></div>
        <div v-for="(floor, idx) of entryWayStore.floors" class="template-floors__item">
          {{ idx + 1 }}
        </div>
      </div>
      <div class="template-body">
        <div class="template-body__entryway">
          <div
            v-for="entry of entryWayStore.entryways"
            :key="entry.realId"
            :style="calcEntryWidth(entry.premisesCount)"
            class="template-body__entryway-item"
          >
            {{ entry.name }}
          </div>
        </div>
        <div
          v-for="(floorsArr, idx) of entryWayStore.floors"
          :key="idx"
          :data-floor="idx"
          class="template-body__floor"
        >
          <div
            v-for="floor of floorsArr"
            :key="floor.realId"
            :class="[
              'template-body__entry',
              { 'template-body__entry--active': entryIsActive(floor.entryId) }
            ]"
            :data-entry="floor.entryId"
          >
            <div
              v-for="premise of entryWayStore.premises[floor.entryId].filter(
                (el) => el.floorId === floor.realId
              )"
              :key="premise.realId"
              :class="[
                'template-body__premise',
                { 'template-body__premise--active': premiseIsActive(premise.realId, floor.realId) }
              ]"
              :data-floor="premise.realId"
            >
              {{ premise.number }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import HouseEdit from '@/components/complexes/house-plan/house-edit/house-edit.vue';
import { useEntrywayStore } from '@/store/entryway/index.js';
import { inject, watch } from 'vue';

const currentHouse = inject('house');
const currentEntry = inject('entry');
const currentFloor = inject('floor');
const currentPremise = inject('premise');

const entryIsActive = (entryId) => {
  if (currentFloor.value.realId) {
    return false;
  } else {
    return entryId === currentEntry.value.realId;
  }
};

const premiseIsActive = (premiseId, floorId) => {
  if (currentPremise.value.realId) {
    return premiseId === currentPremise.value.realId;
  } else {
    return floorId === currentFloor.value.realId;
  }
};

const entryWayStore = useEntrywayStore();

const calcEntryWidth = (premises) => {
  const premisesOnFloor = premises / currentHouse.value.entrywaysCount;
  return {
    width: premisesOnFloor * 40 + (premisesOnFloor - 1) * 3 + 'px'
  };
};

watch(
  () => currentHouse.value.realId,
  () => {
    entryWayStore.getEntrywayList(currentHouse.value.realId);
  },
  {
    immediate: true
  }
);
</script>

<style lang="scss" scoped src="./house-plan.scss"></style>
