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
		@clearLatestFields="clearLatestFields"
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
					if(field.type === 'select' ){
						field.value = field.computedResult.filter(row => row.ID === field.value?.ID)[0]
					}
					else if(field.type === 'multi-select' ){
						let tempValue = JSON.parse(JSON.stringify(field.value)) 
						field.value = []
						tempValue.map(val => {
							let obj
							obj = field.computedResult.find(row => {
								console.log(123)
								// row.ID === val.ID
							})
							// field.value.push(obj)
						})
					}
				}
				return field
			})
		})

		const checkedFields = computed(() => {
			return props.fields.filter(field => field.checked)
			.sort((a,b) => a.checked - b.checked)
		})

		const fieldsWithValue = computed(() => {
			return checkedFields.value.filter(field => {
				if(field.type === 'string' || field.type === 'select' ){
					return field.value ? true : false
				}
				else if(field.type === 'multi-select'){
					return field.value.length ? true : false
				}
				else if(field.type === 'select-options'){
					return field.value?.value ? true : false
				}
				// field.value && field.value?.length !== 0 ? true : false
			})
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
			search.value = ""
			filters.value.map(field => field.selected = false)
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
			getFilters()
		})

		// localStorage.clear()
		// localStorage.setItem('filter1', JSON.stringify({name: 'Фильтр 1', date: Date.now(), selected: false, pinned:false, fields:{name:'ID', value:1}}))
		// localStorage.setItem('filter2', JSON.stringify({name: 'Фильтр 2', date: Date.now(), selected: false, pinned:false, fields:{name:'ID', value:2}}))
		// localStorage.setItem('filter3', JSON.stringify({name: 'Фильтр 3', date: Date.now(), selected: false, pinned:false, fields:{name:'ID', value:3}}))

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

		const getFilters = () => {
			filters.value = []
			let keys = Object.keys(localStorage)
			let i = keys.length
			while(i--){
				let curFilter = JSON.parse(localStorage.getItem(keys[i]))
				if(curFilter.pinned){
					curFilter.selected = true
					selectFilter(curFilter)
				}
				filters.value.push(curFilter)
			}
			filters.value = filters.value.sort((a,b) => a.date - b.date)
		}


		const saveFilter = (name) =>{
			localStorage.setItem(name, JSON.stringify({name: name, date: Date.now(), selected: false, pinned:false, fields:props.fields}))
			getFilters()
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

		const clearLatestFields = () => {
			fieldsWithValue.value.map((field,i) => {
				if(i > 1){
					clearFieldValue(field)
				}
			})
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
			removeFilter,
			clearLatestFields
		}
	}
}
</script>





<style lang="scss" src="./style.scss" scoped/>
