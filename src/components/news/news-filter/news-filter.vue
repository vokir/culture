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
		:variant="'transparent'"
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

import { ref, computed, onMounted, watch } from 'vue'
import VFilterAndSearch from '../../ui/v-filter-and-search/v-filter-and-search.vue'
import { useNewsStore } from "../../../store/newsStore";
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
	setup(props, { emit }) {
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
			cancelChangingFilter ,
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
