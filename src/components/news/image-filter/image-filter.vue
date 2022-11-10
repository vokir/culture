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
		@filterTable="filterTable"
		@setSearch="setSearch"
		@resetclearFilter="resetclearFilter"
		@toggleAddField="toggleAddField"
		@toggleOption="toggleOption"
		@clearFieldValue="field => clearFieldValue(field,true)"
		@addFilter="addFilter"
		@saveFilters="saveFilters"
		@selectFilter="selectFilter"
		@setPin="setPin"
		@removeFilter="removeFilter"
		@resetFilter="resetFilter"
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

import { ref, computed, onMounted, watch } from 'vue'
import VFilterAndSearch from '../../ui/v-filter-and-search/v-filter-and-search.vue'
import useFilter from '../../../hooks/useFilter'



export default {
	name: 'image-filter',
	emits: ['filterTable', 'resetclearFilter','selectFilter', 'updateFields'],
	components: {
		VFilterAndSearch,
	},
	props: {
		fields: Array
	},
	setup(props, { emit }) {
		const filterUse = useFilter('image',props, emit)
		
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
			resetclearFilter,
			toggleAddField,
			toggleOption,
			clearFieldValue,
			addFilter,
			saveFilters,
			selectFilter,
			setPin,
			removeFilter,
			resetFilter,
			clearLatestFields,
			clearAllFields,
			removeAllFieldsOrFilter,
			changeDraggableList,
			toggleChangingSettings,
			resetField,
			addingFilter,
			returnFilters,
			cancelChangingFilter,
			loadFiltersImage,
		} = filterUse

		loadFiltersImage()

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
			resetclearFilter,
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
			resetFilter,
			returnFilters,
			removeAllFieldsOrFilter,
			cancelChangingFilter
		}
	}
}
</script>





<style lang="scss" src="./style.scss" scoped/>
