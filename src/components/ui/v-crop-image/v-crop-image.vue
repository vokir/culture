<template>
  <cropper
      :class="['cropper', `cropper--${size}`]"
      :src="img"
      @change="onChange"
      v-bind="options"
  />
</template>

<script>
// Библиотека для обрезки изображений
// https://norserium.github.io/vue-advanced-cropper/introduction/getting-started.html#package-installation
import { Cropper } from 'vue-advanced-cropper';
import 'vue-advanced-cropper/dist/style.css';
import { ref } from 'vue'

export default {
  name: 'v-crop-image',
  components: {
    Cropper
  },
  emits: ['update:modelValue'],
  props: {
    img: String,
    options: {
      type: Object,
      default: () => ({
        backgroundClass: 'cropper-background',
        foregroundClass: 'cropper-foreground',
        imageRestriction: 'fill-area',
        stencilProps: {
          handlers: {
            eastNorth: true,
            north: false,
            westNorth: true,
            west: false,
            westSouth: true,
            south: false,
            eastSouth: true,
            east: false,
          },
          lines: {
            north: false,
            west: false,
            south: false,
            east: false,
          }
        }
      })
    },
    size: {
      type: String,
      required: false,
      default: 'small',
      validator(value) {
        return ['small', 'big'].includes(value)
      }
    }
  },
  setup(_, ctx) {
    const cropResult = ref({
      coordinates: null,
      image: null
    })
    const onChange = ({ canvas, coordinates, image }) => {
      cropResult.value = {
        coordinates,
        image,
        canvas
      };

      ctx.emit('update:modelValue', cropResult)
    }
    return {
      cropResult,
      onChange
    }
  }
}
</script>

<style lang="scss" src="./style.scss" scoped/>
