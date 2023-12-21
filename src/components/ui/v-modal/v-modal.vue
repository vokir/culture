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
              fill="none"
              height="15"
              stroke="white"
              viewBox="0 0 15 15"
              width="15"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.875 3.125L3.12504 11.875"
                stroke="inherit"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
              />
              <path
                d="M3.125 3.125L11.875 11.875"
                stroke="inherit"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
              />
            </svg>
          </div>
          <div class="modal__content">
            <div v-if="$slots.title" class="modal__title">
              <slot name="title"></slot>
            </div>
            <slot></slot>
            <div v-if="$slots.actions" class="modal__actions">
              <slot name="actions" />
            </div>
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script>
import { getCurrentInstance, onMounted, onUnmounted, watch } from 'vue';
import { useEventListener } from '@/hooks/useEventListeners';
import useModal from '@/hooks/useModal';
import { useModalStore } from '@/store/modalStore';
import VButton from '@/components/ui/v-button/v-button.vue';

export default {
  name: 'VModal',
  components: { VButton },
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
