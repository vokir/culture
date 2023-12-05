<template lang="">
	<v-filter-and-search
		:fields="computedFields"
		:fieldsWithValue="fieldsWithValue"
		:checkedFields="checkedFields"
		:filters="filtersTemp"
		:changingSettings="changingSettings"
		:selectedFilter = "selectedFilter"
		:search="search"
		:searchPlaceholderProp="'поиск'"
		:filterPlaceholderProp="'Фильтр'"
		:customFields="false"
		@filterTable="filterTable"
		@setSearch="setSearch"
		@resetFields="resetFields"
		@toggleAddField="toggleAddField"
		@toggleOption="toggleOption"
		@clearFieldValue="field => clearFieldValue(field,true)"
		@addFilter="addFilter"
		@saveFilters="saveFilters"
		@selectFilter="selectFilter"
		@setPin="setPin"
		@removeFilter="removeFilter"
		@returnFilterFields="returnFilterFields"
		@clearLatestFields="clearLatestFields"
		@disableFilter="removeAllFieldsOrFilter"
		@changeDraggableList="changeDraggableList"
		@removeAllFieldsOrFilter="removeAllFieldsOrFilter"
		@toggleChangingSettings="bool => toggleChangingSettings(bool)"
		@resetField="resetField"
		@addingFilter ="addingFilter"
		@returnFilters="returnFilters"
		@cancelChangingFilter="cancelChangingFilter"
	/>
</template>
<script>

import VFilterAndSearch from '../../ui/v-filter-and-search/v-filter-and-search.vue'
import useFilter from '../../../hooks/useFilter'

export default {
	name: 'document-filter',
	emits: ['filterTable', 'resetclearFilter','selectFilter', 'updateFields'],
	components: {
		VFilterAndSearch,
	},
	props: {
		fields: Array
	},
	setup(props, { emit }) {
		const filterUse = useFilter('document',props, emit)
		
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
			loadFiltersDocument,
		} = filterUse

		loadFiltersDocument()

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
		}
	}
}
</script>

<style lang="scss" src="./style.scss" scoped/>
