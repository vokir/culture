<template>
  <div class="input-wrapper">
    <label v-if="label" class="input-wrapper__label" :for="name">
      {{ label }}
    </label>
    <textarea
      :id="name"
      :name="name"
      class="input-wrapper__input"
      v-bind="$attrs"
      :value="modelValue"
      :maxlength="maxLength"
      @input="updateValue"
    />
    <span v-if="maxLength" class="input-wrapper__count">
      {{ modelValue.length }} / {{ maxLength }}
    </span>
  </div>
</template>

<script>
import VInput from '../v-input/v-input.vue';

export default {
  name: 'VTextarea',
  extends: VInput,
  inheritAttrs: false,
  emits: ['update:modelValue'],
  setup({ maxLength }, { emit }) {
    const updateValue = (event) => {
      if (event.target.value.length <= maxLength) {
        emit('update:modelValue', event.target.value);
      } else {
        event.target.value = event.target.value.substring(0, maxLength);
      }
    };
    return {
      updateValue
    };
  }
};
</script>

<style lang="scss" src="../v-input/style.scss" scoped />
