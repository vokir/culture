<template>
  <div ref="target" class="btn-dropdown" @click="toggle">
    <button class="btn-dropdown__btn">
      <v-icon height="11" name="pen" width="11" />
      <slot name="button-content">
        {{ text }}
      </slot>
      <span :class="['btn-dropdown__trigger', { 'btn-dropdown__trigger--open': isOpen }]">
        <v-icon height="5" name="triangle" width="9" />
      </span>
    </button>
    <transition mode="out-in" name="fade">
      <div v-if="isOpen" class="btn-dropdown__dropdown">
        <slot />
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { onClickOutside } from '@vueuse/core';
import useModal from '@/hooks/useModal.js';
import VIcon from '@/components/ui/v-icon/v-icon.vue';

defineProps({
  text: {
    type: String
  }
});
const target = ref(null);
const { isOpen, openModal, closeModal, toggle } = useModal();

onClickOutside(target, closeModal);
</script>

<style lang="scss" scoped src="./v-button-dropdown.scss"></style>
