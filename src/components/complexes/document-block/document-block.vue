<template>
  <div class="document-block">
    <a
      v-for="doc of documents"
      :key="doc.realId"
      :href="doc.file.url"
      class="document"
      download
      target="_blank"
    >
      <v-icon height="16px" name="clip" width="14px" />
      {{ doc.title }}
    </a>
  </div>
</template>

<script setup>
import VIcon from '@/components/ui/v-icon/v-icon.vue';

const props = defineProps({
  documents: {
    type: Array,
    default: () => []
  }
});
</script>

<style lang="scss" scoped src="./document-block.scss"></style>
