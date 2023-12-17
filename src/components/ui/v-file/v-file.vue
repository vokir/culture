<template>
  <div class="file">
    <div v-if="label" class="file__label">
      {{ label }}
    </div>
    <label v-if="!selectedFile" class="file__input">
      <input :accept="accept" type="file" @change="onFileSelected" />
    </label>
    <div v-else class="file__preview">
      <img :src="preview" alt="Файл" class="file__preview-img" />
      <span class="file__name">{{ selectedFile.name ?? 'Файл' }}</span>
      <v-icon height="10px" name="close" width="10px" @click="clearSelected" />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import VIcon from '@/components/ui/v-icon/v-icon.vue';
import { useVModel } from '@vueuse/core';
import Placeholder from '@/assets/images/placeholder.png';

const props = defineProps({
  modelValue: {
    type: File
  },
  accept: {
    type: String,
    default: 'image/png, image/jpeg'
  },
  label: {
    type: String,
    default: 'Добавить файл'
  }
});

const emit = defineEmits(['update:modelValue']);
const selectedFile = useVModel(props, 'modelValue', emit);

const preview = computed(() => {
  if (typeof selectedFile.value === 'object') {
    return URL.createObjectURL(selectedFile.value);
  }
  return Placeholder;
});

const onFileSelected = (event) => {
  selectedFile.value = event.target.files[0];
};
const clearSelected = () => {
  selectedFile.value = null;
};
</script>

<style lang="scss" scoped src="./v-file.scss"></style>
