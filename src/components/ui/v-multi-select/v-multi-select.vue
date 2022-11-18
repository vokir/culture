<template>
  <div :class="['select']" >
    <div
      v-if="labelSelect"
      class="select__label"
    >
      {{ labelSelect }}
    </div>
    <div ref="selectRef" :class="['select__select', {'select__select--active': isOpened}]" v-on="variant === 'checkbox' ? {click: ()=> popupListener()} : {}">
      <div class="select__select-content">
        <div
          class="select__cell"
          v-if="modelValue.length"
          v-for="item in modelValue"
        >
          <div class="select__text">{{item.name || item.FULL_NAME}}</div>
          <button
            @click.stop="$emit('toggleOption',item, modelValue)"
            :data-id="item.ID"
            class="select__cell-btn select__btn"
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
        <div class="select__add-btn" v-if="variant === 'primary'" @click="openModal">
          + Добавить
        </div>
      </div>
      <div v-if="variant === 'checkbox'" class="select-wrapper__toggle" @mousedown.prevent="toggleOptions">
        <svg xmlns="http://www.w3.org/2000/svg" width="9" height="7" viewBox="0 0 9 7" fill="none">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M7.74305 0.5L4.49947 3.88092L1.25695 0.5L0 1.80955L3.24358 5.19047L4.50053 6.5L5.75749 5.19047L9 1.80955L7.74305 0.5Z" fill="#C6CDD3" />
        </svg>
      </div>
      <div
        class="select__container"
        ref="select"
      >
        <v-dropdown
          class="select__filter"
          :delay="{show: 0,hide: 0}"
          :triggers="[]"
          :popperTriggers="[]"
          :shown="isOpened"
          :autoHide="false"
          :container="select"
          :distance="1"
          :boundary="select"
        >
          <template #popper v-if="variant === 'primary'">
            <input
              class="select__input"
              v-model="searchStr"
              v-if="isOpened"
              placeholder="Поиск"
              type="text"
            />
            <div class="select-popup">
              <ul class="select__list">
                <li
                  :class="['select__item',{'active':selectedList.includes(option.UF_TITLE)}]"
                  v-for="option in optionsFiltered"
                  :data-id="option.ID"
                  @click.stop="addOption(option)"
                >
                  {{option.FULL_NAME}}
                </li>
              </ul>
            </div>
          </template>
          <template #popper v-if="variant === 'checkbox'">
            <div class="select-popup">
							<div class="select__list">
								<label
									class="select__item"
									v-for="option in optionsFiltered"
								>
									<input
										class="select__checkbox"
										@click="toggleOption(option)"
										:checked="modelValue.find(row => row.ID === option.ID)"
										type="checkbox"
										:id="option.label"
									/>
									{{option.name}}
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
  name: "v-multi-select",
  emits: ["update:modelValue", "toggleOption"],
  inheritAttrs: false,
  props: {
    options: Array,
    variant: {
      type: String,
      required: false,
      default: 'primary',
      validator(value) {
        return ['primary', 'checkbox'].includes(value)
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
      default: () => ([]),
    },
  },
  setup(props, { emit }) {
    let search = ref('')
    const { isOpen: isOpened, openModal, closeModal } = useModal()
    const selectedList = ref([])
    const select = ref()
    const searchStr = ref("")
		const selectRef = ref()

    const optionsFiltered = computed(() => {
      if(props.variant === 'checkbox'){
        return props.options
      }
      else{
        return props.options.filter(option => !props.modelValue.find(item => option.ID === item.ID) && option.FULL_NAME.includes(searchStr.value))
      }
    })

    const addOption = (option) => {
			if(props.variant === 'checkbox'){
				selectedList.value.push(option)
      emit("update:modelValue", selectedList.value);
			}
			else if(props.variant === 'primary'){
				let newModelValue = JSON.parse(JSON.stringify(props.modelValue)) 
				newModelValue.push(option)
				emit("update:modelValue", newModelValue);
			}
			closeModal()
      searchStr.value = ""
    }

    const removeOption = (option,options) => {
      emit("removeOption", option, options);
    }

    const popupListener = () => {
      if (isOpened.value) {
        closeModal()
      }
      else {
        openModal()
      }
    }

    const selectValue = (options) => {
      if (options?.length) {
        options.forEach(item => {
          selectedList.value.push(item)
        });
      }
      emit("update:modelValue", selectedList.value);
    };

		const toggleOption = (option)=>{
			emit('toggleOption',option)
		}

    onMounted(() => {
      selectValue(props.modelValue)
    })

		useClickOutside(selectRef, ()=>{
			closeModal()
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
      searchStr,
			toggleOption,
			selectRef
    }
  },
};
</script>





<style lang="scss" src="./style.scss" scoped />
