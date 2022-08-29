<template>
  <cropper
    :class="['cropper', `cropper--${size}`]"
    :src="img"
    @change="onChange"
    v-bind="options"
    ref="cropRef"
  />
</template>

<script>
import { ref } from 'vue'
// Библиотека для обрезки изображений
// https://github.com/advanced-cropper/vue-advanced-cropper/
import { Cropper } from 'vue-advanced-cropper';
import 'vue-advanced-cropper/dist/style.css';

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
  setup(_, { emit }) {
    const cropResult = ref({
      coordinates: null,
      image: null
    })

    const cropRef = ref(null)

    const getResult = () => {
      return cropRef.value.getResult()
    }

    const onChange = ({ canvas, coordinates, image }) => {
      cropResult.value = {
        coordinates,
        image,
        canvas
      };

      emit('update:modelValue', cropResult)
    }
    return {
      cropResult,
      cropRef,
      getResult,
      onChange
    }
  }
}
</script>

<style lang="scss" src="./style.scss" scoped/>
