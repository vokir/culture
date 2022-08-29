import { defineStore } from 'pinia'
import { computed, ref } from "vue";

// useStore could be anything like useUser, useCart
// the first argument is a unique id of the store across your application
export const useModalStore = defineStore('modal', () => {
  const modalsState = ref([])
  const activeModal = ref(0)

  const addModalState = (state) => {
    modalsState.value.push(state)
    activeModal.value = state
    checkModalsState()
  }

  const removeModalState = (state) => {
    const idx = modalsState.value.indexOf(state)
    modalsState.value.splice(idx, 1)
    activeModal.value = modalsState.value.length ? modalsState.value[modalsState.value.length - 1] : 0
    checkModalsState()
  }

  const checkModalsState = () => {
    if (modalsState.value.length) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }

  const getActiveModal = computed(() => {
    return activeModal
  })

  return {
    addModalState,
    removeModalState,
    getActiveModal
  }
})
