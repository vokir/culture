<template>
  <v-card>
    <div class="input-row">
      <v-select
        v-model="store.currentType"
        :options="store.premiseTypes"
        label="name"
        label-select="Тип помещения*"
      />
      <v-select
        v-model="store.form.entryway"
        :options="entryStore.entryways"
        label="number"
        label-select="Номер подъезда*"
      />
    </div>
    <div v-if="store.form.entryway?.floors" class="input-row">
      <v-select
        v-model="store.form.floorId"
        :options="store.form.entryway.floors"
        label="number"
        label-select="Номер этажа*"
      />
      <v-input v-model="store.form.number" label="Номер помещения*" name="name" type="number" />
    </div>

    <div class="input-row">
      <v-select v-model="store.form.active" :options="['Да', 'Нет']" label-select="Активность*" />
      <v-input v-model="store.form.description" label="График доступа" name="name" />
    </div>

    <div class="input-row">
      <v-input v-model="store.form.name" label="Название помещения*" name="name" />
      <v-select
        v-model="store.form.attachedTo"
        :options="store.premises"
        label="name"
        label-select="Присоединено к помещению"
      />
    </div>

    <div class="input-row__void" />

    <div class="input-row">
      <v-input v-model="store.form.totalArea" label="Общая S" name="name" />
      <v-input v-model="store.form.totalArea" label="Жилая S" name="name" />
    </div>
    <div class="input-row">
      <v-select
        v-model="store.form.roomCount"
        :options="['1', '2', '3', '4', '5', '6']"
        label-select="Кол-во комнат"
      />
      <v-select
        v-model="store.form.windowCount"
        :options="['1', '2', '3', '4', '5', '6']"
        label-select="Кол-во окон"
      />
    </div>
    <div class="input-row">
      <v-input v-model="store.form.ceilingHeight" label="Высота потолков" name="name" />
      <v-select v-model="store.form.hasInternet" :options="['Да', 'Нет']" label-select="Интернет" />
    </div>
    <div class="input-row">
      <v-select
        v-model="store.form.hasBalcony"
        :options="['Да', 'Нет']"
        label-select="Лоджия/Балкон"
      />
      <v-select v-model="store.form.hasElevator" :options="['Да', 'Нет']" label-select="Лифт" />
    </div>
  </v-card>
</template>

<script setup>
import VSelect from '@/components/ui/v-select/v-select.vue';
import VCard from '@/components/ui/v-card/v-card.vue';
import VInput from '@/components/ui/v-input/v-input.vue';
import { usePremiseStore } from '@/store/premise/index.js';
import { inject } from 'vue';
import { useEntrywayStore } from '@/store/entryway/index.js';

const store = usePremiseStore();
const entryStore = useEntrywayStore();
const currentHouse = inject('house');
</script>

<style lang="scss" scoped src="./flat-form.scss"></style>
