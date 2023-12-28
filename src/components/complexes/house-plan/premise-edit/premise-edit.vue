<template>
  <div v-if="currentFloor.realId || (!currentFloor.realId && editMode)" class="house__header-item">
    <div class="house__header-title">Помещение</div>
    <v-select v-model="currentPremise" :options="premises" label="number" placeholder="" />
    <icon-button v-if="editMode" active name="plus" size="10" variant="orange" />
  </div>
</template>

<script setup>
import VSelect from '@/components/ui/v-select/v-select.vue';
import IconButton from '@/components/ui/icon-button/icon-button.vue';
import { computed, inject } from 'vue';
import useModal from '@/hooks/useModal.js';

const editMode = inject('editMode');
const { isOpen, openModal, closeModal } = useModal();
const currentFloor = inject('floor');
const currentPremise = inject('premise');

const premises = computed(() => {
  if (currentFloor.value.realId) {
    return currentFloor.value.premises;
  } else {
    return [];
  }
});
</script>

<style lang="scss" scoped src="./premise-edit.scss"></style>
