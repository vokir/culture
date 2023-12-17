<template>
  <div class="container-header">
    <v-button :href="backLink" transparent variant="transparent">
      <v-icon class="btn--transparent__svg" height="10" name="arrow-prev" width="6" />
      {{ actionText }}
    </v-button>
    <div class="container-header__title">
      <slot name="title"></slot>
      <template v-if="!$slots.title">
        {{ title }}
      </template>
    </div>
  </div>
</template>

<script setup>
import VButton from '@/components/ui/v-button/v-button.vue';
import VIcon from '@/components/ui/v-icon/v-icon.vue';

const emit = defineEmits(['buttonAction', 'filterTable', 'updateFields']);
defineProps({
  title: {
    type: String,
    required: false
  },
  actionText: {
    type: String,
    required: true
  },
  backLink: {
    type: [Object, String]
  }
});
</script>

<style lang="scss" scoped src="./page-header-detail.scss"></style>
