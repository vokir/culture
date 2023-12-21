<template>
  <v-icon height="16" name="settings" width="16" @click="openModal" />
  <v-modal v-if="isOpen" centered class="modal-select-columns" @close-modal="closeModal">
    <div class="select-columns__wrapper">
      <div class="select-columns__title">Настройка таблицы «Комплексы»</div>
      <div class="select-columns__options">
        <div
          v-for="(column, i) in localValue"
          :key="i"
          :class="[
            'select-columns__option',
            { 'select-columns__option--checked': column.checked },
            { 'select-columns__option--editting': column.editting }
          ]"
          @click="toggleColumn(column)"
        >
          <v-checkbox v-model="column.checked" :disabled="column.editting" />
          <label
            v-if="!column.editting"
            :contenteditable="column.editting"
            class="select-columns__label"
            onfocus=""
          >
            {{ column.title }}
          </label>
          <input v-else v-model="column.title" class="select-columns__label" type="text" />
          <div
            :class="['select-columns__edit']"
            @click.prevent.stop="toggleEditColumn($event, column)"
          >
            <v-icon height="11" name="pen" width="11" />
          </div>
        </div>
      </div>
      <div class="select-columns__btns">
        <div class="select-columns__return" @click="setDefaultColumns">
          <v-icon height="11" name="rollback" width="11" />
          <span>По умолчанию</span>
        </div>
        <div class="select-columns__main-btns">
          <v-button :variant="'success'" @click="saveColumns">Применить</v-button>
          <v-button :variant="'link'" @click="cancelColumns">Отменить</v-button>
        </div>
        <div class="select-columns__additional-btns">
          <v-button :variant="'underline'" @click="selectAll">Выбрать все</v-button>
          <v-button :variant="'underline'" @click="unselectAll">Отменить все</v-button>
        </div>
      </div>
    </div>
  </v-modal>
</template>

<script setup>
import { ref, watchEffect } from 'vue';
import VModal from '@/components/ui/v-modal/v-modal.vue';
import VButton from '@/components/ui/v-button/v-button.vue';
import VCheckbox from '@/components/ui/v-checkbox/v-checkbox.vue';
import useModal from '@/hooks/useModal.js';
import VIcon from '@/components/ui/v-icon/v-icon.vue';

const emit = defineEmits(['update:modelValue', 'updateTable']);
const props = defineProps({
  modelValue: {
    type: Array,
    default: () => []
  },
  title: {
    type: String,
    default: 'Настройка таблицы «Комплексы»'
  }
});

const { isOpen, openModal, closeModal } = useModal();
const columnsBeforeChanges = ref([]);
const localValue = ref([]);

watchEffect(() => {
  columnsBeforeChanges.value = JSON.parse(JSON.stringify(props.modelValue));
  localValue.value = JSON.parse(JSON.stringify(props.modelValue));
});

const selectAll = () => {
  localValue.value.map((column) => (column.checked = true));
};

const unselectAll = () => {
  localValue.value.map((column) => (column.checked = false));
};

const saveColumns = () => {
  localValue.value.map((val) => (val.editting = false));
  emit('update:modelValue', localValue.value);
  emit('updateTable');
  closeModal();
};

const cancelColumns = () => {
  emit('update:modelValue', columnsBeforeChanges.value);
  closeModal();
};

const toggleColumn = (column) => {
  !column.editting ? (column.checked = !column.checked) : null;
};

const toggleEditColumn = (e, column) => {
  column.editting = !column.editting;
  setTimeout(() => {
    let edittableEl = e.srcElement
      .closest('.select-columns__option')
      .querySelector('input.select-columns__label');
    edittableEl?.focus();
  }, 0);
};

const setDefaultColumns = () => {
  localValue.value.map((val) => (val.checked = val.default));
};
</script>
<style lang="scss" scoped src="./table-select-columns.scss"></style>
