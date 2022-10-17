<template>
  <div
    ref="searchFilterContainer"
    :class="['search', {'search--transparent':variant === 'transparent'}]"
  >
    <template v-for="(cell,index) in fieldsWithValue">
      <div
        class="search-cell"
        v-if="index <= 1"
      >
        <div v-if="cell.type !== 'multi-select'" class="search-cell-text">{{cell.label + ' : ' + cell.value.name}}</div>
        <div v-else class="search-cell-text">
          {{cell.label + ' : '}} 
          <template v-for="(value,indexValue) in cell.value">
            <template v-if="indexValue">,</template>
            {{value.name}}
          </template>
        </div>
        <button
          @click.stop="setFilter(cell)"
          :data-filter="cell.ID"
          :data-type="cell.__typename"
          class="search-cell-btn search-btn"
        >
          <svg
            width="11"
            height="12"
            viewBox="0 0 11 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.71094 2.7915L2.2943 9.20814"
              stroke="white"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M2.28906 2.7915L8.7057 9.20814"
              stroke="white"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
      </div>
      <div
        class="search-cell"
        v-if="index === 2"
      >
        <div class="search-cell-text">и ещё {{modelValue.length-2}}</div>
        <button
          @click.stop="setFilter"
          :data-filter="cell.ID"
          :data-type="cell.__typename"
          class="search-cell-btn search-btn"
        >
          <svg
            width="11"
            height="12"
            viewBox="0 0 11 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.71094 2.7915L2.2943 9.20814"
              stroke="white"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M2.28906 2.7915L8.7057 9.20814"
              stroke="white"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
      </div>
    </template>

    <div class="search-filter-container">
      <v-dropdown
        class="search-filter"
        :delay="{show: 0,hide: 0}"
        :triggers="[]"
        :popperTriggers="[]"
        :shown="isOpened"
        :autoHide="false"
        :container="searchFilterContainer"
        :distance="12"
        :boundary="searchFilterContainer"
      >
        <template #popper>
          <div class="search-popup">
            <div class="search-left">
              <!-- <ul class="search-left__filter-list">
                <div class="search-left__title">Фильтры</div>
                <li
                  class="search-left__filter-item"
                  :class="{active:modelValue.find(option => option.UF_TITLE === filterItem.UF_TITLE) !== undefined}"
                  v-for="filterItem in filterList"
                  :data-filter="filterItem.UF_TITLE"
                  @click.stop="setFilter(filterItem)"
                >
                  {{filterItem.UF_TITLE}}
                </li>
              </ul> -->
              <div class="search-left__bottom">
                <button class="search-btn search-left__save-btn">
                  <svg
                    width="10"
                    height="11"
                    viewBox="0 0 10 11"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M6 4.5V0.5H4V4.5H0V6.5H4V10.5H6V6.5H10V4.5H6Z"
                      fill="#868D95"
                    />
                  </svg>
                  <span>Сохранить фильтр</span></button>
                <button class="search-btn search-left__settings-btn">
                  <svg
                    width="11"
                    height="11"
                    viewBox="0 0 11 11"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M10.238 5.754V4.48399H8.885C8.8 3.89199 8.545 3.384 8.208 2.877L8.968 2.11501L8.123 1.269L7.277 2.02901C6.854 1.69101 6.347 1.437 5.754 1.353V0H4.484V1.354C3.892 1.438 3.384 1.69201 2.877 2.03101L2.115 1.271L1.269 2.116L2.029 2.87801C1.691 3.38601 1.437 3.89299 1.353 4.48599H0V5.756H1.354C1.438 6.346 1.692 6.856 2.031 7.278L1.271 8.12399L2.201 9.054L2.963 8.29401C3.386 8.63201 3.978 8.886 4.57 8.97V10.323H5.838V8.96899C6.431 8.88399 6.938 8.629 7.446 8.291L8.208 9.05299L9.138 8.123L8.208 7.276C8.546 6.853 8.715 6.261 8.885 5.668H10.238V5.752V5.754ZM2.792 5.162C2.792 3.892 3.808 2.79201 5.162 2.79201C6.432 2.79201 7.532 3.808 7.532 5.162C7.532 6.432 6.515 7.532 5.162 7.532C3.808 7.446 2.792 6.432 2.792 5.162Z"
                      fill="#868D95"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div class="search-right">
              <div class="search-right__items">
                <div class="search-right__item" v-for="item in checkedFields">
                  <template v-if="item.type === 'string'">
                    <v-input v-model="item.value" :name="item.name" :label="item.label"/>
                  </template>
                  <template v-if="item.type === 'select'">
                    <v-select
                      v-model="item.value"
                      :name="item.name"
                      :options="item.computedResult"
                      :labelSelect="item.label"
											label="name"
											@toggleOption="changeFieldsWithValue(item)"
                    />
                  </template>
                  <template v-if="item.type === 'multi-select'">
                    <v-multi-select
                      v-model="item.value"
                      variant="checkbox"
                      :name="item.name"
                      :options="item.computedResult"
                      :labelSelect="item.label"
                      @toggleOption="options => toggleOption(item, options)"
                    />
                  </template>
									<template v-if="item.type === 'date'">
                    <v-select-date
                      v-model="item.value"
                      :name="item.name"
                      :labelSelect="item.label"
                      @toggleOption="toggleOption"
                    />
                  </template>
                </div>
                <div class="search-right__item">
                  <button class="search-right__add-field-btn" @click="popupListenerFields">Добавить поле</button>
                  <button class="search-right__reset-field-btn">Вернуть поля по умолчанию</button>
                </div>
              </div>
              <div class="search-right__btns">
                <button
                  class="search-right__btn search-right__search-btn"
                  @click="filterTable"
                >
                  <svg
                    width="15"
                    height="16"
                    viewBox="0 0 15 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M14.2408 13.9616L11.5622 11.2385C12.561 10.1 13.1815 8.59231 13.1815 6.94616C13.1815 3.39231 10.3365 0.5 6.84075 0.5C3.34501 0.5 0.5 3.39231 0.5 6.94616C0.5 10.5 3.34501 13.3923 6.84075 13.3923C8.08171 13.3923 9.23177 13.0231 10.2003 12.4077L12.9848 15.2385C13.1512 15.4077 13.3782 15.5 13.6052 15.5C13.8322 15.5 14.0593 15.4077 14.2257 15.2385C14.5889 14.8847 14.5889 14.3153 14.2408 13.9616L14.2408 13.9616ZM2.27054 6.94619C2.27054 4.39231 4.31355 2.30003 6.84072 2.30003C9.36788 2.30003 11.3958 4.39234 11.3958 6.94619C11.3958 9.50006 9.35275 11.5923 6.84072 11.5923C4.32869 11.5923 2.27054 9.51537 2.27054 6.94619Z"
                      fill="white"
                    />
                  </svg>
                  <span>Найти</span></button>
                <button
                  class="search-right__btn search-right__reset-btn"
                  @click="clearFilter"
                >Сбросить</button>
              </div>
            </div>
          </div>
        </template>
        <input
          @keyup.enter="filterTable"
          @keyup.esc="clearFilter"
          v-model="search"
          @input="setSearch"
          :class="['search-input', {'search-input--transparent':variant === 'transparent'}]"
          type="text"
          :placeholder="computedfilterPlaceholder + ' + ' + searchPlaceholderProp"
          @click="popupListener"
        >
      </v-dropdown>
    </div>

    <div :class="['search-btns', {'search-btns--transparent':variant === 'transparent'}]">
      <button
        class="search-btn search-btn__search"
        @click.stop="filterTable"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M15.8286 13.9238L11.3486 9.44382C11.9386 8.52682 12.2846 7.42682 12.2846 6.24582C12.2846 2.96582 9.61662 0.298828 6.33762 0.298828C3.05762 0.298828 0.390625 2.96582 0.390625 6.24582C0.390625 9.52582 3.05862 12.1928 6.33762 12.1928C7.62062 12.1928 8.80262 11.7858 9.77962 11.0928L14.2196 15.5328C14.4416 15.7568 14.7896 15.7568 15.0116 15.5328L15.8466 14.6978C16.0506 14.4938 16.0506 14.1478 15.8266 13.9238H15.8286ZM1.32862 6.26582C1.32862 3.49582 3.56862 1.25583 6.33862 1.25583C9.10863 1.25583 11.3486 3.49582 11.3486 6.26582C11.3486 9.03582 9.10863 11.2758 6.33862 11.2758C3.56862 11.2758 1.32862 9.03582 1.32862 6.26582Z"
            fill="#F2F4F5"
          />
        </svg>
      </button>
      <button
        class="search-btn search-btn__clear"
        v-if="clearBtn"
        @click.stop="clearFilter"
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M14.25 3.75L3.75004 14.25"
            stroke="#F2F4F5"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M3.75 3.75L14.25 14.25"
            stroke="#F2F4F5"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
    </div>
    <div class="search-modal-fields" v-if="isOpenedFields" ref="modelFieldsRef">
      <div class="search-modal-fields__header">
        <div class="search-modal-fields__mark">Новость
          <div class="search-modal-fields__mark-svg">
            <svg
              width="22"
              height="24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <filter
                  filterUnits="userSpaceOnUse"
                  color-interpolation-filters="sRGB"
                  id="a"
                >
                  <feFlood
                    flood-opacity="0"
                    result="BackgroundImageFix"
                  />
                  <feColorMatrix
                    in="SourceAlpha"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  />
                  <feOffset dy="2" />
                  <feGaussianBlur stdDeviation="2" />
                  <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.11372549 0" />
                  <feBlend
                    in2="BackgroundImageFix"
                    result="effect0_dropShadow"
                  />
                  <feBlend
                    in="SourceGraphic"
                    in2="effect0_dropShadow"
                    result="shape"
                  />
                </filter>
              </defs>
              <g
                clip-path="url(#clip_1)"
                fill-rule="evenodd"
              >
                <path
                  d="M10.999 5h2.002q.147 0 .294.007t.294.022q.147.014.292.036.146.022.29.05.145.029.288.065.142.036.283.078.141.043.28.093.139.05.275.106.136.056.269.119t.263.132q.13.07.256.145.126.076.249.158.122.082.24.17.119.087.233.18.114.094.223.193t.213.203q.104.104.203.213.099.11.192.223.094.114.181.232.088.119.17.241.082.123.157.249.076.126.146.256.07.13.132.263.063.133.12.27.056.135.105.274.05.139.093.28.042.14.078.283.036.143.065.288.028.144.05.29.022.145.036.292.014.147.022.294.007.147.007.294v1.002q0 .147-.007.294-.008.147-.022.294-.014.147-.036.292-.022.146-.05.29-.029.145-.065.288-.036.142-.078.283-.043.141-.093.28-.05.139-.106.275-.056.136-.119.269t-.132.263q-.07.13-.146.256-.075.126-.157.249-.082.122-.17.24-.087.119-.18.233-.094.114-.193.223t-.203.213q-.104.104-.213.203-.11.099-.223.192-.114.094-.232.181-.119.088-.241.17-.123.082-.249.158-.126.075-.256.145-.13.07-.263.132-.133.063-.27.12-.135.056-.274.105-.139.05-.28.093-.14.042-.283.078-.143.036-.288.065-.144.028-.29.05-.145.022-.292.036-.147.014-.294.022-.147.007-.294.007h-2.002q-.147 0-.294-.007-.147-.008-.294-.022-.147-.014-.292-.036-.146-.022-.29-.05-.145-.029-.288-.065-.142-.036-.283-.078-.141-.043-.28-.093-.139-.05-.275-.106-.136-.056-.269-.119t-.263-.132q-.13-.07-.256-.146-.126-.075-.249-.157-.122-.082-.24-.17-.119-.087-.233-.18-.114-.094-.223-.193t-.213-.203q-.104-.104-.203-.213-.099-.11-.192-.223-.094-.114-.181-.232-.088-.119-.17-.241-.082-.123-.158-.249-.075-.126-.145-.256-.07-.13-.132-.263-.063-.133-.12-.27-.056-.135-.105-.274-.05-.139-.093-.28-.042-.14-.078-.283-.036-.143-.065-.288-.028-.144-.05-.29-.022-.145-.036-.292-.015-.147-.022-.294Q5 12.148 5 12.001v-1.002q0-.147.007-.294t.022-.294q.014-.147.036-.292.022-.146.05-.29.029-.145.065-.288.036-.142.078-.283.043-.141.093-.28.05-.139.106-.275.056-.136.119-.269t.132-.263q.07-.13.145-.256.076-.126.158-.249.082-.122.17-.24.087-.119.18-.233.094-.114.193-.223t.203-.213q.104-.104.213-.203.11-.099.223-.192.114-.094.232-.181.119-.088.241-.17.123-.082.249-.158.126-.075.256-.145.13-.07.263-.132.133-.063.27-.12.135-.056.274-.105.139-.05.28-.093.14-.042.283-.078.143-.036.288-.065.144-.028.29-.05.145-.022.292-.036.147-.015.294-.022.147-.007.294-.007z"
                  fill="#FFF"
                />
                <path
                  d="M9.999 0h.002q.245 0 .49.012.246.012.49.036.244.024.487.06t.484.084q.24.048.479.108.238.06.473.13.234.072.466.155.23.082.457.176.227.094.45.199.221.105.438.22.216.116.427.243.21.126.414.262.204.137.401.283.198.146.387.302.19.155.372.32t.355.339q.174.173.339.355.165.182.32.372.156.19.302.387t.283.4q.136.205.262.415.127.211.242.428.116.216.221.438t.199.449q.094.226.177.457.082.232.153.466.072.235.131.473.06.239.108.48.048.24.084.483.036.243.06.487t.036.49q.012.245.012.49v.002q0 .245-.012.49-.012.246-.036.49-.024.244-.06.487t-.084.484q-.048.24-.108.479-.06.238-.13.473-.072.234-.154.466-.083.23-.177.457-.094.227-.199.45-.105.221-.22.438-.116.216-.243.427-.126.21-.262.414-.137.204-.283.401-.146.198-.302.387-.155.19-.32.372t-.339.355q-.173.174-.355.339-.182.165-.372.32-.19.156-.387.302t-.4.283q-.205.136-.415.262-.211.127-.428.242-.216.116-.438.221t-.449.199q-.226.094-.457.177-.232.082-.466.153-.235.072-.473.131-.238.06-.48.108-.24.048-.483.084-.243.036-.487.06t-.49.036q-.245.012-.49.012h-.002q-.245 0-.49-.012-.246-.012-.49-.036-.244-.024-.487-.06t-.484-.084q-.24-.048-.479-.108-.238-.06-.473-.13-.234-.072-.466-.154-.23-.083-.457-.177-.227-.094-.45-.199-.221-.105-.438-.22-.216-.116-.427-.243-.21-.126-.414-.262-.204-.137-.401-.283-.198-.146-.387-.302-.19-.155-.372-.32t-.355-.339q-.174-.173-.339-.355-.165-.182-.32-.372-.156-.19-.302-.387t-.283-.4q-.136-.205-.262-.415-.127-.211-.242-.428-.116-.216-.221-.438t-.199-.449q-.094-.226-.176-.457-.083-.232-.154-.466-.072-.235-.131-.473-.06-.238-.108-.48-.048-.24-.084-.483-.036-.243-.06-.487t-.036-.49Q0 10.247 0 10.002v-.002q0-.245.012-.49.012-.246.036-.49.024-.244.06-.487t.084-.484Q.24 7.808.3 7.57q.06-.238.13-.473.072-.234.155-.466.082-.23.176-.457.094-.227.199-.45.105-.221.22-.438.116-.216.243-.427.126-.21.262-.414.137-.204.283-.401.146-.198.302-.387.155-.19.32-.372t.339-.355q.173-.174.355-.339.182-.165.372-.32.19-.156.387-.302t.4-.283q.205-.136.415-.262.211-.127.428-.242.216-.116.438-.221t.449-.199q.226-.094.457-.176.232-.083.466-.154Q7.331.359 7.57.3q.239-.06.48-.108.24-.048.483-.084.243-.036.487-.06t.49-.036Q9.753 0 9.998 0z"
                  transform="translate(1 1)"
                  fill="#00B0E8"
                  filter="url(#a)"
                />
                <path
                  d="M10.005 12.136l5.282-5.214 1.598 1.607-6.855 6.796-.025-.025-.025.025-4.193-4.059L7.385 9.66l2.62 2.477z"
                  fill="#FFF"
                />
              </g>
            </svg>
          </div>
        </div>
        <div class="search-modal-fields__search">
          <svg
            class="search-modal-fields-search-svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M15.8286 13.9238L11.3486 9.44382C11.9386 8.52682 12.2846 7.42682 12.2846 6.24582C12.2846 2.96582 9.61662 0.298828 6.33762 0.298828C3.05762 0.298828 0.390625 2.96582 0.390625 6.24582C0.390625 9.52582 3.05862 12.1928 6.33762 12.1928C7.62062 12.1928 8.80262 11.7858 9.77962 11.0928L14.2196 15.5328C14.4416 15.7568 14.7896 15.7568 15.0116 15.5328L15.8466 14.6978C16.0506 14.4938 16.0506 14.1478 15.8266 13.9238H15.8286ZM1.32862 6.26582C1.32862 3.49582 3.56862 1.25583 6.33862 1.25583C9.10863 1.25583 11.3486 3.49582 11.3486 6.26582C11.3486 9.03582 9.10863 11.2758 6.33862 11.2758C3.56862 11.2758 1.32862 9.03582 1.32862 6.26582Z"
              fill="#525C69"
            />
          </svg>
    
          <input
            class="search-modal-fields__search-input"
            type="text"
            v-model="searchField"
          >
          <svg
            class="search-modal-fields__search-clear"
            @click="searchField=''"
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.0859 2.91699L2.91931 11.0836"
              stroke="#525C69"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M2.91406 2.91699L11.0807 11.0836"
              stroke="#525C69"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
    
        </div>
      </div>
      <div class="search-modal-fields__main">
        <label
          class="search-modal-fields__item"
          v-for="field in computedFilterItems"
        ><input
            @click="toggleAddField(field)"
            :checked="field.checked"
            type="checkbox"
            :id="field.label"
          >{{field.label}}</label>
      </div>
      <div class="search-modal-fields__close-btn" @click="popupListenerFields">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11.0859 2.91699L2.91931 11.0836" stroke="#C6CDD3" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M2.91406 2.91699L11.0807 11.0836" stroke="#C6CDD3" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

      </div>
    </div>
  </div>

</template>
<script>
import { ref, watch, onMounted, computed } from 'vue';
import useModal from '../../../hooks/useModal';
import { useEventListener } from '../../../hooks/useEventListeners';
import useClickOutside from '../../../hooks/useClickOutside';
import VSelect from '../v-select/v-select.vue';
import VInput from '../v-input/v-input.vue';
import VMultiSelect from '../v-multi-select/v-multi-select.vue';
import VSelectDate from '../v-select-date/v-select-date.vue'

export default {
  components: { VSelect, VInput, VMultiSelect, VSelectDate },
  emits: ["update:modelValue", "filterTable", "clearFilter", "setSearch", "setFilter", "toggleOption", 'update:searchField', 'toggleAddField'],
  props: {
    fields:Array,
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
    filterPlaceholderProp: {
      type: String,
      required: false,
      default: ''
    },
    searchPlaceholderProp: {
      type: String,
      required: false,
      default: ''
    },
    modelValue: {
      type: Array,
      default: () => ([]),
    },
  },
  setup(props, { emit }) {
    const search = ref('')
    const { isOpen: isOpened, openModal, closeModal } = useModal()
    const { isOpen: isOpenedFields, openModal:openModalFields, closeModal:closeModalFields } = useModal()
    const searchFilterContainer = ref()
    const modelFieldsRef = ref()
    const searchField = ref('')
		let defaultFields = {}

    const computedFilterItems = computed(()=>{
      return props.fields.filter(field => field.label.toLowerCase().includes(searchField.value.toLowerCase()))
    })

		const computedfilterPlaceholder = computed(() => {
			let filterPlaceholder
      if (fieldsWithValue.value.length) {
        filterPlaceholder = ''
      }
      else {
        filterPlaceholder = props.filterPlaceholderProp
      }
      return filterPlaceholder
    })

		const checkedFields = ref(
			props.fields.filter(field => {
				return field.checked ? true : false
			}))

		const fieldsWithValue = ref(
			checkedFields.value.filter(field => {
			if (field.value && field.value?.length !== 0) {
				return true
			}
			return false
			})
		)

    const filterTable = () => {
      isOpened.value = false
      emit('filterTable')
    }

		onMounted(()=>{
			defaultFields = props.fields.map(field => {return {...field}})
		})

    const clearFilter = () => {
      search.value = ""
			console.log(defaultFields);
			props.fields.map((row,index) => {row = defaultFields[index]})
      // emit("clearFilter");

      if (search.value || props.modelValue) {
        // emit("filterTable");
      }
    }

    const setSearch = () => {
      emit("setSearch", search.value)
    }

    const setFilter = (field) => {


			field.value = field.type === 'multi-select' ? [] : null
			changeFieldsWithValue(field)

      // emit("setFilter", str)
    }

    const popupListener = () => {
      if (isOpened.value) {
        closeModal()
      }
      else {
        openModal()
      }
    }

    const popupListenerFields = () => {
      if (isOpenedFields.value) {
        closeModalFields()
      }
      else {
        openModalFields()
      }
    }

    const toggleOption = (options,option)=>{

			var index = options.value.indexOf(option);

			if (index === -1) {
					options.value.push(option);
			} else {
					options.value.splice(index, 1);
			}

			changeFieldsWithValue(options)
    }

		const changeFieldsWithValue = options => {

			const deleteFrom = () => {
				fieldsWithValue.value.find((obj,index) => {
					if(obj === options){
						fieldsWithValue.value.splice(index,1)
					}
				})
			}

			const addTo = () => {
				if(!fieldsWithValue.value.find(obj => obj === options)){
					fieldsWithValue.value.push(options)
				}
			}

			if(options.type === 'multi-select'){
				if(options.value.length){
					addTo()
				}
				else{
					deleteFrom()
				}
			}
			else if(options.value){
				addTo()
			}
			else{
				deleteFrom()
			}

			// const doSomething = () => {
			// 	if(options.value && options.value !== []){
			// 	if(!fieldsWithValue.value.find(obj => obj === options)){
			// 		fieldsWithValue.value.push(options)
			// 	}
			// }
			// else{
			// 	fieldsWithValue.value.find((obj,index) => {
			// 		if(obj === options){
			// 			fieldsWithValue.value.splice(index,1)
			// 			console.log(fieldsWithValue.value.lenght);
			// 			if(!fieldsWithValue.value.lenght){
			// 				fieldsWithValue.value = []
			// 			}
			// 		}
			// 	})
			// }
			// }
			


		}

		const toggleAddField = (field) =>{
			if(!field.checked){
				checkedFields.value.push(field)
			}
			else{
				checkedFields.value.find((obj,index) => {
					if(field === obj){
						checkedFields.value.splice(index,1)
					}
				})
			}

			field.checked = !field.checked
		}

    useClickOutside(searchFilterContainer, closeModal)
    useClickOutside(modelFieldsRef, closeModalFields)

    return {
      search,
      filterTable,
      clearFilter,
      isOpened,
      setFilter,
      searchFilterContainer,
      popupListener,
      setSearch,
      computedfilterPlaceholder,
      popupListenerFields,
      isOpenedFields,
      modelFieldsRef,
      searchField,
      computedFilterItems,
      toggleOption,
			fieldsWithValue,
			checkedFields,
			toggleAddField,
			checkedFields,
			changeFieldsWithValue
    }
  },
};
</script>



































<style lang="scss" src="./style.scss" scoped />
