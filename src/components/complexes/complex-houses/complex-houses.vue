<template>
  <div class="house">
    <div class="house-header">
      <div class="house-title">Дом</div>
      <div class="house-list">
        <div
          v-for="house of store.houses"
          :key="house.realId"
          :class="[
            'house-list__item',
            { 'house-list__item--active': house.realId === currentHouse.realId }
          ]"
          @click="selectHouse(house)"
        >
          {{ house.number }}
        </div>
      </div>
      <icon-button name="pen" size="10" @click="openModal" />
    </div>
    <div class="house-view">
      <div v-for="house of store.houses" :key="house.realId" class="house-template-container">
        <div class="house-template-title">{{ house.name }}</div>
        <div
          :class="[
            'house-template',
            { 'house-template--active': house.realId === currentHouse.realId }
          ]"
          @click="selectHouse(house)"
        >
          <div v-for="i of house.floorsCount" class="house-template-floor">
            <div v-for="i of 4" class="house-template-premise"></div>
          </div>
        </div>
      </div>
    </div>
    <complex-house-form
      v-if="isOpen"
      :title="`Новый дом / ${complex.name}`"
      @close-modal="closeModal"
    />
  </div>
</template>

<script setup>
import { inject, watchEffect } from 'vue';
import ComplexHouseForm from '@/components/complexes/complex-house-form/complex-house-form.vue';
import useModal from '@/hooks/useModal.js';
import { useHouseStore } from '@/store/house/index.js';
import { useRoute } from 'vue-router';
import IconButton from '@/components/ui/icon-button/icon-button.vue';

const store = useHouseStore();
const route = useRoute();
const complex = inject('complex');
const currentHouse = inject('house');
const currentEntry = inject('entry');

const { isOpen, closeModal, openModal } = useModal();

watchEffect(async () => {
  await store.getHousesList(route.params.id);
});

const selectHouse = (house) => {
  if (currentHouse.value === house) {
    currentHouse.value = {};
  } else {
    currentHouse.value = house;
  }
  currentEntry.value = {};
};
</script>

<style lang="scss" scoped src="./complex-houses.scss"></style>
