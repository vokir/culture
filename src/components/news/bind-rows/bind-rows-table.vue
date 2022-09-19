<template>
    <div class="for__titles">
      <p>Дом</p>
      <p v-if="newsInfo.approaches.length || newsInfo.floors.length || newsInfo.premises.length">
        Подъезд
      </p>
      <p v-if="newsInfo.floors?.length || newsInfo.premises?.length">Этаж</p>
      <p v-if="newsInfo.premises?.length">Помещение</p>
    </div>
    <div class="for__row" v-for="row in rows" ref="rowsDiv">
      <div v-for="cell in row" class="for__cell">
        <span v-for="(value, i) in cell" class="for__value" :class="[{'value-selected':value.isSelected}]" :data-id="value.id">
            <template v-if="true"> {{ value.name}} </template>
            <template v-if="cell[i + 1]">, </template>
        </span>
      </div>
    </div>
</template>
<script>

import bindRowsLogic from "./bindRowsLogic";

export default {
  props: ["newsInfo"],
  name: "news-for-table",
  setup({ newsInfo }) {
    const rows = bindRowsLogic(newsInfo)
    
    return {
      rows,
    };
  },
};
</script>
<style lang="scss" src="./style.scss" scoped />
