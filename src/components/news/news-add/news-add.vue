<template>
  <news-form
    :close-modal-prop="closeModalProp"
    @on-save="create($event, true)"
    @on-copy="create"
    @on-cancel="onCancel"
  />
</template>

<script setup>
import { ref } from 'vue';
import { useToast } from 'vue-toastification';
import { useNewsStore } from '@/store/news';

import NewsForm from '../news-form/news-form.vue';

defineEmits(['onCreate']);

const toast = useToast();
const closeModalProp = ref(false);
const store = useNewsStore();

const onCancel = () => {
  closeModalProp.value = true;
};
</script>
