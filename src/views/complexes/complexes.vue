<template>
  <layout-default>
    <div class="complexes">
      <v-loader v-if="isLoading"/>

      <v-table
        v-else
        :class="{'news--action': selected.length}"
        :rows="mock"
      >
        <v-table-column
          id="choice"
          class="table__thead-th-check"
          title="check"
        >
          <template #header>
            <v-checkbox v-model="selectAll"/>
          </template>

          <template v-slot="{ row, items }">
            <v-checkbox
              v-model="selected"
              :value="row"
            />
          </template>


        </v-table-column>

        <template #columns>
          <v-table-column
            v-for="col in columns"
            :id="col"
            :title="col"
            width="100%"
          >
            <template v-slot="{ row }">
              {{ row.name }}
            </template>
          </v-table-column>
        </template>

      </v-table>
      <transition name="slide-up">
        <div
          v-if="selected.length"
          class="table-action"
        >
          <div class="table-action__buttons">
            <v-button
              variant="danger"
            >
              Удалить
            </v-button>
            <v-button
              variant="link"
              @click="selected = []"
            >
              Отмена
            </v-button>
          </div>
          <div class="table-action__selected">
            Отмечено: <span>{{ selected.length }} / {{ mock.length }}</span>
          </div>
        </div>
      </transition>
    </div>
  </layout-default>
</template>

<script setup>
import LayoutDefault from "@/layout/layout-default/layout-default.vue";
import VButton from "@/components/ui/v-button/v-button.vue";
import VCheckbox from "@/components/ui/v-checkbox/v-checkbox.vue";
import VLoader from "@/components/ui/v-loader/v-loader.vue";
import VTableColumn from "@/components/ui/v-table/v-table-column.vue";
import VTable from "@/components/ui/v-table/v-table.vue";
import {computed, ref} from "vue";

const isLoading = ref(false)
const selected = ref([]);
const mock = ref([
  {
    name: 'Береговой',
    id: '47523489067'
  },
  {
    name: 'ЖК Новокузнецкий',
    id: '27523489045'
  },
  {
    name: 'ЖК Длинное название Орлиное гнездо',
    id: '87523489011'
  },
  {
    name: 'ЖК Винтерфелл',
    id: '67523489067'
  },
  {
    name: 'ЖК Королевская гавань',
    id: '77523489044'
  },
])
const columns = ref(['name', 'id'])

const selectAll = computed({
  get() {
    return selected.value.length === mock.value.length;
  },
  set(value) {
    selected.value = [];

    if (value) {
      mock.value.forEach((select) => {
        selected.value.push(select);
      });
    }
  },
});

</script>

<style lang="scss" scoped src="./complexes.scss"></style>
