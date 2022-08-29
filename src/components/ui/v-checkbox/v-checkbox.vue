<template>
  <label :for="uid" class="checkbox">
    <input
      class="checkbox__input"
      type="checkbox"
      :id="uid"
      :value="value"
      v-model="modelValue"
      v-bind="$attrs"
    >
    <span class="checkbox__check">
      <svg xmlns="http://www.w3.org/2000/svg" width="15" height="16" viewBox="0 0 15 16" fill="white">
        <path
          d="M6.66917 11.3333L12.5608 5.44083L11.3825 4.2625L6.66917 8.97667L4.31167 6.61917L3.13333 7.7975L6.66917 11.3333Z"
          fill="inherit"
        />
      </svg>
    </span>
  </label>
</template>

<script>
import { computed, getCurrentInstance } from "vue";

export default {
  name: "v-checkbox",
  inheritAttrs: false,
  props: {
    value: { default: '' },
    modelValue: {
      type: [Array, Boolean],
      default: false
    },
  },
  setup() {
    const uid = computed(() => {
      let instance = getCurrentInstance()
      return instance.uid
    })
    return {
      uid
    }
  }
}
</script>

<style lang="scss" src="./style.scss" scoped/>
