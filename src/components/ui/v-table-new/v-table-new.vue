<template>
  <div :class="['table-container', {'table-container--action': selected.length}]">
    <div class="table-wrapper">
      <table class="table">
        <thead class="table__thead">
        <tr class="table__thead-tr">
          <th class="table__thead-th table__thead-th-check">
            <div class="table__thead-cell">
              <v-checkbox v-model="selectAll"/>
            </div>
          </th>
          <th class="table__thead-th table__thead-th-settings">
            <div class="table__thead-cell">
              <v-icon height="16" name="settings" width="16"/>
            </div>
          </th>
          <th v-for="col of columns" class="table__thead-th">
            <div class="table__thead-cell">
              <slot name="tableHeader" v-bind="col"/>
            </div>
          </th>
        </tr>
        </thead>
        <tbody class="table__tbody">
        <tr
            v-for="row of rows"
            :class="['table__tbody-tr', {'table__tbody-tr--selected': selected.includes(row)}]"
            @click="onRowClick(row)"
        >
          <td class="table__tbody-td">
            <div class="table__thead-cell" @click.stop>
              <v-checkbox
                  v-model="selected"
                  :value="row"
              />
            </div>
          </td>
          <td class="table__tbody-td">
            <div class="table__thead-cell" @click.stop>
              <table-settings-row
                  @copy="emit('copy', row)"
                  @delete="emit('delete', row)"
                  @edit="emit('edit', row)"
              />
            </div>
          </td>
          <td v-for="col of columns" class="table__tbody-td">
            <div class="table__thead-cell" @click.stop>
              <slot name="tableRow" v-bind="{row, col, selected}"/>
            </div>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <transition name="slide-up">
      <div
          v-if="selected.length"
          class="table-action"
      >
        <div class="table-action__buttons">
          <v-button
              variant="danger"
              @click="emit('deleteArray', selected)"
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
          Отмечено: <span>{{ selected.length }} / {{ rows.length }}</span>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import VCheckbox from "@/components/ui/v-checkbox/v-checkbox.vue";
import {computed, ref} from "vue";
import VIcon from "@/components/ui/v-icon/v-icon.vue";
import TableSettingsRow from "@/components/ui/v-table-new/table-settings-row/table-settings-row.vue";
import VButton from "@/components/ui/v-button/v-button.vue";

const emit = defineEmits(['edit', 'copy', 'delete', 'rowClick', 'deleteArray'])
const props = defineProps({
  rows: {
    type: Array,
    required: true
  },
  columns: {
    type: Array,
    required: true,
  }
})

const selected = ref([])

const selectAll = computed({
  get() {
    return selected.value.length === props.rows.length;
  },
  set(value) {
    selected.value = [];

    if (value) {
      props.rows.forEach((select) => {
        selected.value.push(select);
      });
    }
  },
});
const onRowClick = (row) => {
  const idx = selected.value.indexOf(row);
  if (idx !== -1) {
    selected.value.splice(idx, 1)
  } else {
    selected.value.push(row)
  }
  emit('rowClick', row)
}
</script>

<style lang="scss" scoped src="./v-table-new.scss"></style>
