<template>
  <div class="house__header">
    <div class="house__header-list">
      <div class="house__header-item">
        <div class="house__header-title">Подъезд</div>
        <div class="entryway-list">
          <div
            v-for="entry of store.entryways"
            :class="[
              'entryway-list__item',
              { 'entryway-list__item--active': entry.realId === currentEntry.realId }
            ]"
            @click="select(entry)"
          >
            {{ entry.number }}
          </div>
        </div>
        <icon-button
          v-if="editMode"
          active
          name="plus"
          size="10"
          variant="orange"
          @click="openEntryModal"
        />
        <entryway-form
          v-if="isOpenEntry"
          :title="`Новый подъезд / ${currentHouse.name} / ${currentComplex.name}`"
          @close-modal="closeEntryModal"
          @on-save="onSave"
        />
      </div>
      <transition name="fade">
        <div v-if="currentEntry.realId" class="house__header-item">
          <div class="house__header-title">Этаж</div>
          <v-select
            v-model="currentFloor"
            :options="floors"
            label="number"
            placeholder=""
            @update:modelValue="onSelectFloor"
          />
          <icon-button v-if="editMode" active name="plus" size="10" variant="orange" />
        </div>
      </transition>
      <transition name="fade">
        <div v-if="currentFloor.realId" class="house__header-item">
          <div class="house__header-title">Помещение</div>
          <v-select v-model="currentPremise" :options="premises" label="number" placeholder="" />
          <icon-button v-if="editMode" active name="plus" size="10" variant="orange" />
        </div>
      </transition>
    </div>
    <icon-button :active="editMode" name="pen" size="10" variant="orange" @click="toggleMode" />

    <floor-form
      v-if="isOpenFloor"
      :title="`Новый этаж / ${currentHouse.name} / ${currentComplex.name}`"
      :entryways="entryways"
      @close-modal="closeFloorModal"
      @on-save="onSave" />
  </div>
</template>

<script setup>
import IconButton from '@/components/ui/icon-button/icon-button.vue';
import { computed, inject, ref } from 'vue';
import VSelect from '@/components/ui/v-select/v-select.vue';
import { useEntrywayStore } from '@/store/entryway/index.js';
import EntrywayForm from '@/components/complexes/entryway-form/entryway-form.vue';
import useModal from '@/hooks/useModal.js';
import FloorForm from "@/components/complexes/floor-form/floor-form.vue";

const emit = defineEmits(['updateEntry']);
const store = useEntrywayStore();
const currentComplex = inject('complex');
const currentHouse = inject('house');
const currentEntry = inject('entry');
const currentFloor = inject('floor');
const currentPremise = inject('premise');

const { isOpen: isOpenEntry, openModal: openEntryModal, closeModal: closeEntryModal } = useModal();
const { isOpen: isOpenFloor, openModal: openFloorModal, closeModal: closeFloorModal } = useModal();

const editMode = ref(false);

const floors = computed(() => {
  if (currentEntry.value.realId) {
    return currentEntry.value.floors;
  } else {
    return [];
  }
});
const entryways = computed(() => {
  const entrywayCount = JSON.parse(JSON.stringify(currentHouse.value)).entrywaysCount;
  let entrywaysCountArray = [];

  for (let i = 1; i <= entrywayCount; i++) {
    entrywaysCountArray.push(i);
  }

  return entrywaysCountArray;
});
const premises = computed(() => {
  if (currentFloor.value.realId) {
    return currentFloor.value.premises;
  } else {
    return [];
  }
});

const toggleMode = () => {
  currentEntry.value = {};
  editMode.value = !editMode.value;
};

const select = (data) => {
  if (currentEntry.value === data) {
    currentEntry.value = {};
  } else {
    currentEntry.value = data;
  }
  currentFloor.value = {};
  currentPremise.value = {};
};

const onSelectFloor = () => {
  currentPremise.value = {};
};

const onSave = async (data) => {
  await store.createEntryway(data, currentHouse.realId);
  await emit('updateEntry');
};
</script>

<style lang="scss" scoped src="./house-edit.scss"></style>
