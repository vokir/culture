<template>
  <nav class="pagination" v-if="perPage < total">
    <ul class="pagination-list">
      <li class="pagination-list__item">
        <button class="pagination-list__button pagination-list__item--prev" @click="prevPage"
                :disabled="modelValue === 1">
          &lt;
        </button>
      </li>
      <li class="pagination-list__item" v-for="page of pageCount" @click="toPage(page)" :key="page">
        <button :class="['pagination-list__button', {'pagination-list__button--active': page === modelValue}]">
          {{ page }}
        </button>
      </li>
      <li class="pagination-list__item pagination-list__item--next" @click="nextPage">
        <button class="pagination-list__button" :disabled="modelValue >= pageCount">
          &gt;
        </button>
      </li>
    </ul>
  </nav>
</template>

<script>
import { computed, watch } from "vue";

export default {
  name: "v-pagination",
  emits: ['update:modelValue'],
  props: {
    modelValue: {
      type: Number,
      default: 1
    },
    total: {
      type: Number,
      default: 20,
      required: true
    },
    perPage: {
      type: Number,
      default: 20,
      required: true
    },
  },
  setup(props, { emit }) {

    const nextPage = () => {
      emit('update:modelValue', props.modelValue + 1)
    }

    const prevPage = () => {
      emit('update:modelValue', props.modelValue - 1)
    }

    const toPage = (page) => {
      emit('update:modelValue', page)
    }

    const pageCount = computed(() => {
      return Math.ceil(props.total / props.perPage);
    })

    watch(pageCount, (value) => {
      if (value < props.modelValue) {
        emit('update:modelValue', 1)
      }
    })

    return {
      pageCount,
      nextPage,
      prevPage,
      toPage
    }
  }
}
</script>

<style lang="scss" src="./style.scss" scoped/>
