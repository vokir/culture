<template>
	<div class="container-content">
		<div class="container-header">
			<div class="container-header__title">
				{{ route.meta.pageTitle }}
				<div class="container-header__title-favorite">
					<svg
						fill="none"
						height="22"
						viewBox="0 0 23 22"
						width="23"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M11.5 2L14.4358 8.25387L21 9.25718L16.25 14.1256L17.3711 21L11.5 17.7539L5.62893 21L6.75 14.1256L2 9.25718L8.5642 8.25387L11.5 2Z"
							stroke="white"
							stroke-opacity="0.5"
						/>
					</svg>
				</div>
			</div>
			<div class="container-header__search">
				<news-filter :fields="fields" @filterTable="filterTable" @updateFields="newFields => updateFields(newFields)"></news-filter>
			</div>
			<div class="container-header__action">
				<v-button
					class="btn--w100"
					@click="openModal"
				>Добавить новость</v-button>
			</div>
		</div>
		<div class="news">
			<v-loader v-if="store.loading" />
			
			<v-table
				v-else
				:key="tableKey"
				:class="{'news--action': selected.length}"
				:rows="store.news"
			>
				<v-table-column
					id="choice"
					class="table__thead-th-check"
					title="check"
				>
					<template #header>
						<v-checkbox v-model="selectAll" />
					</template>

					<template v-slot="{ row, items }">
						<v-checkbox
							v-model="selected"
							:value="row"
						/>
					</template>


				</v-table-column>
				<v-table-column
					id="settings"
					class="table__thead-th-settings"
					title="settings"
				>
					<template #header>
						<svg
							@click="openModalColumns"
							fill="none"
							height="17"
							viewBox="0 0 16 17"
							width="16"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M10.9549 9.15814C10.7132 10.2946 9.81951 11.1883 8.68312 11.43C6.51653 11.8907 4.63443 10.008 5.09529 7.84184C5.31324 6.81752 6.34252 5.78814 7.3668 5.57014C9.53297 5.10907 11.4158 6.99137 10.9549 9.15814ZM15.4145 7.33497L13.8296 7.07054C13.717 6.61019 13.554 6.16969 13.3424 5.75791C13.3335 5.74059 13.3356 5.71975 13.3478 5.70459L14.3423 4.47143C14.5581 4.20554 14.5483 3.82299 14.3208 3.56639L13.6905 2.85694C13.462 2.60059 13.0831 2.54639 12.794 2.72899L11.4386 3.58106C10.851 3.17052 10.1865 2.86579 9.47001 2.68624C9.45101 2.68146 9.4366 2.66596 9.43336 2.64661L9.17351 1.08497C9.11785 0.747567 8.82588 0.5 8.48315 0.5H7.53321C7.19117 0.5 6.8982 0.747567 6.84379 1.08497L6.58249 2.64719C6.57925 2.66649 6.56487 2.68195 6.54589 2.6867C5.96604 2.83203 5.4214 3.06138 4.92248 3.36125C4.90567 3.37135 4.88455 3.37061 4.86857 3.3592L3.60581 2.458C3.32801 2.25951 2.94643 2.29055 2.70399 2.53249L2.03289 3.20407C1.79096 3.44652 1.75992 3.82811 1.95893 4.10593L2.86225 5.37122C2.87364 5.38717 2.87443 5.40829 2.86435 5.4251C2.5674 5.92016 2.34043 6.46157 2.19525 7.03615C2.19045 7.05513 2.175 7.06947 2.15572 7.07268L0.584933 7.33499C0.248053 7.39062 0 7.68263 0 8.02539V8.97461C0 9.31734 0.248053 9.60938 0.584933 9.66501L2.15567 9.92729C2.17497 9.93053 2.19045 9.9449 2.19523 9.9639C2.31332 10.433 2.48153 10.8817 2.70267 11.2994C2.71188 11.3169 2.70993 11.338 2.69755 11.3534L1.70793 12.579C1.49288 12.8447 1.50191 13.2275 1.72943 13.4839L2.35929 14.1933C2.5878 14.4501 2.96692 14.5034 3.25597 14.3212L4.60375 13.4746C4.62027 13.4642 4.64132 13.4646 4.65748 13.4755C5.23272 13.8643 5.88164 14.1506 6.57719 14.3212L6.84381 15.915C6.89823 16.2524 7.19117 16.5 7.53321 16.5H8.48315C8.82589 16.5 9.11785 16.2524 9.17351 15.915L9.4338 14.3531C9.43704 14.3337 9.45145 14.3183 9.47045 14.3135C10.0428 14.1702 10.5804 13.9449 11.0746 13.6503C11.0914 13.6403 11.1124 13.6411 11.1283 13.6524L12.4449 14.5928C12.7222 14.792 13.1041 14.7607 13.3463 14.518L14.0177 13.8466C14.2593 13.6049 14.292 13.2236 14.0914 12.9452L13.1541 11.6311C13.1427 11.6152 13.142 11.5941 13.152 11.5773C13.4499 11.0806 13.6781 10.5381 13.8224 9.96094C13.8272 9.94194 13.8427 9.92753 13.862 9.92429L15.4151 9.66497C15.7529 9.60931 16 9.3173 16 8.97456V8.02534C15.9995 7.68263 15.7524 7.39062 15.4145 7.33497Z"
								fill="#9E9E9E"
							/>
						</svg>
					</template>
					<template v-slot="{ row }">
						<VDropdown
							placement="right-start"
							:skidding="-10"
							:distance="10"
							popperClass="settings-popup"
						>
							<div class="settings-button">
								<svg
									fill="none"
									height="10"
									viewBox="0 0 14 10"
									width="14"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										clip-rule="evenodd"
										d="M14 0.0195312V2.00954H0V0.0195312H14ZM7.425 3.99953H14V5.98953H0V3.99953H7.425ZM14 7.98953V9.97954H0V7.98953H14Z"
										fill="#9E9E9E"
										fill-rule="evenodd"
									/>
								</svg>
							</div>
							<template #popper>
								<div class="settings">
									<ul class="settings__list">
										<li
											v-close-popper
											class="settings__item"
											@click="editNews(row)"
										>
											Редактировать
										</li>
										<li
											v-close-popper
											class="settings__item"
											@click="copyNews(row)"
										>
											Копировать
										</li>
										<li
											v-close-popper
											class="settings__item"
											@click="deleteSingleNews(row.ID)"
										>
											Удалить
										</li>
									</ul>
								</div>
							</template>
						</VDropdown>
					</template>
				</v-table-column>

				<template #columns>
					<v-table-column v-for="col in columns" :id="col.id" :title="col.title" :width="col.width" :checked="col.checked">
					<template v-if="col.id === 'icon'" v-slot="{ row }">
						<img
							v-if="row.icon"
							:alt="row.icon.file.ORIGINAL_NAME"
							:src="row.icon.file.SRC"
						>
					</template>
					<template v-else-if="col.id === 'UF_NAME'" v-slot="{ row }">
						<router-link
							:to="{ name: 'news-detail', params: { id: row.ID } }"
							class="link"
						>
							{{ row.UF_NAME }}
						</router-link>
					</template>
					<template v-else-if="col.id === 'UF_CREATED_AT'" v-slot="{ row }">
						{{ dayjs(row.UF_CREATED_AT).format("DD.MM.YYYY hh:mm") }}
					</template>
					<template v-else-if="col.id === 'types'" v-slot="{ row }">
						<span
							v-for="(type, index) of row.types"
							:key="index"
						>
							{{ type.UF_TITLE }}
						</span>
					</template>
					<template v-else-if="col.id === 'degree'" v-slot="{ row }">
						<v-badge
							v-if="row.degree"
							:text="row.degree.UF_TITLE"
							big
							:variant="priorityMap[row.degree.ID]"
						/>
					</template>
					<template v-else-if="col.id === 'complexes'" v-slot="{ row }">
						<div
							v-for="(complex, index) in row.complexes"
							:key="index"
						>
							{{ complex.UF_NAME }}
						</div>
					</template>
					<template  v-else-if="col.id === 'for'" v-slot="{ row }">
						<span v-if="!row.houses.length && !row.approaches.length && !row.floors.length && !row.premises.length">Весь ЖК</span>
						<bind-rows-column
							v-else
							:newsInfo="row"
						/>
					</template>
					<template v-else-if="col.id === 'contacts'" v-slot="{ row }">
						<div class="badges-list-contacts">
							<div
								v-if="row.contacts.length"
								class="badges-list__column"
							>
								<div
									v-for="(contact, index) in row.contacts.slice(0, 3)"
									class="badges-list__column-wrapper"
								>
									<v-badge
										:key="'contact-' + index"
										:class="{ 'transparent-background': contactsPopup }"
										:text="getFullFio(contact.NAME, contact.LAST_NAME, contact.SECOND_NAME)"
										variant="lightblue"
									/>
									<v-popup
										v-if="row.contacts.slice(0, 3).length - 1 === index"
										:class="{ 'visibility-hidden': contactsPopup }"
										:contacts="row.contacts"
										@togglePopup="contactsPopup = !contactsPopup"
									/>
								</div>
							</div>
						</div>
					</template>
					<template v-else-if="col.id === 'UF_ACTIVE'" v-slot="{ row }">
						<template  v-if="row.UF_ACTIVE">Да</template>
						<template v-else>{{row.UF_ACTIVE}}</template>
					</template>
					<template v-else-if="col.id === 'UF_TITLE'" v-slot="{ row }">
						{{ row.UF_TITLE }}
					</template>
					<template v-else-if="col.id === 'UF_PREVIEW_TEXT'" v-slot="{ row }">
						{{ row.UF_PREVIEW_TEXT }}
					</template>
					<template v-else-if="col.id === 'UF_TEXT'" v-slot="{ row }">
						{{ row.UF_TEXT }}
					</template>
				</v-table-column>
				</template>

			</v-table>
			<transition name="slide-up">
				<div
					v-if="selected.length"
					class="table-action"
				>
					<div class="table-action__buttons">
						<v-button
							variant="danger"
							@click="deleteNewsArray"
						>Удалить</v-button>
						<v-button
							variant="link"
							@click="selected = []"
						>Отмена</v-button>
					</div>
					<div class="table-action__selected">
						Отмечено: <span>{{ selected.length }} / {{ store.news.length }}</span>
					</div>
				</div>
			</transition>
		</div>
		<div class="news-controls">
			<v-pagination
				v-model="store.currentPage"
				:perPage="store.pageInfo.perPage"
				:total="store.pageInfo.total"
			/>
			<div class="news-controls__page">
				На странице:
				<v-select
					v-model="store.perPage"
					:options="[5, 10, 20, 50, 100]"
				/>
			</div>
		</div>

	</div>
	<news-add
		v-if="isOpen"
		:formData="formData"
		@closeModal="closeModal"
		@onCreate="formData = clearFormData()"
	/>
	<news-edit
		v-if="editModal"
		:formData="formData"
		:id="formData.id"
		@closeModal="closeEditModal"
	/>
	<news-select-columns
		v-if="isOpenColumns"
		v-model="columns"
		@closeModal="closeModalColumns"
		@updateTable="updateTable"
	/>
</template>

<script>
import dayjs from "dayjs";
import advancedFormat from 'dayjs/plugin/advancedFormat'
import updateLocale from 'dayjs/plugin/updateLocale'
import IsoWeek from 'dayjs/plugin/isoWeek'
import 'dayjs/locale/ru'
import { computed, ref, toRef, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useToast } from "vue-toastification";
import BindRowsColumn from "../../components/news/bind-rows/bind-rows-column.vue";
import NewsAdd from "../../components/news/news-add/news-add.vue";
import NewsEdit from "../../components/news/news-edit/news-edit.vue";
import NewsForm from "../../components/news/news-form/news-form.vue";
import NewsSearch from "../../components/news/news-search/news-search.vue";
import VBadge from "../../components/ui/v-badge/v-badge.vue";
import VButton from "../../components/ui/v-button/v-button.vue";
import VCheckbox from "../../components/ui/v-checkbox/v-checkbox.vue";
import VCropImage from "../../components/ui/v-crop-image/v-crop-image.vue";
import VLoader from "../../components/ui/v-loader/v-loader.vue";
import VModal from "../../components/ui/v-modal/v-modal.vue";
import VPagination from "../../components/ui/v-pagination/v-pagination.vue";
import VPopup from "../../components/ui/v-popup/v-popup.vue";
import VSelect from "../../components/ui/v-select/v-select.vue";
import VTableColumn from "../../components/ui/v-table/v-table-column.vue";
import VTable from "../../components/ui/v-table/v-table.vue";
import getFullFio from "../../helpers/getFullFio";
import useModal from "../../hooks/useModal";
import { useNewsStore } from "../../store/newsStore";
import NewsFilter from '../../components/news/news-filter/news-filter.vue'
import {newsFieldsPromise, newsColumnsPromise} from '../../config/apolloClient.config'
import NewsSelectColumns from '../../components/news/news-select-columns/news-select-columns.vue'

dayjs.extend(advancedFormat)
dayjs.extend(IsoWeek)
dayjs.extend(updateLocale)

export default {
	name: 'news',
	components: {
		NewsEdit,
		NewsAdd,
		VSelect,
		VPagination,
		VCropImage,
		NewsForm,
		VBadge,
		VTable,
		VCheckbox,
		VTableColumn,
		VButton,
		VModal,
		VPopup,
		BindRowsColumn,
		NewsSearch,
		VLoader,
		NewsFilter,
		NewsSelectColumns
	},
	setup(_,cnt) {
		const priorityMap = {
			1: 'gray-dark',
			2: 'warning',
			3: 'danger',
		}
		const store = useNewsStore()
		const {
			deleteNews,
			onErrorDeleteNews,
			createFormData,
			clearFormData,
		} = store

		const toast = useToast();
		const route = useRoute();
		const selected = ref([]);
		const { isOpen, openModal, closeModal } = useModal();
		const { isOpen: editModal, openModal: openEditModal, closeModal: closeEditModal } = useModal();
		const { isOpen: contactsPopup, openModal: openContactsPopup, closeModal: closeContactsPopup } = useModal();
		const { isOpen: isOpenColumns, openModal: openModalColumns, closeModal: closeModalColumns } = useModal();
		const formData = ref({
			title: '',
			icon: {
				id: null,
				src: null,
				name: null
			},
			desc: '',
			imgLandscape: null,
			imgLibrary: null,
			fullDesc: '',
			phone: '',
			date: '',
			type: {},
			complex: {},
			priority: {},
			docs: [],
			links: [],
			button: [],
			houses: [],
			approaches: [],
			floors: [],
			premises: [],
			contacts: []
		})

		const fields = ref([])
		const columns = ref([])
		const tableKey = ref(0)


		onErrorDeleteNews(error => {
			let e = JSON.parse(JSON.stringify(error))
			toast.error(e.message)
		})

		const selectAll = computed({
			get() {
				return selected.value.length === store.news.length;
			},
			set(value) {
				selected.value = [];

				if (value) {
					store.news.forEach((select) => {
						selected.value.push(select);
					});
				}
			},
		});
		const deleteSingleNews = (id) => {
			deleteNews({ id }).then(() => {
				toast.success('Новость удалена')
			})
		}
		const deleteNewsArray = () => {
			if (!selected.value.length) return
			let promises = []
			selected.value.forEach(news => {
				promises.push(new Promise((resolve) => {
					deleteNews({ id: news.ID }).then(() => {
						resolve()
					})
				}))
			})

			Promise.all(promises).then(() => {
				toast.success('Новости удалены')
				selected.value = []
			})
		}

		const copyNews = (row) => {
			formData.value = createFormData(row)
			openModal()
		}
		const editNews = (row) => {
			formData.value = createFormData(row)
			openEditModal()
		}



		newsFieldsPromise.then(schemaFields => {
			const filtersName = ['UF_NAME','UF_TITLE','UF_PREVIEW_TEXT','UF_TEXT','UF_ACTIVE','degree','UF_CREATED_AT','types','complexes']
			schemaFields.map(field => {
				if(filtersName.includes(field.name)){
					let newField = {
						name: field.name,
						label: field.description,
						checked: false,
						order: fields.value.length
					}
					switch (field.name) {
						case 'UF_NAME':
							newField.type = 'string'
							newField.value = ""
							newField.checked = true
							break;
						case 'UF_TITLE':
							newField.type = 'string'
							newField.value = ""
							break;
						case 'UF_PREVIEW_TEXT':
							newField.type = 'string'
							newField.value = ""
							break;
						case 'UF_TEXT':
							newField.type = 'string'
							newField.value = ""
							break;
							
						case 'UF_ACTIVE':
							newField.type = 'select'
							newField.value = null
							newField.computedResult = [
								{
									UF_TITLE:"Нет",
									name:"Нет",
									value:["0"]
								},
								{
									UF_TITLE:"Да",
									name:"Да",
									value:["1"]
								},
							]

							break;
						case 'degree':
							newField.type = 'select',
							newField.load = store.loadDegrees
							newField.result = computed(() => store.newsDegrees)
							newField.value = null
							newField.checked = true
							break;
						case 'UF_CREATED_AT':
							newField.type = 'select-options'
							newField.value = {
									name: 'any',
									label: 'Любая дата',
									value: null,
								},
							newField.options = [
								{
									name: 'any',
									label: 'Любая дата',
									value: null,
								},
								{
									name: 'exact_date',
									label: 'Точная дата',
									value: null,
									cells: [
										{
											name: 'date',
											type: 'date',
											value: null
										}
									],
								},
								{
									name: 'range',
									label: 'Диапазон',
									value: 'Диапазон',
									cells: [
										{
											name: 'dateFrom',
											type: 'date',
											value: null
										},
										{
											name: 'dateTo',
											type: 'date',
											value: null
										}
									],
								},
								{
									name: 'month',
									label: 'Месяц',
									value: 'Месяц',
									type: 'date',
									cells: [
										{
											name: 'month',
											type: 'select',
											options: [{
												name: 'January',
												label: 'Январь',
												value: '01'
											},
											{
												name: 'February',
												label: 'Февраль',
												value: '02'
											},
											{
												name: 'March',
												label: 'Март',
												value: '03'
											},
											{
												name: 'April',
												label: 'Апрель',
												value: '04'
											},
											{
												name: 'May',
												label: 'Май',
												value: '05'
											},
											{
												name: 'June',
												label: 'Июнь',
												value: '06'
											},
											{
												name: 'July',
												label: 'Июль',
												value: '07'
											},
											{
												name: 'August',
												label: 'Август',
												value: '08'
											},
											{
												name: 'September',
												label: 'Сентябрь',
												value: '09'
											},
											{
												name: 'October',
												label: 'Октябрь',
												value: '10'
											},
											{
												name: 'November',
												label: 'Ноябрь',
												value: '11'
											},
											{
												name: 'December',
												label: 'Декабрь',
												value: '12'
											},
											],
											value: null
										},
									],
								},
								{
									name: 'year',
									label: 'Год',
									value: 'Год',
									type: 'date',
									cells: [
										{
											name: 'year',
											type: 'select',
											options: [{
												name: '2022',
												label: '2022',
												value: 2022
											}, {
												name: '2021',
												label: '2021',
												value: 2021
											}, {
												name: '2020',
												label: '2020',
												value: 2020
											}],
											value: null
										}
									],
								},
								{
									name: 'last_n_days',
									label: 'Последние N дней',
									value: 'Последние N дней',
									template: 'Последние var0 (дня/дней)',
									cells: [
										{
											name: 'days',
											type: 'number'
										}
									],
								},
							]
							newField.checked = true
							newField.selectedOption = null
							break;
						case 'types':
							newField.type = 'multi-select',
								newField.load = store.loadTypes,
								newField.result = computed(() => store.newsTypes),
								newField.value = []
								newField.checked = true
							break;
						case 'complexes':
							newField.type = 'multi-select',
								newField.load = store.loadComplexes,
								newField.result = computed(() => store.complexes),
								newField.value = [],
								newField.checked = true
							break;
						default:
							break;
					}
					fields.value.push(newField)
				}
			})
		})

		const filterTable = (search) => {
			store.variables.searchStr = search
			store.variables.name = fields.value.find(field => field.name === 'UF_NAME')?.value
			store.variables.active = fields.value.find(field => field.name === 'UF_ACTIVE' && field.value)?.value?.value
			const dateValue = fields.value.find(field => field.name === 'UF_CREATED_AT')?.value
			if (dateValue) {
				if (dateValue.name === 'range') {
					let splittedValue = dateValue.value.split(' ')
					store.variables.date = splittedValue[0]
					store.variables.rangeValue = splittedValue[1]
				}
				else {
					store.variables.date = dateValue.value
				}
				store.variables.dateFilterType = dateValue.name === 'any' ? 'exact_date' : dateValue.name
			}
			store.variables.types = fields.value
				.filter(field => field.name === 'types' && field.value?.length)
				.map(field => field.value.map(value => value.ID.toString()))[0]
			store.variables.complexes = fields.value
				.filter(field => field.name === 'complexes' && field.value?.length)
				.map(field => field.value.map(value => value.ID.toString()))[0]
			store.variables.title = fields.value.find(field => field.name === 'UF_TITLE').value
			store.variables.preview = fields.value.find(field => field.name === 'UF_PREVIEW_TEXT').value
			store.variables.text = fields.value.find(field => field.name === 'UF_TEXT').value
			store.variables.degrees = fields.value
				.filter(field => field.name === 'degree' && field.value)
				.map(field => field.value.ID.toString())
		}

		const updateFields = (newFields) => {
			fields.value = newFields
		}

		onMounted(()=>{
			const columnsFromStorage = localStorage.getItem('news-columns')
			if (!columnsFromStorage) {
				newsColumnsPromise.then(schemaColumns => {
					columns.value = []
					const columnsName = ['icon', 'UF_NAME', 'UF_CREATED_AT', 'degree', 'types', 'complexes', 'contacts', 'UF_ACTIVE', 'UF_TITLE', 'UF_PREVIEW_TEXT', 'UF_TEXT']
					const defaultColumnsName = ['icon', 'UF_NAME', 'UF_CREATED_AT', 'degree', 'types', 'complexes', 'contacts']
					columnsName.map(name => {
						let col = schemaColumns.find(column => name === column.name)
						let newCol = {
							id: col.name,
							title: col.description,
							// width: '30px', 
							checked: true,
							editting: false,
							default: defaultColumnsName.includes(col.name)
						}
						// newCol.id === 'icon' ? newCol.width = '50px' : null
						newCol.id === 'UF_TEXT' ? newCol.checked = false : null
						columns.value.push(newCol)
					})
					columns.value.push({
						id: 'for',
						title: 'Отображать для',
						width: '30px',
						checked: true,
						default: true
					})
					localStorage.setItem('news-columns', JSON.stringify(columns.value))
				})
			}
			else {
				columns.value = JSON.parse(columnsFromStorage) 
			}
			tableKey.value++
		})

		const updateTable = () => {
			localStorage.setItem('news-columns', JSON.stringify(columns.value))
			tableKey.value++
		}

		return {
			route,
			isOpen,
			openModal,
			closeModal,
			dayjs,
			selectAll,
			selected,
			getFullFio,
			contactsPopup,
			openContactsPopup,
			closeContactsPopup,
			filterTable,
			deleteNewsArray,
			store,
			priorityMap,
			deleteSingleNews,
			editModal,
			closeEditModal,
			editNews,
			copyNews,
			clearFormData,
			formData,
			fields,
			updateFields,
			isOpenColumns,
			openModalColumns,
			closeModalColumns,
			columns,
			tableKey,
			updateTable
		};
	},
};
</script>





<style lang="scss" src="./style.scss" scoped/>

