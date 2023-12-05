<template>
  <div class="preview">
    <div class="preview__image">
      <div class="pick-image" @click="$emit('openModal')" v-if="!hideIcon">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M20 16.5556C20 16.9386 19.8468 17.306 19.574 17.5769C19.3012 17.8478 18.9312 18 18.5455 18H5.45455C5.06878 18 4.69881 17.8478 4.42603 17.5769C4.15325 17.306 4 16.9386 4 16.5556V8.61111C4 8.22802 4.15325 7.86062 4.42603 7.58973C4.69881 7.31885 5.06878 7.16667 5.45455 7.16667H8.36364L9.81818 5H14.1818L15.6364 7.16667H18.5455C18.9312 7.16667 19.3012 7.31885 19.574 7.58973C19.8468 7.86062 20 8.22802 20 8.61111V16.5556Z"
            stroke="#C6CDD3" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path
            d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
            stroke="#C6CDD3" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        Выбрать изображение
      </div>
      <img v-if="imgLandscape && imgLandscape.file" :src="imgLandscape.file" :alt="title">
      <img v-else src="/src/assets/images/storyPreview.png" :alt="title">
    </div>
    <div class="preview__date">
      <template v-if="date.length">
        {{ computedDate(date, 'DD MMMM YYYY в hh:mm', 'Сегодня в hh:mm') }}
      </template>
      <template v-else>
        20 ноября 2021 в 15:18
      </template>
      <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8.3169 11.9728C8.39201 12.0076 8.47953 11.9918 8.53962 11.9328L13.9335 6.62921C13.9758 6.58785 14 6.5297 14 6.4686C14 6.4075 13.9758 6.34935 13.9335 6.30799L8.5392 1.05755C8.47895 0.998877 8.39176 0.983644 8.31681 1.01843C8.24186 1.05339 8.19353 1.13197 8.19353 1.21868V4.15649C5.11861 4.19076 3.74722 5.4994 3.74806 5.50007C0.610558 8.04101 0.961807 11.5144 1.06631 12.1985C1.06631 12.2026 1.06729 12.207 1.06794 12.2111L1.17636 12.8209L1.17653 12.821C1.19171 12.9091 1.25621 12.9784 1.33915 12.9958C1.35238 12.9986 1.36577 13 1.37916 13C1.44905 13 1.5142 12.9626 1.55224 12.9005L1.87717 12.3702C4.14075 8.68746 7.09721 8.63017 8.19321 8.7572V11.7736C8.19354 11.8603 8.2422 11.9385 8.31714 11.9731L8.3169 11.9728Z" stroke="#868D95"/>
      </svg>
    </div>
    <div class="preview__title">
      <template v-if="title.length">
        {{ title }}
      </template>
      <template v-else>
        Кратковременное отключение горячей воды
      </template>
    </div>
    <div class="preview__tags" v-if="complex && complex.UF_NAME">
      <v-badge variant="gray" :text="complex.UF_NAME"/>
    </div>
    <div class="preview__desc">
      <template v-if="detail && fullDesc.length">
        {{ fullDesc }}
      </template>
      <template v-else-if="!detail && desc.length">
        {{ desc }}
      </template>
      <template v-else>
        9 ноября проведен подсчет голосов в рамках двух внеочередных общих собраний собственников помещений в форме очно заочного голосования.
      </template>
    </div>
    <div class="preview__show-all" v-if="!detail">
      Новость полностью
    </div>
  </div>
</template>

<script>
import computedDate from "../../helpers/dateFormat";
import VBadge from "../ui/v-badge/v-badge.vue";

export default {
  name: "web-lk-preview",
  components: { VBadge },
  inheritAttrs: false,
  props: {
    title: {
      type: String,
      required: false,
      default: ''
    },
    imgLandscape: {
      type: Object,
      required: false,
      default: () => ({
        file: null,
        id: null
      })
    },
    date: {
      type: String,
      required: false,
      default: ''
    },
    complex: {
      type: Object,
      required: false,
      default: () => ({
        ID: null,
        UF_NAME: null
      })
    },
    fullDesc: {
      type: String,
      required: false,
      default: ''
    },
    desc: {
      type: String,
      required: false,
      default: ''
    },
    detail: {
      type: Boolean,
      required: false,
      default: false
    },
    hideIcon: Boolean
  },
  setup () {
    return {
      computedDate
    }
  }
}
</script>

<style lang="scss" src="./style.scss" scoped />
