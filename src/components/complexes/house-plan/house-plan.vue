<template>
  <div class="house">
    <house-edit @update-entry="entryWayStore.getEntrywayList(currentHouse.value.realId)" />
    <!--    <div class="house__template">-->
    <!--      <div class="template-floors">-->
    <!--        <div v-for="(floor, idx) of entryWayStore.floors" class="template-floors__item">-->
    <!--          {{ idx }}-->
    <!--        </div>-->
    <!--      </div>-->
    <!--      <div class="template-body">-->
    <!--        <div class="template-body__entryway">-->
    <!--          <div-->
    <!--            v-for="entry of entryWayStore.entryways"-->
    <!--            :key="entry.realId"-->
    <!--            class="template-body__entryway-item"-->
    <!--          >-->
    <!--            {{ entry.name }}-->
    <!--          </div>-->
    <!--        </div>-->
    <!--        <div-->
    <!--          v-for="(floor, idx) of entryWayStore.floors"-->
    <!--          :data-floor="idx"-->
    <!--          class="template-body__floor"-->
    <!--        >-->
    <!--          <div v-for="entry of floor" :data-entry="entry.entryId" class="template-body__entry">-->
    <!--            <div-->
    <!--              v-for="premise of entryWayStore.premises[entry.entryId].filter(-->
    <!--                (el) => el.floorId === entry.realId-->
    <!--              )"-->
    <!--              :data-floor="premise.realId"-->
    <!--              class="template-body__premise"-->
    <!--            >-->
    <!--              {{ premise.number }}-->
    <!--            </div>-->
    <!--          </div>-->
    <!--        </div>-->
    <!--      </div>-->
    <!--    </div>-->
  </div>
</template>

<script setup>
import HouseEdit from '@/components/complexes/house-plan/house-edit/house-edit.vue';
import { useEntrywayStore } from '@/store/entryway/index.js';
import { inject, watch } from 'vue';

const currentHouse = inject('house');

const entryWayStore = useEntrywayStore();

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
