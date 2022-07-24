<template>
  <div :class="['badge', 'badge--' + variant  ]" :title="tooltipText">
    {{ text }}
  </div>
</template>

<script>
export default {
  name: "v-badge",
  props: {
    text: {
      type: String,
      required: true
    },
    tooltip: {
      type: Boolean,
      default: false
    },
    tooltipText: {
      type: String,
      default: 'Text'
    },
    variant: {
      type: String,
      required: false,
      default: 'blue',
      validator(value) {
        return ['blue', 'purple', 'orange', 'teal'].includes(value)
      }
    }
  }
}
</script>

<style lang="scss" src="./style.scss" scoped/>
