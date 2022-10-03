<template>
  <div ref="searchFilterContainer" :class="['search', {'search--transparent':variant === 'transparent'}]">
    <template v-for="cell in modelValue" >
    <div class="search-cell" v-if="Object.keys(cell).length">
      <div class="search-cell-text">{{cell.UF_TITLE || cell.UF_NAME}}</div>
      <button @click.stop="setFilter" :data-filter="cell.ID" :data-type="cell.__typename" class="search-cell-btn search-btn">
        <svg width="11" height="12" viewBox="0 0 11 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8.71094 2.7915L2.2943 9.20814" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M2.28906 2.7915L8.7057 9.20814" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </button>
    </div>
  </template>
    <!-- <div class="search-placeholder" v-else>Фильтр</div> -->

    <div class="search-filter-container">
      <v-dropdown class="search-filter" :delay="{show: 0,hide: 0}" :triggers="[]" :popperTriggers="[]" :shown="isOpened" :autoHide="false" :container="searchFilterContainer" :distance="12" :boundary="searchFilterContainer">
        <template #popper>
          <div class="search-popup">
            <div class="search-left">
              <ul class="search-left__filter-list">
                <div class="search-left__title">Фильтры</div>
                <li class="search-left__filter-item" :class="{active:modelValue.find(option => option.UF_TITLE === filterItem.UF_TITLE) !== undefined}" v-for="filterItem in filterList" :data-filter="filterItem.UF_TITLE" @click.stop="setFilter(filterItem)">
                  {{filterItem.UF_TITLE}}
                </li>
              </ul>
              <div class="search-left__bottom">
                <button class="search-btn search-left__save-btn">
                  <svg width="10" height="11" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M6 4.5V0.5H4V4.5H0V6.5H4V10.5H6V6.5H10V4.5H6Z" fill="#868D95" />
                  </svg>
                  <span>Сохранить фильтр</span></button>
                <button class="search-btn search-left__settings-btn">
                  <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd"
                          d="M10.238 5.754V4.48399H8.885C8.8 3.89199 8.545 3.384 8.208 2.877L8.968 2.11501L8.123 1.269L7.277 2.02901C6.854 1.69101 6.347 1.437 5.754 1.353V0H4.484V1.354C3.892 1.438 3.384 1.69201 2.877 2.03101L2.115 1.271L1.269 2.116L2.029 2.87801C1.691 3.38601 1.437 3.89299 1.353 4.48599H0V5.756H1.354C1.438 6.346 1.692 6.856 2.031 7.278L1.271 8.12399L2.201 9.054L2.963 8.29401C3.386 8.63201 3.978 8.886 4.57 8.97V10.323H5.838V8.96899C6.431 8.88399 6.938 8.629 7.446 8.291L8.208 9.05299L9.138 8.123L8.208 7.276C8.546 6.853 8.715 6.261 8.885 5.668H10.238V5.752V5.754ZM2.792 5.162C2.792 3.892 3.808 2.79201 5.162 2.79201C6.432 2.79201 7.532 3.808 7.532 5.162C7.532 6.432 6.515 7.532 5.162 7.532C3.808 7.446 2.792 6.432 2.792 5.162Z"
                          fill="#868D95" />
                  </svg>
                </button>
              </div>
            </div>
            <div class="search-right">
              <div class="search-right__items">
                <slot></slot>
              </div>
              <div class="search-right__btns">
                <button class="search-right__btn search-right__search-btn" @click="filterTable">
                  <svg width="15" height="16" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14.2408 13.9616L11.5622 11.2385C12.561 10.1 13.1815 8.59231 13.1815 6.94616C13.1815 3.39231 10.3365 0.5 6.84075 0.5C3.34501 0.5 0.5 3.39231 0.5 6.94616C0.5 10.5 3.34501 13.3923 6.84075 13.3923C8.08171 13.3923 9.23177 13.0231 10.2003 12.4077L12.9848 15.2385C13.1512 15.4077 13.3782 15.5 13.6052 15.5C13.8322 15.5 14.0593 15.4077 14.2257 15.2385C14.5889 14.8847 14.5889 14.3153 14.2408 13.9616L14.2408 13.9616ZM2.27054 6.94619C2.27054 4.39231 4.31355 2.30003 6.84072 2.30003C9.36788 2.30003 11.3958 4.39234 11.3958 6.94619C11.3958 9.50006 9.35275 11.5923 6.84072 11.5923C4.32869 11.5923 2.27054 9.51537 2.27054 6.94619Z"
                          fill="white" />
                  </svg>
                  <span>Найти</span></button>
                <button class="search-right__btn search-right__reset-btn" @click="clearFilter">Сбросить</button>
              </div>
            </div>
          </div>
        </template>
        <input @keyup.enter="filterTable" @keyup.esc="clearFilter" v-model="search" @input="setSearch" :class="['search-input', {'search-input--transparent':variant === 'transparent'}]" type="text" :placeholder="placeholder" @click="popupListener">
      </v-dropdown>
    </div>

    <div :class="['search-btns', {'search-btns--transparent':variant === 'transparent'}]">
      <button class="search-btn search-btn__search" @click.stop="filterTable">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd"
                d="M15.8286 13.9238L11.3486 9.44382C11.9386 8.52682 12.2846 7.42682 12.2846 6.24582C12.2846 2.96582 9.61662 0.298828 6.33762 0.298828C3.05762 0.298828 0.390625 2.96582 0.390625 6.24582C0.390625 9.52582 3.05862 12.1928 6.33762 12.1928C7.62062 12.1928 8.80262 11.7858 9.77962 11.0928L14.2196 15.5328C14.4416 15.7568 14.7896 15.7568 15.0116 15.5328L15.8466 14.6978C16.0506 14.4938 16.0506 14.1478 15.8266 13.9238H15.8286ZM1.32862 6.26582C1.32862 3.49582 3.56862 1.25583 6.33862 1.25583C9.10863 1.25583 11.3486 3.49582 11.3486 6.26582C11.3486 9.03582 9.10863 11.2758 6.33862 11.2758C3.56862 11.2758 1.32862 9.03582 1.32862 6.26582Z"
                fill="#F2F4F5" />
        </svg>
      </button>
      <button class="search-btn search-btn__clear" v-if="clearBtn" @click.stop="clearFilter">
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M14.25 3.75L3.75004 14.25" stroke="#F2F4F5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M3.75 3.75L14.25 14.25" stroke="#F2F4F5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </button>
    </div>
  </div>

</template>
<script>
import { ref, watch, onMounted } from 'vue';
import useModal from '../../../hooks/useModal';
import { useEventListener } from '../../../hooks/useEventListeners';
import useClickOutside from '../../../hooks/useClickOutside';
import VSelect from '../v-select/v-select.vue';

export default {
  components: { VSelect },
  emits: ["update:modelValue", "filterTable", "clearFilter", "setSearch", "setFilter"],
  props: {
    filterList: Array,
    clearBtn: {
      type: Boolean,
      required: false,
      default: true
    },
    variant: {
      type: String,
      required: false,
      default: 'primary',
      validator(value) {
        return ['primary', 'transparent'].includes(value)
      }
    },
    filterOpened: Boolean,
    placeholder: {
      type: String,
      required: false,
      default: ''
    },
    modelValue: {
      type: Array,
      default: () => [],
    },
  },
  setup({ modelValue }, { emit }) {
    const search = ref('')
    const { isOpen: isOpened, openModal, closeModal } = useModal()
    const searchFilterContainer = ref()

    const filterTable = () => {
      isOpened.value = false
      emit('filterTable')
    }

    const clearFilter = () => {
      if (search.value || modelValue) {
        search.value = ""
        emit("clearFilter");
        emit("filterTable");
      }
    }

    const setSearch = () => {
      emit("setSearch", search.value)
    }

    const setFilter = (str) => {
      emit("setFilter", str)
    }

    const popupListener = () => {
      if (isOpened.value) {
        closeModal()
      }
      else {
        openModal()
      }
    } 

    useClickOutside(searchFilterContainer, closeModal)

    return {
      search,
      filterTable,
      clearFilter,
      isOpened,
      setFilter,
      searchFilterContainer,
      popupListener,
      setSearch
    }
  },
};
</script>

































<style lang="scss" src="./style.scss" scoped />
