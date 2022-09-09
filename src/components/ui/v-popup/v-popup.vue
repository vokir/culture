<template lang="">
  <div class="contacts-btn">
    <VDropdown class="contacts-vmenu" :triggers="[]" :popperTriggers="[]" :shown="isOpened" :autoHide="false" :placement="'bottom-start'" :delay="{
        show: 0,
        hide: 0,
      }" :distance="-30" :skidding="-160">
        <button class="contacts-button" @click="togglePopup">Все > </button>

        <template  #popper class="contacts-popup-card" :shown="isOpened">
      <div class="contact-popup-column">
        <p
          v-for="(contact, index) in props.contacts"
          class="contact-popup-person"
        >
          {{ getFullFio(contact.NAME, contact.LAST_NAME, contact.SECOND_NAME) }}
        </p>
      </div>
      <svg
        @click="togglePopup"
        class="close-svg"
        width="20"
        height="20"
        viewBox="0 0 14 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M11.0859 2.91699L2.91931 11.0836"
          stroke="#C6CDD3"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M2.91406 2.91699L11.0807 11.0836"
          stroke="#C6CDD3"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
        </template>
      </VDropdown>

  </div>
</template>
<script>
import VButton from "../v-button/v-button.vue";
import VCard from "../v-card/v-card.vue";
import VBadge from "../v-badge/v-badge.vue";
import getFullFio from "../../../helpers/getFullFio";
import { ref } from "vue";

export default {
  props: ["contacts"],
  setup(props, context) {
    const isOpened = ref(false);
    const togglePopup = () => {
      context.emit('togglePopup')
      isOpened.value = !isOpened.value;
    };
    return {
      props,
      getFullFio,
      isOpened,
      togglePopup,
    };
  },
  components: {
    VButton,
    VCard,
    VBadge,
  },
};
</script>
<style lang="scss" src="./style.scss" scoped />
