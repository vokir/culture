<template>
  <div class="tabs">
    <ul class="tabs-header">
      <li
        :class="[
          'tabs-header__item',
          { 'tabs-header__item--active' : selectedTitle === title },
          { 'tabs-header__item--link': linkTitle },
          { 'tabs-header__item--button': !linkTitle },
        ]"
        v-for="title of tabTitles"
        @click="selectTab(title)"
      >
        <component
          :is="linkTitle ? 'a' : 'button'"
          class="tabs-header__title"
        >
          {{ title }}
        </component>
      </li>
    </ul>
    <div class="tabs-list">
      <slot/>
    </div>
  </div>
</template>

<script>
import { provide, ref } from "vue";

export default {
  name: "v-tabs",
  emits: ['update:modelValue'],
  props: {
    linkTitle: {
      type: Boolean,
      required: false,
      default: false,
    }
  },
  setup(_, { slots, emit }) {
    const tabTitles = ref(slots.default().map(tab => tab.props.title))
    const selectedTitle = ref(tabTitles.value[0])

    const selectTab = (tab) => {
      selectedTitle.value = tab
      emit('update:modelValue', tab)
    }

    provide("selectedTitle", selectedTitle)

    return {
      selectedTitle,
      tabTitles,
      selectTab
    }
  }
}
</script>

<style lang="scss" src="./style.scss" scoped/>

