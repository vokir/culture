<template>
  <div
    :style="{
      backgroundImage: `url('${
        imgLibrary && imgLibrary.file ? imgLibrary.file : '/src/assets/images/storyPreview.png'
      }')`
    }"
    class="stories"
  >
    <div v-if="!hideIcon" class="pick-image" @click="$emit('openModal')">
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
      Выбрать изображение
    </div>
    <div class="stories__content">
      <div class="stories__content-title">
        <template v-if="title.length">
          {{ title }}
        </template>
        <template v-else> Кратковременное отключение горячей воды</template>
      </div>
      <div class="stories__content-desc">
        <template v-if="fullDesc.length">
          {{ fullDesc }}
        </template>
        <template v-else>
          В связи с отключением электроэнергии филиалом ОАО «НЭСК-электросеть» «Москва электросеть»
          на ВНС будет снижено давление водоснабжения до 1,3 атм. абонентам по адресам: ул.1-я
          Заречная,13/1, 15/1,15/2,17, ул.2-я Заречная, 104а, 104б, 104в.
        </template>
      </div>
      <div class="stories__content-date">
        <template v-if="date.length">
          {{ computedDate(date) }}
        </template>
        <template v-else> Сегодня 14:30</template>
      </div>
    </div>
  </div>
</template>

<script>
import computedDate from '../../../helpers/dateFormat';

export default {
  name: 'AmioStories',
  inheritAttrs: false,
  props: {
    imgLibrary: {
      type: Object,
      required: false,
      default: () => ({
        file: null,
        id: null
      })
    },
    title: {
      type: String,
      required: false,
      default: ''
    },
    fullDesc: {
      type: String,
      required: false,
      default: ''
    },
    date: {
      type: String,
      required: false,
      default: ''
    },
    hideIcon: Boolean
  },
  emits: ['openModal'],
  setup() {
    return {
      computedDate
    };
  }
};
</script>

<style lang="scss" scoped src="./style.scss" />
