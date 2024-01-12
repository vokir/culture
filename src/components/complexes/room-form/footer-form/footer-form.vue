<template>
  <v-card>
    <div class="input-row">
      <v-select
        v-model="store.currentType"
        :options="store.premiseTypes"
        label="name"
        label-select="Тип этажа*"
      />
      <v-input disabled label="Номер этажа" name="name" />
    </div>
  </v-card>
</template>

<script setup>
import VSelect from '@/components/ui/v-select/v-select.vue';
import VCard from '@/components/ui/v-card/v-card.vue';
import VInput from '@/components/ui/v-input/v-input.vue';
import { usePremiseStore } from '@/store/premise/index.js';

const store = usePremiseStore();
</script>

<style lang="scss" scoped src="./footer-form.scss"></style>
