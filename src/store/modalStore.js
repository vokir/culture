import { defineStore } from 'pinia'
import { computed, ref } from "vue";

// useStore could be anything like useUser, useCart
// the first argument is a unique id of the store across your application
export const useModalStore = defineStore('modal', () => {
  const modalsState = ref([])

  const addModalState = (state) => {
    modalsState.value.push(state)
    checkModalsState()
  }

  const removeModalState = (state) => {
    const idx = modalsState.value.indexOf(state)
    modalsState.value.splice(idx, 1)
    checkModalsState()
  }

  const checkModalsState = () => {
    if (modalsState.value.length) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }

  return {
    addModalState,
    removeModalState
  }
})
