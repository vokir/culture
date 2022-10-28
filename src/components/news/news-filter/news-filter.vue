<template lang="">
	<v-filter-and-search
		:fields="computedFields"
		:fieldsWithValue="fieldsWithValue"
		:checkedFields="checkedFields"
		:filters="filtersTemp"
		:search="search"
		:searchPlaceholderProp="'поиск'"
		:filterPlaceholderProp="'Фильтр'"
		:variant="'transparent'"
		@filterTable="filterTable"
		@setSearch="setSearch"
		@resetclearFilter="resetclearFilter"
		@toggleAddField="toggleAddField"
		@toggleOption="toggleOption"
		@clearFieldValue="clearFieldValue"
		@addFilter="addFilter"
		@saveFilter="saveFilter"
		@selectFilter="selectFilter"
		@setPin="setPin"
		@removeFilter="removeFilter"
		@resetFilter="$emit('selectFilter', filters.filter(filter => filter.selected)[0])"
		@clearLatestFields="clearLatestFields"
		@disableFilter="disableFilter"
	/>
</template>
<script>

import { filter } from 'lodash'
import { ref, computed, onMounted, watch } from 'vue'
import VFilterAndSearch from '../../ui/v-filter-and-search/v-filter-and-search.vue'
import { useNewsStore } from "../../../store/newsStore";


export default {
	name: 'news-filter',
	emits: ['filterTable', 'resetclearFilter','selectFilter'],
	components: {
		VFilterAndSearch,
	},
	props: {
		fields: Array
	},
	setup(props, { emit }) {
		const search = ref("")
		let defaultFields = []
		const filtersTemp = ref([])

		const store = useNewsStore()
    const {
      createFilter,
			deleteFilter,
			updateFilter,
			onResultFilters
    } = store

		const computedFields = computed(() => {
			return props.fields.map(field => {
				if (field.checked && field.load) {
					field.load()
					field.computedResult = field.result.map(obj => { return { ...obj, name: obj.UF_NAME || obj.UF_TITLE } })
					if(field.type === 'select' ){
						if(field.computedResult.length){
							field.value = field.computedResult.filter(row => row.ID === field.value?.ID)[0]
						}
					}
					else if(field.type === 'multi-select'){
						if(field.computedResult.length && field.value.length){
							let tempValue = JSON.parse(JSON.stringify(field.value)) 
							field.value = []
							tempValue.map(val => {
							let obj
							obj = field.computedResult.find(row => {
								return row.ID === val.ID
							})
							field.value.push(obj)
						})
						}

					}
				}
				return field
			})
		})

		const checkedFields = computed(() => {
			return props.fields.filter(field => field.checked)
			.sort((a,b) => a.order - b.order)
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

		const filters = computed(() => {
			return store.filters.map(filter => {
				let json = JSON.parse(filter.UF_CONTENT)
				let newFilter = {ID:filter.ID, ...json}
				if(json.pinned){
					newFilter.selected = true
					emit('selectFilter',newFilter)
				}
				return newFilter
			})
			.sort((a,b) => a.order - b.order)
		})

		const toggleOption = (option, options) => {
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
				field.order = checkedFields.value.length - 1
			}
			else {
				field.checked = false
				clearFieldValue(field)
			}
		}

		const filterTable = () => {
			emit('filterTable', search, computedFields)
		}

		const resetclearFilter = () => {
			search.value = ""
			filtersTemp.value.map(field => field.selected = false)
			emit('resetclearFilter', defaultFields)
		}

		const setSearch = (str) => {
			search.value = str
		}

		const clearFieldValue = field =>{
			field.value = field.type === 'multi-select' ? [] : null
		}

		const selectFilter = (filter) => {
			filtersTemp.value.map(row => {
				if (row === filter) {
					row.selected = true
				}
				else {
					row.selected = false
				}
			})
			emit('selectFilter', filter)
		}

		onResultFilters(()=>{
			filtersTemp.value = filters.value
		})

		const addFilter = (name) =>{
			filtersTemp.value.push({name, order:filtersTemp.value.length})
			createFilter(({content: JSON.stringify({name, date: Date.now(), selected: false, pinned:false, fields:props.fields, order:filtersTemp.value.length})}))
			store.refetchFilters()
		}

		const saveFilter = () =>{
			filters.value.map(filter => {
				if(filter.name !== filter.newName){
					localStorage.removeItem(filter.name)
					filter.name = filter.newName
					delete filter.newName
				}
			delete filter.editting
			localStorage.setItem(filter.name, JSON.stringify({...filter, selected:false}))
			})
			store.refetchFilters()
		}

		const setPin = (filter) => {
			console.log(filter);
			if (filter.pinned) {
				filter.pinned = false
				updateFilter({id:filter.ID, content:JSON.stringify({...filter, id:undefined, selected:false})})
			}
			else {
				filtersTemp.value.map(row => {
					row === filter ? row.pinned = true : row.pinned = false
					updateFilter({id:row.ID, content:JSON.stringify({...row, id:undefined, selected:row.pinned})})
				})
			}
		}

		const removeFilter = (id) => {
			filtersTemp.value.splice(filtersTemp.value.indexOf(filtersTemp.value.find(filter => filter.id === id)),1)
			deleteFilter({id})
			store.refetchFilters()
		}

		const clearLatestFields = () => {
			fieldsWithValue.value.map((field,i) => {
				if(i > 1){
					clearFieldValue(field)
				}
			})
		}

		const disableFilter = (filter) =>{
			filter.selected = false
		}

		watch(props.fields, val => {
			if(!defaultFields.length){
				val.map(field => {
				defaultFields.push(JSON.parse(JSON.stringify(field)))
			})
			}
		})

		return {
			computedFields,
			checkedFields,
			fieldsWithValue,
			search,
			filters,
			store,
			filtersTemp,
			defaultFields,
			toggleAddField,
			filterTable,
			resetclearFilter,
			setSearch,
			toggleOption,
			clearFieldValue,
			addFilter,
			saveFilter,
			selectFilter,
			setPin,
			removeFilter,
			clearLatestFields,
			disableFilter,
		}
	}
}
</script>





<style lang="scss" src="./style.scss" scoped/>
