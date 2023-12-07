<template>
  <div class="image-placeholder">
    <div
      v-if="image && !image.src"
      class="image-placeholder__placeholder"
      @click="$emit('openModal')"
    >
      <div class="image-placeholder__icon">
        <svg
          fill="none"
          height="24"
          viewBox="0 0 24 24"
          width="24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M20 16.5556C20 16.9386 19.8468 17.306 19.574 17.5769C19.3012 17.8478 18.9312 18 18.5455 18H5.45455C5.06878 18 4.69881 17.8478 4.42603 17.5769C4.15325 17.306 4 16.9386 4 16.5556V8.61111C4 8.22802 4.15325 7.86062 4.42603 7.58973C4.69881 7.31885 5.06878 7.16667 5.45455 7.16667H8.36364L9.81818 5H14.1818L15.6364 7.16667H18.5455C18.9312 7.16667 19.3012 7.31885 19.574 7.58973C19.8468 7.86062 20 8.22802 20 8.61111V16.5556Z"
            stroke="#C6CDD3"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
          />
          <path
            d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
            stroke="#C6CDD3"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
          />
        </svg>
      </div>
      {{ label }}
    </div>
    <div v-else class="image-placeholder__load">
      <div class="image-placeholder__label">
        {{ label }}
      </div>
      <div class="image-placeholder__preview">
        <div class="image-placeholder__preview-icon">
          <img :alt="image.name" :src="image.src" />
        </div>
        <div class="image-placeholder__preview-name">
          {{ image.name }}
        </div>
        <div class="image-placeholder__preview-delete" @click="$emit('deleteImage')">
          <svg
            fill="none"
            height="10"
            viewBox="0 0 10 10"
            width="10"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.91406 2.0835L2.08075 7.91681"
              stroke="#9E9E9E"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M2.08594 2.0835L7.91925 7.91681"
              stroke="#9E9E9E"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VImagePlaceholder',
  props: {
    image: {
      type: Object,
      required: true,
      default: () => ({
        id: null,
        src: null,
        name: null
      })
    },
    label: {
      type: String,
      default: 'Добавить изображение'
    }
  },
  emits: ['deleteImage', 'openModal']
};
</script>

<style lang="scss" src="./style.scss" scoped />
