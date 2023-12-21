<template>
  <layout-default>
    <div class="container-content">
      <page-header action-text="Добавить новость" title="Новости" @button-action="openModal" />
      <div class="news">
        <v-loader v-if="store.isLoading" />

        <v-table-new :columns="store.columns" :rows="store.news" />
      </div>
      <table-pagination
        :current_page="store.pagination.current_page"
        :per_page="store.pagination.per_page"
        :total="store.pagination.total"
        @update="updateTable"
      />
      <news-form v-if="isOpen" edit-mode title="Редактирование Новости" @close-modal="closeModal" />
    </div>
  </layout-default>
</template>

<script setup>
import VLoader from '../../components/ui/v-loader/v-loader.vue';
import useModal from '../../hooks/useModal';
import { useNewsStore } from '@/store/news';
import LayoutDefault from '@/layout/layout-default/layout-default.vue';
import PageHeader from '@/components/general/page-header/page-header.vue';
import TablePagination from '@/components/ui/v-table-new/table-pagination/table-pagination.vue';
import VTableNew from '@/components/ui/v-table-new/v-table-new.vue';
import NewsForm from '@/components/news/news-form/news-form.vue';

const priorityMap = {
  1: 'gray-dark',
  2: 'warning',
  3: 'danger'
};

const store = useNewsStore();

// store.getNewsColumns();
store.getNewsList();

const { isOpen, openModal, closeModal } = useModal();

const updateTable = (e) => {
  store.pagination.current_page = e.currentPage;
  store.pagination.per_page = e.perPage;
  store.getNewsList();
};
</script>

<style lang="scss" scoped src="./style.scss" />
