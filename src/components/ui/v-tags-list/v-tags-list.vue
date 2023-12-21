<template>
  <div class="tags-wrapper">
    <div v-if="label" class="tags-wrapper__label">
      {{ label }}
    </div>
    <ul class="tags-wrapper__list">
      <li v-for="(tag, index) of tagList" :key="tag.index" class="tags-wrapper__item">
        {{ tag[tagLabel] }}
        <div class="tags-wrapper__remove" @click="emit('removeTag', tag)">
          <v-icon height="12" name="close" width="12" />
        </div>
      </li>
      <li
        v-if="!maxTags || tagList.length < maxTags"
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
  </div>
</template>

<script setup>
import VIcon from '@/components/ui/v-icon/v-icon.vue';
import { computed } from 'vue';

const emit = defineEmits(['openModal', 'removeTag']);
const props = defineProps({
  label: String,
  tagLabel: String,
  tags: {
    type: Array,
    default: () => []
  },
  maxTags: Number
});

const tagList = computed(() => props.tags);
</script>

<style lang="scss" scoped src="./style.scss" />
