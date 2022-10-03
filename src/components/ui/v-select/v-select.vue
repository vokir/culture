<template>
  <div :class="['select-wrapper', { 'select-wrapper--active': isOpen }]">
    <div v-if="labelSelect" class="select-wrapper__label">
      {{ labelSelect }}
    </div>
    <div class="select-wrapper__select">
      <div class="select-wrapper__placeholder">
        {{ selectedValue ? selectedValue : placeholder }}
      </div>
      <input ref="input" type="text" class="select-wrapper__select-input" readonly v-bind="$attrs" @focus="activate" @blur="deactivate" />
      <div class="select-wrapper__toggle" @mousedown.prevent="toggleOptions">
        <svg xmlns="http://www.w3.org/2000/svg" width="9" height="7" viewBox="0 0 9 7" fill="none">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M7.74305 0.5L4.49947 3.88092L1.25695 0.5L0 1.80955L3.24358 5.19047L4.50053 6.5L5.75749 5.19047L9 1.80955L7.74305 0.5Z" fill="#C6CDD3" />
        </svg>
      </div>
    </div>
    <ul class="select-wrapper__list" v-if="isOpen" @mousedown.prevent="activate">
      <li class="select-wrapper__item" v-for="(option, index) in options" @click="select(option)" :key="index">
        <template v-if="label">
          {{ option[label] }}
        </template>
        <template v-else>
          {{ option }}
        </template>
      </li>
    </ul>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";

export default {
  name: "v-select",
  emits: ["update:modelValue"],
  inheritAttrs: false,
  props: {
    options: [Array, Object],
    labelSelect: String,
    label: String,
    placeholder: {
      type: String,
      default: "Выберите опцию",
    },
    modelValue: {
      type: null,
      default: () => [],
    },
    optionAll: Boolean
  },
  setup({ label, modelValue }, { emit }) {
    const selectedValue = ref([]);
    const isOpen = ref(false);
    const input = ref(null);

    const activate = () => {
      input.value.focus();
      isOpen.value = true;
    };
    const deactivate = () => {
      input.value.blur();
      isOpen.value = false;
    };
    const toggleOptions = () => {
      isOpen.value ? deactivate() : activate();
    };

    const select = (option) => {
      let selected;
      if (label) {
        selected = option[label];
      } else {
        selected = option;
      }
      selectedValue.value = selected;
      emit("update:modelValue", option);
    };

    onMounted(() => {
      select(modelValue)
    })

    return {
      selectedValue,
      isOpen,
      activate,
      deactivate,
      toggleOptions,
      select,
      input,
    };
  },
};
</script>













<style lang="scss" src="./style.scss" scoped />
