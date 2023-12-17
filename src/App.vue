<template>
  <router-view />
</template>

<script setup>
import { useAuthStore } from '@/store/auth/index.js';

const authStore = useAuthStore();
if (!authStore.isAuth) {
  authStore.signIn('admin@admin.com', 'VlJYzpsEoxoNskL');
}
</script>

<style lang="scss" src="./assets/style/index.scss" />
