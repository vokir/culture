<template lang="">
	<div class="select-options-wrapper">
		<div v-if="labelSelect" class="select-options-wrapper__label">
				{{ labelSelect }}
		</div>
		<div class="select-options-wrapper__items">
			<div class="select-options-wrapper__select">
				<v-select
				v-model="selectedOption"
				name="dateOptions"
				:options="options"
				label="label"
				@toggleOption="updateModelValue"
				/>
			</div>
			<div class="select-options-wrapper__optional" v-for="cell in selectedOption.cells" >
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
import { ref, computed, watch, onMounted } from "vue";
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
		},
		selectedOption: {
			type:Object,
			required: false,
			default: () => ({}),
		}
	},
	setup(props, { emit }) {

		const updateModelValue = () => {
			let selectedValue = props.selectedOption
			let newModelValue = {name:selectedValue.name, label:null, value:null}
			let type = selectedValue.type
			let template = selectedValue.template
			let cells = selectedValue.cells
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
			}

			if(selectedValue.name !== 'any'){
				if(cells.every(cell => cell.value) && template){
				setModelValueByTemplate()
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
						newModelValue = selectedValue
					}
			}
			}

			emit('update:modelValue', newModelValue)
		}

		return {
			updateModelValue
		}
	}
}
</script>

<style lang="scss" src="./style.scss" scoped/>
