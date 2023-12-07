<template lang="">
  <v-filter-and-search
    :fields="computedFields"
    :fields-with-value="fieldsWithValue"
    :checked-fields="checkedFields"
    :filters="filtersTemp"
    :changing-settings="changingSettings"
    :selected-filter="selectedFilter"
    :search="search"
    :search-placeholder-prop="'поиск'"
    :filter-placeholder-prop="'Фильтр'"
    :custom-fields="false"
    @filter-table="filterTable"
    @set-search="setSearch"
    @reset-fields="resetFields"
    @toggle-add-field="toggleAddField"
    @toggle-option="toggleOption"
    @clear-field-value="(field) => clearFieldValue(field, true)"
    @add-filter="addFilter"
    @save-filters="saveFilters"
    @select-filter="selectFilter"
    @set-pin="setPin"
    @remove-filter="removeFilter"
    @return-filter-fields="returnFilterFields"
    @clear-latest-fields="clearLatestFields"
    @disable-filter="removeAllFieldsOrFilter"
    @change-draggable-list="changeDraggableList"
    @remove-all-fields-or-filter="removeAllFieldsOrFilter"
    @toggle-changing-settings="(bool) => toggleChangingSettings(bool)"
    @reset-field="resetField"
    @adding-filter="addingFilter"
    @return-filters="returnFilters"
    @cancel-changing-filter="cancelChangingFilter"
  />
</template>
<script>
import VFilterAndSearch from '../../ui/v-filter-and-search/v-filter-and-search.vue';
import useFilter from '../../../hooks/useFilter';

export default {
  name: 'DocumentFilter',
  components: {
    VFilterAndSearch
  },
  props: {
    fields: {
      type: Array,
      default: () => []
    }
  },
  emits: ['filterTable', 'resetclearFilter', 'selectFilter', 'updateFields'],
  setup(props, { emit }) {
    const filterUse = useFilter('document', props, emit);

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
      loadFiltersDocument
    } = filterUse;

    loadFiltersDocument();

    return {
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
