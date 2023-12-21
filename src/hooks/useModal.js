import { ref } from 'vue';

const useModal = (initialValue = false) => {
  const isOpen = ref(initialValue);

  const openModal = () => {
    isOpen.value = true;
  };

  const closeModal = () => {
    isOpen.value = false;
  };

  const toggle = () => {
    isOpen.value = !isOpen.value;
  };

  return { isOpen, openModal, closeModal, toggle };
};

export default useModal;
