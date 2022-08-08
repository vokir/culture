<template>
  <v-modal :show-modal="isOpen" centered>

  </v-modal>
</template>

<script>
import useModal from "../../hooks/useModal";
import VModal from "../ui/v-modal/v-modal.vue";
export default {
  name: "select-image",
  components: { VModal },
  setup() {
    const {isOpen, openModal, closeModal} = useModal()

    return {
      isOpen,
      openModal,
      closeModal
    }
  }
}
</script>

<style lang="scss" src="./style.scss" scoped/>
