<template lang="">
  <div class="news__for">
    <div class="for__titles">
      <p>Дом</p>
      <p v-if="newsInfo.approaches?.length | newsInfo.floors?.length | newsInfo.premises?.length">Подъезд</p>
      <p v-if="newsInfo.floors?.length | newsInfo.premises?.length" >Этаж</p>
      <p v-if="newsInfo.premises?.length">Помещение</p>
    </div>
    <div class="for__row" v-for="row in rows" ref="rowsDiv">
      <div
        v-for="cell in row"
        class="for__cell"
        :class="cell.isSelected"
        :data-id="cell.isSelected"
      >
        {{ cell.name }}
      </div>
    </div>
  </div>
</template>
<script>
import getFloorNumber from "../../helpers/getFloorNumber";
import getApproacheNumber from "../../helpers/getApproacheNumber";
import { computed, ref, onMounted } from "vue";

export default {
  props: ["newsInfo"],
  name: "news-for-table",
  setup(props) {
    const rows = [];
    const rowsDiv = ref([]);
    const setHouses = new Set();
    const setApproaches = new Set();
    const setFloors = new Set();
    const setHousesSelected = new Set(props.newsInfo.houses.map((key)=> key.ID));
    const setApproachesSelected = new Set(props.newsInfo.approaches.map((key)=> key.ID));
    const setFloorsSelected = new Set(props.newsInfo.floors.map((key)=> key.ID));
    const checkForSelected = (...arg) => {
      if (setHousesSelected.has(arg[0])) {
        rows[rows.length - 1][0].isSelected = "cell-selected";
      }
      if (setApproachesSelected.has(arg[1])) {
        rows[rows.length - 1][1].isSelected = "cell-selected";
      }
      if (setFloorsSelected.has(arg[2])) {
        rows[rows.length - 1][2].isSelected = "cell-selected";
      }
    };

    const rowsPush = (el) => {
      let floor;
      let approache;

      if (el.__typename === "Floor") {
        setHouses.add(el.approache?.house.ID);
        setApproaches.add(el.approache?.ID);
        setFloors.add(el.ID);
        floor = getFloorNumber(el.UF_NAME);
        approache = getApproacheNumber(el.approache.UF_NAME);
        rows.push([
          {
            name: el.approache.house.UF_NAME,
          },
          {
            name: approache,
          },
          {
            name: floor,
          },
        ]);
        checkForSelected(el.approache?.house?.ID,el.approache?.ID);
      }else if(el.__typename === "Approache") {
        setHouses.add(el.house.ID);
        setApproaches.add(el.ID);
        approache = getApproacheNumber(el.UF_NAME);
        rows.push([
          {
            name: el.house?.UF_NAME,
          },
          {
            name: approache,
          },
        ]);
        checkForSelected(
          el.house.ID,
        );
      } else if(el.__typename === "Premise") {
        setHouses.add(el.floor?.approache?.house.ID);
        setApproaches.add(el.floor?.approache?.ID);
        setFloors.add(el.floor?.ID);
        floor = getFloorNumber(el.floor?.UF_NAME);
        approache = getApproacheNumber(el.floor?.approache?.UF_NAME);
        rows.push([
          {
            name: el.floor?.approache?.house?.UF_NAME,
          },
          {
            name: approache,
          },
          {
            name: floor,
          },
          {
            name: el.UF_NUMBER,
          },
        ]);
        checkForSelected(
          el.floor?.approache?.house.ID,
          el.floor?.approache?.ID,
          el.floor?.ID
        );
      }
    };

    if (props.newsInfo.premises.length > 0) {
      const premises = props.newsInfo.premises;

      premises.forEach((el) => {
        if (!setHouses.has(el.floor.approache.house.ID)) {
          rowsPush(el);
          return;
        }

        if (!setApproaches.has(el.floor.approache.ID)) {
          rowsPush(el);
          return;
        }
        if (!setFloors.has(el.floor.ID)) {
          rowsPush(el);
          return;
        }
        rows[rows.length - 1][3].name += ", " + el.UF_NUMBER;
      });
    } else if (props.newsInfo.floors.length > 0) {
      const floors = props.newsInfo.floors;
      floors.forEach((el) => {
        // const rowsPush = (_) => {
        //   setHouses.add(el.approache.house.ID);
        //   setApproaches.add(el.approache.ID);

        // };

        let floor = getFloorNumber(el.UF_NAME);
        if (!setHouses.has(el.approache.house.ID)) {
          rowsPush(el);
          return;
        }

        if (!setApproaches.has(el.approache.ID)) {
          rowsPush(el);
          return;
        }

        rows[rows.length - 1][2].name += ", " + floor;
      });
    } else if (props.newsInfo.approaches.length > 0) {
      const approaches = props.newsInfo.approaches;
      approaches.forEach((el) => {

        // const rowsPush = (_) => {
        //   setHouses.add(el.house.ID);
        //   rows.push([
        //     { name: el.house.UF_NAME },
        //     { name: getApproacheNumber(el.UF_NAME) },
        //   ]);
        // };

        if (!setHouses.has(el.house.ID)) {
          rowsPush(el);
          return;
        }

        rows[rows.length - 1][1].name += ", " + getApproacheNumber(el.UF_NAME);
      });
    } else if (props.newsInfo.houses.length > 0) {
      const houses = props.newsInfo.houses;
      houses.forEach((el) => {
        rows.push([{ name: el.UF_NAME }]);
      });
    }

    return {
      rowsDiv,
      props,
      rows,
    };
  },
};
</script>
<style lang="scss" src="./style.scss" scoped />
