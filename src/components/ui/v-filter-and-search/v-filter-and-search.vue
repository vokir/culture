<template>
  <div
    ref="searchFilterContainer"
    :class="['search', { 'search--transparent': variant === 'transparent' }]"
    @keydown.esc="isOpened = false"
  >
    <template v-for="(cell, index) in fieldsWithValue">
      <div v-if="index <= 1" class="search-cell">
        <div v-if="cell.filter" class="search-cell-text">
          {{ cell.name }}
        </div>
        <div v-else class="search-cell-text">
          <template v-if="cell.displayValue.length <= 20"
            ><span :title="cell.displayValue">{{ cell.displayValue }}</span></template
          >
          <template v-else
            ><span :title="cell.displayValue">{{
              cell.displayValue.slice(0, 20) + ' ...'
            }}</span></template
          >
        </div>
        <button
          class="search-cell-btn"
          @click.stop="
            cell.pinned === undefined
              ? $emit('clearFieldValue', cell)
              : $emit('disableFilter', cell)
          "
        >
          <svg
            class="svg-stroke"
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
      <div v-if="index === 2" class="search-cell">
        <div
          class="search-cell-text"
          :title="fieldsWithValue.filter((_, i) => i >= 2).map((field) => field.displayValue)"
        >
          и ещё {{ fieldsWithValue.length - 2 }}
        </div>
        <button class="search-cell-btn" @click.stop="$emit('clearLatestFields')">
          <svg
            class="svg-stroke"
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
        :delay="{ show: 0, hide: 0 }"
        :triggers="[]"
        :popper-triggers="[]"
        :shown="isOpened"
        :auto-hide="false"
        :container="searchFilterContainer"
        :distance="12"
        :boundary="searchFilterContainer"
        placement="bottom-start"
      >
        <template #popper>
          <div class="search-popup">
            <div class="search-left">
              <ul class="search-left__filter-list">
                <div class="search-left__title">Фильтры</div>
                <draggable
                  v-model="filtersComputed"
                  class="search-left__items"
                  v-bind="dragOptions"
                  :group="'filters'"
                  item-key="order"
                  handle=".search-left__drag-and-drop"
                  @start="true"
                  @end="false"
                >
                  <template #item="{ element }">
                    <div
                      :class="[
                        'search-left__filter-item-wrapper',
                        {
                          'search-left__filter-item-wrapper--editting':
                            changingSettings && element.selected
                        }
                      ]"
                      @click="selectFilter(element)"
                    >
                      <div v-if="changingSettings" class="search-left__drag-and-drop">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="12"
                          height="10"
                          viewBox="0 0 12 10"
                        >
                          <g fill="#535C69" fill-rule="evenodd">
                            <rect width="12" height="2" rx="1" />
                            <rect width="12" height="2" y="4" rx="1" />
                            <rect width="12" height="2" y="8" rx="1" />
                          </g>
                        </svg>
                      </div>

                      <li
                        :class="[
                          'search-left__filter-item',
                          { 'search-left__filter-item--small': changingSettings },
                          { active: element.selected },
                          { hidden: element.editting },
                          {
                            'search-left__filter-editting-item':
                              changingSettings && element.selected
                          }
                        ]"
                      >
                        {{ element.name }}
                      </li>
                      <input
                        v-model="element.newName"
                        :class="[
                          'search-left__filter-item-input',
                          { hidden: !element.editting },
                          { 'search-left__filter-item-input--small': changingSettings }
                        ]"
                      />
                      <div class="search-left__filter-item-edits">
                        <span
                          v-if="element.pinned || changingSettings"
                          @click.stop="$emit('setPin', element)"
                          ><svg
                            :class="['svg-fill', { 'svg-pinned': element.pinned }]"
                            xmlns="http://www.w3.org/2000/svg"
                            width="12"
                            height="11"
                            viewBox="0 0 12 11"
                          >
                            <path
                              fill="#535C68"
                              fill-rule="evenodd"
                              d="M11.466 2.964L8.73.23C8.535.03 8.25-.046 7.98.025c-.267.07-.476.28-.55.547-.07.267.004.553.2.75l.56.558L3.8 5.157l-.55-.55c-.303-.304-.794-.306-1.098-.004-.304.302-.306.793-.004 1.097l1.677 1.676-3.092 3.3c-.076.077-.076.2 0 .277.076.076.2.076.276 0l3.3-3.102 1.674 1.675c.304.304.797.304 1.1 0 .305-.304.305-.797 0-1.1l-.55-.55 3.274-4.39.565.563c.303.28.772.27 1.065-.02.293-.29.305-.76.028-1.064z"
                            /></svg
                        ></span>
                        <span v-if="changingSettings" @click.stop="editFilterName($event, element)"
                          ><svg
                            class="svg-fill"
                            width="11"
                            height="12"
                            viewBox="0 0 11 12"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M0.733677 8.65659L0 11.5L2.68831 10.6585C2.52112 10.1998 2.27473 9.78186 1.96234 9.42657C1.61255 9.06908 1.19236 8.80729 0.733677 8.65659ZM6.68119 2.0975L1.42335 7.83162C1.86004 8.06041 2.26483 8.353 2.62672 8.70279C2.92371 9.08008 3.1723 9.50026 3.36369 9.95125L8.61823 4.22043C8.41473 3.72875 8.13754 3.27776 7.79765 2.88617C7.47206 2.54958 7.09367 2.28339 6.67789 2.0997L6.68009 2.0964L6.68119 2.0975ZM9.68739 0.934837C9.4212 0.648846 9.06041 0.491551 8.68642 0.50035C8.31464 0.50915 7.96045 0.681846 7.70525 0.978837L7.38956 1.32313C7.80975 1.51782 8.19474 1.79391 8.52583 2.1371C8.86022 2.51988 9.13081 2.96207 9.331 3.44276L9.64779 3.09737C9.92058 2.82018 10.0768 2.43299 10.0856 2.026C10.0922 1.61902 9.94808 1.22523 9.68519 0.937036H9.68849L9.68739 0.934837Z"
                              fill="#5B6573"
                            /></svg
                        ></span>
                        <span
                          v-if="changingSettings"
                          @click.stop="$emit('removeFilter', element.ID)"
                          ><svg
                            class="svg-stroke"
                            width="12"
                            height="12"
                            viewBox="0 0 14 14"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M11.0859 2.91699L2.91931 11.0836"
                              stroke="#C6CDD3"
                              stroke-width="1.5"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                            <path
                              d="M2.91406 2.91699L11.0807 11.0836"
                              stroke="#C6CDD3"
                              stroke-width="1.5"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            /></svg
                        ></span>
                      </div>
                    </div>
                  </template>
                </draggable>
                <li
                  :class="[
                    'search-left__filter-item',
                    'search-left__filter-add-name',
                    { 'search-left__filter-add-name--show': addingFilter }
                  ]"
                >
                  <input v-model="newFilterName" placeholder="Название фильтра" />
                </li>
              </ul>
              <div class="search-left__bottom">
                <template v-if="!changingSettings">
                  <button class="search-left__left-btn" @click="addFilter">
                    <svg
                      class="svg-fill"
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
                    <span class="uppercase">Сохранить фильтр</span>
                  </button>
                </template>
                <template v-else>
                  <button class="search-left__left-btn" @click="$emit('returnFilters')">
                    <svg
                      class="svg-fill"
                      xmlns="http://www.w3.org/2000/svg"
                      width="11"
                      height="10"
                      viewBox="0 0 11 10"
                    >
                      <path
                        fill="#868D95"
                        fill-rule="evenodd"
                        d="M7.334 6.745h-4.34l-.01 2.53-3.26-3.27 3.28-3.28-.01 2.73h4.34c1.07 0 1.935-.866 1.935-1.935 0-1.07-.868-1.935-1.937-1.935h-1.11V.295h1.11c1.78 0 3.225 1.444 3.225 3.225 0 1.78-1.445 3.225-3.226 3.225h.002z"
                      />
                    </svg>
                    <span>Вернуть по умолчанию</span>
                  </button>
                </template>
                <button
                  class="search-left__settings-btn"
                  :disabled="addingFilter || changingSettings"
                  @click="toggleChangingSettings"
                >
                  <svg
                    class="svg-fill"
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
              <draggable
                v-model="checkedFieldsComputed"
                class="search-right__items"
                v-bind="dragOptions"
                :group="'fields'"
                item-key="order"
                handle=".search-right__drag-and-drop"
                @start="true"
                @end="false"
              >
                <template #item="{ element }">
                  <div class="search-right__item">
                    <div class="search-right__drag-and-drop">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="10"
                        viewBox="0 0 12 10"
                      >
                        <g fill="#535C69" fill-rule="evenodd">
                          <rect width="12" height="2" rx="1" />
                          <rect width="12" height="2" y="4" rx="1" />
                          <rect width="12" height="2" y="8" rx="1" />
                        </g>
                      </svg>
                    </div>
                    <template v-if="element.type === 'string'">
                      <v-input
                        v-model="element.value"
                        :name="element.name"
                        :label="element.label"
                        @keypress.enter="filterTable"
                      />
                      <div
                        v-if="element.value"
                        class="search-right__clear-field"
                        @click="$emit('resetField', element)"
                      >
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 14 14"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M11.0859 2.91699L2.91931 11.0836"
                            stroke="#C6CDD3"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M2.91406 2.91699L11.0807 11.0836"
                            stroke="#C6CDD3"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </div>
                    </template>
                    <template v-if="element.type === 'select'">
                      <v-select
                        v-model="element.value"
                        :name="element.name"
                        :options="element.computedResult"
                        :label-select="element.label"
                        label="name"
                      />
                      <div
                        v-if="element.value"
                        class="search-right__clear-field"
                        @click="$emit('resetField', element)"
                      >
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 14 14"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M11.0859 2.91699L2.91931 11.0836"
                            stroke="#C6CDD3"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M2.91406 2.91699L11.0807 11.0836"
                            stroke="#C6CDD3"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </div>
                    </template>
                    <template v-if="element.type === 'multi-select'">
                      <v-multi-select
                        v-model="element.value"
                        variant="checkbox"
                        :name="element.name"
                        :options="element.computedResult"
                        :label-select="element.label"
                        @toggle-option="(option) => toggleOption(option, element)"
                      />
                      <div
                        v-if="element.value?.length"
                        class="search-right__clear-field"
                        @click="$emit('resetField', element)"
                      >
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 14 14"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M11.0859 2.91699L2.91931 11.0836"
                            stroke="#C6CDD3"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M2.91406 2.91699L11.0807 11.0836"
                            stroke="#C6CDD3"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </div>
                    </template>
                    <template v-if="element.type === 'select-options'">
                      <v-select-options
                        v-model="element.value"
                        :selected-option="element.selectedOption"
                        :label-select="element.label"
                        :options="element.options"
                      />
                    </template>
                    <div
                      class="search-right__remove-field"
                      @click="
                        $emit(
                          'toggleAddField',
                          checkedFields.find((field) => field.name === element.name)
                        )
                      "
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M11.0859 2.91699L2.91931 11.0836"
                          stroke="#C6CDD3"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M2.91406 2.91699L11.0807 11.0836"
                          stroke="#C6CDD3"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </div>
                  </div>
                </template>
              </draggable>

              <div v-if="customFields" class="search-right__item search-right__open-modal-fields">
                <button class="search-right__add-field-btn" @click="popupListenerAddFields">
                  Добавить поле
                </button>
                <button class="search-right__reset-field-btn" @click="$emit('returnFilterFields')">
                  Вернуть поля по умолчанию
                </button>
              </div>
              <div v-if="!addingFilter && !changingSettings" class="search-right__btns">
                <button class="search-right__btn search-right__search-btn" @click="filterTable">
                  <svg
                    class="svg-fill"
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
                  <span>Найти</span>
                </button>
                <button
                  class="search-right__btn search-right__reset-btn"
                  @click="$emit('resetFields')"
                >
                  Сбросить
                </button>
              </div>
              <div v-else class="search-right__btns">
                <button
                  class="search-right__btn search-right__save-filter-btn"
                  @click="saveFilters"
                >
                  <span>Сохранить</span>
                </button>
                <button
                  class="search-right__btn search-right__cancel-filter-btn"
                  @click="cancelChangingFilter"
                >
                  Отменить
                </button>
              </div>
            </div>
          </div>
        </template>
        <input
          v-model="localSearch"
          :class="['search-input', { 'search-input--transparent': variant === 'transparent' }]"
          type="text"
          :placeholder="computedfilterPlaceholder + ' + ' + searchPlaceholderProp"
          @keyup.enter="filterTable"
          @keyup.esc="clearFilter"
          @input="(e) => $emit('setSearch', e.target.value)"
          @click="popupListener"
        />
      </v-dropdown>
    </div>

    <div :class="['search-btns', { 'search-btns--transparent': variant === 'transparent' }]">
      <button
        :class="[
          'search-btn search-btn--search',
          { 'search-btn--to-left': fieldsWithValue?.length || search.length }
        ]"
        @click.stop="filterTable"
      >
        <svg
          class="svg-fill"
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
        v-if="clearBtn"
        :class="[
          'search-btn search-btn--clear',
          { 'search-btn--to-left': fieldsWithValue?.length || search.length },
          { 'search-btn--visible': fieldsWithValue.length || search.length }
        ]"
        @click.stop="$emit('removeAllFieldsOrFilter')"
      >
        <svg
          class="svg-stroke"
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
    <div v-if="isOpenedFields" ref="modalFieldsRef" class="search-modal-fields">
      <div class="search-modal-fields__header">
        <div class="search-modal-fields__mark">
          Новость
          <div class="search-modal-fields__mark-svg">
            <svg width="22" height="24" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <filter id="a" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                  <feFlood flood-opacity="0" result="BackgroundImageFix" />
                  <feColorMatrix
                    in="SourceAlpha"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  />
                  <feOffset dy="2" />
                  <feGaussianBlur stdDeviation="2" />
                  <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.11372549 0" />
                  <feBlend in2="BackgroundImageFix" result="effect0_dropShadow" />
                  <feBlend in="SourceGraphic" in2="effect0_dropShadow" result="shape" />
                </filter>
              </defs>
              <g clip-path="url(#clip_1)" fill-rule="evenodd">
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

          <input v-model="searchAddField" class="search-modal-fields__search-input" type="text" />
          <svg
            class="search-modal-fields__search-clear"
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            @click="searchAddField = ''"
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
        <label v-for="field in computedFilterItems" class="search-modal-fields__item"
          ><input
            :id="field.label"
            :checked="field.checked"
            type="checkbox"
            @click="$emit('toggleAddField', field)"
          />{{ field.label }}</label
        >
      </div>
      <div class="search-modal-fields__close-btn" @click="popupListenerAddFields">
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11.0859 2.91699L2.91931 11.0836"
            stroke="#C6CDD3"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M2.91406 2.91699L11.0807 11.0836"
            stroke="#C6CDD3"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
    </div>
  </div>
</template>
<script>
import { computed, ref } from 'vue';
import useModal from '../../../hooks/useModal';
import useClickOutside from '../../../hooks/useClickOutside';
import VSelect from '../v-select/v-select.vue';
import VInput from '../v-input/v-input.vue';
import VMultiSelect from '../v-multi-select/v-multi-select.vue';
import VSelectDate from '../v-select-date/v-select-date.vue';
import VSelectOptions from '../v-select-options/v-select-options.vue';
import draggable from 'vuedraggable';
import VLoader from '../../ui/v-loader/v-loader.vue';
import { useVModel } from '@vueuse/core';

export default {
  name: 'VFilterSearch',
  components: { VSelect, VInput, VMultiSelect, VSelectDate, VSelectOptions, draggable, VLoader },
  props: {
    search: String,
    fields: Array,
    fieldsWithValue: Array,
    checkedFields: Array,
    filters: Array,
    selectedFilter: Object,
    changingSettings: {
      type: Boolean,
      required: false,
      default: false
    },
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
        return ['primary', 'transparent'].includes(value);
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
    maxWidth: {
      type: Number,
      required: false,
      default: null
    },
    customFields: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  emits: [
    'filterTable',
    'resetFields',
    'setSearch',
    'clearFieldValue',
    'toggleOption',
    'update:searchAddField',
    'toggleAddField',
    'toggleAddField',
    'saveFilters',
    'selectFilter',
    'setPin',
    'removeFilter',
    'returnFilterFields',
    'clearLatestFields',
    'disableFilter',
    'addFilter',
    'changeDraggableList',
    'clearAllFields',
    'toggleChangingSettings',
    'resetField',
    'addingFilter',
    'returnFilters',
    'removeAllFieldsOrFilter',
    'cancelChangingFilter'
  ],
  setup(props, { emit }) {
    const { isOpen: isOpened, openModal, closeModal } = useModal();
    const {
      isOpen: isOpenedFields,
      openModal: openModalFields,
      closeModal: closeModalFields
    } = useModal();
    const searchFilterContainer = ref();
    const modalFieldsRef = ref();
    const searchAddField = ref('');
    const addingFilter = ref(false);
    const newFilterName = ref('');
    const localSearch = useVModel(props, 'search', emit);

    const computedFilterItems = computed(() => {
      return props.fields.filter((field) =>
        field.label.toLowerCase().includes(searchAddField.value.toLowerCase())
      );
    });

    const computedfilterPlaceholder = computed(() => {
      let filterPlaceholder;
      if (props.fieldsWithValue?.length) {
        filterPlaceholder = '';
      } else {
        filterPlaceholder = props.filterPlaceholderProp;
      }
      return filterPlaceholder;
    });

    const isSelectedFilterEqualsSelectedValues = computed(() => {
      if (props.selectedFilter) {
        // console.log(JSON.parse(JSON.stringify(selectedFilter.value.fields)))
        // console.log(JSON.parse(JSON.stringify(props.fields)))
        return JSON.stringify(props.selectedFilter.fields) === JSON.stringify(props.fields);
      }
      return true;
    });

    const dragOptions = computed(() => {
      return {
        animation: 200,
        disabled: false,
        ghostClass: 'chosen-item',
        dragClass: 'drag-class',
        chosenClass: 'chosen-class',
        swapThreshold: 0.9
      };
    });

    const filtersComputed = computed({
      get: () => {
        return props.filters.filter((filter, index) => {
          filter.order = index;
          if (filter.defaultStatus !== 'hidden') {
            return true;
          }
        });
      },
      set: (filters) => {
        emit('changeDraggableList', 'filters', filters);
      }
    });

    const checkedFieldsComputed = computed({
      get: () => {
        return props.checkedFields.map((field, index) => {
          field.order = index;
          return field;
        });
      },
      set: (fields) => {
        emit('changeDraggableList', 'checkedFields', fields);
      }
    });

    const filterTable = () => {
      isOpened.value = false;
      emit('filterTable');
    };

    const popupListener = () => {
      if (isOpened.value) {
        closeModal();
      } else {
        openModal();
      }
    };

    const popupListenerAddFields = () => {
      if (isOpenedFields.value) {
        closeModalFields();
      } else {
        openModalFields();
      }
    };

    const addFilter = () => {
      addingFilter.value = true;
      emit('addingFilter');
    };

    const clearOnCancelChangingFilter = () => {
      addingFilter.value = false;
      newFilterName.value = '';
      props.filters.map((filter) => delete filter?.editting);
    };

    const cancelChangingFilter = () => {
      clearOnCancelChangingFilter();
      emit('cancelChangingFilter');
      emit('toggleChangingSettings', false);
    };

    const saveFilters = () => {
      if (addingFilter.value) {
        if (!newFilterName.value.length) {
          document.querySelector('.search-left__filter-add-name input').focus();
          return;
        }
        emit('addFilter', newFilterName.value);
      } else {
        emit('saveFilters');
      }
      clearOnCancelChangingFilter();
    };

    const toggleChangingSettings = () => {
      emit('toggleChangingSettings');
    };

    const selectFilter = (filter) => {
      !props.changingSettings ? (isOpened.value = false) : null;
      emit('selectFilter', filter, false);
    };

    const editFilterName = (e, filter) => {
      props.filters.map((row) =>
        row.name === filter.name ? (row.selected = true) : (row.selected = false)
      );
      filter.editting = true;
      let input = e.target.closest('.search-left__filter-item-wrapper').querySelector('input');
      input.focus();
      input.setSelectionRange(0, 0);
    };

    const toggleOption = (option, options) => {
      emit('toggleOption', option, options);
    };

    useClickOutside(searchFilterContainer, closeModal);
    useClickOutside(modalFieldsRef, closeModalFields);

    return {
      isOpened,
      searchFilterContainer,
      computedfilterPlaceholder,
      isOpenedFields,
      modalFieldsRef,
      searchAddField,
      computedFilterItems,
      addingFilter,
      newFilterName,
      isSelectedFilterEqualsSelectedValues,
      dragOptions,
      checkedFieldsComputed,
      filtersComputed,
      localSearch,
      filterTable,
      popupListener,
      popupListenerAddFields,
      addFilter,
      cancelChangingFilter,
      saveFilters,
      toggleChangingSettings,
      selectFilter,
      editFilterName,
      toggleOption
    };
  }
};
</script>

<style lang="scss" src="./style.scss" scoped />
