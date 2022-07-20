<template>
  <div class="input-wrapper">
    <label
        class="input-wrapper__label"
        v-if="label"
        :for="name"
    >{{ label }}</label>
    <component
        :is="tag"
        :id="name"
        :name="name"
        class="input-wrapper__input"
        v-bind="$attrs"
        :value="modelValue"
        :maxlength="maxLength"
        @input="updateValue"
    />
    <span class="input-wrapper__count" v-if="maxLength">{{ modelValue.length }} / {{ maxLength }}</span>
  </div>
</template>

<script>

import { computed } from "vue";

export default {
  name: 'v-input',
  inheritAttrs: false,
  emits: ['update:modelValue'],
  props: {
    name: {
      type: String,
      required: true
    },
    label: String,
    modelValue: String,
    maxLength: Number,
    textarea: Boolean
  },
  setup({ maxLength, textarea }, { emit }) {
    const tag = computed(() => {
      return textarea ? 'textarea' : 'input'
    })
    const updateValue = (event) => {
      if (event.target.value.length <= maxLength) {
        emit('update:modelValue', event.target.value)
      } else {
        event.target.value = event.target.value.substring(0, maxLength);
      }
    }
    return {
      updateValue,
      tag
    }
  }
};
</script>

<style lang="scss" src="./style.scss" scoped/>
