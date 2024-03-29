<template>
  <div class="detail">
    <div class="detail__image">
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
      <img v-if="imgLandscape && imgLandscape.file" :alt="title" :src="imgLandscape.file" />
      <img v-else :alt="title" src="/src/assets/images/storyPreview.png" />
    </div>
    <div class="detail__content">
      <div class="detail__content-info">
        <div class="detail__content-desc">
          <template v-if="fullDesc.length">
            {{ fullDesc }}
          </template>
          <template v-else>
            В связи с отключением электроэнергии филиалом ОАО «НЭСК-электросеть» «Москва
            электросеть» на ВНС будет снижено давление водоснабжения до 1,3 атм. абонентам по
            адресам: ул.1-я Заречная,13/1, 15/1,15/2,17, ул.2-я Заречная, 104а, 104б, 104в.
          </template>
        </div>
        <div class="detail__content-title">
          <template v-if="title.length">
            {{ title }}
          </template>
          <template v-else> Кратковременное отключение горячей воды</template>
        </div>
        <div class="detail__content-date">
          <template v-if="date.length">
            {{ computedDate(date) }}
          </template>
          <template v-else> Сегодня 14:30</template>
        </div>
      </div>
      <div v-if="links.length" class="detail__content-links">
        <a
          v-for="(item, index) of links"
          :key="item.name + index"
          :href="item.link"
          class="detail__content-links-link"
        >
          {{ item.name }}
        </a>
      </div>
      <div v-if="docs.length" class="detail__content-docs">
        <div class="dosc-title">Документы</div>
        <ul class="docs-list">
          <li v-for="doc of docs" :key="doc.ID" class="docs-list__item">
            <div class="docs-list__image">
              <svg
                fill="none"
                height="24"
                viewBox="0 0 19 24"
                width="19"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18.5455 5.49746L13.394 0.290039H3.5625V3.66504H0.1875V23.7105H15.1705V20.3355H18.5455V5.49746ZM13.8409 2.92315L15.9407 5.04572H13.8409V2.92315ZM13.6364 22.1764H1.72159V5.19913H3.5625V20.3355H13.6364V22.1764ZM5.09659 18.8014V1.82413H12.3068V6.57981H17.0114V18.8014H5.09659Z"
                  fill="#018AE4"
                />
                <path d="M7.14062 8.4209H15.0156V9.95499H7.14062V8.4209Z" fill="#018AE4" />
                <path d="M7.14062 11.4883H15.0156V13.0224H7.14062V11.4883Z" fill="#018AE4" />
                <path d="M11.7422 14.5566H15.0149V16.0907H11.7422V14.5566Z" fill="#018AE4" />
              </svg>
            </div>
            <div class="docs-list__info">
              <span class="docs-list__info-name">{{ doc.UF_TITLE }}</span>
              <span v-if="doc.file" class="docs-list__info-ext"
                >{{ doc.file?.ORIGINAL_NAME.split('.').pop() }},
                {{ humanFileSize(doc.file?.FILE_SIZE) }}</span
              >
            </div>
          </li>
        </ul>
      </div>
      <div v-if="phone" class="detail__content-phone">
        Подробная информация по телефону
        <a :href="'tel:' + phone" class="detail__content-phone-link">{{ phone }}</a>
      </div>
      <div v-if="button.length" class="detail__content-button">
        <a :href="button[0].link" class="detail__content-button-btn">{{ button[0].name }}</a>
      </div>
    </div>
  </div>
</template>

<script>
import computedDate from '../../../helpers/dateFormat';
import humanFileSize from '../../../helpers/humanFileSize';

export default {
  name: 'AmioDetail',
  inheritAttrs: false,
  props: {
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
    links: {
      type: Array,
      required: false,
      default: () => []
    },
    button: {
      type: Array,
      required: false,
      default: () => []
    },
    docs: {
      type: Array,
      required: false,
      default: () => []
    },
    phone: {
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
    hideIcon: Boolean
  },
  emits: ['openModal'],
  setup() {
    return {
      computedDate,
      humanFileSize
    };
  }
};
</script>

<style lang="scss" scoped src="./style.scss" />
