import { ref } from "vue";

const useModal = () => {
  const isOpen = ref(false)

  const openModal = () => {
    isOpen.value = true
  }

  const closeModal = () => {
    isOpen.value = false
  }

  return { isOpen, openModal, closeModal }
}

export default useModal
