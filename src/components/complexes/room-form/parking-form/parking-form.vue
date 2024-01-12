<template>
  <v-card>
    <div class="input-row">
      <v-select
        v-model="store.currentType"
        :options="store.premiseTypes"
        label="name"
        label-select="Секция*"
      />
      <v-input label="Номер помещения*" name="name" />
    </div>
    <div class="input-row">
      <v-input label="График доступа" name="name" />
      <v-select :options="['Активно']" label-select="Активность*" />
    </div>
    <div class="input-row">
      <v-select :options="['Да', 'Нет']" label-select="Присоединено к помещению" />
      <v-input label="Общая S" name="name" />
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

<style lang="scss" scoped></style>
