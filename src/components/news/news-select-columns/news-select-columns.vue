<template lang="">
  <v-modal class="modal-select-columns" centered @closeModal="$emit('closeModal')">
    <div class="select-columns__wrapper">
				<div class="select-columns__title">Настройка таблицы «Новости»</div>
				<div class="select-columns__options">
					<div 
							:class="['select-columns__option', {'select-columns__option--checked':column.checked}, {'select-columns__option--editting':column.editting}]"
							@click="toggleColumn(column)" 
							v-for="(column,i) in modelValue">
						<input  class="select-columns__checkbox" type="checkbox" :checked="column.checked"
						 :disabled="column.editting">
						<label v-if="!column.editting" class="select-columns__label" :contenteditable="column.editting" onfocus="">{{column.title}}</label>
						<input v-else class="select-columns__label" type="text" v-model="column.title"/>
						<div :class="['select-columns__edit']" @click.prevent.stop="toggleEditColumn($event,column)">
							<svg  width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path fill-rule="evenodd" clip-rule="evenodd" d="M0.733677 8.65659L0 11.5L2.68831 10.6585C2.52112 10.1998 2.27473 9.78186 1.96234 9.42657C1.61255 9.06908 1.19236 8.80729 0.733677 8.65659ZM6.68119 2.0975L1.42335 7.83162C1.86004 8.06041 2.26483 8.353 2.62672 8.70279C2.92371 9.08008 3.1723 9.50026 3.36369 9.95125L8.61823 4.22043C8.41473 3.72875 8.13754 3.27776 7.79765 2.88617C7.47206 2.54958 7.09367 2.28339 6.67789 2.0997L6.68009 2.0964L6.68119 2.0975ZM9.68739 0.934837C9.4212 0.648846 9.06041 0.491551 8.68642 0.50035C8.31464 0.50915 7.96045 0.681846 7.70525 0.978837L7.38956 1.32313C7.80975 1.51782 8.19474 1.79391 8.52583 2.1371C8.86022 2.51988 9.13081 2.96207 9.331 3.44276L9.64779 3.09737C9.92058 2.82018 10.0768 2.43299 10.0856 2.026C10.0922 1.61902 9.94808 1.22523 9.68519 0.937036H9.68849L9.68739 0.934837Z" fill="#5B6573"/>
						</svg></div>
					</div>
				</div>
				<div class="select-columns__btns">
					<div class="select-columns__return" @click="setDefaultColumns">
						<svg xmlns="http://www.w3.org/2000/svg" width="11" height="10" viewBox="0 0 11 10"><path fill="#5B626A" fill-rule="evenodd" d="M7.334 6.745h-4.34l-.01 2.53-3.26-3.27 3.28-3.28-.01 2.73h4.34c1.07 0 1.935-.866 1.935-1.935 0-1.07-.868-1.935-1.937-1.935h-1.11V.295h1.11c1.78 0 3.225 1.444 3.225 3.225 0 1.78-1.445 3.225-3.226 3.225h.002z"/></svg>
						<span>По умолчанию</span>
					</div>
					<div class="select-columns__main-btns">
						<v-button :variant="'success'" @click="saveColumns">Применить</v-button>
						<v-button :variant="'link'" @click="cancelColumns">Отменить</v-button>
					</div>
					<div class="select-columns__additional-btns">
						<v-button :variant="'underline'" @click="selectAll">Выбрать все</v-button>
						<v-button :variant="'underline'" @click="unselectAll">Отменить все</v-button>
					</div>
				</div>
		</div>
  </v-modal>
</template>

<script>

import { ref, computed, onMounted } from 'vue'
import VModal from '../../ui/v-modal/v-modal.vue';
import VButton from '../../ui/v-button/v-button.vue';

export default {
	name: 'news-select-columns',
	components: { VModal, VButton },
	emits: ['closeModal', 'update:modelValue', 'updateTable'],
	props:{
		modelValue:Array
	},	
	setup({modelValue},{emit}) {

		const columnsBeforeChanges = ref()

		onMounted(()=>{
			columnsBeforeChanges.value = JSON.parse(JSON.stringify(modelValue)) 
		})

		const selectAll = () => {
			modelValue.map(column => column.checked = true)
		}

		const unselectAll = () => {
			modelValue.map(column => column.checked = false)

		}

		const saveColumns = () => {
			modelValue.map(val => val.editting = false)
			emit('update:modelValue', modelValue)		
			emit('closeModal')
			emit('updateTable')
		}

		const cancelColumns = () => {
			emit('update:modelValue', columnsBeforeChanges.value)
			emit('closeModal')
		}

		const toggleColumn = (column) => {
			!column.editting ? column.checked = !column.checked : null
		}

		const toggleEditColumn = (e,column) => {
			column.editting = !column.editting
			setTimeout(function () {
				let edittableEl = e.srcElement.closest('.select-columns__option').querySelector('input.select-columns__label')
				edittableEl?.focus()
			}, 0);
		}

		const setDefaultColumns = () => {
			modelValue.map(val => val.checked = val.default)
			emit('update:modelValue', modelValue)
		}

		return {
			columnsBeforeChanges,
			selectAll,
			unselectAll,
			saveColumns,
			cancelColumns,
			toggleColumn,
			toggleEditColumn,
			setDefaultColumns
		}
	}
}
</script>
<style lang="scss" src="./style.scss" scoped>

</style>
