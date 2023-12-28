<template>
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
    <icon-button v-if="editMode" active name="plus" size="10" variant="orange" @click="openModal" />
    <entryway-form
      v-if="isOpen"
      :title="`Новый подъезд / ${currentHouse.name} / ${currentComplex.name}`"
      @close-modal="closeModal"
      @on-save="onSave"
    />
  </div>
</template>

<script setup>
import EntrywayForm from '@/components/complexes/entryway-form/entryway-form.vue';
import IconButton from '@/components/ui/icon-button/icon-button.vue';
import useModal from '@/hooks/useModal.js';
import { inject } from 'vue';
import { useEntrywayStore } from '@/store/entryway/index.js';

const { isOpen, openModal, closeModal } = useModal();
const store = useEntrywayStore();

const editMode = inject('editMode');
const currentComplex = inject('complex');
const currentHouse = inject('house');
const currentEntry = inject('entry');
const currentFloor = inject('floor');
const currentPremise = inject('premise');

const onSave = async (data) => {
  await store.createEntryway(data, currentHouse.value.realId);
  await emit('updateEntry');
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
</script>

<style lang="scss" scoped src="./entryway-edit.scss"></style>
