<template>
  <div class="loader-container">
    <div class="loader">
      <div v-for="i of 4" :key="i" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'VLoader'
};
</script>

<style lang="scss" src="./style.scss" scoped />
