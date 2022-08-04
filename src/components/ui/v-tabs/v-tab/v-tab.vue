<template>
  <div :class="['tabs-list__content', { 'tabs-list__content--active': title === selectedTitle }]">
    <slot/>
  </div>
</template>

<script>
import { inject } from "vue";

export default {
  name: "v-tab",
  props: {
    title: {
      type: String,
      required: true
    }
  },
  setup() {
    const selectedTitle = inject('selectedTitle')

    return {
      selectedTitle
    }
  }
}
</script>

<style lang="scss" src="./style.scss" scoped/>
