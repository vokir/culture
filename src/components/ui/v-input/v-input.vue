<template>
  <div class="input-wrapper">
    <label v-if="label" class="input-wrapper__label" :for="name">{{ label }}</label>
    <input
      :id="name"
      :name="name"
      class="input-wrapper__input"
      v-bind="$attrs"
      :value="modelValue"
      :maxlength="maxLength"
      @input="updateValue"
      @focus="$emit('focus')"
      @blur="$emit('blur')"
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
    modelValue: String,
    maxLength: String
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

<style lang="scss" src="./style.scss" scoped />
