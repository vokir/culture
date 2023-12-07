<template>
  <div class="badges-list td-for">
    <div v-for="(row, idx) in newsInfo" :key="idx" class="badges-list__row">
      <template v-for="(column, i) in row" :key="i">
        <template v-for="(cell, k) in column" :key="k">
          <v-badge
            v-if="cell.isSelected > 0 && cell.type === 'house'"
            :text="cell.name"
            :tooltip-text="'Дом ' + cell.name"
            tooltip
            variant="blue"
          />
          <v-badge
            v-if="cell.isSelected > 0 && cell.type === 'approach'"
            :text="cell.name"
            :tooltip-text="cell.name + ', Дом ' + cell.house"
            tooltip
            variant="purple"
          />
          <v-badge
            v-if="cell.isSelected > 0 && cell.type === 'floor'"
            :text="cell.name"
            :tooltip-text="cell.name + ', ' + cell.approache + ', Дом ' + cell.house"
            tooltip
            variant="orange"
          />
          <v-badge
            v-if="cell.isSelected > 0 && cell.type === 'premise'"
            :text="cell.name"
            :tooltip-text="
              'Помещение ' +
              cell.name +
              ', ' +
              cell.floor +
              ', ' +
              cell.approache +
              ', Дом ' +
              cell.house
            "
            tooltip
            variant="teal"
          />
        </template>
      </template>
    </div>
  </div>
</template>
<script>
import bindRowsLogic from './bindRowsLogic';
import VBadge from '../../ui/v-badge/v-badge.vue';

export default {
  components: {
    VBadge
  },
  props: {
    newsInfo: {
      type: Array,
      default: () => []
    }
  },
  setup(props) {
    const newsInfo = bindRowsLogic(props.newsInfo);
    return {
      newsInfo
    };
  }
};
</script>
<style lang="scss" scoped src="./style.scss" />
