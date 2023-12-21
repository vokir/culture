<template>
  <button
    :class="[
      'icon-button',
      { 'icon-button--active': active, [`icon-button--${variant}`]: variant }
    ]"
  >
    <v-icon :height="size" :name="name" :width="size" />
  </button>
</template>

<script setup>
import VIcon from '@/components/ui/v-icon/v-icon.vue';

defineProps({
  name: String,
  size: [String, Number],
  active: Boolean,
  variant: {
    type: String,
    required: false,
    default: 'default',
    validator(value) {
      return ['orange', 'default'].includes(value);
    }
  }
});
</script>

<style lang="scss" scoped src="./icon-button.scss"></style>
