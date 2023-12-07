<template>
  <v-filter-and-search
    :changing-settings="changingSettings"
    :checked-fields="checkedFields"
    :fields="computedFields"
    :fields-with-value="fieldsWithValue"
    :filter-placeholder-prop="'Фильтр'"
    :filters="filtersTemp"
    :search="search"
    :search-placeholder-prop="'поиск'"
    :selected-filter="selectedFilter"
    :variant="'transparent'"
    @add-filter="addFilter"
    @adding-filter="addingFilter"
    @cancel-changing-filter="cancelChangingFilter"
    @change-draggable-list="changeDraggableList"
    @clear-field-value="(field) => clearFieldValue(field, true)"
    @clear-latest-fields="clearLatestFields"
    @disable-filter="removeAllFieldsOrFilter"
    @filter-table="filterTable"
    @remove-all-fields-or-filter="removeAllFieldsOrFilter"
    @remove-filter="removeFilter"
    @reset-field="resetField"
    @reset-fields="resetFields"
    @return-filter-fields="returnFilterFields"
    @return-filters="returnFilters"
    @save-filters="saveFilters"
    @select-filter="selectFilter"
    @set-pin="setPin"
    @set-search="setSearch"
    @toggle-add-field="toggleAddField"
    @toggle-changing-settings="(bool) => toggleChangingSettings(bool)"
    @toggle-option="toggleOption"
  />
</template>
<script>
import VFilterAndSearch from '../../ui/v-filter-and-search/v-filter-and-search.vue';
import useFilter from '../../../hooks/useFilter';

export default {
  name: 'NewsFilter',
  components: {
    VFilterAndSearch
  },
  props: {
    fields: {
      type: Array,
      default: () => []
    }
  },
  emits: ['filterTable', 'updateFields'],
  setup(props, { emit }) {
    const filterUse = useFilter('news', props, emit);

    const {
      filterEntity,
      store,
      computedFields,
      fieldsWithValue,
      checkedFields,
      filtersTemp,
      changingSettings,
      selectedFilter,
      search,
      filters,
      defaultFilterFields,
      filterTable,
      setSearch,
      resetFields,
      toggleAddField,
      toggleOption,
      clearFieldValue,
      addFilter,
      saveFilters,
      selectFilter,
      setPin,
      removeFilter,
      returnFilterFields,
      clearLatestFields,
      clearAllFields,
      removeAllFieldsOrFilter,
      changeDraggableList,
      toggleChangingSettings,
      resetField,
      addingFilter,
      returnFilters,
      cancelChangingFilter,
      loadFiltersNews,
      defaultFields
    } = filterUse;

    loadFiltersNews();
    return {
      defaultFields,
      filterEntity,
      store,
      computedFields,
      checkedFields,
      fieldsWithValue,
      search,
      filters,
      filtersTemp,
      selectedFilter,
      changingSettings,
      defaultFilterFields,
      toggleAddField,
      filterTable,
      resetFields,
      setSearch,
      toggleOption,
      clearFieldValue,
      addFilter,
      saveFilters,
      selectFilter,
      setPin,
      removeFilter,
      clearLatestFields,
      changeDraggableList,
      clearAllFields,
      toggleChangingSettings,
      resetField,
      addingFilter,
      returnFilterFields,
      returnFilters,
      removeAllFieldsOrFilter,
      cancelChangingFilter
    };
  }
};
</script>

<style lang="scss" scoped src="./style.scss" />
