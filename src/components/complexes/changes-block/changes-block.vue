<template>
  <div class="changes">
    <div class="changes-row changes-row--header">
      <div class="changes-cell">Дата</div>
      <div class="changes-cell">Автор</div>
      <div class="changes-cell">Изменение</div>
    </div>
    <div v-for="(row, i) of mock" :key="i" class="changes-row">
      <div class="changes-cell">{{ row.date }}</div>
      <div class="changes-cell">{{ row.author }}</div>
      <div class="changes-cell">{{ row.changes }}</div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import dayjs from 'dayjs';

const mock = ref([
  {
    date: dayjs().format('DD.MM.YYYY hh:mm'),
    author: 'Боба',
    changes: 'покакал'
  },
  {
    date: dayjs().format('DD.MM.YYYY hh:mm'),
    author: 'Боба',
    changes: 'покакал'
  },
  {
    date: dayjs().format('DD.MM.YYYY hh:mm'),
    author: 'Боба',
    changes: 'покакал'
  },
  {
    date: dayjs().format('DD.MM.YYYY hh:mm'),
    author: 'Боба',
    changes: 'покакал'
  },
  {
    date: dayjs().format('DD.MM.YYYY hh:mm'),
    author: 'Боба',
    changes: 'покакал'
  },
  {
    date: dayjs().format('DD.MM.YYYY hh:mm'),
    author: 'Боба',
    changes: 'покакал'
  },
  {
    date: dayjs().format('DD.MM.YYYY hh:mm'),
    author: 'Боба',
    changes: 'покакал'
  },
  {
    date: dayjs().format('DD.MM.YYYY hh:mm'),
    author: 'Боба',
    changes: 'покакал'
  },
  {
    date: dayjs().format('DD.MM.YYYY hh:mm'),
    author: 'Боба',
    changes: 'покакал'
  },
  {
    date: dayjs().format('DD.MM.YYYY hh:mm'),
    author: 'Боба',
    changes: 'покакал'
  },
  {
    date: dayjs().format('DD.MM.YYYY hh:mm'),
    author: 'Боба',
    changes: 'покакал'
  },
  {
    date: dayjs().format('DD.MM.YYYY hh:mm'),
    author: 'Боба',
    changes: 'покакал'
  }
]);
</script>

<style lang="scss" scoped src="./changes-block.scss"></style>
