<template>
  <v-table-new
    :columns="store.columns"
    :loading="store.isLoading"
    :rows="store.news"
    @copy="onCopy"
    @delete="onDelete"
    @edit="onEdit"
    @on-array-delete="onArrayDelete"
  >
    <template #tableHeader="col">{{ col.title }}</template>
    <template #tableRow="{ row, col, selected }">
      <span v-if="col.id === 'icon'">
        <img v-if="row.icon" :src="row.icon" alt="" class="avatar" />
        <img v-else :src="placeholder" alt="" class="avatar" />
      </span>
      <span v-else-if="col.id === 'active'">
        <template v-if="selected.includes(row)">
          <v-select v-model="row.active" :options="['Да', 'Нет']" />
        </template>
        <template v-else>
          {{ row.active }}
        </template>
      </span>
      <span v-else-if="col.id === 'name'">
        <router-link :to="{ name: 'news-detail', params: { id: row.id } }" class="link">
          {{ row.name }}
        </router-link>
      </span>
      <span v-else>{{ row[col.id] }}</span>
    </template>
  </v-table-new>
  <news-form v-if="isOpen" edit-mode title="Редактирование Новости" @close-modal="closeModal" />
  <table-pagination
    :current_page="store.pagination.current_page"
    :per_page="store.pagination.per_page"
    :total="store.pagination.total"
    @update="updateTable"
  />
</template>

<script setup>
import VSelect from '@/components/ui/v-select/v-select.vue';
import TablePagination from '@/components/ui/v-table-new/table-pagination/table-pagination.vue';
import VTableNew from '@/components/ui/v-table-new/v-table-new.vue';
import useModal from '@/hooks/useModal.js';
import placeholder from '@/assets/images/placeholder.png';
import { useNewsStore } from '@/store/news/index.js';
import NewsForm from '@/components/news/news-form/news-form.vue';

const { isOpen, closeModal, openModal } = useModal();

const store = useNewsStore();

const updateTable = (e) => {
  store.pagination.current_page = e.currentPage;
  store.pagination.per_page = e.perPage;
  store.getNewsList();
};

const onArrayDelete = (array) => {
  const promises = array.map((complex) => store.deleteNews(complex.realId));

  Promise.allSettled(promises).then(() => {
    store.getNewsList();
  });
};
const onDelete = ({ id }) => {
  store.deleteNews(id);
  store.getNewsList();
};
const onEdit = (complex) => {
  store.editComplex(complex);
  openModal();
};

const onCopy = (complex) => {
  store.createComplex(complex);
};
</script>

<style lang="scss" scoped src="news-list.scss"></style>
