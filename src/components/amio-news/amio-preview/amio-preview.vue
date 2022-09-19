<template>
  <div class="preview">
    <div class="preview-header">
      <div class="preview-header__icon">
        <template v-if="icon && icon.file">
          <img :src="icon.file" alt="title">
        </template>
        <template v-else>
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
            <g clip-path="url(#clip0_525_27445)">
              <path
                d="M6.41692 18.9801C4.5964 21.2539 3.59375 24.1409 3.59375 27.1096C3.59375 34.2174 9.37643 40.0001 16.4842 40.0001C23.5921 40.0001 29.3747 34.2174 29.3747 27.1096C29.3747 24.1409 28.3721 21.2538 26.5516 18.9801L16.4843 6.40674L6.41692 18.9801ZM27.0311 27.1096C27.0311 32.9251 22.2998 37.6564 16.4843 37.6564C10.6688 37.6564 5.93755 32.9251 5.93755 27.1096C5.93755 24.6714 6.75755 22.3046 8.24652 20.445L16.4843 10.1566L24.7221 20.4451C26.211 22.3046 27.0311 24.6714 27.0311 27.1096Z"
                fill="white"/>
              <path
                d="M10.625 27.1094H8.28125C8.28125 31.6325 11.9611 35.3124 16.4843 35.3124V32.9687C13.2534 32.9687 10.625 30.3402 10.625 27.1094Z"
                fill="white"/>
              <path
                d="M36.4061 9.45343C36.4061 8.10813 35.9644 6.84509 35.1286 5.80041L30.5468 0L25.965 5.80049C25.1293 6.84509 24.6875 8.1082 24.6875 9.4535C24.6875 12.6843 27.316 15.3128 30.5468 15.3128C33.7776 15.3128 36.4061 12.6843 36.4061 9.45343ZM27.0312 9.45343C27.0312 8.64507 27.296 7.88742 27.7969 7.26227L30.5468 3.78106L33.2967 7.26227C33.7976 7.88735 34.0624 8.645 34.0624 9.45343C34.0624 11.3919 32.4853 12.969 30.5468 12.969C28.6083 12.969 27.0312 11.3919 27.0312 9.45343Z"
                fill="white"/>
            </g>
            <defs>
              <clipPath id="clip0_525_27445">
                <rect width="40" height="40" fill="white"/>
              </clipPath>
            </defs>
          </svg>
        </template>
      </div>
      <div class="preview-header__title">
        <template v-if="title.length">
          {{ title }}
        </template>
        <template v-else>
          Кратковременное отключение горячей воды
        </template>
      </div>
    </div>
    <div class="preview-body">
      <template v-if="desc.length">
        {{ desc }}
      </template>
      <template v-else>
        В связи с техническими работами на
        тепловой линии горячая вода будет недоступна
      </template>
    </div>
    <div class="preview-footer">
      <div class="preview-footer__date">
        <template v-if="date.length">
          {{ computeDate(date) }}
        </template>
        <template v-else>
          Сегодня 14:30
        </template>
      </div>
      <div class="preview-footer__type">
        <template v-if="type && type.name">
          {{ type.name }}
        </template>
        <template v-else>
          Новость
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import computeDate from "@/helpers/dateFormat";

export default {
  name: "amio-preview",
  inheritAttrs: false,
  props: {
    icon: {
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
    desc: {
      type: String,
      required: false,
      default: ''
    },
    date: {
      type: String,
      required: false,
      default: ''
    },
    type: {
      type: Object,
      required: false,
      default: () => ({})
    }
  },
  setup() {
    return {
      computeDate
    }
  }
}
</script>

<style lang="scss" src="./style.scss" scoped/>
