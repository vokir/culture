<template>
  <div class="input-wrapper">
    <label class="input-label">{{ label }}</label>
    <div class="input-container">
      <input v-model="localValue.number" class="input" @blur="closeModal" @focus="openModal" />
      <v-icon
        v-if="localValue.number"
        :class="['check', { 'check--remove': showRemoveBtn }]"
        height="15"
        name="check-small"
        width="15"
      />
      <transition name="fade">
        <div v-if="isOpen" class="input-list">
          <div v-for="option of filteredOptions" class="input-list__item" @click="select(option)">
            <div class="input-list__item-number">
              {{ option.number }}
            </div>
            <div class="input-list__item-name">
              {{ option.userName }}
            </div>
            <div class="input-list__item-info">
              {{ option.email }}
              {{ option.phone }}
            </div>
          </div>
        </div>
      </transition>
      <v-icon
        v-if="showRemoveBtn"
        class="remove"
        height="12"
        name="close"
        width="12"
        @click="emit('remove')"
      />
    </div>
    <div v-if="localValue.userName" class="person">
      <div class="person-name">{{ localValue.userName }}</div>
      <div class="person-phone">{{ localValue.phone }}</div>
      <div class="person-email">{{ localValue.email }}</div>
    </div>
  </div>
</template>

<script setup>
import { useVModel } from '@vueuse/core';
import { computed, ref } from 'vue';
import VIcon from '@/components/ui/v-icon/v-icon.vue';
import useModal from '@/hooks/useModal.js';

const emit = defineEmits(['update:modelValue']);
const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({
      number: '',
      name: '',
      phone: '',
      email: ''
    })
  },
  options: {
    type: Array,
    default: () => []
  },
  label: {
    type: String,
    default: ''
  },
  showRemoveBtn: {
    type: Boolean,
    default: false
  }
});
const localValue = useVModel(props, 'modelValue', emit);
const search = ref('');
const { isOpen, openModal, closeModal } = useModal();
const filteredOptions = computed(() =>
  props.options.filter((e) => e.number.includes(search.value))
);

const select = (option) => {
  localValue.value = {
    ...option
  };
};
</script>

<style lang="scss" scoped src="./v-add-person-input.scss"></style>
