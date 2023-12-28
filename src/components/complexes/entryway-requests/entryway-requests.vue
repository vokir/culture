<template>
  <div class="entryway-request">
    <div class="entryway-request__title">
      Заявки
      <div class="entryway-request__search">
        <v-filter-search />
      </div>
    </div>
    <div class="entryway-request__list">
      <div class="entryway-request__item">
        <div class="entryway-request__item-header">
          <div class="entryway-request__item-title">Бесплатная заявка</div>
          <div class="entryway-request__item-status">Назначена</div>
        </div>
        <div class="entryway-request__item-body">
          <div class="entryway-request__item-date">14.04.2022 / 18:45</div>
          <div class="entryway-request__item-desc">Перегорела лампочка на этаже</div>
          <div class="entryway-request__item-contacts"></div>
        </div>
      </div>
      <div class="entryway-request__item entryway-request__item--blue">
        <div class="entryway-request__item-header">
          <div class="entryway-request__item-title">Модерация</div>
          <div class="entryway-request__item-status">Назначена</div>
        </div>
        <div class="entryway-request__item-body">
          <div class="entryway-request__item-date">14.04.2022 / 18:45</div>
          <div class="entryway-request__item-desc">
            Направление — название воронки из которой проистекает сделка, у нас может быть воронка
            "Бесплатная заявка", "Модерация"
          </div>
          <div class="entryway-request__item-contacts"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useEntrywayStore } from '@/store/entryway/index.js';
import { inject, watch } from 'vue';
import VFilterSearch from '@/components/ui/v-filter-and-search/v-filter-and-search.vue';

const entryStore = useEntrywayStore();
const currentEntry = inject('entry');

watch(
  () => currentEntry.value.realId,
  (value) => {
    entryStore.getEntryRequestList(value);
  },
  {
    immediate: true
  }
);
</script>

<style lang="scss" scoped src="./entryway-requests.scss"></style>
