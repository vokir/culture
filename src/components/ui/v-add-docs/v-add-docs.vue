<template>
  <v-tags-list :label="label" @openModal="openModal">
    <v-modal v-if="isOpen" @closeModal="closeModal" :title="'Выберите один или несколько документов'" titleGrey centered class="modal-add-doc">
      <div class="docs-wrapper">
        <v-filter-and-search class="docs-wrapper__input" v-model="filter" @setSearch="setSearch" @setFilter="setFilter" :search="search" @clearFilter="clearFilter" @filterTable="filterTable" :placeholder="'Поиск'" :clearBtn="false">
          <div class="search-right__item">
            <v-select :optionAll="true" v-model="typeSelect" name="type" :options="types" label="UF_TITLE" labelSelect="Тип документа"  />
          </div>

          <div class="search-right__item">
            <v-select :optionAll="true" v-model="categorySelect" name="type" :options="categories" label="UF_TITLE" labelSelect="Категория документа" />
          </div>

        </v-filter-and-search>
        <div v-if="docsLoading">Загрзука...</div>
        <v-table  v-else :rows="docs" :canChoose="true">
          <v-table-column id="UF_TITLE" title="Название" width="190">
            <template v-slot="{ row }">
              {{ row.file.ORIGINAL_NAME }}
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
          <v-table-column id="size" title="Размер">
            <template v-slot="{ row }">
              {{ Math.round(row.file.FILE_SIZE * 100  / 1024) / 100 + ' КБ' }}
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
import { useQuery } from "@vue/apollo-composable";
import { computed, ref, watch } from "vue";
import { GET_DOCUMENTS } from "../../../api/queries/getDocuments";
import useModal from "../../../hooks/useModal";
import VButton from "../v-button/v-button.vue";
import VModal from "../v-modal/v-modal.vue";
import VTableColumn from "../v-table/v-table-column.vue";
import VTable from "../v-table/v-table.vue";
import VTagsList from "../v-tags-list/v-tags-list.vue";
import VFilterAndSearch from "../v-filter-and-search/v-filter-and-search.vue";
import { GET_DOCUMENT_CATEGORIES } from "../../../api/queries/getDocumentCategories";
import { GET_DOCUMENT_TYPES } from "../../../api/queries/getDocumentTypes";
import VSelect from "../v-select/v-select.vue";

export default {
  name: "v-add-docs",
  components: { VButton, VTableColumn, VTable, VModal, VTagsList, VFilterAndSearch, VSelect },
  props: {
    label: String,
    tags: [Array, Object],
    maxTags: Number
  },
  setup() {
    const { isOpen, openModal, closeModal } = useModal()
    const { result: docsData, loading: docsLoading, refetch } = useQuery(GET_DOCUMENTS)
    const { result: docsTypes, loading: docsTypesLoading } = useQuery(GET_DOCUMENT_TYPES)
    const { result: docsCategories, loading: docsCategoriesLoading } = useQuery(GET_DOCUMENT_CATEGORIES)

    const typeSelect = ref({})
    const categorySelect = ref({})
    const search = ref("")
    const selectedDocs = ref([])

    const filter = computed(() => {

      if(Object.keys(typeSelect.value).length || Object.keys(categorySelect.value).length)
      {
        return [].concat(typeSelect.value,categorySelect.value)
      }
      
      return []
    })
    const docs = computed(() => {
      return docsData.value.getDocuments.data
    })
    const types = computed(() => {
      return docsTypes.value.getDocumentTypes
    })
    const categories = computed(() => {
      return docsCategories.value.getDocumentCategories
    })

    const clearFilter = () => {
      search.value = ""
      typeSelect.value = {}
      categorySelect.value = {}
    }

    const filterTable = () => {
      refetch({
        filterType: typeSelect.value.UF_TITLE !== undefined ? [typeSelect.value.UF_TITLE] : [],
        filterCategories: categorySelect.value.UF_TITLE !== undefined ? [categorySelect.value.UF_TITLE] : [],
        search: search.value
      })
    }

    const setSearch = (str) => {
      search.value = str
    }

    const setFilter = (str) => {
      let type =  str.target.dataset.type

      if(type === "DocumentType"){
        typeSelect.value = {}
      }
      else if(type === "DocumentCategory"){
        categorySelect.value = {}
      }
    }

    return {
      isOpen,
      openModal,
      closeModal,
      docs,
      docsLoading,
      types,
      categories,
      filterTable,
      typeSelect,
      categorySelect,
      filter,
      clearFilter,
      search,
      setSearch,
      setFilter,
      selectedDocs
    }
  },
}
</script>





<style lang="scss" src="./style.scss" scoped/>
