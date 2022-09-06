<template lang="">
  <div class="news__for">
    <div class="for__titles">
      <p>Дом</p>
      <p v-if="newsInfo.approaches?.length">Подъезд</p>
      <p v-if="newsInfo.floors?.length">Этаж</p>
      <p v-if="newsInfo.premises?.length">Помещение</p>
    </div>
    <div class="for__row" v-for="row in rows">
      <div v-for="cell in row" class="for__cell">{{ cell }}</div>
    </div>
  </div>
</template>
<script>
import getFloorNumber from "../../helpers/getFloorNumber";
import getApproacheNumber from "../../helpers/getApproacheNumber";

export default {
  props: ["newsInfo"],
  name: "news-for-table",
  setup(props) {
    const rows = [];
    if (props.newsInfo.premises.length > 0) {
      const premises = props.newsInfo.premises;
      const setHouses = new Set();
      const setApproaches = new Set();
      const setFloors = new Set();
      premises.forEach((el) => {
        const rowsPush = (_) => {
          setHouses.add(el.floor.approache.house.ID);
          setApproaches.add(el.floor.approache.ID);
          setFloors.add(floor);
          rows.push([
            el.floor.approache.house.ID,
            getApproacheNumber(el.floor.approache.UF_NAME),
            floor,
            el.ID,
          ]);
        };
        let floor = getFloorNumber(el.floor.UF_NAME);
        if (!setHouses.has(el.floor.approache.house.ID)) {
          rowsPush();
          return;
        }

        if (!setApproaches.has(el.floor.approache.ID)) {
          rowsPush();
          return;
        }
        if (!setFloors.has(floor)) {
          rowsPush();
          return;
        }

        rows[rows.length - 1][3] += ", " + el.ID;
      });
    } else if (props.newsInfo.floors.length > 0) {
      const floors = props.newsInfo.floors;
      console.log("floors:",floors);
      const setHouses = new Set();
      const setApproaches = new Set();
      floors.forEach((el) => {
        const rowsPush = (_) => {
          setHouses.add(el.approache.house.ID);
          setApproaches.add(el.approache.ID);
          rows.push([
            el.approache.house.UF_NAME,
            getApproacheNumber(el.approache.UF_NAME),
            getFloorNumber(el.UF_NAME)
          ]);
        };
        let floor = getFloorNumber(el.UF_NAME);
        if (!setHouses.has(el.approache.house.ID)) {
          rowsPush();
          return;
        }

        if (!setApproaches.has(el.approache.ID)) {
          rowsPush();
          return;
        }

        rows[rows.length - 1][2] += ", " + floor;
      });
    } else if (props.newsInfo.approaches.length > 0) {
      const approaches = props.newsInfo.approaches;
      console.log(approaches);

      const setHouses = new Set();
      approaches.forEach((el) => {
        const rowsPush = (_) => {
          setHouses.add(el.house.ID);
          rows.push([
            el.house.UF_NAME,
            getApproacheNumber(el.UF_NAME)
          ]);
        };
        if (!setHouses.has(el.house.ID)) {
          rowsPush();
          return;
        }

        rows[rows.length - 1][1] += ", " + getApproacheNumber(el.UF_NAME);
      });
    } else if (props.newsInfo.houses.length > 0) {
      const houses = props.newsInfo.houses
      houses.forEach((el) => {
        rows.push([el.UF_NAME]);
      });
    }

    return {
      props,
      rows,
    };
  },
};
</script>
<style lang="scss" src="./style.scss" scoped />
