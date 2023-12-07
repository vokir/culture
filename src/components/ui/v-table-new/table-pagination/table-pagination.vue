<template>
  <div class="news-controls">
    <v-pagination
        v-model="localCurrentPage"
        :perPage="perPage"
        :total="total"
    />
    <div class="news-controls__page">
      На странице:
      <v-select
          v-model="localPerPage"
          :options="[5, 10, 20, 50, 100]"
      />
    </div>
  </div>
</template>

<script setup>
import VSelect from "@/components/ui/v-select/v-select.vue";
import VPagination from "@/components/ui/v-pagination/v-pagination.vue";
import {useVModel} from "@vueuse/core";

const emit = defineEmits(['update:currentPage', 'update:perPage'])
const props = defineProps({
  currentPage: {
    type: Number,
    default: 1,
  },
  perPage: {
    type: Number,
    default: 20,
  },
  total: {
    type: Number,
    default: 100,
  }
})

const localCurrentPage = useVModel(props, 'currentPage', emit)
const localPerPage = useVModel(props, 'perPage', emit)
</script>

<style lang="scss" scoped src="./table-pagination.scss"></style>
