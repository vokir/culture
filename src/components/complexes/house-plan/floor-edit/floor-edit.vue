<template>
  <div v-if="currentEntry.realId || (!currentEntry.realId && editMode)" class="house__header-item">
    <div class="house__header-title">Этаж</div>
    <v-select
      v-model="currentFloor"
      :options="floors"
      label="number"
      placeholder=""
      @onSelect="onSelectFloor"
    />
    <icon-button v-if="editMode" active name="plus" size="10" variant="orange" @click="openModal" />
    <floor-form
      v-if="isOpen"
      :entryways="entryways"
      :title="`Новый этаж / ${currentHouse.name} / ${currentComplex.name}`"
      @close-modal="closeModal"
      @on-save="onSave"
    />
  </div>
</template>

<script setup>
import VSelect from '@/components/ui/v-select/v-select.vue';
import IconButton from '@/components/ui/icon-button/icon-button.vue';
import useModal from '@/hooks/useModal.js';
import { computed, inject } from 'vue';
import FloorForm from '@/components/complexes/floor-form/floor-form.vue';
import { useFloorStore } from '@/store/floor/index.js';

const editMode = inject('editMode');
const { isOpen, openModal, closeModal } = useModal();
const floorStore = useFloorStore();
const currentComplex = inject('complex');
const currentHouse = inject('house');
const currentFloor = inject('floor');
const currentEntry = inject('entry');
const currentPremise = inject('premise');

const floors = computed(() => {
  if (currentEntry.value.realId) {
    return currentEntry.value.floors;
  } else {
    return [];
  }
});

const onSelectFloor = () => {
  currentPremise.value = {};
};

const entryways = computed(() => {
  const entrywayCount = JSON.parse(JSON.stringify(currentHouse.value)).entrywaysCount;
  let entrywaysCountArray = [];

  for (let i = 1; i <= entrywayCount; i++) {
    entrywaysCountArray.push(i);
  }

  return entrywaysCountArray;
});

const onSave = async (data) => {
  await floorStore.createFloor(data, currentHouse.value.realId);
  await emit('updateEntry');
};
</script>

<style lang="scss" scoped src="./floor-edit.scss"></style>
