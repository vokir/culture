<template>
  <div class="badges-list td-for">
    <div class="badges-list__row" v-for="row in newsInfo">
      <template v-for="column in row">
        <template v-for="cell in column">
          <v-badge
            v-if="cell.isSelected?.length > 0 && cell.type === 'house'"
            variant="blue"
            :text="cell.name"
            tooltip
            :tooltip-text="'Дом ' + cell.name"
          />
					<v-badge
            v-if="cell.isSelected?.length > 0 && cell.type === 'approache'"
            variant="purple"
            :text="cell.name"
            tooltip
            :tooltip-text="cell.name + ', Дом ' + cell.house"
          />
					<v-badge
            v-if="cell.isSelected?.length > 0 && cell.type === 'floor'"
            variant="orange"
            :text="cell.name"
            tooltip
            :tooltip-text="cell.name + ', ' + cell.approache +', Дом ' + cell.house"
          />
					<v-badge
            v-if="cell.isSelected?.length > 0 && cell.type === 'premise'"
            variant="teal"
            :text="cell.name"
            tooltip
            :tooltip-text="'Помещение ' + cell.name +  ', ' + cell.floor + ', ' + cell.approache +', Дом ' + cell.house"
          />
        </template>
      </template>
    </div>
  </div>
</template>
<script>
import getNewsFor from "../../helpers/getNewsFor";
import VBadge from "../ui/v-badge/v-badge.vue";

export default {
  props: ["newsInfo"],
  components: {
    VBadge,
  },
  setup(props) {
    const newsInfo = getNewsFor(props.newsInfo);
    return {
      newsInfo,
    };
  },

};
</script>
<style lang="scss" src="./style.scss" scoped />

