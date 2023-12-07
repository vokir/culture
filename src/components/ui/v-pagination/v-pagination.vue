<template>
  <nav v-if="perPage < total" class="pagination">
    <ul class="pagination-list">
      <li class="pagination-list__item">
        <button :disabled="modelValue === 1" class="pagination-list__button pagination-list__item--prev"
                @click="prevPage">
          &lt;
        </button>
      </li>
      <li v-for="page of pageCount" :key="page" class="pagination-list__item" @click="toPage(page)">
        <button :class="['pagination-list__button', {'pagination-list__button--active': page === modelValue}]">
          {{ page }}
        </button>
      </li>
      <li class="pagination-list__item pagination-list__item--next" @click="nextPage">
        <button :disabled="modelValue >= pageCount" class="pagination-list__button">
          &gt;
        </button>
      </li>
    </ul>
  </nav>
</template>

<script>
import {computed, watch} from "vue";
import {useVModel} from "@vueuse/core";

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
  setup(props, {emit}) {
    const localValue = useVModel(props, "modelValue", emit)

    const nextPage = () => {
      localValue.value++
    }

    const prevPage = () => {
      localValue.value--
    }

    const toPage = (page) => {
      localValue.value = page
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
      localValue,
      nextPage,
      prevPage,
      toPage
    }
  }
}
</script>

<style lang="scss" scoped src="./style.scss"/>
