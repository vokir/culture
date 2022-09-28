<template>
  <div :class="['select']">
    <div v-if="labelSelect" class="select__label">
      {{ labelSelect }}
    </div>
    <div :class="['select__select']">
      <div class="select__cell" v-if="selectedList.length" v-for="item in selectedList">
        <div class="select__text">{{item.FULL_NAME}}</div>
        <button @click.stop="removeOption" :data-id="item.ID" class="select__cell-btn select__btn">
          <svg width="11" height="12" viewBox="0 0 11 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.71094 2.7915L2.2943 9.20814" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M2.28906 2.7915L8.7057 9.20814" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </button>
      </div>
      <div class="select__add-btn" @click="openModal">+ Добавить</div>
      <div class="select__container" ref="select">
        <v-dropdown class="select__filter" :delay="{show: 0,hide: 0}" :triggers="[]" :popperTriggers="[]" :shown="isOpened" :autoHide="false" :container="select" :distance="0" :boundary="select">
          <template #popper>
            <input class="select__input" v-model="searchStr" v-if="isOpened" placeholder="Поиск" type="text" />
            <div class="select-popup">
              <ul class="select__list">
                <li class="select__item" :class="{active:selectedList.includes(option.UF_TITLE)}" v-for="option in optionsFiltered" :data-id="option.ID" @click.stop="addOption(option)">
                  {{option.FULL_NAME}}
                </li>
              </ul>
            </div>
          </template>

        </v-dropdown>
      </div>

    </div>
  </div>
</template>
<script>
import { ref, computed, onMounted } from 'vue';
import useModal from '../../../hooks/useModal';
import useClickOutside from '../../../hooks/useClickOutside';

export default {
  name: "v-multi-select",
  emits: ["update:modelValue"],
  inheritAttrs: false,
  props: {
    options: Array,
    variant: {
      type: String,
      required: false,
      default: '',
      validator(value) {
        return ['primary', 'transparent'].includes(value)
      }
    },
    filterOpened: Boolean,
    labelSelect: String,
    label: String,
    placeholder: {
      type: String,
      default: "Выберите опцию",
    },
    modelValue: {
      type: null,
      default: () => [],
    },
  },
  setup(props, {emit}) {
    let search = ref('')
    const { isOpen: isOpened, openModal, closeModal } = useModal()
    const selectedList = ref([])
    const select = ref()
    const searchStr = ref("")

    const optionsFiltered = computed(() => {
      return props.options.filter(option => selectedList.value.every(item => option.ID !== item.ID) && option.FULL_NAME.includes(searchStr.value))
    })

    // const searchFiltered = computed(() => {
    //   return optionsFiltered.filter(option => selectedList.value.every(option.FULL_NAME.includes(searchStr.value))
    // })


    const addOption = (option) => {
      selectedList.value.push(option)
      emit("update:modelValue", selectedList.value);
      closeModal()
      searchStr.value = ""
    }

    const removeOption = (option) => {
      selectedList.value = selectedList.value.filter(item => {
        if (item.ID != option.target.dataset.id) return true
      })
      emit("update:modelValue", selectedList.value);
    }

    const popupListener = () => {
      if (isOpened.value) {
        closeModal()
      }
      else {
        openModal()
      }
    }

    useClickOutside(select, closeModal)

    const selectValue = (option) => {
      if (option.length) {
        option.forEach(item => {
          selectedList.value.push(item)
        });
      }
      emit("update:modelValue", selectedList.value);
    };

    onMounted(() => {
      selectValue(props.modelValue)
    })

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
      searchStr
    }
  },
};
</script>



<style lang="scss" src="./style.scss" scoped />
