<template>
  <svg :height="height" :width="width" aria-hidden="true" class="icon">
    <use :xlink:href="`#${name}`" />
  </svg>
</template>

<script>
export default {
  name: 'VIcon',
  props: {
    width: {
      type: [String, Number],
      default: '24'
    },
    height: {
      type: [String, Number],
      default: '24'
    },
    name: {
      type: String,
      required: true
    }
  }
};
</script>

<style lang="scss" scoped src="./v-icon.scss" />
