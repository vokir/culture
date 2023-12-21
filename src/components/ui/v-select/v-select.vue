<template>
  <div :class="['select-wrapper', { 'select-wrapper--active': isOpen }]">
    <div v-if="labelSelect" class="select-wrapper__label">
      {{ labelSelect }}
    </div>
    <div class="select-wrapper__select">
      <div class="select-wrapper__placeholder">
        {{ selectedValue ? selectedValue : placeholder }}
      </div>
      <input
        ref="input"
        class="select-wrapper__select-input"
        readonly
        type="text"
        v-bind="$attrs"
        @blur="deactivate"
        @focus="activate"
      />
      <div class="select-wrapper__toggle" @mousedown.prevent="toggleOptions">
        <v-icon height="7" name="arrow-down" width="9" />
      </div>
    </div>
    <ul v-if="isOpen" class="select-wrapper__list" @mousedown.prevent="activate">
      <li
        v-for="(option, index) in options"
        :key="index"
        :class="['select-wrapper__item', { active: modelValue === option }]"
        @click="select(option)"
        @click.stop="$emit('toggleOption')"
      >
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
import { onMounted, ref, watch } from 'vue';
import VIcon from '@/components/ui/v-icon/v-icon.vue';

export default {
  name: 'VSelect',
  components: { VIcon },
  inheritAttrs: false,
  props: {
    options: [Array, Object],
    labelSelect: String,
    label: String,
    placeholder: {
      type: String,
      default: 'Выберите опцию'
    },
    modelValue: {
      type: null,
      default: () => []
    }
  },
  emits: ['update:modelValue', 'toggleOption'],
  setup(props, { emit }) {
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

    watch(
      () => props.modelValue,
      (val) => {
        select(val);
      }
    );

    const select = (option) => {
      let label = props.label;
      let selected;
      if (label && option) {
        selected = option[label];
      } else {
        selected = option;
      }
      selectedValue.value = selected;
      deactivate();
      emit('update:modelValue', option);
    };

    onMounted(() => {
      select(props.modelValue);
    });

    return {
      selectedValue,
      isOpen,
      input,
      activate,
      deactivate,
      toggleOptions,
      select
    };
  }
};
</script>

<style lang="scss" scoped src="./style.scss" />
