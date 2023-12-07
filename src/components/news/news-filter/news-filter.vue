<template>
  <v-filter-and-search
      :changingSettings="changingSettings"
      :checkedFields="checkedFields"
      :fields="computedFields"
      :fieldsWithValue="fieldsWithValue"
      :filterPlaceholderProp="'Фильтр'"
      :filters="filtersTemp"
      :search="search"
      :searchPlaceholderProp="'поиск'"
      :selectedFilter="selectedFilter"
      :variant="'transparent'"
      @addFilter="addFilter"
      @addingFilter="addingFilter"
      @cancelChangingFilter="cancelChangingFilter"
      @changeDraggableList="changeDraggableList"
      @clearFieldValue="field => clearFieldValue(field,true)"
      @clearLatestFields="clearLatestFields"
      @disableFilter="removeAllFieldsOrFilter"
      @filterTable="filterTable"
      @removeAllFieldsOrFilter="removeAllFieldsOrFilter"
      @removeFilter="removeFilter"
      @resetField="resetField"
      @resetFields="resetFields"
      @returnFilterFields="returnFilterFields"
      @returnFilters="returnFilters"
      @saveFilters="saveFilters"
      @selectFilter="selectFilter"
      @setPin="setPin"
      @setSearch="setSearch"
      @toggleAddField="toggleAddField"
      @toggleChangingSettings="bool => toggleChangingSettings(bool)"
      @toggleOption="toggleOption"
  />
</template>
<script>

import VFilterAndSearch from '../../ui/v-filter-and-search/v-filter-and-search.vue'
import useFilter from '../../../hooks/useFilter'


export default {
  name: 'news-filter',
  emits: ['filterTable', 'updateFields'],
  components: {
    VFilterAndSearch,
  },
  props: {
    fields: Array
  },
  setup(props, {emit}) {
    const filterUse = useFilter('news', props, emit)

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
    } = filterUse

    loadFiltersNews()
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
    }
  }
}
</script>


<style lang="scss" scoped src="./style.scss"/>
