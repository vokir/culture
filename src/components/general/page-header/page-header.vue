<template>
  <div class="container-header">
    <div class="container-header__title">
      {{ title }}
      <div class="container-header__title-favorite">
        <v-icon height="24" name="star" width="24" />
      </div>
    </div>
    <div class="container-header__search">
      <!--      <news-filter-->
      <!--        :fields="fields"-->
      <!--        @filter-table="emit('filterTable')"-->
      <!--        @update-fields="emit('updateFields')"-->
      <!--      />-->
    </div>
    <div class="container-header__action">
      <v-button class="btn--w100" @click="emit('buttonAction')">
        {{ actionText }}
      </v-button>
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
    required: true
  },
  actionText: {
    type: String,
    required: true
  },
  fields: {
    type: Array,
    required: false
  }
});
</script>

<style lang="scss" scoped src="./page-header.scss"></style>
