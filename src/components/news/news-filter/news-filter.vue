<template lang="">
	<v-filter-and-search
		:fields="computedFields"
		:fieldsWithValue="fieldsWithValue"
		:checkedFields="checkedFields"
		:filters="filters"
		:search="search"
		:searchPlaceholderProp="'поиск'"
		:filterPlaceholderProp="'Фильтр'"
		:variant="'transparent'"
		@filterTable="filterTable"
		@setSearch="setSearch"
		@clearFilter="clearFilter"
		@toggleAddField="toggleAddField"
		@toggleOption="toggleOption"
		@clearFieldValue="clearFieldValue"
		@saveFilter="saveFilter"
		@selectFilter="selectFilter"
		@setPin="setPin"
		@removeFilter="removeFilter"
		@editFilterName="editFilterName"
		@resetFilter="$emit('selectFilter', filters.filter(filter => filter.selected)[0])"
	/>
</template>
<script>

import { filter } from 'lodash'
import { ref, computed, onMounted } from 'vue'
import VFilterAndSearch from '../../ui/v-filter-and-search/v-filter-and-search.vue'

export default {
	name: 'news-filter',
	emits: ['filterTable', 'clearFilter','selectFilter'],
	components: {
		VFilterAndSearch,
	},
	props: {
		fields: Array
	},
	setup(props, { emit }) {
		const search = ref("")
		const filters = ref([])

		let defaultFields = []

		const computedFields = computed(() => {
			return props.fields.map(field => {
				if (field.checked && field.load) {
					field.load()
					field.computedResult = field.result.map(obj => { return { ...obj, name: obj.UF_NAME || obj.UF_TITLE } })
					// console.log(field.computedResult[0]);
					// console.log(field.value);
					// console.log(field.computedResult[0] === field.value);
				}
				return field
			})
		})

		const checkedFields = computed(() => {
			return props.fields.filter(field => field.checked)
			.sort((a,b) => a.checked - b.checked)
		})

		const fieldsWithValue = computed(() => {
			return checkedFields.value.filter(field => field.value && field.value?.length !== 0 ? true : false)
		})

		const toggleOption = (options, option) => {

			var index = options.value.indexOf(option);

			if (index === -1) {
				options.value.push(option);
			} else {
				options.value.splice(index, 1);
			}
		}

		const toggleAddField = (field) => {
			if (!field.checked) {
				field.checked = Date.now()
			}
			else {
				field.checked = false
				clearFieldValue(field)
			}
		}

		const filterTable = () => {
			emit('filterTable', search, computedFields)
		}

		const clearFilter = () => {
			console.log(defaultFields);
			search.value = ""
			emit('clearFilter', defaultFields)
		}

		const setSearch = (str) => {
			search.value = str
		}

		const clearFieldValue = field =>{
			field.value = field.type === 'multi-select' ? [] : null
		}

		onMounted(() => {
			props.fields.map(field => defaultFields.push({...field}))
		})

		// localStorage.clear()
		// localStorage.setItem('filter1', JSON.stringify({name: 'Фильтр 1', date: Date.now(), selected: false, pinned:false, fields:{name:'ID', value:1}}))
		// localStorage.setItem('filter2', JSON.stringify({name: 'Фильтр 2', date: Date.now(), selected: false, pinned:false, fields:{name:'ID', value:2}}))
		// localStorage.setItem('filter3', JSON.stringify({name: 'Фильтр 3', date: Date.now(), selected: false, pinned:false, fields:{name:'ID', value:3}}))

		const getFilters = () => {
			filters.value = []
			let keys = Object.keys(localStorage)
			let i = keys.length
			while(i--){
				filters.value.push(JSON.parse(localStorage.getItem(keys[i])))
			}
			filters.value = filters.value.sort((a,b) => a.date - b.date)
		}

		getFilters()

		const saveFilter = (name) =>{
			localStorage.setItem(name, JSON.stringify({name: name, date: Date.now(), selected: false, pinned:false, fields:props.fields}))
			getFilters()
		}

		const selectFilter = (filter) => {
			filters.value.map(row => {
				if(row === filter){
					row.selected = true
				}
				else{
					row.selected= false
				}
			})
			emit('selectFilter',filter)
		}

		const setPin = (filter) => {
			if (filter.pinned) {
				filter.pinned = false
				localStorage.setItem(filter.name, JSON.stringify({...filter, selected:false}))
				return
			}
			else {
				filters.value.map(row => {
					if (row === filter) {
						row.pinned = true
					}
					else {
						row.pinned = false
					}
					localStorage.setItem(row.name,  JSON.stringify({...row, selected:false}))
				})
			}
		}

		const editFilterName = (filter) => {
			console.log(filter);
		}

		const removeFilter = (filter) => {
			localStorage.removeItem(filter.name)
			getFilters()
		}


		return {
			computedFields,
			checkedFields,
			fieldsWithValue,
			search,
			filters,
			toggleAddField,
			filterTable,
			clearFilter,
			setSearch,
			toggleOption,
			clearFieldValue,
			saveFilter,
			selectFilter,
			setPin,
			editFilterName,
			removeFilter
		}
	}
}
</script>





<style lang="scss" src="./style.scss" scoped/>
