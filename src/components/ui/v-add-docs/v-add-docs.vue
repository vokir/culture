<template>
	<v-tags-list :label="label" @openModal="openModal">
		<v-modal :show-modal="isOpen" @closeModal="closeModal" centered class="modal-tags">
			<div class="docs-wrapper">
				<div class="docs-wrapper__title">Выберите один или несколько документов</div>
				<div class="input">search</div>
				<div v-if="docsLoading">Загрзука...</div>
				<v-table v-else :rows="docs">
					<v-table-column id="UF_TITLE" title="Название" width="190">
						<template v-slot="{ row }">
							{{ row.UF_TITLE }}
						</template>
					</v-table-column>
					<v-table-column id="type" title="Тип" width="140">
						<template v-slot="{ row }">
							{{ row.type ? row.type.UF_TITLE : '' }}
						</template>
					</v-table-column>
					<v-table-column id="category" title="Категория" width="140">
						<template v-slot="{ row }">
							{{ row.category ? row.category.UF_TITLE : '' }}
						</template>
					</v-table-column>
					<v-table-column id="size" title="размер" >
						<template v-slot="{ row }">
							фига
						</template>
					</v-table-column>
				</v-table>
				<div class="docs-wrapper__actions">
					<v-button variant="gray">Выбрать документ</v-button>
					<v-button variant="link" @click="closeModal">Отменить</v-button>
				</div>
			</div>
		</v-modal>
	</v-tags-list>
</template>

<script>
import VTagsList from "../v-tags-list/v-tags-list.vue";
import {computed} from "vue";
import {useQuery} from "@vue/apollo-composable";
import {GET_DOCUMENTS} from "../../../api/queries/getDocuments";
import VModal from "../v-modal/v-modal.vue";
import useModal from "../../../hooks/useModal";
import VTable from "../v-table/v-table.vue";
import VTableColumn from "../v-table/v-table-column.vue";
import VButton from "../v-button/v-button.vue";

export default {
  name: "v-add-docs",
	components: {VButton, VTableColumn, VTable, VModal, VTagsList },
	props: {
		label: String,
		tags: [Array, Object],
		maxTags: Number
	},
	setup () {
		const [isOpen, openModal, closeModal] = useModal()
		const { result: docsData, loading: docsLoading } = useQuery(GET_DOCUMENTS)
		const docs = computed(()=>{
			return docsData.value.getDocuments.data
		})
		
		return {
			isOpen,
			openModal,
			closeModal,
			docs,
			docsLoading
		}
	}
}
</script>

<style lang="scss" src="./style.scss" scoped/>
