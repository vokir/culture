<template>
  <component
    :is="computeComponent"
    :class="[
      'btn',
      `btn--${variant}`,
      {
        'btn--disabled': disabled
      }
    ]"
    :disabled="disabled"
    :to="href"
  >
    <slot></slot>
  </component>
</template>
<script>
import { computed } from 'vue';

export default {
  name: 'VButton',
  props: {
    href: {
      type: String,
      required: false
    },
    disabled: {
      type: Boolean,
      required: false
    },
    variant: {
      type: String,
      required: false,
      default: 'primary',
      validator(value) {
        return [
          'primary',
          'danger',
          'success',
          'transparent',
          'bordered',
          'gray',
          'link',
          'underline'
        ].includes(value);
      }
    }
  },
  setup({ href }) {
    const computeComponent = computed(() => {
      return href ? 'router-link' : 'button';
    });

    return {
      computeComponent
    };
  }
};
</script>

<style lang="scss" scoped src="./style.scss" />
