<template>
  <div class="house">
    <div class="house-header">
      <div class="house-title">Дом</div>
      <div class="house-list">
        <div
          v-for="house of complex.houses"
          :key="house.realId"
          :class="[
            'house-list__item',
            { 'house-list__item--active': house === store.currentHouse }
          ]"
          @click="selectHouse(house)"
        >
          {{ house.number }}
        </div>
      </div>
      <div class="house-action" @click="openModal">
        <v-icon height="10" name="pen" width="10" />
      </div>
    </div>
    <div class="house-view">
      <div v-for="house of complex.houses" :key="house.realId" class="house-template-container">
        <div class="house-template-title">Дом №{{ house.number }}</div>
        <div
          :class="['house-template', { 'house-template--active': house === store.currentHouse }]"
          @click="selectHouse(house)"
        >
          <div v-for="i of complex.floorsCount" class="house-template-floor">
            <div v-for="i of 4" class="house-template-premise"></div>
          </div>
        </div>
      </div>
    </div>
    <complex-house-form
      v-if="isOpen"
      :edit-mode="!!Object.keys(store.currentHouse).length"
      :houses-count="complex.houses.length"
      :initial-data="store.currentHouse"
      @closeModal="closeModal"
    />
  </div>
</template>

<script setup>
import { inject } from 'vue';
import VIcon from '@/components/ui/v-icon/v-icon.vue';
import ComplexHouseForm from '@/components/complexes/complex-house-form/complex-house-form.vue';
import useModal from '@/hooks/useModal.js';
import { useHouseStore } from '@/store/house/index.js';

const { isOpen, closeModal, openModal } = useModal();

const store = useHouseStore();

const complex = inject('complex');

const selectHouse = (house) => {
  if (store.currentHouse === house) {
    store.currentHouse = {};
  } else {
    store.currentHouse = house;
  }
};
</script>

<style lang="scss" scoped src="./complex-houses.scss"></style>
