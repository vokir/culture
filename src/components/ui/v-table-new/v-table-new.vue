<template>
  <div :class="['table-container', { 'table-container--action': selected.length }]">
    <v-loader v-if="loading" />

    <div v-else class="table-wrapper">
      <table class="table">
        <thead class="table__thead">
          <tr class="table__thead-tr">
            <th v-if="!disableSelect" class="table__thead-th table__thead-th-check">
              <div class="table__thead-cell">
                <v-checkbox v-model="selectAll" />
              </div>
            </th>
            <th v-if="!disableSettings" class="table__thead-th table__thead-th-settings">
              <div class="table__thead-cell">
                <table-select-columns v-model="localColumns" />
              </div>
            </th>
            <th v-for="(col, i) of renderedColumns" :key="i" class="table__thead-th">
              <div class="table__thead-cell">
                <slot name="tableHeader" v-bind="col" />
              </div>
            </th>
          </tr>
        </thead>
        <tbody class="table__tbody">
          <tr
            v-for="(row, i) of rows"
            :key="i"
            :class="['table__tbody-tr', { 'table__tbody-tr--selected': selected.includes(row) }]"
            @click="onRowClick(row)"
          >
            <td v-if="!disableSelect" class="table__tbody-td">
              <div class="table__thead-cell" @click="cellClick">
                <v-checkbox v-model="selected" :value="row" />
              </div>
            </td>
            <td v-if="!disableSettings" class="table__tbody-td">
              <div class="table__thead-cell" @click="cellClick">
                <table-settings-row
                  @copy="emit('copy', row)"
                  @delete="emit('delete', row)"
                  @edit="emit('edit', row)"
                />
              </div>
            </td>
            <td v-for="(col, k) of renderedColumns" :key="k" class="table__tbody-td">
              <div class="table__thead-cell" @click="cellClick">
                <slot name="tableRow" v-bind="{ row, col, selected }" />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <transition v-if="!disableSelect" name="slide-up">
      <div v-if="selected.length" class="table-action">
        <div class="table-action__buttons">
          <v-button variant="danger" @click="deleteArray"> Удалить</v-button>
          <v-button variant="link" @click="selected = []"> Отмена</v-button>
        </div>
        <div class="table-action__selected">
          Отмечено: <span>{{ selected.length }} / {{ rows.length }}</span>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import VCheckbox from '@/components/ui/v-checkbox/v-checkbox.vue';
import { computed, ref, watch, watchEffect } from 'vue';
import TableSettingsRow from '@/components/ui/v-table-new/table-settings-row/table-settings-row.vue';
import VButton from '@/components/ui/v-button/v-button.vue';
import VLoader from '@/components/ui/v-loader/v-loader.vue';
import TableSelectColumns from '@/components/ui/v-table-new/table-select-columns/table-select-columns.vue';

const emit = defineEmits(['edit', 'copy', 'delete', 'rowClick', 'onArrayDelete', 'update:columns']);
const props = defineProps({
  rows: {
    type: Array,
    required: true
  },
  columns: {
    type: Array,
    required: true
  },
  loading: {
    type: Boolean,
    default: false
  },
  initialSelect: {
    type: Array,
    default: () => []
  },
  disableSettings: {
    type: Boolean,
    default: false
  },
  disableSelect: {
    type: Boolean,
    default: false
  },
  preventCellClick: {
    type: Boolean,
    default: false
  }
});

const localColumns = ref(props.columns);
const selected = ref([...props.initialSelect]);

watchEffect(() => {
  localColumns.value = props.columns;
});

const renderedColumns = computed(() => localColumns.value.filter((el) => el.checked));

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
  }
});
watch(props.rows, () => {
  selected.value = [];
});

const cellClick = (e) => {
  if (props.preventCellClick) {
    e.stopPropagation();
  }
};
const deleteArray = () => {
  emit('onArrayDelete', selected.value);
  selected.value = [];
};

const onRowClick = (row) => {
  const idx = selected.value.indexOf(row);
  if (idx !== -1) {
    selected.value.splice(idx, 1);
  } else {
    selected.value.push(row);
  }
  emit('rowClick', row);
};
</script>

<style lang="scss" scoped src="./v-table-new.scss"></style>
