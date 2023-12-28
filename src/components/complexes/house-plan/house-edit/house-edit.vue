<template>
  <div class="house__header">
    <div class="house__header-list">
      <entryway-edit />
      <transition name="fade">
        <floor-edit v-if="currentEntry.realId || (!currentEntry.realId && editMode)" />
      </transition>
      <transition name="fade">
        <premise-edit v-if="currentFloor.realId || (!currentFloor.realId && editMode)" />
      </transition>
    </div>
    <icon-button :active="editMode" name="pen" size="10" variant="orange" @click="toggleMode" />
  </div>
</template>

<script setup>
import IconButton from '@/components/ui/icon-button/icon-button.vue';
import { inject, provide, ref } from 'vue';
import { useEntrywayStore } from '@/store/entryway/index.js';
import EntrywayEdit from '@/components/complexes/house-plan/entryway-edit/entryway-edit.vue';
import FloorEdit from '@/components/complexes/house-plan/floor-edit/floor-edit.vue';
import PremiseEdit from '@/components/complexes/house-plan/premise-edit/premise-edit.vue';

const emit = defineEmits(['updateEntry']);
const store = useEntrywayStore();
const currentEntry = inject('entry');
const currentFloor = inject('floor');

const editMode = ref(false);

const toggleMode = () => {
  editMode.value = !editMode.value;
};

provide('editMode', editMode.value);
</script>

<style lang="scss" scoped src="./house-edit.scss"></style>
