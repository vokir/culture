<template>
  <div v-if="currentFloor.realId || (!currentFloor.realId && editMode)" class="house__header-item">
    <div class="house__header-title">Помещение</div>
    <v-select v-model="currentPremise" :options="premises" label="number" placeholder="" />
    <icon-button v-if="editMode" active name="plus" size="10" variant="orange" @click="openModal"/>

    <room-form
        v-if="isOpen"
        :entryways="entryways"
        :title="`Новый этаж / ${currentHouse.name} / ${currentComplex.name}`"
        @close-modal="closeModal"
    />
  </div>
</template>

<script setup>
import VSelect from '@/components/ui/v-select/v-select.vue';
import IconButton from '@/components/ui/icon-button/icon-button.vue';
import { computed, inject } from 'vue';
import useModal from '@/hooks/useModal.js';
import RoomForm from "@/components/complexes/room-form/room-form.vue";

const editMode = inject('editMode');
const { isOpen, openModal, closeModal } = useModal();
const currentFloor = inject('floor');
const currentPremise = inject('premise');
const currentComplex = inject('complex');
const currentHouse = inject('house');

const premises = computed(() => {
  if (currentFloor.value.realId) {
    return currentFloor.value.premises;
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
</script>

<style lang="scss" scoped src="./premise-edit.scss"></style>
