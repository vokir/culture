<template>
  <div class="for__titles">
    <p>Дом</p>
    <p v-if="newsInfo.approaches.length || newsInfo.floors.length || newsInfo.premises.length">
      Подъезд
    </p>
    <p v-if="newsInfo.floors?.length || newsInfo.premises?.length">Этаж</p>
    <p v-if="newsInfo.premises?.length">Помещение</p>
  </div>
  <div v-for="(row, i) in rows" :key="i" ref="rowsDiv" class="for__row">
    <div v-for="(cell, k) in row" :key="k" class="for__cell">
      <span
        v-for="(value, j) in cell"
        :key="j"
        :class="[{ 'value-selected': value.isSelected }]"
        :data-id="value.id"
        class="for__value"
      >
        <template v-if="true"> {{ value.name }} </template>
        <template v-if="cell[j + 1]">, </template>
      </span>
    </div>
  </div>
</template>
<script>
import bindRowsLogic from './bindRowsLogic';

export default {
  name: 'NewsForTable',
  props: ['newsInfo'],
  setup({ newsInfo }) {
    const rows = bindRowsLogic(newsInfo);

    return {
      rows
    };
  }
};
</script>
<style lang="scss" scoped src="./style.scss" />
