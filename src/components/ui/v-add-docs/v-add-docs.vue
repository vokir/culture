<template>
	<v-tags-list
		:label="label"
		@openModal="openModal"
		:tags="modelValue"
		@removeTag="removeDocument"
	>
		<v-modal
			v-if="isOpen"
			ref="modalRef"
			@closeModal="onCloseModal"
			:title="'Выберите один или несколько документов'"
			titleGrey
			centered
			class="modal-add-doc"
		>

			<div class="docs-wrapper">
				<div class="docs-wrapper__title">Выберите один или несколько документов</div>
				<v-document-filter
					:fields="fields"
					@filterTable="filterTable"
					@updateFields="newFields => updateFields(newFields)"
				/>
				<div v-if="store.loadingDocuments2">Загрзука...</div>
				<v-table
					v-else
					:rows="docs"
					@rowClick="setSelectedDocs"
				>
					<v-table-column
						id="UF_TITLE"
						title="Название"
						width="190"
						class="column-name"
					>
						<template v-slot="{ row }">
							{{ row.UF_TITLE }}
						</template>
					</v-table-column>
					<v-table-column
						id="type"
						title="Тип"
						width="140"
					>
						<template v-slot="{ row }">
							{{ row.type ? row.type.UF_TITLE : '' }}
						</template>
					</v-table-column>
					<v-table-column
						id="category"
						title="Категория"
						width="140"
					>
						<template v-slot="{ row }">
							{{ row.category ? row.category.UF_TITLE : '' }}
						</template>
					</v-table-column>
					<v-table-column
						id="size"
						title="Размер"
					>
						<template v-slot="{ row }">
							{{ row.file? Math.round(row.file.FILE_SIZE * 100 / 1024) / 100 + ' КБ' : ''}}
						</template>
					</v-table-column>
				</v-table>
				<div class="docs-wrapper__actions">
					<v-button
						@click="closeModalRef"
						variant="gray"
					>Выбрать документ</v-button>
					<v-button
						variant="link"
						@click="closeModal"
					>Отменить</v-button>
				</div>
			</div>
		</v-modal>
	</v-tags-list>
</template>

<script>
import { computed, ref } from "vue";
import useModal from "../../../hooks/useModal";
import VButton from "../v-button/v-button.vue";
import VModal from "../v-modal/v-modal.vue";
import VTableColumn from "../v-table/v-table-column.vue";
import VTable from "../v-table/v-table.vue";
import VTagsList from "../v-tags-list/v-tags-list.vue";
import VFilterAndSearch from "../v-filter-and-search/v-filter-and-search.vue";
import VSelect from "../v-select/v-select.vue";
import VDocumentFilter from "../../news/document-filter/document-filter.vue"
import { documentFieldsPromise } from '../../../config/apolloClient.config'
import { useNewsStore } from "../../../store/newsStore";

export default {
	name: "v-add-docs",
	components: { VButton, VTableColumn, VTable, VModal, VTagsList, VFilterAndSearch, VSelect, VDocumentFilter },
	emits: ['update:modelValue'],
	props: {
		label: String,
		tags: [Array, Object],
		maxTags: Number,
		modelValue: {
			type: Array,
			required: false,
			default: () => ([])
		}
	},
	setup({ modelValue }, { emit }) {
		const { isOpen, openModal, closeModal } = useModal()

		const filter = ref([])

		const selectedDocs = ref(modelValue)

		const modalRef = ref()

		const docs = computed (()=>{
			return store.documents.map(doc=> ({...doc,selected:!!(selectedDocs.value.find(sDoc => doc.file?.ID === sDoc.file?.ID))}))
		})

		const filterTable = (search) => {
			store.variablesDocuments.search = search
			store.variablesDocuments.type = fields.value
				.filter(field => field.name === 'type' && field.value)
				.map(field => field.value.ID.toString())
			store.variablesDocuments.category = fields.value
				.filter(field => field.name === 'category' && field.value)
				.map(field => field.value.ID.toString())
		}

		const updateFields = (newFields) => {
			fields.value = newFields
		}

		const setSelectedDocs = ({ event, row }) => {
			let isExists = selectedDocs.value.find(doc => doc.file?.ID === row.file?.ID) !== undefined
			if (!(isExists)) {
				selectedDocs.value.push({ ...row })
			}
			else {
				selectedDocs.value = selectedDocs.value.filter(doc => doc.file?.ID !== row.file?.ID)
			}
			emit('update:modelValue', selectedDocs)

		}

		const removeDocument = (index) => {
			selectedDocs.value.splice(index, 1)
			emit('update:modelValue', selectedDocs)
		}

		const closeModalRef = () => {
			modalRef.value.closeModal()
		}

		const store = useNewsStore()
		const fields = ref([])

		documentFieldsPromise.then(schemaFields => {
			const filtersName = ['type', 'category']
			schemaFields.map(field => {
				if (filtersName.includes(field.name)) {
					let newField = {
						name: field.name,
						label: field.description,
						checked: false,
						order: fields.value.length
					}
					switch (field.name) {
						case 'type':
							newField.type = 'select',
								newField.load = store.loadDocumentTypes
							newField.result = computed(() => store.documentTypes)
							newField.value = null
							newField.checked = true
							break;
						case 'category':
							newField.type = 'select',
								newField.load = store.loadDocumentCategories,
								newField.result = computed(() => store.documentCategories),
								newField.value = []
							newField.checked = true
							break;
						default:
							break;
					}
					fields.value.push(newField)
				}
			})
		})

		const onCloseModal = () => {
			closeModal()
			store.variablesDocuments = {
				currentPage: 1,
				perPage: 100,
			}
		}
		return {
			isOpen,
			filter,
			selectedDocs,
			modalRef,
			fields,
			store,
			docs,
			openModal,
			closeModal,
			filterTable,
			setSelectedDocs,
			removeDocument,
			closeModalRef,
			updateFields,
			onCloseModal
		}
	},
}
</script>

<style lang="scss" src="./style.scss" scoped/>
