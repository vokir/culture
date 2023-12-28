<template>
  <v-card>
    <div class="input-row">
      <v-select :options="store.premiseTypes" label="name" label-select="Тип помещения*" />
      <v-select :options="['1']" label-select="Номер подъезда*" />
    </div>
    <div class="input-row">
      <v-select :options="['Квартира']" label-select="Номер этажа*" />
      <v-input disabled label="Номер помещения*" name="name" />
    </div>
    <div class="input-row">
      <v-select :options="['Активно']" label-select="Активность*" />
      <v-input label="График доступа" name="name" />
    </div>
    <div class="input-row">
      <v-select :options="['Да', 'Нет']" label-select="Присоединено к помещению" />
    </div>

    <div class="input-row__void" />

    <div class="input-row">
      <v-input label="Общая S" name="name" />
      <v-input label="Жилая S" name="name" />
    </div>
    <div class="input-row">
      <v-select :options="['2']" label-select="Кол-во комнат" />
      <v-select :options="['2']" label-select="Кол-во окон" />
    </div>
    <div class="input-row">
      <v-input label="Высота потолков" name="name" />
      <v-select :options="['Да', 'Нет']" label-select="Интернет" />
    </div>
    <div class="input-row">
      <v-select :options="['Да', 'Нет']" label-select="Лоджия/Балкон" />
      <v-select :options="['Да', 'Нет']" label-select="Лифт" />
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

<style lang="scss" scoped src="./flat-form.scss"></style>
