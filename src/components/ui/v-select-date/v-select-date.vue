<template>
<div class="select-date-wrapper">
	<div v-if="labelSelect" class="select-date-wrapper__label">
      {{ labelSelect }}
  </div>
	<div class="select-date-wrapper__items">
		<div class="select-date-wrapper__select">
			<v-select
				v-model="selectedValue"
				name="dateOptions"
				:options="options"
				label="label"
			/>
		</div>
		<div v-if="selectedValue?.name?.includes('Ndays')" class="select-date-wrapper__optional">
			<input  class="select-date-wrapper__input" @input="setN($event)" type="number"/>
		</div>
		<template v-if="selectedValue?.name === 'month' || selectedValue?.name === 'quarter' || selectedValue?.name === 'year'">
			<div class="select-date-wrapper__optional" v-if="selectedValue?.name === 'month'">
				<v-select
					v-model="monthSelected"
					name="month"
					:options="monthsOptions"
					label="label"
				/>
			</div>
			<div class="select-date-wrapper__optional" v-if="selectedValue?.name === 'quarter'">
				<v-select
					v-model="quarterSelected"
					name="quarter"
					:options="quartersOptions"
					label="label"
				/>
			</div>
			<div class="select-date-wrapper__optional">
				<v-select
					v-model="yearSelected"
					name="year"
					:options="yearsOptions"
					label="label"
				/>
			</div>
		</template>
		<div v-if="selectedValue?.name === 'exactDate'" class="select-date-wrapper__optional">
			<input  class="select-date-wrapper__input" v-model="daySelected" type="date"/>
		</div>
		<template v-if="selectedValue?.name === 'range'">
			<div class="select-date-wrapper__optional">
				<input class="select-date-wrapper__input" v-model="startDate" type="date"/>
			</div>
			<span class="big-line"></span>
			<div class="select-date-wrapper__optional">
				<input class="select-date-wrapper__input" v-model="endDate" type="date"/>
			</div>
		</template>

	</div>
</div>
</template>

<script>
import { ref, computed, watch } from "vue";
import dayjs from 'dayjs'
import VSelect from '../v-select/v-select.vue'

export default {
  name: "v-select-date",
	components: { VSelect },
  emits: ["update:modelValue"],
  inheritAttrs: false,
  props: {
    labelSelect: String,
    modelValue: {
      type: null,
      default: () => ([]),
    },
  },
  setup(_, { emit }) {

		const monthComputed = computed(()=>{
			return (yearSelected.value.value + ' ' + monthSelected.value.value)
		})

		const quarterComputed = computed(()=>{
			return yearSelected.value.value + ' ' + quarterSelected.value.value
		})

		const yearComputed = computed(()=>{
			return yearSelected.value.value.toString()
		})

		const dayComputed = computed(()=>{
			return daySelected.value
		})

		const rangeComputed = computed(()=>{
			return [startDate.value, endDate.value]
		})

		const options = ref([
			{
				name: 'any',
				label: 'Любая дата',
				value: null
			},
			{
				name: 'yesterday',
				label: 'Вчера',
				value: null
			},
			{
				name: 'today',
				label: 'Сегодня',
				value: null
			},
			{
				name: 'tomorrow',
				label: 'Завтра',
				value: null
			},
			{
				name: 'curWeek',
				label: 'Текущая неделя',
				value: null
			},
			{
				name: 'curMonth',
				label: 'Текущий месяц',
				value: null
			},
			{
				name: 'curQuarter',
				label: 'Текущий квартал',
				value: null
			},
			{
				name: 'last7days',
				label: 'Последние 7 дней',
				value: null
			},
			{
				name: 'last30days',
				label: 'Последние 30 дней',
				value: null
			},
			{
				name: 'last60days',
				label: 'Последние 60 дней',
				value: null
			},
			{
				name: 'last90days',
				label: 'Последние 90 дней',
				value: null
			},
			{
				name: 'lastNdays',
				label: 'Последние N дней',
				value: null
			},
			{
				name: 'nextNdays',
				label: 'Следующие N дней',
				value: null
			},
			{
				name: 'month',
				label: 'Месяц',
				value: monthComputed
			},
			{
				name: 'quarter',
				label: 'Квартал',
				value: null
			},
			{
				name: 'year',
				label: 'Год',
				value: null
			},
			{
				name: 'exactDate',
				label: 'Точная дата',
				value: null
			},
			{
				name: 'lastWeek',
				label: 'Прошлая неделя',
				value: null
			},
			{
				name: 'lastMonth',
				label: 'Прошлый месяц',
				value: null
			},
			{
				name: 'range',
				label: 'Диапазон',
				value: null
			},
			{
				name: 'nextWeek',
				label: 'Следующая неделя',
				value: null
			},
			{
				name: 'nextMonth',
				label: 'Следующий месяц',
				value: null
			},
		])

		const monthsOptions = ref([{
				name:'January',
				label: 'Январь',
				value: 1
			},
			{
				name:'February',
				label: 'Февраль',
				value: 2
			},
			{
				name:'March',
				label: 'Март',
				value: 3
			},
			{
				name:'April',
				label: 'Апрель',
				value: 4
			},
			{
				name:'May',
				label: 'Май',
				value: 5
			},
			{
				name:'June',
				label: 'Июнь',
				value: 6
			},
			{
				name:'July',
				label: 'Июль',
				value: 7
			},
			{
				name:'August',
				label: 'Август',
				value: 8
			},
			{
				name:'September',
				label: 'Сентябрь',
				value: 9
			},
			{
				name:'October',
				label: 'Октябрь',
				value: 10
			},
			{
				name:'November',
				label: 'Ноябрь',
				value: 11
			},
			{
				name:'December',
				label: 'Декабрь',
				value: 12
			},
		])
		const quartersOptions = ref([{
				name:'quarter1',
				label: 'I',
				value: 1
			},
			{
				name:'quarter2',
				label: 'II',
				value: 2
			},
			{
				name:'quarter3',
				label: 'III',
				value: 3
			},
			{
				name:'quarter4',
				label: 'IV',
				value: 4
			},
		])
		const yearsOptions = ref([{
			name:'2022',
			label:'2022',
			value: 2022
		},{
			name:'2021',
			label:'2021',
			value: 2021
		},{
			name:'2020',
			label:'2020',
			value: 2020
		},])

    const selectedValue = ref(options.value[0]);
		const monthSelected = ref(monthsOptions.value.find(el => el.value === +dayjs().format('M')? true : false))
		const quarterSelected = ref(quartersOptions.value.find(el => el.value === +dayjs().format('Q')? true : false))
		const yearSelected = ref(yearsOptions.value.find(el => el.value === +dayjs().format('YYYY')? true : false))
		const daySelected = ref(null)
		const startDate = ref(null)
		const endDate = ref(null)

		const setN = n => {
			selectedValue.value.value = n.target.value
		}

		watch([selectedValue, monthComputed, quarterComputed, yearComputed, rangeComputed], ([newSelectedValue]) =>{
			if(selectedValue.value.name === 'month'){
				emit('update:modelValue',{...newSelectedValue, value:monthComputed})
			}
			else if(selectedValue.value.name === 'quarter'){
				emit('update:modelValue',{...newSelectedValue, value:quarterComputed})
			}
			else if(selectedValue.value.name === 'year'){
				emit('update:modelValue',{...newSelectedValue, value:yearComputed})
			}
			else if(selectedValue.value.name === 'exactDate'){
				emit('update:modelValue',{...newSelectedValue, value:dayComputed})
			}
			else if(selectedValue.value.name === 'range'){
				emit('update:modelValue',{...newSelectedValue, value:rangeComputed})
			}
			else{
				emit('update:modelValue',newSelectedValue)
			}
		})

    return {
      selectedValue,
			options,
			setN,
			monthsOptions,
			quartersOptions,
			yearsOptions,
			monthComputed,
			quarterComputed,
			dayComputed,
			monthSelected,
			quarterSelected,
			yearSelected,
			daySelected,
			startDate,
			endDate
    };
  },
};
</script>

<style lang="scss" src="./style.scss" scoped />
