<template lang="">
	<div class="select-options-wrapper">
		<div v-if="labelSelect" class="select-options-wrapper__label">
				{{ labelSelect }}
		</div>
		<div class="select-options-wrapper__items">
			<div class="select-options-wrapper__select">
				<v-select
				v-model="selectedValue"
				name="dateOptions"
				:options="options"
				label="label"
				@toggleOption="updateModelValue"
				/>
			</div>
			<div class="select-options-wrapper__optional" v-for="cell in selectedValue.cells" >
				<input class="select-options-wrapper__input" v-if="cell.type === 'number'" v-model="cell.value" @input="updateModelValue" type="number"/>
					<v-select
						v-else-if="cell.type === 'select'"
						:options="cell.options"
						label="label"
						v-model="cell.value"
						@toggleOption="updateModelValue"
					/>
					<input class="select-options-wrapper__input" v-if="cell.type === 'date'" @input="updateModelValue" v-model="cell.value" type="date"/>
			</div>
		</div>
	</div>
</template>
<script>
import { ref, computed, watch } from "vue";
import dayjs from 'dayjs'
import VSelect from '../v-select/v-select.vue'

export default {
	name: "v-select-options",
	components: { VSelect },
	emits: ["update:modelValue"],
	props: {
		labelSelect: String,
		modelValue: {
			type: null,
			default: () => ([]),
		},
		options: {
			type:Array,
			required: true,
			default: () => ([]),
		}
	},
	setup(props, { emit }) {

		const selectedValue = ref(props.options[0]);
		emit('update:modelValue', selectedValue.value)

		// const selectedValueComputed = computed(()=>{
		// 	let value
		// 	if(selectedValue.value.cells.length){
		// 		value = selectedValue.value.cells.map(obj => obj.value)
		// 	}
		// 	else{
		// 		value = selectedValue.value
		// 	}
		// 	// console.log(value);
		// 	emit('update:modelValue', value)
		// 	return value
		// })

		const setN = n => {
			// selectedValue.value.value = n.target.value
			// emit('update:modelValue', n.target.value)
		}

		const updateModelValue = () => {
			let newModelValue = {name:selectedValue.value.name, label:null, value:null}
			let type = selectedValue.value.type
			let template = selectedValue.value.template
			let cells = selectedValue.value.cells
			let newLabel
			const setModelValueByTemplate = () => {
				if (type === 'date') {
					cells.map((cell, ind) => {
						let regex = new RegExp(`var${ind}`, 'g')
						template = template.replace(regex, cell.value.label)
					})
				}
				else {
					cells.map((cell, ind) => {
						let regex = new RegExp(`var${ind}`, 'g')
						template = template.replace(regex, cell.value)
					})
				}

				newModelValue.label = template
				if(cells.length === 1){
					newModelValue.value = (cells[0].value).toString()
				}
				else{
					//если месяц и квартал то value = label (исправить)
					console.log(123);
					newModelValue.value = template
				}
			}

			if(cells.every(cell => cell.value) && template){
				if (type === 'range') {
					if (cells.every(cell => cell.value)) {
						setModelValueByTemplate()
					}
					else if (cells[0].value) {
						newModelValue.label = '> ' + cells[0].value
						newModelValue.value = cells[0].value
					}
					else if (cells[1].value) {
						newModelValue.label = cells[1].value + ' <'
						newModelValue.value = cells[1].value
					}
				}
				else{
					setModelValueByTemplate()
				}
			}
			else{
				if (type === 'range') {
					if (cells[0].value) {
						newModelValue.label = '> ' + cells[0].value
						newModelValue.value = cells[0].value
					}
					else if (cells[1].value) {
						newModelValue.label = cells[1].value + ' <'
						newModelValue.value = cells[1].value
					}
				}
				else{
					if (cells.length) {
						if(cells.some(cell => cell.value)){
							if(type === 'date'){
								newModelValue.label = cells.map(cell => cell.value?.label).join(' ')
								newModelValue.value = cells.map(cell => cell.value?.value).join(' ')
							}
							else{
								newModelValue.value = cells.map(cell => cell.value).join(' ')
								newModelValue.label = cells.map(cell => cell.value).join(' ')
							}
						}
					}
					else {
						newModelValue = selectedValue.value
					}
				}
			}


			emit('update:modelValue', newModelValue)

		}

		updateModelValue()

		// watch(() => props.modelValue, val => {
		// 	selectedValue.value = val
		// })

		return {
			selectedValue,
			// selectedValueComputed,
			setN,
			updateModelValue
		}
	}
}
</script>















<style lang="scss" src="./style.scss" scoped/>
