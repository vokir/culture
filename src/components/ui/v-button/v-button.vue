<template>
  <component
    :is="computeComponent"
    :class="['btn', `btn--${variant}`, {
      'btn--disabled': disabled,
    }]"
    :to="href"
    :disabled="disabled"
  >
    <slot></slot>
  </component>
</template>
<script>
import { computed } from "vue";

export default {
  name: 'v-button',
  props: {
    href: {
      type: String,
      required: false
    },
    disabled: {
      type: Boolean,
      required: false,
    },
    variant: {
      type: String,
      required: false,
      default: 'primary',
      validator(value) {
        return ['primary', 'danger', 'success', 'transparent', 'bordered', 'gray', 'link'].includes(value)
      }
    },
  },
  setup({ href }) {

    const computeComponent = computed(() => {
      return href ? 'router-link' : 'button'
    })

    return {
      computeComponent,
    }
  }
}
</script>

<style lang="scss" src="./style.scss" scoped/>
