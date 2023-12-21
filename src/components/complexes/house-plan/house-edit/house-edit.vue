<template>
  <div class="house__header">
    <div class="house__header-list">
      <div class="house__header-item">
        <div class="house__header-title">Подъезд</div>
        <div class="entryway-list">
          <div v-for="entry of store.entryways" class="entryway-list__item" @click="select(entry)">
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
      <div class="house__header-item">
        <div class="house__header-title">Этаж</div>
        <v-select />
        <icon-button v-if="editMode" active name="plus" size="10" variant="orange" />
      </div>
      <div class="house__header-item">
        <div class="house__header-title">Помещение</div>
        <v-select />
        <icon-button v-if="editMode" active name="plus" size="10" variant="orange" />
      </div>
    </div>
    <icon-button :active="editMode" name="pen" size="10" variant="orange" @click="toggleMode" />
  </div>
</template>

<script setup>
import IconButton from '@/components/ui/icon-button/icon-button.vue';
import { inject, ref } from 'vue';
import VSelect from '@/components/ui/v-select/v-select.vue';
import { useEntrywayStore } from '@/store/entryway/index.js';
import EntrywayForm from '@/components/complexes/entryway-form/entryway-form.vue';
import useModal from '@/hooks/useModal.js';

const emit = defineEmits(['updateEntry']);
const store = useEntrywayStore();
const currentComplex = inject('complex');
const currentHouse = inject('house');
const currentEntry = inject('entry');

const { isOpen: isOpenEntry, openModal: openEntryModal, closeModal: closeEntryModal } = useModal();

const editMode = ref(false);

const toggleMode = () => {
  editMode.value = !editMode.value;
};

const select = (data) => {
  currentEntry.value = data;
};

const onSave = async (data) => {
  await store.createEntryway(data, currentHouse.realId);
  await emit('updateEntry');
};
</script>

<style lang="scss" scoped src="./house-edit.scss"></style>
