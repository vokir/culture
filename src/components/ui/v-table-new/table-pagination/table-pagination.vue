<template>
  <div class="news-controls">
    <v-pagination v-model="currentPage" :per-page="perPage" :total="total" />
    <div class="news-controls__page">
      На странице:
      <v-select v-model="perPage" :options="[5, 10, 20, 50, 100]" />
    </div>
  </div>
</template>

<script setup>
import VSelect from '@/components/ui/v-select/v-select.vue';
import VPagination from '@/components/ui/v-pagination/v-pagination.vue';
import usePaginate from '@/hooks/usePaginate.js';

const emit = defineEmits(['update']);
const props = defineProps({
  current_page: {
    type: Number,
    default: 1
  },
  per_page: {
    type: Number,
    default: 20
  },
  total: {
    type: Number,
    default: 100
  }
});

const { currentPage, perPage, updatePage } = usePaginate(props.current_page, props.per_page);

updatePage(() => {
  emit('update', {
    currentPage,
    perPage
  });
});
</script>

<style lang="scss" scoped src="./table-pagination.scss"></style>
