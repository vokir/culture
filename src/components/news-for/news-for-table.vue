<template lang="">
  <div class="news__for">
    <div class="for__titles">
      <p>Дом</p>
      <p
        v-if="
          newsInfo.approaches?.length |
            newsInfo.floors?.length |
            newsInfo.premises?.length
        "
      >
        Подъезд
      </p>
      <p v-if="newsInfo.floors?.length | newsInfo.premises?.length">Этаж</p>
      <p v-if="newsInfo.premises?.length">Помещение</p>
    </div>
    <div class="for__row" v-for="row in rows" ref="rowsDiv">
      <div v-for="cell in row" class="for__cell">
        <span
          v-for="(value, i) in cell"
          class="for__value"
          :class="value.isSelected"
          :data-id="value.id"
          >{{ value.name }}<span v-if="cell[i + 1]">, </span>
        </span>
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
    const setHousesSelected = new Set(
      props.newsInfo.houses.map((key) => key.ID)
    );
    const setApproachesSelected = new Set(
      props.newsInfo.approaches.map((key) => key.ID)
    );
    const setFloorsSelected = new Set(
      props.newsInfo.floors.map((key) => key.ID)
    );

    const checkForSelected = () => {
      rows.forEach((row) => {
        row.forEach((cell, i) => {
          if (i === 0) {
            cell.forEach((value) => {
              if (setHousesSelected.has(value.id)) {
                value.isSelected = "value-selected";
              }
            });
          } else if (i === 1) {
            cell.forEach((value) => {
              if (setApproachesSelected.has(value.id)) {
                value.isSelected = "value-selected";
              }
            });
          } else if (i === 2) {
            cell.forEach((value) => {
              if (setFloorsSelected.has(value.id)) {
                value.isSelected = "value-selected";
              }
            });
          }
        });
      });
    };

    const rowsPush = (el) => {
      let floor;
      let approache;
      if (el.__typename === "House") {
        setHouses.add(el.approache?.house.ID);
        rows.push([
          [
            {
              id: el.ID,
              name: el.UF_NAME,
            },
          ],
        ]);
      } else if (el.__typename === "Floor") {
        setHouses.add(el.approache?.house.ID);
        setApproaches.add(el.approache?.ID);
        setFloors.add(el.ID);
        floor = el.UF_NAME;
        approache = el.approache.UF_NAME;
        rows.push([
          [
            {
              id: el.approache.house.ID,
              name: el.approache.house.UF_NAME,
            },
          ],
          [
            {
              id: el.approache.ID,
              name: approache,
            },
          ],
          [
            {
              id: el.ID,
              name: floor,
            },
          ],
        ]);
      } else if (el.__typename === "Approache") {
        setHouses.add(el.house.ID);
        setApproaches.add(el.ID);
        approache = el.UF_NAME;
        rows.push([
          [
            {
              id: el.house.ID,
              name: el.house?.UF_NAME,
            },
          ],
          [
            {
              id: el.ID,
              name: approache,
            },
          ],
        ]);
      } else if (el.__typename === "Premise") {
        setHouses.add(el.floor?.approache?.house.ID);
        setApproaches.add(el.floor?.approache?.ID);
        setFloors.add(el.floor?.ID);
        floor = el.floor?.UF_NAME;
        approache = el.floor?.approache?.UF_NAME;
        let name = el.UF_NUMBER
        if(el.UF_NAME){
          name = el.UF_NAME
        }
        rows.push([
          [
            {
              id: el.floor?.approache?.house?.ID,
              name: el.floor?.approache?.house?.UF_NAME,
            },
          ],
          [
            {
              id: el.floor?.approache?.ID,
              name: approache,
            },
          ],
          [
            {
              id: el.floor?.ID,
              name: floor,
            },
          ],
          [
            {
              id: el.ID,
              name: name,
              isSelected: "value-selected",
            },
          ],
        ]);
      }
    };

    ////Проверка выбранных помещений
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
        let name = el.UF_NUMBER
        if(el.UF_NAME){
          name = el.UF_NAME
        }
        rows[rows.length - 1][3].push({
          id: el.ID,
          name: name,
          isSelected: "value-selected",
        });
      });
    }

    ////Проверка выбранных этажей
    if (props.newsInfo.floors.length > 0) {
      const floors = props.newsInfo.floors;
      floors.forEach((el,i) => {
        if (!setHouses.has(el.approache.house.ID)) {
          rowsPush(el);
          return;
        }
        if (!setApproaches.has(el.approache.ID)) {
          rowsPush(el);
          return;
        }
        if (setFloors.has(el.ID)) {
          return;
        }
        if(rows[rows.length-1][1][0].id === el.approache.ID && rows[rows.length - 1][3] === undefined){
          rows[rows.length - 1][2].push({
          id: el.ID,
          name: el.UF_NAME,
        });
        }
        else{
          rowsPush(el)
          return
        }
      });
    }

    //Проверка выбранных подъездов
    if (props.newsInfo.approaches.length > 0) {
      const approaches = props.newsInfo.approaches;
      approaches.forEach((el) => {
        if (!setHouses.has(el.house.ID)) {
          rowsPush(el);
          return;
        }
        if (setApproaches.has(el.ID)) {
          return;
        }

        if(rows[rows.length-1][0][0].id === el.house.ID && rows[rows.length - 1][2]?.length === undefined){
          rows[rows.length - 1][1].push({
          id: el.ID,
          name: el.UF_NAME,
          
        });
        setApproaches.add(el.ID);
        }
        else{
          rowsPush(el)
          return
        }
      });
    }

    //Проверка выбранных домов
    if (props.newsInfo.houses.length > 0) {
      const houses = props.newsInfo.houses;
      houses.forEach((el) => {
        if (!setHouses.has(el.ID)) {
          rowsPush(el)
        }
      });
    }
    checkForSelected();

    return {
      rowsDiv,
      props,
      rows,
    };
  },
};
</script>
<style lang="scss" src="./style.scss" scoped />
