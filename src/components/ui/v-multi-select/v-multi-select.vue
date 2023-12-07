<template>
  <div :class="['select']">
    <div v-if="labelSelect" class="select__label">
      {{ labelSelect }}
    </div>
    <div
      ref="selectRef"
      :class="['select__select', { 'select__select--active': isOpened }]"
      v-on="variant === 'checkbox' ? { click: () => popupListener() } : {}"
    >
      <div class="select__select-content">
        <div v-for="item in modelValue" v-if="modelValue.length" class="select__cell">
          <div class="select__text">{{ item.name || item.FULL_NAME }}</div>
          <button
            :data-id="item.ID"
            class="select__cell-btn select__btn"
            @click.stop="$emit('toggleOption', item, modelValue)"
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
        <div v-if="variant === 'primary'" class="select__add-btn" @click="openModal">
          + Добавить
        </div>
      </div>
      <div
        v-if="variant === 'checkbox'"
        class="select-wrapper__toggle"
        @mousedown.prevent="toggleOptions"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="9" height="7" viewBox="0 0 9 7" fill="none">
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M7.74305 0.5L4.49947 3.88092L1.25695 0.5L0 1.80955L3.24358 5.19047L4.50053 6.5L5.75749 5.19047L9 1.80955L7.74305 0.5Z"
            fill="#C6CDD3"
          />
        </svg>
      </div>
      <div ref="select" class="select__container">
        <v-dropdown
          class="select__filter"
          :delay="{ show: 0, hide: 0 }"
          :triggers="[]"
          :popper-triggers="[]"
          :shown="isOpened"
          :auto-hide="false"
          :container="select"
          :distance="1"
          :boundary="select"
        >
          <template v-if="variant === 'primary'" #popper>
            <input
              v-if="isOpened"
              v-model="searchStr"
              class="select__input"
              placeholder="Поиск"
              type="text"
            />
            <div class="select-popup">
              <ul class="select__list">
                <li
                  v-for="option in optionsFiltered"
                  :class="['select__item', { active: selectedList.includes(option.UF_TITLE) }]"
                  :data-id="option.ID"
                  @click.stop="addOption(option)"
                >
                  {{ option.FULL_NAME }}
                </li>
              </ul>
            </div>
          </template>
          <template v-if="variant === 'checkbox'" #popper>
            <div class="select-popup">
              <div class="select__list">
                <label v-for="option in optionsFiltered" class="select__item">
                  <input
                    :id="option.label"
                    class="select__checkbox"
                    :checked="modelValue.find((row) => row.ID === option.ID)"
                    type="checkbox"
                    @click="toggleOption(option)"
                  />
                  {{ option.name }}
                </label>
              </div>
            </div>
          </template>
        </v-dropdown>
      </div>
    </div>
  </div>
</template>
<script>
import { ref, computed, onMounted, watch } from 'vue';
import useModal from '../../../hooks/useModal';
import useClickOutside from '../../../hooks/useClickOutside';

export default {
  name: 'VMultiSelect',
  inheritAttrs: false,
  props: {
    options: Array,
    variant: {
      type: String,
      required: false,
      default: 'primary',
      validator(value) {
        return ['primary', 'checkbox'].includes(value);
      }
    },

    filterOpened: Boolean,
    labelSelect: String,
    label: String,
    placeholder: {
      type: String,
      default: 'Выберите опцию'
    },
    modelValue: {
      type: null,
      default: () => []
    }
  },
  emits: ['update:modelValue', 'toggleOption'],
  setup(props, { emit }) {
    let search = ref('');
    const { isOpen: isOpened, openModal, closeModal } = useModal();
    const selectedList = ref([]);
    const select = ref();
    const searchStr = ref('');
    const selectRef = ref();

    const optionsFiltered = computed(() => {
      if (props.variant === 'checkbox') {
        return props.options;
      } else {
        return props.options.filter(
          (option) =>
            !props.modelValue.find((item) => option.ID === item.ID) &&
            option.FULL_NAME.includes(searchStr.value)
        );
      }
    });

    const addOption = (option) => {
      if (props.variant === 'checkbox') {
        selectedList.value.push(option);
        emit('update:modelValue', selectedList.value);
      } else if (props.variant === 'primary') {
        let newModelValue = JSON.parse(JSON.stringify(props.modelValue));
        newModelValue.push(option);
        emit('update:modelValue', newModelValue);
      }
      closeModal();
      searchStr.value = '';
    };

    const removeOption = (option, options) => {
      emit('removeOption', option, options);
    };

    const popupListener = () => {
      if (isOpened.value) {
        closeModal();
      } else {
        openModal();
      }
    };

    const selectValue = (options) => {
      if (options?.length) {
        options.forEach((item) => {
          selectedList.value.push(item);
        });
      }
      emit('update:modelValue', selectedList.value);
    };

    const toggleOption = (option) => {
      emit('toggleOption', option);
    };

    onMounted(() => {
      selectValue(props.modelValue);
    });

    useClickOutside(selectRef, () => {
      closeModal();
    });

    return {
      search,
      isOpened,
      addOption,
      removeOption,
      select,
      popupListener,
      openModal,
      selectedList,
      optionsFiltered,
      searchStr,
      toggleOption,
      selectRef
    };
  }
};
</script>

<style lang="scss" src="./style.scss" scoped />
