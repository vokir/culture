<template>
  <v-modal
    :close-modal-prop="closeModalProp"
    centered
    class="modal-images"
    @close-modal="onCloseModal"
  >
    <div v-if="title" class="modal-images__title">{{ title }}</div>
    <div class="images-container">
      <div class="modal-images__filter">
        <slot name="filter"></slot>
      </div>
      <v-loader v-if="loading" />
      <div v-else class="modal-images__list">
        <div
          v-for="item of items"
          :key="item.file.ID"
          :class="[
            'modal-images__item',
            { 'modal-images__item--active': modelValue.id === item.ID }
          ]"
        >
          <img :alt="item.UF_TITLE" :src="item.file.SRC" @click="selectImage(item)" />
          <span>{{ item.UF_TITLE }}</span>
        </div>
      </div>
      <div class="modal-images__crop">
        <slot name="cropper"></slot>
      </div>
      <div class="modal-images__actions">
        <slot name="pagination"></slot>
        <v-button variant="link" @click="cancel">Отменить</v-button>
        <v-button variant="success" @click="$emit('onSubmit')">{{ title }}</v-button>
      </div>
    </div>
  </v-modal>
</template>

<script>
import { ref } from 'vue';
import VButton from '../v-button/v-button.vue';
import VLoader from '../v-loader/v-loader.vue';
import VModal from '../v-modal/v-modal.vue';
import { useNewsStore } from '@/store/news';

export default {
  name: 'VSelectImage',
  components: { VModal, VLoader, VButton },
  props: {
    title: {
      type: String,
      required: false,
      default: 'Выберите изображение'
    },
    loading: {
      type: Boolean,
      required: true,
      default: true
    },
    items: {
      type: [Array, Object],
      required: true,
      default: () => []
    },
    modelValue: {
      type: Object,
      required: false,
      default: () => ({
        id: null,
        src: null,
        name: null
      })
    }
  },
  emits: ['update:modelValue', 'closeModal', 'onSubmit', 'onCancel', 'onSelect'],
  setup(_, { emit }) {
    const store = useNewsStore();
    const closeModalProp = ref(false);

    const cancel = () => {
      emit('onCancel');
      closeModalProp.value = true;
    };

    const selectImage = (item) => {
      emit('update:modelValue', {
        id: item.ID,
        src: item.file.SRC,
        name: item.file.ORIGINAL_NAME
      });
      emit('onSelect', item.file.SRC);
    };
    const onCloseModal = () => {
      emit('closeModal');
      store.variablesImages = {
        currentPage: 1,
        perPage: 100
      };
    };

    return {
      closeModalProp,
      cancel,
      selectImage,
      onCloseModal
    };
  }
};
</script>

<style lang="scss" scoped src="./style.scss" />
