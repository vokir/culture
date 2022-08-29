<template>
  <nav class="pagination">
    <ul class="pagination-list">
      <li class="pagination-list__item">
        <button class="pagination-list__button pagination-list__item--prev" @click="prevPage"
                :disabled="pageNumber === 1">
          &lt;
        </button>
      </li>
      <li class="pagination-list__item" v-for="page of pageCount" @click="toPage(page)" :key="page">
        <button :class="['pagination-list__button', {'pagination-list__button--active': page === pageNumber}]">
          {{ page }}
        </button>
      </li>
      <li class="pagination-list__item pagination-list__item--next" @click="nextPage">
        <button class="pagination-list__button" :disabled="pageNumber >= pageCount">
          &gt;
        </button>
      </li>
    </ul>
  </nav>
</template>

<script>
import { computed, ref, watch } from "vue";

export default {
  name: "v-pagination",
  emits: ['update:modelValue'],
  props: {
    modelValue: Number,
    total: {
      type: Number,
      required: true
    },
    perPage: {
      type: Number,
      required: true
    },
  },
  setup({ total, perPage }, { emit }) {
    const pageNumber = ref(1)

    const nextPage = () => {
      pageNumber.value++;
    }

    const prevPage = () => {
      pageNumber.value--;
    }

    const toPage = (page) => {
      pageNumber.value = page
    }

    const pageCount = computed(() => {
      return Math.ceil(total / perPage);
    })

    watch(pageNumber, () => emit('update:modelValue', pageNumber.value))

    return {
      pageNumber,
      pageCount,
      nextPage,
      prevPage,
      toPage
    }
  }
}
</script>

<style lang="scss" src="./style.scss" scoped/>
