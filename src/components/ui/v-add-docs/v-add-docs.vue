<template>
  <v-tags-list
    :label="label"
    :max-tags="maxTags"
    :tags="modelValue"
    tag-label="title"
    @remove-tag="removeDocument"
    @open-modal="openModal"
  >
  </v-tags-list>
  <v-modal
    v-if="isOpen"
    centered
    class="modal-add-doc"
    title="Выберите один или несколько документов"
    title-grey
    @close-modal="closeModal"
  >
    <div class="docs-wrapper">
      <div class="docs-wrapper__title">Выберите один или несколько документов</div>
      <!--        <v-document-filter-->
      <!--          :fields="fields"-->
      <!--          @filter-table="filterTable"-->
      <!--          @update-fields="(newFields) => updateFields(newFields)"-->
      <!--        />-->
      <div v-if="store.isLoadingDocuments">Загрзука...</div>
      <v-table-new
        v-else
        :columns="columns"
        :initial-select="selectedDocs"
        :rows="store.documents"
        disable-select
        disable-settings
        @row-click="setSelectedDocs"
      >
        <template #tableHeader="col">{{ col.title }}</template>
        <template #tableRow="{ row, col, selected }">
          <span v-if="col.id === 'type'">
            {{ store.getDocumentType(row.typeId)?.title }}
          </span>
          <span v-if="col.id === 'file'">
            {{ row.file ? Math.round((row.file.fileSize * 100) / 1024) / 100 + ' КБ' : '' }}
          </span>
          <span v-else>{{ row[col.id] }}</span>
        </template>
      </v-table-new>
      <div class="docs-wrapper__actions">
        <v-button variant="gray" @click="onSelect">Выбрать документ</v-button>
        <v-button variant="link" @click="closeModal">Отменить</v-button>
      </div>
    </div>
  </v-modal>
</template>

<script setup>
import { ref } from 'vue';
import useModal from '../../../hooks/useModal';
import VButton from '../v-button/v-button.vue';
import VModal from '../v-modal/v-modal.vue';
import VTagsList from '../v-tags-list/v-tags-list.vue';
import { useGlobalStore } from '@/store/global/index.js';
import VTableNew from '@/components/ui/v-table-new/v-table-new.vue';

const emit = defineEmits(['update:modelValue']);
const props = defineProps({
  label: String,
  maxTags: {
    type: Number,
    default: 5
  },
  modelValue: {
    type: Array,
    required: false,
    default: () => []
  }
});
const selectedDocs = ref([...props.modelValue]);

const store = useGlobalStore();

if (!store.documentTypes.length) {
  store.getDocumentTypes();
}
if (!store.documents.length) {
  store.getDocumentsList();
}

const { isOpen, openModal, closeModal } = useModal();

const columns = ref([
  {
    id: 'title',
    title: 'Название',
    checked: true
  },
  {
    id: 'type',
    title: 'Тип',
    checked: true
  },
  {
    id: 'category',
    title: 'Категория',
    checked: true
  },
  {
    id: 'file',
    title: 'Размер',
    checked: true
  }
]);

const setSelectedDocs = (row) => {
  let idx = selectedDocs.value.findIndex((el) => el.realId === row.realId);
  if (idx !== -1) {
    selectedDocs.value.splice(idx, 1);
  } else {
    selectedDocs.value.push(row);
  }
};

const removeDocument = (doc) => {
  let idx = selectedDocs.value.findIndex((el) => el.realId === doc.realId);

  if (idx !== -1) {
    selectedDocs.value.splice(idx, 1);
    emit('update:modelValue', selectedDocs.value);
  }
};

const onSelect = () => {
  emit('update:modelValue', selectedDocs.value);
  closeModal();
};
</script>

<style lang="scss" scoped src="./style.scss" />
