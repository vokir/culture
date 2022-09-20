<template>
  <div class="input-wrapper">
    <label class="input-wrapper__label" v-if="label" :for="name">
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
    <span class="input-wrapper__count" v-if="maxLength">
      {{ modelValue.length }} / {{ maxLength }}
    </span>
  </div>
</template>

<script>
import VInput from "../v-input/v-input.vue";

export default {
  extends: VInput,
  inheritAttrs: false,
  emits: ["update:modelValue"],
  name: "v-textarea",
  setup({ maxLength }, { emit }) {
    const updateValue = (event) => {
      if (event.target.value.length <= maxLength) {
        emit("update:modelValue", event.target.value);
      } else {
        event.target.value = event.target.value.substring(0, maxLength);
      }
    };
    return {
      updateValue,
    };
  },
};
</script>

<style lang="scss" src="../v-input/style.scss" scoped />
