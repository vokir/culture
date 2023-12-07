<template>
  <div class="select-options-wrapper">
    <div v-if="labelSelect" class="select-options-wrapper__label">
      {{ labelSelect }}
    </div>
    <div class="select-options-wrapper__items">
      <div class="select-options-wrapper__select">
        <v-select
          v-model="localSelected"
          :options="options"
          label="label"
          name="dateOptions"
          @toggle-option="updateModelValue"
        />
      </div>
      <div
        v-for="(cell, i) in selectedOption.cells"
        :key="i"
        class="select-options-wrapper__optional"
      >
        <input
          v-if="cell.type === 'number'"
          v-model="cell.value"
          class="select-options-wrapper__input"
          type="number"
          @input="updateModelValue"
        />
        <v-select
          v-else-if="cell.type === 'select'"
          v-model="cell.value"
          :options="cell.options"
          label="label"
          @toggle-option="updateModelValue"
        />
        <input
          v-if="cell.type === 'date'"
          v-model="cell.value"
          class="select-options-wrapper__input"
          type="date"
          @input="updateModelValue"
        />
      </div>
    </div>
  </div>
</template>
<script>
import VSelect from '../v-select/v-select.vue';
import { useVModel } from '@vueuse/core';

export default {
  name: 'VSelectOptions',
  components: { VSelect },
  props: {
    labelSelect: String,
    modelValue: {
      type: null,
      default: () => []
    },
    options: {
      type: Array,
      required: true,
      default: () => []
    },
    selectedOption: {
      type: Object,
      required: false,
      default: () => ({})
    }
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const localSelected = useVModel(props, 'selectedOption', emit);

    const updateModelValue = () => {
      let selectedValue = props.selectedOption;
      let newModelValue = { name: selectedValue.name, label: null, value: null };
      let type = selectedValue.type;
      let template = selectedValue.template;
      let cells = selectedValue.cells;
      const setModelValueByTemplate = () => {
        if (type === 'date') {
          cells.map((cell, ind) => {
            let regex = new RegExp(`var${ind}`, 'g');
            template = template.replace(regex, cell.value.label);
          });
        } else {
          cells.map((cell, ind) => {
            let regex = new RegExp(`var${ind}`, 'g');
            template = template.replace(regex, cell.value);
          });
        }

        newModelValue.label = template;
        if (cells.length === 1) {
          newModelValue.value = cells[0].value.toString();
        }
      };

      if (selectedValue.name !== 'any') {
        if (cells.every((cell) => cell.value) && template) {
          setModelValueByTemplate();
        } else {
          if (cells.length) {
            if (cells.some((cell) => cell.value)) {
              if (type === 'date') {
                newModelValue.label = cells.map((cell) => cell.value?.label).join(' ');
                newModelValue.value = cells.map((cell) => cell.value?.value).join(' ');
              } else {
                newModelValue.value = cells.map((cell) => cell.value).join(' ');
                newModelValue.label = cells.map((cell) => cell.value).join(' ');
              }
            }
          } else {
            newModelValue = selectedValue;
          }
        }
      }

      emit('update:modelValue', newModelValue);
    };

    return {
      updateModelValue,
      localSelected
    };
  }
};
</script>

<style lang="scss" scoped src="./style.scss" />
