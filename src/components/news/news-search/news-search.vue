<template>
  <div ref="searchFilterContainer" class="search">
    <div v-for="(cell, idx) in filter" v-if="filter.length" :key="idx" class="search-cell">
      <div class="search-cell-text">{{ cell }}</div>
      <button :data-filter="cell" class="search-cell-btn search-btn" @click.stop="setFilter">
        <svg
          fill="none"
          height="12"
          viewBox="0 0 11 12"
          width="11"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.71094 2.7915L2.2943 9.20814"
            stroke="white"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
          />
          <path
            d="M2.28906 2.7915L8.7057 9.20814"
            stroke="white"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
          />
        </svg>
      </button>
    </div>
    <!-- <div class="search-placeholder" v-else>Фильтр</div> -->

    <div class="search-filter-container">
      <v-dropdown
        :auto-hide="false"
        :boundary="searchFilterContainer"
        :container="searchFilterContainer"
        :delay="{ show: 0, hide: 0 }"
        :distance="12"
        :popper-triggers="[]"
        :shown="isOpened"
        :triggers="[]"
        class="search-filter"
      >
        <template #popper>
          <div class="search-popup">
            <div class="search-left">
              <ul class="search-left__filter-list">
                <div class="search-left__title">Фильтры</div>
                <li
                  v-for="(filterItem, idx) in props.filterList"
                  :key="idx"
                  :class="{ active: filter.includes(filterItem.UF_TITLE) }"
                  :data-filter="filterItem.UF_TITLE"
                  class="search-left__filter-item"
                  @click.stop="setFilter(filterItem)"
                >
                  {{ filterItem.UF_TITLE }}
                </li>
              </ul>
              <div class="search-left__bottom">
                <button class="search-btn search-left__save-btn">
                  <svg
                    fill="none"
                    height="11"
                    viewBox="0 0 10 11"
                    width="10"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      clip-rule="evenodd"
                      d="M6 4.5V0.5H4V4.5H0V6.5H4V10.5H6V6.5H10V4.5H6Z"
                      fill="#868D95"
                      fill-rule="evenodd"
                    />
                  </svg>
                  <span>Сохранить фильтр</span>
                </button>
                <button class="search-btn search-left__settings-btn">
                  <svg
                    fill="none"
                    height="11"
                    viewBox="0 0 11 11"
                    width="11"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      clip-rule="evenodd"
                      d="M10.238 5.754V4.48399H8.885C8.8 3.89199 8.545 3.384 8.208 2.877L8.968 2.11501L8.123 1.269L7.277 2.02901C6.854 1.69101 6.347 1.437 5.754 1.353V0H4.484V1.354C3.892 1.438 3.384 1.69201 2.877 2.03101L2.115 1.271L1.269 2.116L2.029 2.87801C1.691 3.38601 1.437 3.89299 1.353 4.48599H0V5.756H1.354C1.438 6.346 1.692 6.856 2.031 7.278L1.271 8.12399L2.201 9.054L2.963 8.29401C3.386 8.63201 3.978 8.886 4.57 8.97V10.323H5.838V8.96899C6.431 8.88399 6.938 8.629 7.446 8.291L8.208 9.05299L9.138 8.123L8.208 7.276C8.546 6.853 8.715 6.261 8.885 5.668H10.238V5.752V5.754ZM2.792 5.162C2.792 3.892 3.808 2.79201 5.162 2.79201C6.432 2.79201 7.532 3.808 7.532 5.162C7.532 6.432 6.515 7.532 5.162 7.532C3.808 7.446 2.792 6.432 2.792 5.162Z"
                      fill="#868D95"
                      fill-rule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div class="search-right">
              <div class="search-right__items">
                <div class="search-right__item">
                  <div class="search-right__item-title">Дата</div>
                  <input class="search-right__item-input-date" type="date" />
                </div>
              </div>
              <div class="search-right__btns">
                <button class="search-right__btn search-right__search-btn" @click="filterTable">
                  <svg
                    fill="none"
                    height="16"
                    viewBox="0 0 15 16"
                    width="15"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M14.2408 13.9616L11.5622 11.2385C12.561 10.1 13.1815 8.59231 13.1815 6.94616C13.1815 3.39231 10.3365 0.5 6.84075 0.5C3.34501 0.5 0.5 3.39231 0.5 6.94616C0.5 10.5 3.34501 13.3923 6.84075 13.3923C8.08171 13.3923 9.23177 13.0231 10.2003 12.4077L12.9848 15.2385C13.1512 15.4077 13.3782 15.5 13.6052 15.5C13.8322 15.5 14.0593 15.4077 14.2257 15.2385C14.5889 14.8847 14.5889 14.3153 14.2408 13.9616L14.2408 13.9616ZM2.27054 6.94619C2.27054 4.39231 4.31355 2.30003 6.84072 2.30003C9.36788 2.30003 11.3958 4.39234 11.3958 6.94619C11.3958 9.50006 9.35275 11.5923 6.84072 11.5923C4.32869 11.5923 2.27054 9.51537 2.27054 6.94619Z"
                      fill="white"
                    />
                  </svg>
                  <span>Найти</span>
                </button>
                <button class="search-right__btn search-right__reset-btn" @click="clearFilter">
                  Сбросить
                </button>
              </div>
            </div>
          </div>
        </template>
        <input
          v-model="search"
          class="search-input"
          placeholder="Фильтр + поиск"
          type="text"
          @keyup.enter="filterTable"
          @keyup.esc="clearFilter"
        />
      </v-dropdown>
    </div>

    <div class="search-btns">
      <button class="search-btn search-searchBtn" @click.stop="filterTable">
        <svg
          fill="none"
          height="16"
          viewBox="0 0 16 16"
          width="16"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clip-rule="evenodd"
            d="M15.8286 13.9238L11.3486 9.44382C11.9386 8.52682 12.2846 7.42682 12.2846 6.24582C12.2846 2.96582 9.61662 0.298828 6.33762 0.298828C3.05762 0.298828 0.390625 2.96582 0.390625 6.24582C0.390625 9.52582 3.05862 12.1928 6.33762 12.1928C7.62062 12.1928 8.80262 11.7858 9.77962 11.0928L14.2196 15.5328C14.4416 15.7568 14.7896 15.7568 15.0116 15.5328L15.8466 14.6978C16.0506 14.4938 16.0506 14.1478 15.8266 13.9238H15.8286ZM1.32862 6.26582C1.32862 3.49582 3.56862 1.25583 6.33862 1.25583C9.10863 1.25583 11.3486 3.49582 11.3486 6.26582C11.3486 9.03582 9.10863 11.2758 6.33862 11.2758C3.56862 11.2758 1.32862 9.03582 1.32862 6.26582Z"
            fill="#F2F4F5"
            fill-rule="evenodd"
          />
        </svg>
      </button>
      <button class="search-btn search-clearBtn" @click.stop="clearFilter">
        <svg
          fill="none"
          height="18"
          viewBox="0 0 18 18"
          width="18"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M14.25 3.75L3.75004 14.25"
            stroke="#F2F4F5"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
          />
          <path
            d="M3.75 3.75L14.25 14.25"
            stroke="#F2F4F5"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
          />
        </svg>
      </button>
    </div>
  </div>
</template>
<script>
import { ref } from 'vue';

export default {
  props: {
    filterList: {
      type: Array,
      default: () => []
    }
  },
  emits: ['filterTable'],
  setup(props, context) {
    let search = ref('');
    const isOpened = ref(false);
    const filter = ref([]);
    const searchFilterContainer = ref();
    const filterList = ref(props.filterList);

    const filterTable = () => {
      isOpened.value = false;
      context.emit('filterTable', filter, search);
    };

    const clearFilter = () => {
      if (search.value || filter.value) {
        search.value = '';
        filter.value = [];
        filterTable();
      }
    };

    const setFilter = (str) => {
      if (str.UF_TITLE?.length > 0) {
        str = str.UF_TITLE;
      } else if (str.target?.tagName === 'BUTTON') {
        str = str.target.dataset.filter;
      }

      if (!filter.value.includes(str)) {
        filter.value.push(str);
      } else {
        filter.value.splice(filter.value.indexOf(str), 1);
      }
    };

    const popupListener = () => {
      document.addEventListener('click', (e) => {
        if (e.target.closest('.search') && !e.target.closest('.search-popup')) {
          isOpened.value = !isOpened.value;
        } else if (!e.target.closest('.search')) {
          isOpened.value = false;
        }
      });
    };

    popupListener();

    return {
      search,
      filterTable,
      clearFilter,
      isOpened,
      setFilter,
      filter,
      searchFilterContainer,
      filterList
    };
  }
};
</script>

<style lang="scss" scoped src="./style.scss" />
