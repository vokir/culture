<template>
  <div class="info-block">
    <div v-for="row of info" :key="row.title" class="info-block__row">
      <div class="info-block__row-title">{{ row.title }}</div>
      <div class="info-block__row-value">{{ row.value }}</div>
    </div>
  </div>
</template>

<script setup>

const props = defineProps({
  info: {
    type: Array,
    default: () => [
      {
        title: 'ID',
        value: '123123123'
      }
    ]
  }
});
</script>

<style lang="scss" scoped src="./info-block.scss"></style>
