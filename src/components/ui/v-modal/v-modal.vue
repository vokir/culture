<template>
  <teleport to="body">
    <transition
      :name="centered || small ? 'fade-in' : 'slide'"
      appear
      @after-leave="$emit('closeModal')"
    >
      <div
        v-if="isOpen"
        :class="[
          'modal-wrapper',
          {
            'modal-wrapper--centered': centered,
            'modal-wrapper--small': small,
            'modal-wrapper--bordered': border
          }
        ]"
        v-bind="$attrs"
      >
        <div v-if="!hideOverflow" class="modal-background" @click="closeModal" />
        <div class="modal">
          <div class="modal__close" @click="closeModal">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
              stroke="white"
            >
              <path
                d="M11.875 3.125L3.12504 11.875"
                stroke="inherit"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M3.125 3.125L11.875 11.875"
                stroke="inherit"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
          <div class="modal__content">
            <slot></slot>
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script>
import { getCurrentInstance, onMounted, onUnmounted, watch } from 'vue';
import { useEventListener } from '../../../hooks/useEventListeners';
import useModal from '../../../hooks/useModal';
import { useModalStore } from '../../../store/modalStore';

export default {
  name: 'VModal',
  inheritAttrs: false,
  props: {
    centered: Boolean,
    border: Boolean,
    small: Boolean,
    hideOverflow: Boolean,
    container: HTMLElement | String,
    closeModalProp: Boolean
  },
  emits: ['closeModal'],
  setup(props) {
    const store = useModalStore();
    const { addModalState, removeModalState } = store;
    const id = getCurrentInstance().uid;
    const { isOpen, openModal, closeModal } = useModal();

    watch(
      () => props.closeModalProp,
      (value) => {
        console.log(value);
        if (value) {
          closeModal();
        }
      }
    );

    onMounted(() => {
      openModal();
      addModalState(id);
    });
    onUnmounted(() => removeModalState(id));

    useEventListener(document.body, 'keydown', (e) => {
      if (e.key === 'Escape' && id === store.getActiveModal.value) {
        closeModal();
      }
    });

    return {
      isOpen,
      openModal,
      closeModal
    };
  }
};
</script>

<style lang="scss" src="./style.scss" />
