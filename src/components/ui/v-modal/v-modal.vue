<template>
  <teleport to="body">
    <transition :name="centered ? 'fade-in' : 'slide' " appear>
      <div class="modal-wrapper" v-if="showModal" :class="{'modal-wrapper--centered': centered}">
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
import { onMounted, onUnmounted, onUpdated } from 'vue'
import { useEventListener } from '../../../hooks/useEventListeners'

export default {
  name: "v-modal",
  emits: ['closeModal'],
  props: {
    showModal: Boolean,
    centered: Boolean
  },
  setup({ showModal }, { emit }) {
    const closeModal = () => {
      emit('closeModal')
    }

    useEventListener(document.body, 'keydown', e => {
      if (e.key === 'Escape') {
        closeModal()
      }
    })

    // onMounted(() => {
    //   document.body.style.overflow = 'hidden'
    // })
    //
    // onUnmounted(() => {
    //   document.body.style.overflow = ''
    // })

    return {
      closeModal
    }
  }
}
</script>

<style lang="scss" src="./style.scss" scoped/>
