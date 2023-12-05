<template>
  <div class="input-wrapper">
    <label
      class="input-wrapper__label"
      v-if="label"
      :for="name"
    >{{ label }}</label>
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
    <span class="input-wrapper__count" v-if="maxLength">{{ modelValue.length }} / {{ maxLength }}</span>
  </div>
</template>

<script>

export default {
  name: 'v-input',
  inheritAttrs: false,
  emits: ['update:modelValue', 'focus', 'blur', 'onInput'],
  props: {
    name: {
      type: String,
      required: true
    },
    label: String,
    modelValue: String,
    maxLength: String,
  },
  setup({ maxLength }, { emit }) {
    const updateValue = (event) => {
      if (maxLength) {
        if (event.target.value.length <= maxLength) {
          emit('update:modelValue', event.target.value)
        } else {
          event.target.value = event.target.value.substring(0, maxLength);
        }
      } else {
        emit('update:modelValue', event.target.value)
      }
			emit('onInput')
    }
    return {
      updateValue
    }
  }
};
</script>

<style lang="scss" src="./style.scss" scoped/>
