<template>
  <div class="input-wrapper">
    <label v-if="label" :for="name" class="input-wrapper__label">{{ label }}</label>
    <input
      :id="name"
      :class="['input-wrapper__input', { 'input-wrapper__input--error': error }]"
      :maxlength="maxLength"
      :name="name"
      :value="modelValue"
      v-bind="$attrs"
      @blur="$emit('blur')"
      @focus="$emit('focus')"
      @input="updateValue"
    />
    <span v-if="maxLength" class="input-wrapper__count"
      >{{ modelValue.length }} / {{ maxLength }}</span
    >
  </div>
</template>

<script>
export default {
  name: 'VInput',
  inheritAttrs: false,
  props: {
    name: {
      type: String,
      required: true
    },
    label: String,
    modelValue: [String, Number],
    maxLength: String,
    error: Boolean
  },
  emits: ['update:modelValue', 'focus', 'blur', 'onInput'],
  setup({ maxLength }, { emit }) {
    const updateValue = (event) => {
      if (maxLength) {
        if (event.target.value.length <= maxLength) {
          emit('update:modelValue', event.target.value);
        } else {
          event.target.value = event.target.value.substring(0, maxLength);
        }
      } else {
        emit('update:modelValue', event.target.value);
      }
      emit('onInput');
    };
    return {
      updateValue
    };
  }
};
</script>

<style lang="scss" scoped src="./style.scss" />
