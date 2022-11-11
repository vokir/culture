import { ref, computed, onMounted, onUpdated, watch } from 'vue'
import { useNewsStore } from "../store/newsStore";

const useFilter = (entity = '', props, emit) => {
  const search = ref("")
	let defaultFields = []
	const filtersTemp = ref([])

	const store = useNewsStore()
	const {
		createFilter,
		deleteFilter,
		updateFilter,
		loadFiltersImage,
		loadFiltersNews,
		loadFiltersIcon
	} = store

	const filterEntity = computed(()=>{
		switch (entity) {
			case "news":
				return store.filtersNews;
				break;
			case "image":
				return store.filtersImage;
				break;
			case "icon":
				return store.filtersIcon;
				break;
			default:
				return [];
				break;
		}
	})

	const computedFields = computed(() => {
		return props.fields.map(field => {
			if (field.checked && field.load) {
				field.load()
				field.computedResult = field.result.map(obj => { return { ...obj, name: obj.UF_NAME || obj.UF_TITLE } })
				if(field.type === 'select' ){
					if(field.computedResult.length){
						field.value = field.value ? field.computedResult.filter(row => row.ID === field.value?.ID)[0] : null
						// field.value = field.computedResult.filter(row => row.ID === field.value?.ID)[0]
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
			else if(field.type === 'select-options'){
					if(field.options.length && field.value){
						let tempValue = JSON.parse(JSON.stringify(field)) 
						field.selectedOption = field.options.find(option => option.name === tempValue.value.name)
					}
				}
			return field
		})
	})

	const checkedFields = computed(() => {
		return props.fields.filter(field => field.checked)
		.sort((a,b) => a.order - b.order)
	})

	const fieldsWithValue = ref([])

	const filters = computed(() => {
		return filterEntity.value.map(filter => {
			let json = JSON.parse(filter.UF_CONTENT)
			let newFilter = {ID:filter.ID, ...json}
			return newFilter

			// if(!newFilter.defaultStatus || newFilter.defaultStatus !== 'hidden'){
			// 	if(json.pinned){
			// 	newFilter.selected = true
			// 	emit('selectFilter',newFilter)
			// }
			// }
		})
		.sort((a,b) => a.order - b.order)
		.filter(filter => filter !== undefined)
	})

	const selectedFilter = ref({})

	const changingSettings = ref(false)


	const toggleOption = (option, options) => {
		let elem = options.value.find(row => row.ID === option.ID)
		var index = options.value.indexOf(elem);
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

	const fieldHasValue = field => {
			if (field.type === 'string' || field.type === 'select') {
					return field.value ? true : false
				}
				else if (field.type === 'multi-select') {
					return field.value.length ? true : false
				}
				else if (field.type === 'select-options') {
					return field.value?.value ? true : false
				}
		}

	const updateFieldsWithValue = (fieldsArg) => {

		// selectedFilter.value.fields.forEach((element,i) => {
		// 	console.log(JSON.stringify(selectedFilter.value.fields[i].value) === JSON.stringify(props.fields[i].value));
		// });
		// console.log(JSON.parse(JSON.stringify(selectedFilter.value.fields)));
		// console.log(JSON.parse(JSON.stringify(props.fields)));

		let curFields = fieldsArg ? fieldsArg : props.fields
		const addAllFieldsWithValue = () => {
			fieldsWithValue.value = []
			curFields.map(field => {

				if (fieldHasValue(field)) {
				fieldsWithValue.value.push(JSON.parse(JSON.stringify(field)))
				// fieldsWithValue.value.push(field)
			}
			})

		}
		if (selectedFilter.value.fields) {
			const selectedFilterValues = selectedFilter.value.fields.map(field => field.value)
			const fieldsValue = curFields.map(field => field.value)
			fieldsWithValue.value = []
			fieldsWithValue.value.push(selectedFilter.value)
			let fieldsWithFilter = []
			let fieldsWithoutFilter = []
			let similarFields = []

			if (selectedFilter.value.fields && JSON.stringify(selectedFilterValues) === JSON.stringify(fieldsValue)) {
				fieldsWithValue.value[0].filter = true
			}
			else {
				curFields.map((propField, i) => {
					const filterField = selectedFilter.value.fields.find(field => field.name === propField.name)

					if (fieldHasValue(propField) || fieldHasValue(filterField)) {
						if (fieldHasValue(filterField)) {
							if(JSON.stringify(propField.value) !== JSON.stringify(filterField.value)){
								fieldsWithoutFilter.push(JSON.parse(JSON.stringify(propField)))
								// fieldsWithoutFilter.push(propField)
							}
							else if(JSON.stringify(propField.value) === JSON.stringify(filterField.value)){
								similarFields.push(JSON.parse(JSON.stringify(propField)))
								// similarFields.push(propField)
							}
						}
						else if (fieldHasValue(propField) && !fieldHasValue(filterField)) {
							fieldsWithFilter.push(JSON.parse(JSON.stringify(propField)))
							// fieldsWithFilter.push(propField)
						}
					}
				})
				if (fieldsWithoutFilter.length) {
					fieldsWithValue.value = []
					fieldsWithoutFilter.map(field => fieldsWithValue.value.push(field))
					similarFields.map(field => fieldsWithValue.value.push(field))
					fieldsWithFilter.map(field => fieldsWithValue.value.push(field))

					// removeAllFieldsOrFilter()
					// fieldsWithValue.value.splice(0, 1)

					unselectAllFilters()			
				}
				else {
					fieldsWithFilter.map(field => fieldsWithValue.value.push(field))
				}

			}
		}
		else{
			addAllFieldsWithValue()
		}

		fieldsWithValue.value = fieldsWithValue.value.filter(field => !field.filter ? fieldHasValue(field): true)
		fieldsWithValue.value
			.map(field =>updateFieldDisplayValue(field))
			.sort((a,b)=> a.order - b.order)
	}

	const updateFieldDisplayValue = field => {
		switch (field.type) {
      case "string":
        field.displayValue = field.label + ": " + field.value;
        break;
      case "select":
        field.displayValue = field.label + ": " + field.value?.name;
        break;
      case "multi-select":
        field.displayValue =
          field.label + ": " + field.value.map((row) => row.name).join(", ");
        break;
      case "select-options":
        field.displayValue = field.label + ": " + field.value?.label;
        break;
      default:
        field.displayValue = "";
        break;
    }
	}

	const defaultFilterFields = ref([])
	const filtersBeforeChanges = ref([])

	const filterTable = () => {
		// filtersTemp.value.map(row => {
		// 	if (row.selected) {
		// 		selectedFilter.value = row
		// 	}
		// })
		updateFieldsWithValue()
		// defaultFilterFields.value =  JSON.parse(JSON.stringify(computedFields.value)) 
		emit('filterTable', search, computedFields)
	}

	const resetFields = () => {
		search.value = ""
		filtersTemp.value.map(field => field.selected = false)
		store.variables = {
			currentPage: store.variables.currentPage,
			perPage: store.variables.perPage,
		}
		let newFields = props.fields;
		newFields.map((field,i) => {
			field.value = JSON.parse(JSON.stringify(defaultFields[i].value)) 
			field.checked = JSON.parse(JSON.stringify(defaultFields[i].checked)) 
		})
		updateFieldsWithValue(newFields)
		emit('updateFields', newFields)
		emit('filterTable','')
	}

	const setSearch = (str) => {
		search.value = str
	}

	const clearFieldValue = (field, shouldUpdate = false) =>{
		switch (field.type) {
			case'string':
				field.value = ''
				break;
				case 'select-options':
				field.value = field.options[0]
				break;
			case 'multi-select':
				field.value = []
				break;
		
			default:
				field.value = null
				break;
		}
		let propField = props.fields.find(propField => propField.name === field.name)
		propField.value = field.value

		shouldUpdate ? updateFieldsWithValue() : null
	}

	const selectFilter = (filter) => {
			filtersTemp.value.map(row => {
				if (row === filter) {
					row.selected = true
					selectedFilter.value = row
					// changingSettings.value ? selectedFilter.value = row : null
				}
				else {
					row.selected = false
				}
			})
			defaultFilterFields.value = JSON.parse(JSON.stringify(filter.fields))
			if (!changingSettings.value) {
				let newFields = props.fields;
				if (filter) {
          newFields.map((field, i) => {
            if (field.type === "string") {
              field.value = filter.fields[i].value
                ? JSON.parse(JSON.stringify(filter.fields[i]?.value))
                : "";
            } else {
              field.value = filter.fields[i].value
                ? JSON.parse(JSON.stringify(filter.fields[i]?.value))
                : null;
            }
            field.checked = filter.fields[i].checked;
            if (field.type === "select-options") {
              field.options = filter.fields[i].options
                ? JSON.parse(JSON.stringify(filter.fields[i].options))
                : null;
            }
          });
        }
				emit('updateFields', newFields)
				updateFieldsWithValue()
				emit('filterTable', search.value)
			}
	}


	watch(filters, value => {
		if (value.length && !filtersTemp.value.length) {
			filtersTemp.value = value;
		}},{ deep: true }
  );

	onMounted(()=>{
		if(filters.value.length){
			filtersTemp.value = JSON.parse(JSON.stringify(filters.value))
		}
	})

	

	let filterTempIsEmpty = true
	// onResultFiltersImage(()=>{
	// 	if(filterTempIsEmpty){
	// 		filterTempIsEmpty = false
	// 		filtersTemp.value = filters.value
	// 	}
	// })

	let newFilter = ref({})

	const addFilter = (name) =>{
		changingSettings.value = false
		newFilter.value = {name, date: Date.now(), selected: false, pinned:false, fields:JSON.parse(JSON.stringify(props.fields)) , order:filtersTemp.value.length, newName:name}
		// newFilter.value = {defaultStatus: true, defaultFields: JSON.parse(JSON.stringify(props.fields)), defaultName: name, name, date: Date.now(), selected: false, pinned:false, fields:JSON.parse(JSON.stringify(props.fields)) , order:filtersTemp.value.length, newName:name}
		filtersTemp.value.push(newFilter.value)
		createFilter(({content: JSON.stringify(newFilter.value), entity:entity}))
		store.refetchFiltersNews()
		newFilter.value = {}
	}

	const saveFilters = () =>{
		toggleChangingSettings(false)
		filtersTemp.value.map(filter => {
			filter.fields = JSON.parse(JSON.stringify(filter.fields))
			// filter.fields = filter?.fields ? JSON.parse(JSON.stringify(filter.fields)) : null

			if(filter.name !== filter.newName){
				filter.name = filter.newName
			}
		delete filter.editting
		updateFilter({id:filter.ID, content:JSON.stringify({...filter, selected:false}), entity:entity })
		})
		store.refetchFiltersNews()
		selectedFilter.value.filter ? defaultFilterFields.value = JSON.parse(JSON.stringify(selectedFilter.value.fields)) : null
	}

	const setPin = (filter) => {
		if (filter.pinned) {
			filter.pinned = false
			updateFilter({id:filter.ID, content:JSON.stringify({...filter, selected:false})})
		}
		else {
			filtersTemp.value.map(row => {
				row === filter ? row.pinned = true : row.pinned = false
				updateFilter({id:row.ID, content:JSON.stringify({...row, selected:false}), entity:entity})
			})
		}
	}

	const removeFilter = (id) => {
		let exactFilter = filtersTemp.value.find(filter => filter.ID === id)
		let exactFilterBeforeChanges = filtersBeforeChanges.value.find(filter => filter.ID === id)
		filtersTemp.value.map(filter => {
			filter.fields = JSON.parse(JSON.stringify(filter.fields))
		})
		clearAllFields()
		filtersTemp.value.splice(filtersTemp.value.indexOf(exactFilter),1)
		filtersBeforeChanges.value.splice(filtersBeforeChanges.value.indexOf(exactFilterBeforeChanges),1)
		exactFilter.defaultStatus 
			? updateFilter({id:exactFilter.ID, content:JSON.stringify({...exactFilter, selected:false, pinned:false, defaultStatus: 'hidden'}), entity:entity }) 
			: deleteFilter({id})
		store.refetchFiltersNews()
	}

	const clearLatestFields = () => {
		fieldsWithValue.value.map((field,i) => {
			if(i > 1){
				clearFieldValue(field)
			}
		})
		updateFieldsWithValue()
	}

	const changeDraggableList = (list, newList) => {
		if(list === 'filters'){
			filtersTemp.value = newList
		}
		else if(list === 'checkedFields'){
			newList.map((newField,newOrder) => {
				props.fields.find(oldField => {
					if(newField.name === oldField.name){
						oldField.order = newOrder
					}
				})
			})
		}
	}

	watch(computedFields, val => {
		const everyLoadHasComputedResult = val.every(field => {
			let typesToCheck = ['select', 'multi-select']
			if(typesToCheck.includes(field.type)){
				return field.computedResult.length ? true : false
			}
			return true
		})
		if(!defaultFields.length && everyLoadHasComputedResult){
			val.map(field => {
			defaultFields.push(JSON.parse(JSON.stringify(field)))
		})
		}
	})

	const clearAllFields = () => {
		props.fields.map(field => clearFieldValue(field))
		search.value = ""
		updateFieldsWithValue()
	}

	const toggleChangingSettings = (bool) => {
		!changingSettings.value ? filtersBeforeChanges.value = JSON.parse(JSON.stringify(filtersTemp.value)) : null
		changingSettings.value = bool !== undefined ? bool : !changingSettings.value
	}

	watch([selectedFilter, changingSettings], ([newSelectedFilter, newChangingSettings], [oldSelectedFilter,oldChangingSettings]) => {
		let filterToLink = filtersTemp.value.find(filter => filter?.selected)
		let filterToUnlink = filtersTemp.value.find(filter => filter?.ID === oldSelectedFilter?.ID)

		if (newSelectedFilter !== oldSelectedFilter && oldSelectedFilter && changingSettings.value  && filterToUnlink) {
			filterToUnlink.fields = JSON.parse(JSON.stringify(filterToUnlink.fields))
			emit('updateFields', filterToLink.fields)
		}

		else if (changingSettings.value && filterToLink && filterToLink === filterToUnlink) {
			filterToLink.fields = props.fields
		}
		else if(newChangingSettings === false && newChangingSettings !== oldChangingSettings){
			filtersTemp.value.map(filter => {
			filter.fields = JSON.parse(JSON.stringify(filter.fields))
		})
		}
		else if(changingSettings.value && filterToLink && !filterToUnlink){
			emit('updateFields', filterToLink.fields)
		}
	})

	const resetField = (field) => {
		switch (field.type) {
			case 'string':
				field.value = ''
				break;
			case 'select':
				field.value = null
				break;
			case 'multi-select':
				field.value = []
				break;
			default:
				break;
		}
	}

	const addingFilter = () => {
		newFilter.value = {
			fields: props.fields
		}
		filtersTemp.value.map(filter => filter.selected = false)
	}

	const returnFilterFields = () => {
		if(defaultFilterFields.value.length){
			emit('updateFields', JSON.parse(JSON.stringify(defaultFilterFields.value)) )
		}
		else{

		}
		// emit('selectFilter', filters.filter(filter => filter.selected)[0])
	}

	const returnFilters = () => {

		filtersTemp.value.map(filter => {
			if (filter.defaultStatus) {
				filter.fields = JSON.parse(JSON.stringify(filter.defaultFields))
				filter.name = JSON.parse(JSON.stringify(filter.defaultName))
				filter.defaultStatus = true
				// filtersTemp.value.find(filterTemp => filterTemp.ID === filter.ID) = filter
				updateFilter({ id: filter.ID, content: JSON.stringify({ ...filter, selected: false, pinned: false, defaultStatus: true }), entity:entity  })
			}
		})
		
		let selFilter = filtersTemp.value.find(filter => filter.selected) 
		selFilter ? emit('updateFields',JSON.parse(JSON.stringify(selFilter.fields))) : null
		toggleChangingSettings(false)
	}

	const removeAllFieldsOrFilter = () => {
		let pinnedFilter = filtersTemp.value.find(filter => filter.pinned)
		if (!selectedFilter.value.pinned && pinnedFilter) {
			if (fieldsWithValue.value.length > 1 && Object.keys(selectedFilter.value).length) {
				fieldsWithValue.value.splice(0, 1)
				const fieldsWithoutFilter = props.fields.map(field => {
					const curField = JSON.parse(JSON.stringify(selectedFilter.value.fields.find(filterField => field.name === filterField.name)))
					if (fieldHasValue(curField)) {
						clearFieldValue(curField)
						return curField
					}
					return field
				})
				emit('updateFields', JSON.parse(JSON.stringify(fieldsWithoutFilter)))
				unselectAllFilters()
				updateFieldsWithValue(fieldsWithoutFilter)
			}
			else {
				selectFilter(pinnedFilter)
			}
		}
		else {
			unselectAllFilters()
			emit('updateFields', JSON.parse(JSON.stringify(defaultFields)))
			clearAllFields()
			filterTable()
		}
	}

	const unselectAllFilters = () => {
		selectedFilter.value = {}
		filtersTemp.value.map(filter => filter.selected = false)
	}

	const cancelChangingFilter = () => {
		filtersTemp.value = JSON.parse(JSON.stringify(filtersBeforeChanges.value)) 
	}

	return {
		filterEntity,
		computedFields,
		checkedFields,
		fieldsWithValue,
		search,
		filters,
		store,
		filtersTemp,
		defaultFields,
		selectedFilter,
		newFilter,
		defaultFilterFields,
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
		cancelChangingFilter,
		loadFiltersImage,
		loadFiltersNews,
		loadFiltersIcon
	}


}

export default useFilter
	
	