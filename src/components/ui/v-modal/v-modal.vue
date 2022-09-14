<template>
  <teleport to="body">
    <transition :name="centered ? 'fade-in' : 'slide' " appear @after-leave="$emit('closeModal')">
      <div class="modal-wrapper" v-if="isOpen" :class="{'modal-wrapper--centered': centered}" v-bind="$attrs">
        <div class="modal-background" @click="closeModal"></div>
        <div class="modal">
          <div class="modal__close" @click="closeModal">
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none"
                 stroke="white">
              <path d="M11.875 3.125L3.12504 11.875" stroke="inherit" stroke-width="1.5" stroke-linecap="round"
                    stroke-linejoin="round"/>
              <path d="M3.125 3.125L11.875 11.875" stroke="inherit" stroke-width="1.5" stroke-linecap="round"
                    stroke-linejoin="round"/>
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
import { getCurrentInstance, onMounted, onUnmounted } from 'vue'
import { useEventListener } from '../../../hooks/useEventListeners'
import useModal from "../../../hooks/useModal";
import { useModalStore } from "../../../store/modalStore";

export default {
  name: "v-modal",
  emits: ['closeModal'],
  inheritAttrs: false,
  props: {
    centered: Boolean,
  },
  setup(_, { emit }) {
    const store = useModalStore()
    const { addModalState, removeModalState } = store
    const id = getCurrentInstance().uid
    const { isOpen, openModal, closeModal } = useModal()
    onMounted(() => {
      openModal()
      addModalState(id)
    })
    onUnmounted(() => removeModalState(id))

    useEventListener(document.body, 'keydown', e => {
      if (e.key === 'Escape' && id === store.getActiveModal.value) {
        closeModal()
      }
    })

    return {
      isOpen,
      openModal,
      closeModal
    }

  },
}
</script>

<style lang="scss" src="./style.scss" scoped/>
