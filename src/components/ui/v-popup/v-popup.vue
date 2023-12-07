<template>
  <div class="contacts-btn">
    <v-dropdown
      :auto-hide="false"
      :delay="{
        show: 0,
        hide: 0
      }"
      :distance="-30"
      :popper-triggers="[]"
      :shown="isOpened"
      :skidding="-160"
      :triggers="[]"
      container="#app"
      placement="bottom-start"
      popper-class="contacts-vmenu"
    >
      <button class="contacts-button" @click="togglePopup">Все ></button>

      <template #popper :shown="isOpened" class="contacts-popup-card">
        <div class="contacts-popup-column">
          <p v-for="(contact, index) in props.contacts" :key="index" class="contacts-popup-person">
            {{ getFullFio(contact.NAME, contact.LAST_NAME, contact.SECOND_NAME) }}
          </p>
        </div>
        <svg
          class="close-svg"
          fill="none"
          height="20"
          viewBox="0 0 14 14"
          width="20"
          xmlns="http://www.w3.org/2000/svg"
          @click="togglePopup"
        >
          <path
            d="M11.0859 2.91699L2.91931 11.0836"
            stroke="#C6CDD3"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
          />
          <path
            d="M2.91406 2.91699L11.0807 11.0836"
            stroke="#C6CDD3"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
          />
        </svg>
      </template>
    </v-dropdown>
  </div>
</template>
<script>
import { ref } from 'vue';
import getFullFio from '../../../helpers/getFullFio';

export default {
  props: ['contacts'],
  setup(props, context) {
    const isOpened = ref(false);
    const togglePopup = () => {
      context.emit('togglePopup');
      isOpened.value = !isOpened.value;
    };
    return {
      props,
      getFullFio,
      isOpened,
      togglePopup
    };
  }
};
</script>
<style lang="scss" scoped src="./style.scss" />
