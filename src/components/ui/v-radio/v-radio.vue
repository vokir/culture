<template>
  <label :for="uid" class="radio">
    <input
      class="radio__input"
      :id="uid"
      type="radio"
      :value="value"
      :checked="isChecked"
      @change="$emit('update:modelValue', $event.target.value)"
    >
    <span class="radio__checkmark"></span>
    <slot/>
  </label>
</template>

<script>
import { computed, getCurrentInstance } from "vue";

export default {
  name: "v-radio",
  emits: ["update:modelValue"],
  inheritAttrs: false,
  props: {
    modelValue: {
      type: String,
      default: ''
    },
    value: {
      type: String,
      default: undefined
    }
  },
  setup(props) {
    const isChecked = computed(() => {
      return props.modelValue === props.value
    })
    const uid = computed(() => {
      let instance = getCurrentInstance()
      return 'radio-' + instance.uid
    })
    return {
      uid,
      isChecked
    }
  }
}
</script>

<style lang="scss" src="./style.scss" scoped/>
