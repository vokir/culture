<template>
  <div class="tags-wrapper">
    <div v-if="label" class="tags-wrapper__label">
      {{ label }}
    </div>
    <ul class="tags-wrapper__list">
      <li v-for="(tag, index) of tags" :key="index" class="tags-wrapper__item">
        {{ tag.name || tag.UF_TITLE }}
        <div class="tags-wrapper__remove" @click="$emit('removeTag', index)">
          <svg
            fill="none"
            height="9"
            viewBox="0 0 9 9"
            width="9"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.125 1.875L1.87502 7.12498"
              stroke="#868D95"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
            />
            <path
              d="M1.875 1.875L7.12498 7.12498"
              stroke="#868D95"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
            />
          </svg>
        </div>
      </li>
      <li
        v-if="!maxTags || tags.length < maxTags"
        class="tags-wrapper__add"
        @click="$emit('openModal')"
      >
        <svg fill="none" height="7" viewBox="0 0 7 7" width="7" xmlns="http://www.w3.org/2000/svg">
          <path
            clip-rule="evenodd"
            d="M4.2 2.8V0H2.8V2.8H0V4.2H2.8V7H4.2V4.2H7V2.8H4.2Z"
            fill="#1058D0"
            fill-rule="evenodd"
          />
        </svg>
        Добавить
      </li>
    </ul>
    <slot />
  </div>
</template>

<script>
export default {
  name: 'VTagsList',
  props: {
    label: String,
    tags: [Array, Object],
    maxTags: Number
  },
  emits: ['openModal', 'removeTag']
};
</script>

<style lang="scss" scoped src="./style.scss" />
